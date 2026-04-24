    (function () {
      const LERP = 0.38;

      function makeFollower(el, getOffset) {
        let mouseX = 0, mouseY = 0;
        let cx = 0, cy = 0;
        let active = false;
        let raf = null;

        function tick() {
          cx += (mouseX - cx) * LERP;
          cy += (mouseY - cy) * LERP;

          const { x, y } = getOffset(cx, cy, el);
          el.style.transform = `translate(${x}px, ${y}px)`;

          const still = Math.abs(mouseX - cx) < 0.15 && Math.abs(mouseY - cy) < 0.15;
          if (active || !still) {
            raf = requestAnimationFrame(tick);
          } else {
            raf = null;
          }
        }

        return function attach(cardId) {
          const card = document.getElementById(cardId);
          if (!card) return;

          card.addEventListener('mouseenter', (e) => {
            mouseX = e.clientX; mouseY = e.clientY;
            cx = e.clientX; cy = e.clientY;
            active = true;
            el.classList.add('is-visible');
            if (!raf) raf = requestAnimationFrame(tick);
          });

          card.addEventListener('mouseleave', () => {
            active = false;
            el.classList.remove('is-visible');
          });

          card.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!raf) raf = requestAnimationFrame(tick);
          });
        };
      }

      // "See credential" tooltip — fixed offset above-right of cursor
      const attachTooltip = makeFollower(
        document.getElementById('cert-cursor-tooltip'),
        (cx, cy) => ({ x: cx + 14, y: cy - 28 })
      );
      attachTooltip('az900-card');
      attachTooltip('data-analytics-card');

      // Dale Carnegie image popup — smart flip to avoid viewport overflow
      const attachImgPopup = makeFollower(
        document.getElementById('dale-preview-popup'),
        (cx, cy, el) => {
          const w = el.offsetWidth || 396;
          const h = el.offsetHeight || 260;
          const gap = 36;
          const x = (cx + gap + w > window.innerWidth) ? cx - w - gap : cx + gap;
          const y = cy - h / 2;
          return { x, y };
        }
      );
      attachImgPopup('dale-carnegie-card');
    })();
