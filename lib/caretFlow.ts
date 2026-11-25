/**
 * The page heroes' canvas: a field of small carets (">" marks, as in the home
 * hero's mark) laid on a grid and turned by a slowly drifting current, so the
 * field reads as moving water. A brighter wave sweeps across it, making the
 * carets it passes grow and darken. Carets near the pointer turn away from it
 * and are pushed aside.
 *
 * The canvas fills its parent. It draws only while on screen and the tab is
 * visible. With "prefers-reduced-motion" it draws one still frame.
 */

// Colours from the brand palette, weighted so blue leads (as on the home hero).
const PALETTE: { color: string; weight: number }[] = [
  { color: "#1462FF", weight: 55 },
  { color: "#09182F", weight: 20 },
  { color: "#6E9BFF", weight: 15 },
  { color: "#EFD54D", weight: 10 },
];
const PALETTE_TOTAL = PALETTE.reduce((sum, p) => sum + p.weight, 0);

// Grid spacing and caret half-width, in CSS px.
const GAP = 15;
const GAP_NARROW = 13;
const SIZE = 3.1;
// Pointer: carets within RADIUS px turn away and move up to PUSH px.
const RADIUS = 150;
const PUSH = 16;
const EASE = 0.2;
// Alpha levels: carets are grouped by level so each colour is one stroke per level.
const LEVELS = 6;

type Caret = { x: number; y: number; color: number; seed: number; offX: number; offY: number; turn: number };

export type CaretFlow = { destroy: () => void };

/** 0..1 from a number, stable. */
function hash(n: number) {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
}

export function createCaretFlow(canvas: HTMLCanvasElement, seed = 1): CaretFlow {
  const ctx = canvas.getContext("2d");
  if (!ctx) return { destroy() {} };
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let width = 0;
  let height = 0;
  let carets: Caret[] = [];
  let frame = 0;
  let visible = false;
  let alive = true;
  const pointer = { x: -9999, y: -9999 };
  const started = performance.now();

  function layout() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    if (!width || !height) return;
    const ratio = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx!.setTransform(ratio, 0, 0, ratio, 0, 0);
    const gap = width < 700 ? GAP_NARROW : GAP;
    carets = [];
    let i = 0;
    for (let y = gap / 2; y < height; y += gap) {
      for (let x = gap / 2; x < width; x += gap) {
        i++;
        let pick = hash(i * 3.7 + seed) * PALETTE_TOTAL;
        let color = 0;
        while (pick > PALETTE[color].weight) pick -= PALETTE[color++].weight;
        carets.push({ x, y, color, seed: hash(i * 9.1 + seed * 2), offX: 0, offY: 0, turn: 0 });
      }
    }
  }

  function draw(now: number) {
    frame = 0;
    if (!alive || !width) return;
    const t = reduceMotion ? 0 : now - started;
    ctx!.clearRect(0, 0, width, height);
    ctx!.lineWidth = 1.3;
    ctx!.lineCap = "round";
    ctx!.lineJoin = "round";
    // Fade in over the first second.
    const intro = reduceMotion ? 1 : Math.min(1, t / 1000);

    // Positions and angles for this frame, bucketed by colour and alpha level.
    const buckets: number[][][] = PALETTE.map(() => Array.from({ length: LEVELS }, () => []));
    const sweep = (t * 0.00042) % 1.7 - 0.35; // wave position, 0..1 across the width (with run-in)
    for (let k = 0; k < carets.length; k++) {
      const c = carets[k];
      const u = c.x / width;
      const v = c.y / height;
      // The current: a few slow sine layers, giving a direction that drifts.
      const angle =
        Math.sin(u * 3.1 + t * 0.00031 + seed) * 1.1 +
        Math.cos(v * 4.3 - t * 0.00023) * 0.9 +
        Math.sin((u + v) * 6.2 + t * 0.00017 + c.seed * 0.6) * 0.35;
      // The wave: a soft diagonal band moving left to right.
      const band = Math.exp(-(((u + v * 0.35 - sweep) / 0.16) ** 2));
      // Pointer push.
      const dx = c.x - pointer.x;
      const dy = c.y - pointer.y;
      const dist = Math.hypot(dx, dy);
      const near = dist < RADIUS ? 1 - dist / RADIUS : 0;
      const tx = near ? (dx / (dist || 1)) * PUSH * near : 0;
      const ty = near ? (dy / (dist || 1)) * PUSH * near : 0;
      c.offX += (tx - c.offX) * EASE;
      c.offY += (ty - c.offY) * EASE;
      c.turn += ((near ? 1 : 0) * near - c.turn) * EASE;
      const away = Math.atan2(dy, dx);
      // Blend toward "pointing away" by how near the pointer is.
      const a = angle + shortest(angle, away) * c.turn;
      const scale = 0.8 + band * 0.7 + near * 0.4;
      const alpha = Math.min(1, (0.34 + band * 0.66 + near * 0.5 + c.seed * 0.12) * intro);
      const level = Math.min(LEVELS - 1, Math.floor(alpha * LEVELS));
      buckets[c.color][level].push(c.x + c.offX, c.y + c.offY, a, scale);
    }

    PALETTE.forEach((p, k) => {
      ctx!.strokeStyle = p.color;
      for (let l = 0; l < LEVELS; l++) {
        const list = buckets[k][l];
        if (!list.length) continue;
        ctx!.globalAlpha = (l + 1) / LEVELS;
        ctx!.beginPath();
        for (let j = 0; j < list.length; j += 4) {
          const x = list[j];
          const y = list[j + 1];
          const size = SIZE * list[j + 3];
          const co = Math.cos(list[j + 2]) * size;
          const si = Math.sin(list[j + 2]) * size;
          ctx!.moveTo(x - 0.6 * co - si, y - 0.6 * si + co);
          ctx!.lineTo(x + 0.6 * co, y + 0.6 * si);
          ctx!.lineTo(x - 0.6 * co + si, y - 0.6 * si - co);
        }
        ctx!.stroke();
      }
    });
    ctx!.globalAlpha = 1;
    if (!reduceMotion) request();
  }

  function request() {
    if (!frame && alive && visible && !document.hidden) frame = requestAnimationFrame(draw);
  }

  const resize = new ResizeObserver(() => {
    layout();
    if (reduceMotion) draw(performance.now());
    else request();
  });
  resize.observe(canvas);
  const seen = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    request();
  });
  seen.observe(canvas);

  const host = canvas.parentElement ?? canvas;
  const onMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    pointer.x = e.clientX - r.left;
    pointer.y = e.clientY - r.top;
    if (reduceMotion) draw(performance.now());
  };
  const onLeave = () => {
    pointer.x = pointer.y = -9999;
  };
  const onVisibility = () => request();
  host.addEventListener("pointermove", onMove);
  host.addEventListener("pointerleave", onLeave);
  document.addEventListener("visibilitychange", onVisibility);

  return {
    destroy() {
      alive = false;
      cancelAnimationFrame(frame);
      resize.disconnect();
      seen.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    },
  };
}

/** The signed smallest turn from angle a to angle b. */
function shortest(a: number, b: number) {
  let d = (b - a) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
}
