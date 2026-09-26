const cursorGlow = document.querySelector(".cursor-glow");
const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (cursorGlow && hasFinePointer && !prefersReducedMotion) {
  let pointerX = 0;
  let pointerY = 0;
  let pendingFrame = 0;

  window.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;

    pointerX = event.clientX;
    pointerY = event.clientY;

    if (pendingFrame) return;
    pendingFrame = window.requestAnimationFrame(() => {
      cursorGlow.style.setProperty("--cursor-x", `${pointerX}px`);
      cursorGlow.style.setProperty("--cursor-y", `${pointerY}px`);
      cursorGlow.classList.add("is-visible");
      pendingFrame = 0;
    });
  }, { passive: true });

  window.addEventListener("pointerleave", () => {
    cursorGlow.classList.remove("is-visible");
  });
}