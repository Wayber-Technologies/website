/**
 * Draws the Wayber mark as a field of small round dots, as the hero background.
 *
 * - The mark is three identical slabs, each one step down and to the right of
 *   the one before (a little closer together than in the logo), all in Wayber
 *   Blue. A slab in front hides the dots of the slab behind it.
 * - On load, the dots fly in and form the mark.
 * - Dots move away from the pointer. The pointer is tracked on the canvas's
 *   parent element, so text and buttons on top don't block it.
 * - Nothing is drawn while the mark holds still.
 *
 * Users with "prefers-reduced-motion" see the mark with no fly-in.
 */

// The front slab of the icon (public/logoBlackFull.svg), in the icon's own
// units. It is a convex hexagon. The other two slabs are the same shape moved
// by SLAB_STEP once and twice.
const SLAB: [number, number][] = [
  [0.08, 203.19],
  [359.75, 0.15],
  [404.82, 25.36],
  [404.82, 316.9],
  [45.6, 519.68],
  [0.08, 494.02],
];
const SLAB_STEP = { x: 269.52, y: 86.85 };
// How far apart the slabs sit, as a share of the logo's spacing (1 = as in the logo).
const SPACING = 0.8;
// The mark's size with that spacing: one slab plus two steps.
const MARK_BOX = { w: 404.82 + 2 * SLAB_STEP.x * SPACING, h: 519.68 + 2 * SLAB_STEP.y * SPACING };

// All three slabs are Wayber Blue.
const COLOR = "#1462FF";

// From this width up, the hero is two columns and the shape sits in the right one.
const SPLIT_MIN_WIDTH = 900;
// Matches .container in site.module.css.
const CONTAINER_MAX = 1320;
// How much of its available area the mark fills (1 = as large as fits).
const MARK_SCALE = 0.85;

const REPEL_RADIUS = 140;
const INTRO_MS = 1100;

type Area = { x: number; y: number; w: number; h: number };
type Point = { x: number; y: number };

type Dot = {
  /** Which slab (0..2) the dot belongs to. */
  slab: number;
  /** Resting position. */
  x: number;
  y: number;
  startX: number;
  startY: number;
  introDelay: number;
  offX: number;
  offY: number;
  /** This frame's position, worked out once and then drawn in batches. */
  drawX: number;
  drawY: number;
};

export type CubeField = { destroy: () => void };

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (t: number) => Math.max(0, Math.min(1, t));

/** True if (x, y) is inside the convex polygon `poly` (vertices in order). */
function insideConvex(poly: Point[], x: number, y: number) {
  let sign = 0;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const cross = (b.x - a.x) * (y - a.y) - (b.y - a.y) * (x - a.x);
    if (cross !== 0) {
      const s = cross > 0 ? 1 : -1;
      if (sign && s !== sign) return false;
      sign = s;
    }
  }
  return true;
}

export function createCubeField(canvas: HTMLCanvasElement): CubeField {
  const ctx = canvas.getContext("2d");
  if (!ctx) return { destroy() {} };

  const host = canvas.parentElement ?? canvas;
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

  let width = 0;
  let height = 0;
  let dotSize = 2.4;
  let dots: Dot[] = [];
  let pointer = { x: -9999, y: -9999 };
  let frame = 0;
  let alive = true;
  let startedAt = 0;
  let introDone = false;

  /** Lays out the dots for the canvas's current size. `intro`: fly the dots in. */
  function build(intro: boolean): boolean {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    if (!width || !height) return false;

    // Draw at least 2x (and up to 3x) the CSS size, so the small round dots stay
    // smooth on standard screens too, not only on retina ones. The bitmap is
    // sized from the exact ratio so the browser never stretches it.
    const ratio = Math.min(3, Math.max(2, window.devicePixelRatio || 1));
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx!.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
    ctx!.imageSmoothingEnabled = true;
    const fly = intro && !reduceMotion;

    // Two-column hero: the right half of the page container. Narrow screens: the whole canvas.
    const split = width >= SPLIT_MIN_WIDTH;
    const containerW = Math.min(width, CONTAINER_MAX);
    const containerX = (width - containerW) / 2;
    // Desktop: from just left of the container's midpoint to the screen's right
    // edge (past the container margin), so the mark can be as large as possible
    // without crowding the copy.
    const areaX = split ? containerX + containerW * 0.47 : 0;
    const areaW = split ? width - areaX - 16 : width;
    const narrow = width < 700;
    // Dots need a few screen pixels across to read as round, not as squares.
    const gap = narrow ? 6.5 : 8;
    dotSize = narrow ? 2.4 : 2.8;
    const full: Area = {
      x: areaX + areaW * 0.01,
      y: height * (split ? 0.08 : 0.04),
      w: areaW * 0.98,
      h: height * (split ? 0.84 : 0.92),
    };
    // Shrink the drawing area around its centre so the mark sits a little smaller.
    const area: Area = {
      x: full.x + (full.w * (1 - MARK_SCALE)) / 2,
      y: full.y + (full.h * (1 - MARK_SCALE)) / 2,
      w: full.w * MARK_SCALE,
      h: full.h * MARK_SCALE,
    };

    // The mark, fitted into the area.
    const scale = Math.min(area.w / MARK_BOX.w, area.h / MARK_BOX.h);
    const left = area.x + (area.w - MARK_BOX.w * scale) / 2;
    const top = area.y + (area.h - MARK_BOX.h * scale) / 2;
    const slabPoly = SLAB.map(([x, y]) => ({ x: left + x * scale, y: top + y * scale }));
    // Steps are rounded to whole grid cells, so all three slabs share one dot
    // grid and line up where they meet.
    const step = {
      x: Math.round((SLAB_STEP.x * SPACING * scale) / gap) * gap,
      y: Math.round((SLAB_STEP.y * SPACING * scale) / gap) * gap,
    };

    // Dots on a grid filling the front slab. The other two slabs use the same
    // pattern, moved one and two steps; dots covered by a slab in front are dropped.
    const xs = slabPoly.map((p) => p.x);
    const ys = slabPoly.map((p) => p.y);
    const pattern: Point[] = [];
    for (let y = Math.min(...ys) + gap / 2; y < Math.max(...ys); y += gap) {
      for (let x = Math.min(...xs) + gap / 2; x < Math.max(...xs); x += gap) {
        if (insideConvex(slabPoly, x, y)) pattern.push({ x, y });
      }
    }
    if (!pattern.length) return false;

    dots = [];
    for (let slab = 0; slab < 3; slab++) {
      for (const p of pattern) {
        const x = p.x + slab * step.x;
        const y = p.y + slab * step.y;
        let covered = false;
        for (let front = 0; front < slab && !covered; front++) {
          covered = insideConvex(slabPoly, x - front * step.x, y - front * step.y);
        }
        if (covered) continue;
        dots.push({
          slab,
          x,
          y,
          startX: fly ? x + (Math.random() - 0.5) * width * 0.9 : x,
          startY: fly ? y + (Math.random() - 0.5) * height * 1.4 : y,
          introDelay: fly ? Math.random() * 400 : 0,
          offX: 0,
          offY: 0,
          drawX: x,
          drawY: y,
        });
      }
    }

    startedAt = performance.now();
    return true;
  }

  function draw() {
    frame = 0;
    if (!alive) return;
    const now = performance.now();
    let busy = false;
    ctx!.clearRect(0, 0, width, height);

    // Drawing uses the context's own path (beginPath/arc/fill), never new Path2D
    // objects per frame: their memory lives outside the JS heap, so garbage
    // collection doesn't keep up and the tab can run out of memory.
    // The background grid lines are CSS on the hero (site.module.css), not drawn here.
    const radius = dotSize / 2;

    for (const d of dots) {
      const intro = clamp01((now - startedAt - d.introDelay) / INTRO_MS);
      if (intro < 1) busy = true;
      const ei = easeOutCubic(intro);
      const x = d.startX + (d.x - d.startX) * ei;
      const y = d.startY + (d.y - d.startY) * ei;

      let pushX = 0, pushY = 0;
      const dx = x - pointer.x, dy = y - pointer.y;
      const dist = Math.hypot(dx, dy);
      if (dist < REPEL_RADIUS && dist > 0.01) {
        const push = (1 - dist / REPEL_RADIUS) * 24;
        pushX = (dx / dist) * push;
        pushY = (dy / dist) * push;
      }
      d.offX += (pushX - d.offX) * 0.15;
      d.offY += (pushY - d.offY) * 0.15;
      if (Math.abs(pushX - d.offX) > 0.2 || Math.abs(pushY - d.offY) > 0.2) busy = true;

      d.drawX = x + d.offX;
      d.drawY = y + d.offY;
    }

    ctx!.fillStyle = COLOR;
    ctx!.beginPath();
    for (const d of dots) {
      ctx!.moveTo(d.drawX + radius, d.drawY);
      ctx!.arc(d.drawX, d.drawY, radius, 0, Math.PI * 2);
    }
    ctx!.fill();

    if (busy) requestDraw();
  }

  function requestDraw() {
    if (!frame && alive && dots.length) frame = requestAnimationFrame(draw);
  }

  function start() {
    if (!alive) return;
    if (build(!introDone)) {
      introDone = true;
      requestDraw();
    } else requestAnimationFrame(start);
  }

  const onMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    requestDraw();
  };
  const onLeave = () => {
    pointer = { x: -9999, y: -9999 };
    requestDraw();
  };
  host.addEventListener("pointermove", onMove);
  host.addEventListener("pointerleave", onLeave);

  // Re-lay out (without the fly-in) whenever the canvas changes size, so the
  // bitmap is never stretched. Waits for resizing to settle first.
  let resizeTimer: ReturnType<typeof setTimeout> | null = null;
  const relayout = () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resizeTimer = null;
      if (introDone) start();
    }, 120);
  };
  let lastSize = "";
  const resizeObserver =
    typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(([entry]) => {
          const size = `${Math.round(entry.contentRect.width)}x${Math.round(entry.contentRect.height)}`;
          if (lastSize && size !== lastSize) relayout();
          lastSize = size;
        })
      : null;
  resizeObserver?.observe(canvas);

  // Browser zoom or moving to another screen changes the pixel ratio.
  let ratioQuery: MediaQueryList | null = null;
  const watchRatio = () => {
    ratioQuery?.removeEventListener("change", onRatioChange);
    ratioQuery = window.matchMedia?.(`(resolution: ${window.devicePixelRatio || 1}dppx)`) ?? null;
    ratioQuery?.addEventListener("change", onRatioChange);
  };
  function onRatioChange() {
    relayout();
    watchRatio();
  }
  watchRatio();

  start();

  return {
    destroy() {
      alive = false;
      if (frame) cancelAnimationFrame(frame);
      if (resizeTimer) clearTimeout(resizeTimer);
      ratioQuery?.removeEventListener("change", onRatioChange);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      resizeObserver?.disconnect();
    },
  };
}
