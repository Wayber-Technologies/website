/**
 * The buttons' hover fill, made of Wayber carets. On hover (or keyboard
 * focus) carets in the hover colour rush in from the left and pack together:
 * each one grows and thickens as the front passes until they close up into a
 * solid fill. On leave the fill breaks back into carets and they pull out to
 * the left. While the button is busy (aria-busy="true", e.g. the contact form
 * sending), a light stream of carets flows across the fill as progress.
 *
 * Colours: the fill is the button's --pill-hover-bg; the busy stream is the
 * first colour in --pill-dots. The canvas draws only while something moves.
 * It sets data-filled on the button while the fill is on, for the label
 * colour. With "prefers-reduced-motion" it does nothing and CSS swaps the
 * colours instead.
 */

const GAP = 7;
const SIZE = 2;
// The packing band: carets within BAND px ahead of the solid edge.
const BAND = 44;
const IN_MS = 560;
const OUT_MS = 380;
const BUSY_SPEED = 60; // px per second

const clamp01 = (t: number) => Math.max(0, Math.min(1, t));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
function hash(n: number) {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
}

type Dot = { x: number; y: number; lag: number };

export function attachPillDots(canvas: HTMLCanvasElement) {
  const pill = canvas.parentElement?.closest("a, button") as HTMLElement | null;
  const ctx = canvas.getContext("2d");
  if (!pill || !ctx) return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  let w = 0;
  let h = 0;
  let dots: Dot[] = [];
  let fill = "#09182f";
  let stream = "#bffdff";
  let sized = "";

  let hovered = false;
  let focused = false;
  let busy = false;
  /** 0..1: how far the fill has come in. */
  let progress = 0;
  let shift = 0;
  let last = 0;
  let frame = 0;

  const active = () => hovered || focused || busy;

  function layout() {
    const style = getComputedStyle(pill!);
    fill = style.getPropertyValue("--pill-hover-bg").trim() || fill;
    stream = style.getPropertyValue("--pill-dots").split(",")[0].trim() || stream;
    const r = pill!.getBoundingClientRect();
    const key = `${Math.round(r.width)}x${Math.round(r.height)}`;
    if (key === sized) return;
    sized = key;
    w = r.width;
    h = r.height;
    const ratio = Math.min(3, Math.max(2, window.devicePixelRatio || 1));
    canvas.width = Math.round(w * ratio);
    canvas.height = Math.round(h * ratio);
    ctx!.setTransform(ratio, 0, 0, ratio, 0, 0);
    // Keep every caret inside the capsule.
    ctx!.beginPath();
    ctx!.roundRect(0, 0, w, h, h / 2);
    ctx!.clip();
    dots = [];
    let i = 0;
    for (let y = GAP / 2; y < h; y += GAP) {
      // Odd rows half a step over; each caret a little early or late.
      const ox = (Math.round(y / GAP) % 2) * (GAP / 2);
      for (let x = GAP / 2; x < w + GAP; x += GAP) dots.push({ x: x + ox, y, lag: hash(++i) * 14 });
    }
  }

  function caret(x: number, y: number, size: number) {
    ctx!.moveTo(x - size * 0.6, y - size);
    ctx!.lineTo(x + size * 0.6, y);
    ctx!.lineTo(x - size * 0.6, y + size);
  }

  function draw(now: number) {
    frame = 0;
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
    last = now;
    const on = active();
    progress = on ? Math.min(1, progress + (dt * 1000) / IN_MS) : Math.max(0, progress - (dt * 1000) / OUT_MS);

    ctx!.clearRect(0, 0, w, h);
    const p = easeInOut(progress);
    // The solid edge, and the front of the carets BAND px ahead of it.
    const solid = p * (w + BAND * 2) - BAND;
    const front = solid + BAND;

    if (solid > 0) {
      ctx!.fillStyle = fill;
      ctx!.fillRect(0, 0, Math.min(w, solid), h);
    }
    if (progress > 0 && progress < 1) {
      ctx!.strokeStyle = fill;
      ctx!.lineCap = "round";
      ctx!.lineJoin = "round";
      // Grouped by thickness: four strokes a frame, not one per caret.
      for (let step = 0; step < 4; step++) {
        ctx!.lineWidth = 1.2 + step * 1.1;
        ctx!.beginPath();
        for (const d of dots) {
          if (d.x <= solid || d.x > front + d.lag) continue;
          // 0 at the front, 1 at the solid edge.
          const k = clamp01((front + d.lag - d.x) / (BAND + d.lag));
          if (Math.min(3, Math.floor(k * 4)) !== step) continue;
          // Carets rush in from the left as they pack.
          caret(d.x - (1 - k) * 12, d.y, SIZE * (1 + k * 1.6));
        }
        ctx!.stroke();
      }
    }
    if (busy && progress >= 1) {
      shift += BUSY_SPEED * dt;
      const span = w + GAP * 4;
      ctx!.strokeStyle = stream;
      ctx!.lineWidth = 1.2;
      ctx!.globalAlpha = 0.6;
      ctx!.beginPath();
      // Three staggered rows flowing right.
      for (let row = -1; row <= 1; row++) {
        for (let x = 0; x < span; x += GAP * 2.5) {
          caret(((x + shift + row * GAP) % span) - GAP * 2, h / 2 + row * GAP * 1.6, SIZE);
        }
      }
      ctx!.stroke();
      ctx!.globalAlpha = 1;
    }

    const moving = (on && progress < 1) || (!on && progress > 0) || (busy && progress >= 1);
    if (moving) frame = requestAnimationFrame(draw);
    else last = 0;
  }

  /** data-filled drives the label colour in CSS. */
  function sync() {
    if (active()) pill!.dataset.filled = "true";
    else delete pill!.dataset.filled;
  }
  function wake() {
    sync();
    layout();
    if (!frame) frame = requestAnimationFrame(draw);
  }

  const onEnter = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    hovered = true;
    wake();
  };
  const onLeave = () => {
    hovered = false;
    wake();
  };
  const onFocus = () => {
    focused = pill.matches(":focus-visible");
    if (focused) wake();
  };
  const onBlur = () => {
    focused = false;
    wake();
  };
  const busyWatch = new MutationObserver(() => {
    busy = pill.getAttribute("aria-busy") === "true";
    wake();
  });
  busyWatch.observe(pill, { attributes: true, attributeFilter: ["aria-busy"] });

  pill.addEventListener("pointerenter", onEnter);
  pill.addEventListener("pointerleave", onLeave);
  pill.addEventListener("focus", onFocus);
  pill.addEventListener("blur", onBlur);
  return () => {
    cancelAnimationFrame(frame);
    busyWatch.disconnect();
    pill.removeEventListener("pointerenter", onEnter);
    pill.removeEventListener("pointerleave", onLeave);
    pill.removeEventListener("focus", onFocus);
    pill.removeEventListener("blur", onBlur);
  };
}
