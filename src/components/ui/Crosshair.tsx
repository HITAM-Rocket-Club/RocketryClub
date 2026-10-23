import React, { useEffect, useRef } from 'react';

const LINE_STYLES = ['solid', 'dashed', 'dotted'] as const;
const EFFECTS = ['lock', 'glitch', 'none'] as const;
const FONT = '500 10px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
const HIDDEN = 'crosshair-cursor-hidden';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const toRgb = (ctx: CanvasRenderingContext2D, color: string) => {
  ctx.fillStyle = '#000';
  ctx.fillStyle = color;
  const value = String(ctx.fillStyle);
  if (value.startsWith('#')) {
    const hex = parseInt(value.slice(1, 7), 16);
    return { r: (hex >> 16) & 255, g: (hex >> 8) & 255, b: hex & 255, a: 1 };
  }
  const parts = value.match(/[\d.]+/g)?.map(Number) ?? [255, 255, 255, 1];
  return { r: parts[0], g: parts[1], b: parts[2], a: parts[3] ?? 1 };
};

export interface SnapTarget {
  type: 'component' | 'word';
  key: string;
  label?: string;
  element: Element;
  getBoundingClientRect: () => DOMRect;
}

export interface CrosshairProps {
  color?: string;
  containerRef?: React.RefObject<HTMLElement | null> | null;
  thickness?: number;
  opacity?: number;
  lineStyle?: 'solid' | 'dashed' | 'dotted';
  gap?: number;
  fade?: number;
  smoothing?: number;
  showCoordinates?: boolean;
  targetEffect?: 'lock' | 'glitch' | 'none';
  targetSelector?: string;
  snapToWords?: boolean;
  clickPulse?: boolean;
  hideCursor?: boolean;
  blendMode?: 'normal' | 'difference';
  className?: string;
  style?: React.CSSProperties;
}

export const Crosshair: React.FC<CrosshairProps> = ({
  color = '#00f0ff',
  containerRef = null,
  thickness = 1,
  opacity = 0.85,
  lineStyle = 'solid',
  gap = 0,
  fade = 0,
  smoothing = 0.35,
  showCoordinates = true,
  targetEffect = 'lock',
  targetSelector = 'a, button, [role="button"], input, select, textarea, [data-crosshair-target]',
  snapToWords = true,
  clickPulse = true,
  hideCursor = false,
  blendMode = 'normal',
  className = '',
  style,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wakeRef = useRef<(() => void) | null>(null);
  const settings = {
    color,
    thickness: clamp(thickness, 0.5, 8),
    opacity: clamp(opacity, 0, 1),
    lineStyle: LINE_STYLES.includes(lineStyle as any) ? lineStyle : 'solid',
    gap: Math.max(0, gap),
    fade: clamp(fade, 0, 1),
    smoothing: clamp(smoothing, 0, 1),
    showCoordinates,
    targetEffect: EFFECTS.includes(targetEffect as any) ? targetEffect : 'lock',
    targetSelector,
    snapToWords,
    clickPulse,
    hideCursor,
  };
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    wakeRef.current?.();
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return undefined;
    const host = containerRef?.current ?? null;
    const scope: Window | HTMLElement = host ?? window;
    const cursorOwner = host ?? document.documentElement;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    let textNodeCounter = 0;
    let elementCounter = 0;
    const wordRegex = /\S+/g;

    const state = {
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
      clientX: 0,
      clientY: 0,
      inside: false,
      seen: false,
      presence: 0,
      glitch: 0,
      target: null as SnapTarget | null,
      lock: { x: 0, y: 0, w: 0, h: 0, alpha: 0 },
      pulses: [] as Array<{ x: number; y: number; age: number }>,
    };
    const size = { w: 0, h: 0, dpr: 1 };
    let ink = toRgb(ctx, settingsRef.current.color);
    let inkSource = settingsRef.current.color;
    let raf = 0;
    let last = 0;
    let alive = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      size.dpr = Math.min(window.devicePixelRatio || 1, 2);
      size.w = rect.width;
      size.h = rect.height;
      canvas.width = Math.max(1, Math.round(rect.width * size.dpr));
      canvas.height = Math.max(1, Math.round(rect.height * size.dpr));
      wake();
    };

    const rgba = (alpha: number) => `rgba(${ink.r}, ${ink.g}, ${ink.b}, ${clamp(alpha * ink.a, 0, 1)})`;
    const crisp = (value: number, width: number) => {
      const device = Math.round(width * size.dpr);
      return (Math.round(value * size.dpr) + (device % 2 ? 0.5 : 0)) / size.dpr;
    };

    const tag = (text: string, x: number, y: number, align: 'center' | 'middle') => {
      ctx.font = FONT;
      const width = ctx.measureText(text).width + 10;
      const height = 16;
      let left = align === 'center' ? x - width / 2 : x;
      let top = align === 'middle' ? y - height / 2 : y;
      left = clamp(left, 4, size.w - width - 4);
      top = clamp(top, 4, size.h - height - 4);
      const light = ink.r * 0.2126 + ink.g * 0.7152 + ink.b * 0.0722 > 150;
      ctx.fillStyle = rgba(1);
      ctx.beginPath();
      if (typeof (ctx as any).roundRect === 'function') {
        (ctx as any).roundRect(left, top, width, height, 3);
      } else {
        ctx.rect(left, top, width, height);
      }
      ctx.fill();
      ctx.fillStyle = light ? '#0a0a0a' : '#ffffff';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillText(text, left + width / 2, top + height / 2 + 0.5);
    };

    const segment = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      horizontal: boolean,
      s: typeof settings
    ) => {
      const length = horizontal ? x2 - x1 : y2 - y1;
      if (length <= 0) return;
      if (s.fade > 0) {
        const gradient = horizontal
          ? ctx.createLinearGradient(0, 0, size.w, 0)
          : ctx.createLinearGradient(0, 0, 0, size.h);
        const at = clamp(horizontal ? state.x / size.w : state.y / size.h, 0.001, 0.999);
        gradient.addColorStop(0, rgba(1 - s.fade));
        gradient.addColorStop(at, rgba(1));
        gradient.addColorStop(1, rgba(1 - s.fade));
        ctx.strokeStyle = gradient;
      } else {
        ctx.strokeStyle = rgba(1);
      }
      ctx.beginPath();
      if (state.glitch > 0.01) {
        const pieces = Math.max(4, Math.round(length / 28));
        for (let i = 0; i < pieces; i++) {
          const jitter = (Math.random() - 0.5) * 14 * state.glitch;
          const from = i / pieces;
          const to = (i + 1) / pieces;
          if (horizontal) {
            ctx.moveTo(x1 + length * from, y1 + jitter);
            ctx.lineTo(x1 + length * to, y1 + jitter);
          } else {
            ctx.moveTo(x1 + jitter, y1 + length * from);
            ctx.lineTo(x1 + jitter, y1 + length * to);
          }
        }
      } else {
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.stroke();
    };

    const brackets = (x: number, y: number, w: number, h: number, alpha: number) => {
      const arm = Math.min(14, w / 3, h / 3);
      ctx.strokeStyle = rgba(alpha);
      ctx.lineWidth = Math.max(1.5, settingsRef.current.thickness);
      ctx.setLineDash([]);
      ctx.lineCap = 'square';
      ctx.beginPath();
      ctx.moveTo(x, y + arm);
      ctx.lineTo(x, y);
      ctx.lineTo(x + arm, y);
      ctx.moveTo(x + w - arm, y);
      ctx.lineTo(x + w, y);
      ctx.lineTo(x + w, y + arm);
      ctx.moveTo(x + w, y + h - arm);
      ctx.lineTo(x + w, y + h);
      ctx.lineTo(x + w - arm, y + h);
      ctx.moveTo(x + arm, y + h);
      ctx.lineTo(x, y + h);
      ctx.lineTo(x, y + h - arm);
      ctx.stroke();
    };

    const draw = () => {
      const s = settingsRef.current;
      ctx.setTransform(size.dpr, 0, 0, size.dpr, 0, 0);
      ctx.clearRect(0, 0, size.w, size.h);
      if (state.presence > 0.001) {
        ctx.globalAlpha = state.presence * s.opacity * (1 - 0.6 * state.lock.alpha);
        ctx.lineWidth = s.thickness;
        ctx.lineCap = s.lineStyle === 'dotted' ? 'round' : 'butt';
        if (s.lineStyle === 'dashed') ctx.setLineDash([s.thickness * 6, s.thickness * 5]);
        else if (s.lineStyle === 'dotted') ctx.setLineDash([0, s.thickness * 4]);
        else ctx.setLineDash([]);
        const x = crisp(state.x, s.thickness);
        const y = crisp(state.y, s.thickness);
        segment(0, y, x - s.gap, y, true, s);
        segment(x + s.gap, y, size.w, y, true, s);
        segment(x, 0, x, y - s.gap, false, s);
        segment(x, y + s.gap, x, size.h, false, s);
        if (s.hideCursor) {
          ctx.fillStyle = rgba(1);
          ctx.beginPath();
          ctx.arc(state.x, state.y, Math.max(1.5, s.thickness * 1.5), 0, Math.PI * 2);
          ctx.fill();
        }
        if (s.showCoordinates && state.lock.alpha < 0.999) {
          ctx.globalAlpha = state.presence * s.opacity * (1 - state.lock.alpha);
          tag(String(Math.round(state.x)), state.x, 8, 'center');
          tag(String(Math.round(state.y)), 8, state.y, 'middle');
        }
      }
      if (state.lock.alpha > 0.001) {
        const { x, y, w, h, alpha } = state.lock;
        ctx.globalAlpha = alpha * s.opacity;
        brackets(x, y, w, h, 1);
        if (s.showCoordinates && state.target) {
          const box = state.target.getBoundingClientRect();
          let displayTag = '';
          if (state.target.label) {
            displayTag = `[ ${state.target.label.toUpperCase()} ]`;
          } else {
            displayTag = `${Math.round(box.width)} × ${Math.round(box.height)}`;
          }
          tag(displayTag, x + w / 2, y + h + 8, 'center');
        }
      }
      state.pulses.forEach((pulse) => {
        const t = pulse.age / 0.55;
        const eased = 1 - (1 - t) ** 3;
        ctx.globalAlpha = (1 - t) ** 2 * s.opacity;
        ctx.strokeStyle = rgba(1);
        ctx.lineWidth = Math.max(1, s.thickness);
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, 3 + 30 * eased, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
    };

    const relative = () => {
      const rect = canvas.getBoundingClientRect();
      state.tx = state.clientX - rect.left;
      state.ty = state.clientY - rect.top;
      return rect;
    };

    const tick = (now: number) => {
      raf = 0;
      if (!alive) return;
      const s = settingsRef.current;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      if (s.color !== inkSource) {
        inkSource = s.color;
        ink = toRgb(ctx, s.color);
      }
      const rect = relative();
      const follow = reduce || s.smoothing === 0 ? 1 : 1 - Math.exp(-dt / (0.008 + s.smoothing * 0.16));
      state.x += (state.tx - state.x) * follow;
      state.y += (state.ty - state.y) * follow;
      const wanted = state.inside ? 1 : 0;
      state.presence += (wanted - state.presence) * (reduce ? 1 : 1 - Math.exp(-dt / (wanted ? 0.12 : 0.25)));
      if (Math.abs(wanted - state.presence) < 0.002) state.presence = wanted;
      const lock = state.lock;
      const locked = s.targetEffect === 'lock' && state.inside ? state.target : null;
      let goal;
      if (locked) {
        const box = locked.getBoundingClientRect();
        const padX = locked.type === 'word' ? 4 : 6;
        const padY = locked.type === 'word' ? 2 : 6;
        goal = {
          x: box.left - rect.left - padX,
          y: box.top - rect.top - padY,
          w: box.width + padX * 2,
          h: box.height + padY * 2,
        };
      } else {
        goal = { x: state.x - 10, y: state.y - 10, w: 20, h: 20 };
      }
      const snap = reduce ? 1 : 1 - Math.exp(-dt / 0.085);
      lock.x += (goal.x - lock.x) * snap;
      lock.y += (goal.y - lock.y) * snap;
      lock.w += (goal.w - lock.w) * snap;
      lock.h += (goal.h - lock.h) * snap;
      const shown = locked ? 1 : 0;
      lock.alpha += (shown - lock.alpha) * (reduce ? 1 : 1 - Math.exp(-dt / (shown ? 0.08 : 0.14)));
      if (Math.abs(shown - lock.alpha) < 0.002) lock.alpha = shown;
      state.glitch = reduce ? 0 : Math.max(0, state.glitch - dt / 0.5);
      state.pulses = state.pulses.filter((pulse) => (pulse.age += dt) < 0.55);
      draw();
      const settling =
        Math.abs(state.tx - state.x) > 0.05 ||
        Math.abs(state.ty - state.y) > 0.05 ||
        state.presence !== wanted ||
        lock.alpha !== shown ||
        (locked && Math.abs(goal.w - lock.w) + Math.abs(goal.x - lock.x) + Math.abs(goal.y - lock.y) > 0.1) ||
        state.glitch > 0 ||
        state.pulses.length > 0;
      if (settling) raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (raf || !alive) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const setCursorHidden = (hidden: boolean) => {
      cursorOwner.classList.toggle(HIDDEN, hidden);
    };

    wakeRef.current = () => {
      setCursorHidden(state.inside && settingsRef.current.hideCursor);
      wake();
    };

    const getTextNodes = (node: Node): Text[] => {
      const list: Text[] = [];
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent && node.textContent.trim().length > 0) {
          list.push(node as Text);
        }
      } else {
        const children = node.childNodes;
        for (let i = 0; i < children.length; i++) {
          list.push(...getTextNodes(children[i]));
        }
      }
      return list;
    };

    const isOverlayOrIgnored = (el: Element): boolean => {
      const tag = el.tagName;
      if (
        tag === 'CANVAS' ||
        tag === 'HTML' ||
        tag === 'BODY' ||
        tag === 'SCRIPT' ||
        tag === 'STYLE' ||
        tag === 'NOSCRIPT' ||
        tag === 'INPUT' ||
        tag === 'TEXTAREA'
      ) {
        return true;
      }
      if (el.classList.contains('crt-scanlines') || el.closest('.crt-scanlines')) {
        return true;
      }
      try {
        const style = window.getComputedStyle(el);
        if (style.pointerEvents === 'none') {
          return true;
        }
      } catch {}
      return false;
    };

    const getWordTarget = (
      clientX: number,
      clientY: number,
      elementsUnderPointer: Element[],
      directTarget: Element | null
    ): SnapTarget | null => {
      const candidates: Element[] = [];

      if (directTarget && !isOverlayOrIgnored(directTarget)) {
        candidates.push(directTarget);
      }

      for (const el of elementsUnderPointer) {
        if (!isOverlayOrIgnored(el) && !candidates.includes(el)) {
          candidates.push(el);
        }
      }

      for (const elem of candidates) {
        const textContent = elem.textContent;
        if (!textContent || !textContent.trim()) continue;

        const textNodes = getTextNodes(elem);

        for (const node of textNodes) {
          const text = node.textContent ?? '';
          wordRegex.lastIndex = 0;
          let match: RegExpExecArray | null;

          while ((match = wordRegex.exec(text)) !== null) {
            const rawWord = match[0];

            // Extract alphanumeric bounds
            let firstAlpha = -1;
            let lastAlpha = -1;
            for (let i = 0; i < rawWord.length; i++) {
              if (/[a-zA-Z0-9]/.test(rawWord[i])) {
                if (firstAlpha === -1) firstAlpha = i;
                lastAlpha = i;
              }
            }
            if (firstAlpha === -1) continue;

            const start = match.index + firstAlpha;
            const end = match.index + lastAlpha + 1;
            const trimmed = rawWord.slice(firstAlpha, lastAlpha + 1);

            const testRange = document.createRange();
            try {
              testRange.setStart(node, start);
              testRange.setEnd(node, end);
            } catch {
              continue;
            }

            const rect = testRange.getBoundingClientRect();
            if (!rect || (rect.width === 0 && rect.height === 0)) continue;

            const padX = 8;
            const padY = 8;
            if (
              clientX >= rect.left - padX &&
              clientX <= rect.right + padX &&
              clientY >= rect.top - padY &&
              clientY <= rect.bottom + padY
            ) {
              let nodeId = (node as any).__ch_id;
              if (!nodeId) {
                nodeId = 'tn_' + (++textNodeCounter);
                (node as any).__ch_id = nodeId;
              }

              const key = `w_${nodeId}_${start}_${end}`;
              let label = trimmed;
              if (label.length > 18) {
                label = label.slice(0, 16) + '…';
              }

              const targetNode = node;
              const targetStart = start;
              const targetEnd = end;
              const parentElem = elem;
              const wordRange = testRange;

              return {
                type: 'word',
                key,
                label,
                element: elem,
                getBoundingClientRect: () => {
                  try {
                    if (targetNode.isConnected) {
                      wordRange.setStart(targetNode, targetStart);
                      wordRange.setEnd(targetNode, targetEnd);
                      const r = wordRange.getBoundingClientRect();
                      if (r && (r.width > 0 || r.height > 0)) return r;
                    } else {
                      const currentTextNode = parentElem.firstChild;
                      if (currentTextNode && currentTextNode.nodeType === Node.TEXT_NODE) {
                        const len = currentTextNode.textContent?.length ?? 0;
                        const vs = Math.min(targetStart, len);
                        const ve = Math.min(targetEnd, len);
                        if (vs < ve) {
                          wordRange.setStart(currentTextNode, vs);
                          wordRange.setEnd(currentTextNode, ve);
                          const r = wordRange.getBoundingClientRect();
                          if (r && (r.width > 0 || r.height > 0)) return r;
                        }
                      }
                    }
                  } catch {}
                  return parentElem.getBoundingClientRect();
                },
              };
            }
          }
        }
      }

      return null;
    };

    const pick = (clientX: number, clientY: number, element: EventTarget | null): SnapTarget | null => {
      const s = settingsRef.current;
      if (s.targetEffect === 'none') return null;

      const elementsUnder = typeof document.elementsFromPoint === 'function'
        ? document.elementsFromPoint(clientX, clientY)
        : (element instanceof Element ? [element] : []);

      const directTarget = element instanceof Element ? element : null;

      // 1. Check if hovering an interactive clickable component first
      const clickableCandidates = directTarget ? [directTarget, ...elementsUnder] : elementsUnder;
      for (const el of clickableCandidates) {
        if (el.tagName === 'CANVAS' || el.classList.contains('crt-scanlines')) continue;
        let found: Element | null = null;
        try {
          found = el.closest(s.targetSelector);
        } catch {
          found = null;
        }

        if (found && host && !host.contains(found)) found = null;

        if (found) {
          let key = (found as any).__ch_id;
          if (!key) {
            key = 'el_' + (++elementCounter);
            (found as any).__ch_id = key;
          }

          let label = '';
          const text = (found.getAttribute('aria-label') || (found as HTMLElement).innerText || '').trim();
          if (text) {
            label = text.split(/\s+/).slice(0, 3).join(' ');
            if (label.length > 18) label = label.slice(0, 16) + '…';
          }

          return {
            type: 'component',
            key,
            label,
            element: found,
            getBoundingClientRect: () => found!.getBoundingClientRect(),
          };
        }
      }

      // 2. If not hovering a clickable component, snap to the word under the cursor
      if (s.snapToWords) {
        const wordTarget = getWordTarget(clientX, clientY, elementsUnder, directTarget);
        if (wordTarget) {
          return wordTarget;
        }
      }

      return null;
    };

    const retarget = (clientX: number, clientY: number, element: EventTarget | null) => {
      const next = pick(clientX, clientY, element);
      if (next?.key === state.target?.key) return;
      state.target = next;
      if (next && settingsRef.current.targetEffect === 'glitch') state.glitch = 1;
      wake();
    };

    const enter = () => {
      if (!state.seen) {
        state.seen = true;
        relative();
        state.x = state.tx;
        state.y = state.ty;
        state.lock.x = state.x - 10;
        state.lock.y = state.y - 10;
        state.lock.w = 20;
        state.lock.h = 20;
      }
      state.inside = true;
      setCursorHidden(settingsRef.current.hideCursor);
    };

    const leave = () => {
      state.inside = false;
      state.target = null;
      setCursorHidden(false);
      wake();
    };

    const onMove = (event: PointerEvent | MouseEvent) => {
      state.clientX = event.clientX;
      state.clientY = event.clientY;
      enter();
      retarget(event.clientX, event.clientY, event.target);
      wake();
    };

    const onDown = (event: PointerEvent | MouseEvent) => {
      onMove(event);
      if (!settingsRef.current.clickPulse || reduce) return;
      relative();
      state.pulses.push({ x: state.tx, y: state.ty, age: 0 });
      wake();
    };

    const onUp = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') leave();
    };

    const onScroll = () => {
      if (!state.inside) return;
      retarget(
        state.clientX,
        state.clientY,
        document.elementFromPoint(state.clientX, state.clientY)
      );
      wake();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    scope.addEventListener('pointermove', onMove as EventListener);
    scope.addEventListener('mousemove', onMove as EventListener);
    scope.addEventListener('pointerdown', onDown as EventListener);
    window.addEventListener('pointerup', onUp as EventListener);
    window.addEventListener('pointercancel', onUp as EventListener);
    window.addEventListener('scroll', onScroll, { capture: true, passive: true });
    
    // Clean window leave detection that does not falsely trigger on element boundaries
    if (host) {
      host.addEventListener('pointerleave', leave);
    } else {
      document.documentElement.addEventListener('mouseleave', leave);
      window.addEventListener('blur', leave);
    }
    resize();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      scope.removeEventListener('pointermove', onMove as EventListener);
      scope.removeEventListener('mousemove', onMove as EventListener);
      scope.removeEventListener('pointerdown', onDown as EventListener);
      window.removeEventListener('pointerup', onUp as EventListener);
      window.removeEventListener('pointercancel', onUp as EventListener);
      window.removeEventListener('scroll', onScroll, { capture: true });
      if (host) {
        host.removeEventListener('pointerleave', leave);
      } else {
        document.documentElement.removeEventListener('mouseleave', leave);
        window.removeEventListener('blur', leave);
      }
      setCursorHidden(false);
      wakeRef.current = null;
    };
  }, [containerRef]);

  return (
    <>
      <style>{`.${HIDDEN}, .${HIDDEN} * { cursor: none !important; }`}</style>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={className}
        style={{
          position: containerRef ? 'absolute' : 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: blendMode,
          ...style,
        }}
      />
    </>
  );
};

export default Crosshair;
