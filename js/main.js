    /* ==================== UTILITIES ==================== */
    const $ = (s, p = document) => p.querySelector(s);
    const $$ = (s, p = document) => [...p.querySelectorAll(s)];
    const lerp = (a, b, t) => a + (b - a) * t;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    /* ==================== REVEAL OBSERVER ==================== */
    (function initReveals() {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const siblings = [...el.parentElement.querySelectorAll('.reveal, .reveal-title')];
          const idx = Math.max(0, siblings.indexOf(el));
          el.style.transitionDelay = (idx * 80) + 'ms';
          el.classList.add('in');
          obs.unobserve(el);
        });
      }, { threshold: 0.15 });
      $$('.reveal, .reveal-title').forEach(el => obs.observe(el));
    })();

    /* ==================== STAT COUNTERS (ease-out-expo via t^5) ==================== */
    (function initCounters() {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          if (el.dataset._counted) return;
          el.dataset._counted = '1';
          const target = parseFloat(el.dataset.count);
          const useComma = el.dataset.comma === 'true';
          const dur = 1200;
          const start = performance.now();
          function tick(now) {
            const t = clamp((now - start) / dur, 0, 1);
            const eased = 1 - Math.pow(1 - t, 5);
            const val = target * eased;
            el.textContent = useComma
              ? Math.floor(val).toLocaleString('en-US')
              : Math.floor(val).toString();
            if (t < 1) requestAnimationFrame(tick);
            else {
              el.textContent = useComma ? target.toLocaleString('en-US') : target.toString();
              el.animate(
                [{ transform: 'scale(1)' }, { transform: 'scale(1.04)' }, { transform: 'scale(1)' }],
                { duration: 200, delay: 200, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }
              );
            }
          }
          requestAnimationFrame(tick);
          obs.unobserve(el);
        });
      }, { threshold: 0.4 });
      $$('[data-count]').forEach(el => obs.observe(el));
    })();

    /* ==================== SKILL BARS ==================== */
    (function initSkills() {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          if (el.dataset._filled) return;
          el.dataset._filled = '1';

          const group = el.closest('.skill-group');
          const siblings = group ? [...group.querySelectorAll('.skill')] : [el];
          const idx = siblings.indexOf(el);
          const delay = idx * 100;

          const target = parseFloat(el.dataset.skill);
          const fill = el.querySelector('.skill__fill');
          const valEl = el.querySelector('.skill__val');

          setTimeout(() => {
            fill.style.transform = 'scaleX(' + (target / 100) + ')';
            const dur = 800;
            const start = performance.now();
            function tick(now) {
              const t = clamp((now - start) / dur, 0, 1);
              const eased = 1 - Math.pow(1 - t, 3);
              valEl.textContent = Math.round(target * eased) + '%';
              if (t < 1) requestAnimationFrame(tick);
              else valEl.textContent = target + '%';
            }
            requestAnimationFrame(tick);
          }, delay);
          obs.unobserve(el);
        });
      }, { threshold: 0.3 });
      $$('.skill').forEach(el => obs.observe(el));
    })();

    /* ==================== MAGNETIC BUTTONS ==================== */
    (function initMagnetic() {
      const targets = $$('[data-magnetic]');
      const RADIUS = 100;
      const STRENGTH = 0.25;
      const states = targets.map(el => ({ el, x: 0, y: 0, tx: 0, ty: 0 }));

      window.addEventListener('mousemove', (e) => {
        states.forEach(s => {
          const rect = s.el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < RADIUS) { s.tx = dx * STRENGTH; s.ty = dy * STRENGTH; }
          else { s.tx = 0; s.ty = 0; }
        });
      }, { passive: true });
      window.addEventListener('mouseleave', () => states.forEach(s => { s.tx = 0; s.ty = 0; }));

      function loop() {
        states.forEach(s => {
          s.x = lerp(s.x, s.tx, 0.15);
          s.y = lerp(s.y, s.ty, 0.15);
          s.el.style.transform = `translate(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px)`;
        });
        requestAnimationFrame(loop);
      }
      loop();
    })();

    /* ==================== MOBILE DRAWER ==================== */
    (function initMobileDrawer() {
      const burger = document.getElementById('nav-burger');
      const drawer = document.getElementById('mobile-drawer');
      if (!burger || !drawer) return;

      const links = drawer.querySelectorAll('.mobile-drawer__link, .mobile-drawer__cta');

      function open() {
        drawer.classList.add('is-open');
        drawer.setAttribute('aria-hidden', 'false');
        burger.setAttribute('aria-expanded', 'true');
        burger.setAttribute('aria-label', 'Close menu');
        document.body.classList.add('no-scroll');
      }

      function close() {
        drawer.classList.remove('is-open');
        drawer.setAttribute('aria-hidden', 'true');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Open menu');
        document.body.classList.remove('no-scroll');
      }

      burger.addEventListener('click', () => {
        if (drawer.classList.contains('is-open')) close();
        else open();
      });

      drawer.addEventListener('click', (e) => {
        if (e.target === drawer) close();
      });

      links.forEach(a => a.addEventListener('click', close));

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('is-open')) close();
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && drawer.classList.contains('is-open')) close();
      });
    })();

    /* ==================== NAV INDICATOR + ACTIVE SECTION ==================== */
    (function initNav() {
      const links = $$('#nav-links a[data-section]');
      const ind = $('#nav-indicator');
      const sections = links.map(a => $('#' + a.dataset.section)).filter(Boolean);
      let clickLock = null;

      function moveIndicator(link) {
        if (!link) { ind.style.transform = 'translate3d(0,0,0) scaleX(0)'; return; }
        const parentRect = link.parentElement.getBoundingClientRect();
        const r = link.getBoundingClientRect();
        const x = r.left - parentRect.left;
        ind.style.transform = `translate3d(${x}px, 0, 0) scaleX(${r.width})`;
      }

      function setActive(sectionId) {
        let activeLink = null;
        links.forEach(a => {
          const isActive = a.dataset.section === sectionId;
          a.classList.toggle('active', isActive);
          if (isActive) activeLink = a;
        });
        moveIndicator(activeLink);
      }

      function getActiveSectionFromScroll() {
        // At bottom of page → always activate last section
        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
          return sections[sections.length - 1];
        }

        // Find the last section whose top has passed 35% of the viewport
        const trigger = window.scrollY + window.innerHeight * 0.35;
        let active = null;
        for (const section of sections) {
          const top = section.getBoundingClientRect().top + window.scrollY;
          if (top <= trigger) active = section;
        }
        return active;
      }

      function update() {
        if (clickLock) return;
        const active = getActiveSectionFromScroll();
        if (active) {
          setActive(active.id);
        } else {
          links.forEach(a => a.classList.remove('active'));
          ind.style.transform = 'translate3d(0,0,0) scaleX(0)';
        }
      }

      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', () => {
        const active = links.find(a => a.classList.contains('active'));
        moveIndicator(active || null);
      });

      links.forEach(a => a.addEventListener('click', () => {
        setActive(a.dataset.section);
        // Hold the click-activated state briefly so scroll doesn't override immediately
        clearTimeout(clickLock);
        clickLock = setTimeout(() => { clickLock = null; update(); }, 800);
      }));

      update();
    })();

    /* ==================== PROJECT IMAGE PARALLAX ==================== */
    (function initParallax() {
      const items = $$('[data-parallax]');
      let rafId = null;
      function update() {
        const vh = window.innerHeight;
        items.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > vh) return;
          const center = rect.top + rect.height / 2;
          const delta = center - vh / 2;
          const y = -delta * 0.08;
          const svg = el.querySelector('svg');
          if (svg) svg.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(1.12)`;
        });
        rafId = requestAnimationFrame(update);
      }
      rafId = requestAnimationFrame(update);
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) cancelAnimationFrame(rafId);
        else rafId = requestAnimationFrame(update);
      });
    })();

    /* ==================== GLOBE ==================== */
    function initGlobe(canvasId) {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let W, H, CX, CY, RADIUS;
      const DPR = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));

      function resize() {
        const rect = canvas.getBoundingClientRect();
        W = rect.width; H = rect.height;
        canvas.width = Math.floor(W * DPR);
        canvas.height = Math.floor(H * DPR);
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        CX = W / 2; CY = H / 2;
        RADIUS = Math.min(W, H) * 0.38;
      }
      resize();
      if (typeof ResizeObserver !== 'undefined') new ResizeObserver(resize).observe(canvas);
      else window.addEventListener('resize', resize);

      // Rotation
      let rotY = 0;
      let rotX = -0.35;
      let velY = 0.003;
      let velX = 0;
      let autoVelY = 0.003;
      let targetAutoVelY = 0.003;

      // Drag
      let dragging = false;
      let lastX = 0, lastY = 0;
      let dragDX = 0, dragDY = 0;

      const hero = document.getElementById('hero');
      if (hero) {
        hero.addEventListener('mouseenter', () => { targetAutoVelY = 0.006; });
        hero.addEventListener('mouseleave', () => { targetAutoVelY = 0.003; });
      }

      /* ===== NEURAL MESH ===== */
      const NODE_COUNT = 26;
      const K_NEIGHBORS = 3;

      // Fibonacci-sphere node distribution → clean, even spacing
      function fibonacciSphere(n) {
        const pts = [];
        const phi = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < n; i++) {
          const y = 1 - (i / (n - 1)) * 2;
          const r = Math.sqrt(Math.max(0, 1 - y * y));
          const theta = phi * i;
          pts.push({
            x: Math.cos(theta) * r,
            y: y,
            z: Math.sin(theta) * r,
            activation: 0,
            isInput: false,
            isOutput: false
          });
        }
        return pts;
      }
      const nodes = fibonacciSphere(NODE_COUNT);

      // Designate input / output nodes (data enters here, predictions leave from there)
      const INPUT_IDX = [3, 11, 19];
      const OUTPUT_IDX = [6, 15, 22];
      INPUT_IDX.forEach(i => { if (nodes[i]) nodes[i].isInput = true; });
      OUTPUT_IDX.forEach(i => { if (nodes[i]) nodes[i].isOutput = true; });

      // Build edges (k-nearest neighbors by angular distance)
      const edges = [];
      const edgeSet = new Set();
      const adjacency = nodes.map(() => []);
      for (let i = 0; i < nodes.length; i++) {
        const dists = [];
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const d = Math.acos(clamp(nodes[i].x * nodes[j].x + nodes[i].y * nodes[j].y + nodes[i].z * nodes[j].z, -1, 1));
          dists.push({ j, d });
        }
        dists.sort((a, b) => a.d - b.d);
        for (let m = 0; m < K_NEIGHBORS; m++) {
          const a = Math.min(i, dists[m].j);
          const b = Math.max(i, dists[m].j);
          const key = a + ',' + b;
          if (!edgeSet.has(key)) {
            edgeSet.add(key);
            edges.push([a, b]);
            adjacency[a].push(b);
            adjacency[b].push(a);
          }
        }
      }

      // Expose live counts to the corner ticks
      const nodesCountEl = document.querySelector('[data-nodes-count]');
      const edgesCountEl = document.querySelector('[data-edges-count]');
      const activeCountEl = document.querySelector('[data-active-count]');
      if (nodesCountEl) nodesCountEl.textContent = NODE_COUNT;
      if (edgesCountEl) edgesCountEl.textContent = edges.length;

      /* ===== STATE: signals / inputs / outputs / ripples ===== */
      const signals = []; // traveling along edges, between nodes
      const inputs = []; // arriving from space into an input node
      const outputs = []; // leaving an output node toward space
      const ripples = [];

      function spawnSignal(fromIdx, toIdx) {
        if (signals.length >= 28) return;
        signals.push({
          from: fromIdx,
          to: toIdx,
          t: 0,
          speed: 0.014 + Math.random() * 0.010
        });
      }

      // A node "fires" when a regular signal arrives — propagates to 0-1 neighbor
      function fireNode(idx) {
        nodes[idx].activation = 1;
        if (signals.length >= 20) return;
        if (Math.random() > 0.55) return;
        const neighbors = adjacency[idx];
        if (!neighbors || neighbors.length === 0) return;
        const nextIdx = neighbors[Math.floor(Math.random() * neighbors.length)];
        spawnSignal(idx, nextIdx);
      }

      // An input arrival creates a stronger burst (2-3 signals)
      function burstFromNode(idx) {
        nodes[idx].activation = 1;
        const neighbors = adjacency[idx];
        if (!neighbors || neighbors.length === 0) return;
        const pool = [...neighbors].sort(() => Math.random() - 0.5);
        const count = Math.min(2 + (Math.random() < 0.5 ? 1 : 0), pool.length);
        for (let i = 0; i < count; i++) spawnSignal(idx, pool[i]);
      }

      // Seed initial activity
      for (let i = 0; i < 5; i++) {
        const from = Math.floor(Math.random() * nodes.length);
        const nb = adjacency[from];
        if (nb && nb.length) spawnSignal(from, nb[Math.floor(Math.random() * nb.length)]);
      }

      // Periodic data input from space → into an input node
      let lastInput = 0;
      function spawnInput(now) {
        const delay = 1800 + Math.random() * 1000;
        if (now - lastInput < delay) return;
        lastInput = now;
        const sLat = (Math.random() - 0.5) * Math.PI;
        const sLon = Math.random() * Math.PI * 2;
        const cl = Math.cos(sLat);
        const startR = 1.85 + Math.random() * 0.3;
        const targetIdx = INPUT_IDX[Math.floor(Math.random() * INPUT_IDX.length)];
        inputs.push({
          sx: cl * Math.cos(sLon),
          sy: Math.sin(sLat),
          sz: cl * Math.sin(sLon),
          targetIdx,
          t: 0,
          speed: 0.014 + Math.random() * 0.006,
          startR
        });
      }

      // Periodic prediction output: from an output node → out to space
      let lastOutput = 0;
      function spawnOutput(now) {
        const delay = 3500 + Math.random() * 2000;
        if (now - lastOutput < delay) return;
        lastOutput = now;
        const sourceIdx = OUTPUT_IDX[Math.floor(Math.random() * OUTPUT_IDX.length)];
        const dLat = (Math.random() - 0.5) * Math.PI;
        const dLon = Math.random() * Math.PI * 2;
        const cl = Math.cos(dLat);
        outputs.push({
          sourceIdx,
          dx: Math.cos(dLon) * cl,
          dy: Math.sin(dLat),
          dz: Math.sin(dLon) * cl,
          endR: 1.85 + Math.random() * 0.3,
          t: 0,
          speed: 0.013 + Math.random() * 0.006
        });
        nodes[sourceIdx].activation = Math.max(nodes[sourceIdx].activation, 0.85);
      }

      /* ===== PROJECTION + SLERP ===== */
      function project(x, y, z) {
        const cY = Math.cos(rotY), sY = Math.sin(rotY);
        const x1 = x * cY - z * sY;
        const z1 = x * sY + z * cY;
        const cX = Math.cos(rotX), sX = Math.sin(rotX);
        const y2 = y * cX - z1 * sX;
        const z2 = y * sX + z1 * cX;
        return { x: CX + x1 * RADIUS, y: CY - y2 * RADIUS, z: z2 };
      }

      function slerp(a, b, t) {
        const dot = clamp(a.x * b.x + a.y * b.y + a.z * b.z, -1, 1);
        const omega = Math.acos(dot);
        if (omega < 1e-4) return { x: a.x, y: a.y, z: a.z };
        const sinO = Math.sin(omega);
        const wa = Math.sin((1 - t) * omega) / sinO;
        const wb = Math.sin(t * omega) / sinO;
        return {
          x: wa * a.x + wb * b.x,
          y: wa * a.y + wb * b.y,
          z: wa * a.z + wb * b.z
        };
      }

      /* ===== DRAWING ===== */
      function drawWireframe() {
        // Subtle latitude circles only — less visual noise so the mesh reads
        const LAT = 6;
        const SEG = 32;
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(0, 80, 81, 0.09)';
        for (let i = 1; i < LAT; i++) {
          const lat = -Math.PI / 2 + (i / LAT) * Math.PI;
          const cl = Math.cos(lat), sl = Math.sin(lat);
          ctx.beginPath();
          let first = true;
          for (let j = 0; j <= SEG; j++) {
            const lon = (j / SEG) * Math.PI * 2;
            const s = project(cl * Math.cos(lon), sl, cl * Math.sin(lon));
            if (s.z > -0.05) {
              if (first) { ctx.moveTo(s.x, s.y); first = false; }
              else ctx.lineTo(s.x, s.y);
            } else if (!first) { ctx.stroke(); ctx.beginPath(); first = true; }
          }
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(CX, CY, RADIUS, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 80, 81, 0.24)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      function drawEdges() {
        // Collect active edge keys so their color can be boosted
        const active = new Set();
        for (const s of signals) {
          const key = Math.min(s.from, s.to) + ',' + Math.max(s.from, s.to);
          active.add(key);
        }
        const SEG = 12;
        for (let e = 0; e < edges.length; e++) {
          const i0 = edges[e][0], i1 = edges[e][1];
          const a = nodes[i0], b = nodes[i1];
          const pa = project(a.x, a.y, a.z);
          const pb = project(b.x, b.y, b.z);
          if (pa.z < -0.15 && pb.z < -0.15) continue;
          const isActive = active.has(i0 + ',' + i1);
          ctx.strokeStyle = isActive
            ? 'rgba(0, 106, 107, 0.40)'
            : 'rgba(0, 106, 107, 0.12)';
          ctx.lineWidth = isActive ? 1.2 : 0.8;
          ctx.beginPath();
          let first = true;
          for (let k = 0; k <= SEG; k++) {
            const t = k / SEG;
            const p = slerp(a, b, t);
            const s = project(p.x, p.y, p.z);
            if (s.z > -0.05) {
              if (first) { ctx.moveTo(s.x, s.y); first = false; }
              else ctx.lineTo(s.x, s.y);
            } else if (!first) { ctx.stroke(); ctx.beginPath(); first = true; }
          }
          ctx.stroke();
        }
      }

      function drawNodes() {
        const list = nodes.map((n, i) => ({ i, proj: project(n.x, n.y, n.z) }));
        list.sort((a, b) => a.proj.z - b.proj.z);
        for (const item of list) {
          const n = nodes[item.i];
          const proj = item.proj;
          if (proj.z < -0.08) continue;
          const depth = clamp((proj.z + 0.2) / 1.2, 0.3, 1);
          const baseSize = 2.4 + n.activation * 3;
          // Glow halo on activation
          if (n.activation > 0.05) {
            ctx.save();
            ctx.globalAlpha = n.activation * 0.55 * depth;
            ctx.fillStyle = n.isInput ? '#ffb599' : '#84d4d4';
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, baseSize + 7 * n.activation, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
          // Core fill
          ctx.globalAlpha = depth;
          if (n.isInput) ctx.fillStyle = '#8f4d31';
          else if (n.isOutput) ctx.fillStyle = '#005051';
          else ctx.fillStyle = n.activation > 0.3 ? '#006a6b' : 'rgba(0, 80, 81, 0.60)';
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, baseSize, 0, Math.PI * 2);
          ctx.fill();
          // Ring on input/output to call them out
          if (n.isInput || n.isOutput) {
            ctx.strokeStyle = n.isInput ? 'rgba(143, 77, 49, 0.55)' : 'rgba(0, 80, 81, 0.55)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, baseSize + 3.2, 0, Math.PI * 2);
            ctx.stroke();
          }
          ctx.globalAlpha = 1;
        }
      }

      function drawSignals() {
        for (let i = signals.length - 1; i >= 0; i--) {
          const s = signals[i];
          s.t += s.speed;
          if (s.t >= 1) {
            fireNode(s.to);
            signals.splice(i, 1);
            continue;
          }
          const a = nodes[s.from];
          const b = nodes[s.to];
          const p = slerp(a, b, s.t);
          // Tiny bump above surface so the signal sits just above the edge line
          const r = 1 + Math.sin(s.t * Math.PI) * 0.03;
          const proj = project(p.x * r, p.y * r, p.z * r);
          if (proj.z < -0.05) continue;
          ctx.save();
          ctx.globalAlpha = 0.4;
          ctx.fillStyle = '#84d4d4';
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, 2.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      function drawInputs() {
        for (let i = inputs.length - 1; i >= 0; i--) {
          const p = inputs[i];
          p.t += p.speed;
          if (p.t >= 1) {
            const tgt = nodes[p.targetIdx];
            if (ripples.length < 6) ripples.push({ x: tgt.x, y: tgt.y, z: tgt.z, kind: 'input', t: 0 });
            burstFromNode(p.targetIdx);
            inputs.splice(i, 1);
            continue;
          }
          const start = { x: p.sx, y: p.sy, z: p.sz };
          const end = nodes[p.targetIdx];
          const dir = slerp(start, end, p.t);
          const r = p.startR + (1 - p.startR) * p.t + Math.sin(p.t * Math.PI) * 0.14;
          const proj = project(dir.x * r, dir.y * r, dir.z * r);
          const front = proj.z > 0 ? 1 : (r > 1.1 ? 0.5 : 0);
          if (front <= 0) continue;
          ctx.save();
          ctx.globalAlpha = 0.32 * front;
          ctx.fillStyle = '#ffb599';
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = front;
          ctx.fillStyle = '#8f4d31';
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      function drawOutputs() {
        for (let i = outputs.length - 1; i >= 0; i--) {
          const p = outputs[i];
          p.t += p.speed;
          if (p.t >= 1) { outputs.splice(i, 1); continue; }
          const start = nodes[p.sourceIdx];
          const end = { x: p.dx, y: p.dy, z: p.dz };
          const dir = slerp(start, end, p.t);
          const r = 1 + (p.endR - 1) * p.t + Math.sin(p.t * Math.PI) * 0.10;
          const proj = project(dir.x * r, dir.y * r, dir.z * r);
          const front = proj.z > 0 ? 1 : (r > 1.1 ? 0.55 : 0);
          if (front <= 0) continue;
          ctx.save();
          ctx.globalAlpha = 0.32 * front;
          ctx.fillStyle = '#84d4d4';
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, 6.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = front;
          ctx.fillStyle = '#005051';
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, 2.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      function drawRipples() {
        for (let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i];
          r.t += 0.028;
          if (r.t >= 1) { ripples.splice(i, 1); continue; }
          const proj = project(r.x, r.y, r.z);
          if (proj.z < 0) continue;
          const color = r.kind === 'input'
            ? `rgba(255, 181, 153, ${(1 - r.t) * 0.7})`
            : `rgba(132, 212, 212, ${(1 - r.t) * 0.6})`;
          const size = 5 + r.t * 30;
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      function decayActivations() {
        for (const n of nodes) n.activation *= 0.93;
      }

      // Maintain baseline activity if the network goes quiet
      function maintainActivity() {
        if (signals.length < 2 && inputs.length === 0) {
          const from = Math.floor(Math.random() * nodes.length);
          const nb = adjacency[from];
          if (nb && nb.length) spawnSignal(from, nb[Math.floor(Math.random() * nb.length)]);
        }
      }

      /* ===== INTERACTION ===== */
      function onDown(clientX, clientY) {
        dragging = true;
        lastX = clientX; lastY = clientY;
        dragDX = 0; dragDY = 0;
      }
      function onMove(clientX, clientY) {
        if (!dragging) return;
        const dx = clientX - lastX;
        const dy = clientY - lastY;
        rotY -= (dx / W) * 1.2;
        rotX += (dy / H) * 1.2;
        rotX = clamp(rotX, -1.2, 1.2);
        dragDX = dx; dragDY = dy;
        lastX = clientX; lastY = clientY;
      }
      function onUp() {
        if (!dragging) return;
        dragging = false;
        velY = clamp(-(dragDX / W) * 1.2, -0.04, 0.04) + targetAutoVelY;
        velX = clamp((dragDY / H) * 1.0, -0.03, 0.03);
      }
      canvas.addEventListener('mousedown', (e) => { e.preventDefault(); onDown(e.clientX, e.clientY); });
      window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY), { passive: true });
      window.addEventListener('mouseup', onUp, { passive: true });
      canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length !== 1) return;
        onDown(e.touches[0].clientX, e.touches[0].clientY);
      }, { passive: true });
      window.addEventListener('touchmove', (e) => {
        if (e.touches.length !== 1) return;
        onMove(e.touches[0].clientX, e.touches[0].clientY);
      }, { passive: true });
      window.addEventListener('touchend', onUp, { passive: true });

      /* ===== MAIN LOOP ===== */
      let rafId = null;
      let lastGlobeTime = 0;
      let globeVisible = true;
      let activityCheckTick = 0;
      function frame(now) {
        const dt = lastGlobeTime ? Math.min(now - lastGlobeTime, 50) : 16;
        lastGlobeTime = now;
        ctx.clearRect(0, 0, W, H);

        // Crossfade: globe fades out as _blendT rises toward 1
        const _bt = window._blendT || 0;
        const _gA = Math.max(0, 1 - _bt);
        canvas.style.opacity = _gA.toFixed(3);

        if (_gA > 0.005) {
          autoVelY = lerp(autoVelY, targetAutoVelY, 1 - Math.pow(0.96, dt / 16));
          if (!dragging) {
            velY = lerp(velY, autoVelY, 1 - Math.pow(0.965, dt / 16));
            velX = lerp(velX, 0, 1 - Math.pow(0.94, dt / 16));
            rotY += velY * (dt / 16);
            rotX += velX * (dt / 16);
            rotX = clamp(rotX, -1.2, 1.2);
          }

          spawnInput(now);
          spawnOutput(now);
          decayActivations();
          if (++activityCheckTick % 40 === 0) maintainActivity();

          drawWireframe();
          drawEdges();
          drawSignals();
          drawNodes();
          drawInputs();
          drawOutputs();
          drawRipples();
        }

        if (activeCountEl) {
          const count = signals.length + inputs.length + outputs.length;
          activeCountEl.textContent = String(count).padStart(2, '0');
        }

        rafId = requestAnimationFrame(frame);
      }
      if (typeof IntersectionObserver !== 'undefined') {
        new IntersectionObserver(entries => {
          globeVisible = entries[0].isIntersecting;
          if (globeVisible && !rafId) { lastGlobeTime = 0; rafId = requestAnimationFrame(frame); }
          else if (!globeVisible && rafId) { cancelAnimationFrame(rafId); rafId = null; }
        }, { threshold: 0 }).observe(canvas);
      }

      rafId = requestAnimationFrame(frame);

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          cancelAnimationFrame(rafId); rafId = null;
        } else if (globeVisible) {
          lastGlobeTime = 0; rafId = requestAnimationFrame(frame);
        }
      });
    }
    window._blendT = 0;
    initGlobe('globe-canvas');

    /* ==================== ML PIPELINE + TRAINING ==================== */
    (function initMLCanvas() {
      const canvas = document.getElementById('ml-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const DPR = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));

      let W, H;

      /* ── Layouts (rebuilt on resize) ───────────────────── */
      let stages = [];
      let netLayers = [];
      let allEdges = [];

      function buildLayouts() {
        // Pipeline: centered vertically, use top 55% of square canvas
        const py = H * 0.42;
        stages = [
          { id: 0, label: 'RAW', x: W * 0.100, y: py },
          { id: 1, label: 'CLEAN', x: W * 0.285, y: py },
          { id: 2, label: 'FEATS', x: W * 0.475, y: py },
          { id: 3, label: 'NORM', x: W * 0.665, y: py },
          { id: 4, label: 'BATCH', x: W * 0.875, y: py },
        ];

        // Training: extra bottom padding reserves space for the loss curve
        const counts = [4, 6, 6, 3];
        const lxs = [W * 0.13, W * 0.38, W * 0.62, W * 0.87];
        const topPad = H * 0.18, botPad = H * 0.34;
        const span = H - topPad - botPad;
        netLayers = counts.map((n, li) =>
          Array.from({ length: n }, (_, ni) => ({
            li, ni,
            x: lxs[li],
            y: n > 1 ? topPad + ni * span / (n - 1) : H / 2,
            activation: 0,
          }))
        );

        allEdges = [];
        for (let li = 0; li < netLayers.length - 1; li++)
          for (let ni = 0; ni < netLayers[li].length; ni++)
            for (let nj = 0; nj < netLayers[li + 1].length; nj++)
              allEdges.push([li, ni, li + 1, nj]);
      }

      function resize() {
        const rect = canvas.getBoundingClientRect();
        W = rect.width; H = rect.height;
        canvas.width = Math.floor(W * DPR);
        canvas.height = Math.floor(H * DPR);
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
        buildLayouts();
      }
      resize();
      if (typeof ResizeObserver !== 'undefined') new ResizeObserver(resize).observe(canvas);
      else window.addEventListener('resize', resize);

      /* ── Phase system ───────────────────────────────────── */
      const HOLD_MS = 4000;
      const TRANS_MS = 800;
      let blendT = 0;          // 0 = pipeline, 1 = training (one-way)
      let inTransition = false;
      let holdTimer = 0;
      let lastTime = 0;

      /* ── Pipeline state ─────────────────────────────────── */
      // Stage particle colors [R,G,B]
      const STAGE_CLR = [
        [143, 77, 49],   // RAW   → warm terracotta
        [90, 88, 55],   // CLEAN → muted amber
        [0, 96, 90],   // FEATS → mid teal
        [0, 106, 107],   // NORM  → primary
        [132, 212, 212],  // BATCH → primary-light
      ];

      const pipeParticles = [];
      const pipeRipples = [];
      let spawnTimer = 0;
      let pipeRecords = 0;
      let pipeBatches = 0;
      let pipeActiveLbl = 'RAW';

      function makeParticle() {
        return {
          progress: -0.08 - Math.random() * 0.08,
          speed: 0.0038 + Math.random() * 0.0026,
          noiseOff: Math.random() * Math.PI * 6,
          noiseAmp: 6 + Math.random() * 5,
          lastStageHit: -1,
          flashT: 0,
          dead: false,
        };
      }
      // Pre-seed particles spread across the pipeline
      for (let i = 0; i < 11; i++) {
        const p = makeParticle();
        p.progress = i * 0.42 - 0.08;
        pipeParticles.push(p);
      }

      function stageColor(progress) {
        const f = clamp(progress, 0, 3.999);
        const i = Math.floor(f), t = f - i;
        const a = STAGE_CLR[i], b = STAGE_CLR[i + 1];
        return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
      }
      function stageSize(progress) { return lerp(4.8, 2.0, clamp(progress / 4, 0, 1)); }
      function stageNoise(progress) { return clamp(1 - progress / 3.2, 0, 1); }

      /* ── Training state ─────────────────────────────────── */
      const netSignals = [];
      const netBatches = [];
      const netRipples = [];
      let trainSpawnT = 0;
      let batchSpawnT = 0;
      let netEpoch = 0;
      let netBatchCount = 0;
      let netLoss = 0.918;
      const lossHist = [];
      let trainSeeded = false;

      function fireNode(li, ni) {
        const node = netLayers[li] && netLayers[li][ni];
        if (!node) return;
        node.activation = 1.0;
        netRipples.push({ x: node.x, y: node.y, t: 0 });
        if (netSignals.length >= 20) return;
        if (Math.random() > 0.55) return;
        if (li < netLayers.length - 1) {
          const nj = Math.floor(Math.random() * netLayers[li + 1].length);
          netSignals.push({ li, ni, lj: li + 1, nj, t: 0, speed: 0.009 + Math.random() * 0.005, bp: false });
        }
      }

      function burstNode(li, ni) {
        const node = netLayers[li] && netLayers[li][ni];
        if (!node) return;
        node.activation = 1.0;
        netRipples.push({ x: node.x, y: node.y, t: 0 });
        if (li < netLayers.length - 1) {
          const next = netLayers[li + 1];
          const k = Math.min(2 + (Math.random() < 0.45 ? 1 : 0), next.length);
          const pool = Array.from({ length: next.length }, (_, i) => i).sort(() => Math.random() - 0.5);
          for (let i = 0; i < k; i++)
            netSignals.push({ li, ni, lj: li + 1, nj: pool[i], t: 0, speed: 0.008 + Math.random() * 0.005, bp: false });
        }
      }

      function spawnBackprop() {
        // Occasional gradient flow right-to-left from output
        const lastLi = netLayers.length - 1;
        const ni = Math.floor(Math.random() * netLayers[lastLi].length);
        if (netLayers[lastLi - 1]) {
          const nj = Math.floor(Math.random() * netLayers[lastLi - 1].length);
          netSignals.push({ li: lastLi, ni, lj: lastLi - 1, nj, t: 0, speed: 0.007 + Math.random() * 0.004, bp: true });
        }
      }

      /* ── DRAW: PIPELINE ──────────────────────────────────── */
      function drawPipeline(a) {
        if (a <= 0.005) return;
        const now = performance.now();

        /* Animated dashed rail */
        ctx.save();
        ctx.globalAlpha = a * 0.20;
        ctx.strokeStyle = '#005051';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([7, 7]);
        ctx.lineDashOffset = -(now * 0.018 % 14);
        ctx.beginPath();
        ctx.moveTo(stages[0].x, stages[0].y);
        for (let i = 1; i < stages.length; i++) ctx.lineTo(stages[i].x, stages[i].y);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        /* Directional arrows between stages */
        for (let i = 0; i < stages.length - 1; i++) {
          const s0 = stages[i], s1 = stages[i + 1];
          const ax = s0.x + 21, bx = s1.x - 21;
          const dx = bx - ax, dy = 0;
          const len = Math.abs(dx) || 1;
          const nx = dx / len;
          const tx = ax + dx * 0.55, ty = s0.y;

          ctx.save();
          ctx.globalAlpha = a * 0.32;
          ctx.strokeStyle = '#006a6b';
          ctx.lineWidth = 0.85;
          ctx.beginPath();
          ctx.moveTo(ax, s0.y); ctx.lineTo(bx, s1.y);
          ctx.stroke();
          // arrowhead
          ctx.fillStyle = '#006a6b';
          ctx.beginPath();
          ctx.moveTo(tx + nx * 5, ty);
          ctx.lineTo(tx - nx * 3 - 3, ty - 3.5);
          ctx.lineTo(tx - nx * 3 - 3, ty + 3.5);
          ctx.fill();
          ctx.restore();
        }

        /* Stage node glows, circles, labels */
        for (const s of stages) {
          const pulse = 0.55 + 0.45 * Math.sin(now * 0.0018 + s.id * 1.52);
          const sc = STAGE_CLR[s.id];

          // Ambient glow halo
          ctx.save();
          ctx.globalAlpha = a * 0.09 * pulse;
          const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 38);
          g.addColorStop(0, `rgb(${sc[0]},${sc[1]},${sc[2]})`);
          g.addColorStop(1, 'transparent');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(s.x, s.y, 38, 0, Math.PI * 2); ctx.fill();
          ctx.restore();

          // Node circle fill + stroke
          ctx.save();
          ctx.globalAlpha = a;
          ctx.fillStyle = `rgba(${sc[0]},${sc[1]},${sc[2]},0.11)`;
          ctx.strokeStyle = `rgba(${sc[0]},${sc[1]},${sc[2]},0.82)`;
          ctx.lineWidth = 1.4;
          ctx.beginPath(); ctx.arc(s.x, s.y, 19, 0, Math.PI * 2);
          ctx.fill(); ctx.stroke();

          // Stage index number
          ctx.fillStyle = `rgba(${sc[0]},${sc[1]},${sc[2]},1)`;
          ctx.font = "600 9px 'Inter',sans-serif";
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(String(s.id + 1), s.x, s.y);

          // Label below
          ctx.fillStyle = `rgba(62,73,73,${a})`;
          ctx.font = "500 8px 'Inter',sans-serif";
          ctx.textBaseline = 'top';
          ctx.fillText(s.label, s.x, s.y + 25);
          ctx.restore();
        }

        /* Pipeline ripples on stage arrival */
        for (let i = pipeRipples.length - 1; i >= 0; i--) {
          const r = pipeRipples[i];
          r.t += 0.030;
          if (r.t >= 1) { pipeRipples.splice(i, 1); continue; }
          const sc = STAGE_CLR[r.sid] || STAGE_CLR[0];
          ctx.save();
          ctx.globalAlpha = a * (1 - r.t) * 0.62;
          ctx.strokeStyle = `rgb(${sc[0]},${sc[1]},${sc[2]})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.arc(r.x, r.y, 19 + r.t * 30, 0, Math.PI * 2); ctx.stroke();
          ctx.restore();
        }

        /* Particles */
        const t = now * 0.001;
        for (const p of pipeParticles) {
          if (p.dead || p.progress < 0) continue;
          const f = p.progress;
          const si = Math.min(Math.floor(f), 3);
          const sf = clamp(f - si, 0, 1);
          const s0 = stages[si], s1 = stages[Math.min(si + 1, 4)];
          const px = lerp(s0.x, s1.x, sf);
          const py = stages[0].y + Math.sin(t * 1.68 + p.noiseOff) * p.noiseAmp * stageNoise(f);
          const c = stageColor(f);
          const sz = stageSize(f);
          const cr = Math.round(c[0]), cg = Math.round(c[1]), cb = Math.round(c[2]);

          // Soft halo
          ctx.save();
          ctx.globalAlpha = a * 0.22;
          ctx.fillStyle = `rgb(${cr},${cg},${cb})`;
          ctx.beginPath(); ctx.arc(px, py, sz + 4.5, 0, Math.PI * 2); ctx.fill();
          // Core
          ctx.globalAlpha = a * 0.90;
          ctx.beginPath(); ctx.arc(px, py, sz, 0, Math.PI * 2); ctx.fill();
          ctx.restore();

          // Stage-arrival flash ring
          if (p.flashT > 0) {
            const fsc = STAGE_CLR[Math.min(Math.floor(p.progress), 4)];
            ctx.save();
            ctx.globalAlpha = a * p.flashT * 0.50;
            ctx.strokeStyle = `rgb(${fsc[0]},${fsc[1]},${fsc[2]})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.arc(px, py, sz + 13 * p.flashT, 0, Math.PI * 2); ctx.stroke();
            ctx.restore();
            p.flashT *= 0.80;
            if (p.flashT < 0.02) p.flashT = 0;
          }
        }

        /* Batch group bracket at last stage */
        const batchP = pipeParticles.filter(p => !p.dead && p.progress >= 3.72);
        if (batchP.length > 0) {
          const bs = stages[4];
          ctx.save();
          ctx.globalAlpha = a * clamp(batchP.length / 4, 0, 1) * 0.22;
          ctx.strokeStyle = '#84d4d4';
          ctx.lineWidth = 1;
          ctx.strokeRect(bs.x - 20, bs.y + 27, 40, 24);
          ctx.restore();
        }

      }

      /* ── DRAW: TRAINING ──────────────────────────────────── */
      function drawTraining(a) {
        if (a <= 0.005 || !netLayers.length) return;

        /* All edges (dim) + active edges (bright) */
        const activeSet = new Set();
        for (const s of netSignals) activeSet.add(`${s.li},${s.ni},${s.lj},${s.nj}`);

        for (const [li, ni, lj, nj] of allEdges) {
          const na = netLayers[li][ni], nb = netLayers[lj][nj];
          const key = `${li},${ni},${lj},${nj}`;
          const act = activeSet.has(key);
          ctx.save();
          ctx.globalAlpha = a * (act ? 0.38 : 0.065);
          ctx.strokeStyle = act ? '#006a6b' : '#005051';
          ctx.lineWidth = act ? 1.10 : 0.55;
          ctx.beginPath(); ctx.moveTo(na.x, na.y); ctx.lineTo(nb.x, nb.y); ctx.stroke();
          ctx.restore();
        }

        /* Layer labels */
        const lNames = ['INPUT', 'HIDDEN', 'HIDDEN', 'OUTPUT'];
        for (let li = 0; li < netLayers.length; li++) {
          if (!netLayers[li].length) continue;
          ctx.save();
          ctx.globalAlpha = a * 0.36;
          ctx.fillStyle = '#6e7979';
          ctx.font = "500 8px 'Inter',sans-serif";
          ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
          ctx.fillText(lNames[li], netLayers[li][0].x, H * 0.145);
          ctx.restore();
        }

        /* Nodes */
        for (const layer of netLayers) {
          for (const node of layer) {
            const dep = 0.44 + node.activation * 0.56;
            const sz = 4.5 + node.activation * 3.5;
            const isIn = node.li === 0;
            const isOut = node.li === netLayers.length - 1;

            // Activation glow
            if (node.activation > 0.07) {
              ctx.save();
              ctx.globalAlpha = a * node.activation * 0.48;
              ctx.fillStyle = isIn ? '#ffb599' : '#84d4d4';
              ctx.beginPath(); ctx.arc(node.x, node.y, sz + 9, 0, Math.PI * 2); ctx.fill();
              ctx.restore();
            }

            // Core
            ctx.save();
            ctx.globalAlpha = a * dep;
            if (isIn) ctx.fillStyle = node.activation > 0.3 ? '#8f4d31' : 'rgba(143,77,49,0.62)';
            else if (isOut) ctx.fillStyle = node.activation > 0.3 ? '#005051' : 'rgba(0,80,81,0.52)';
            else ctx.fillStyle = node.activation > 0.3 ? '#006a6b' : 'rgba(0,106,107,0.48)';
            ctx.beginPath(); ctx.arc(node.x, node.y, sz * 0.56, 0, Math.PI * 2); ctx.fill();

            // Outer ring on I/O nodes
            if (isIn || isOut) {
              ctx.strokeStyle = isIn ? 'rgba(143,77,49,0.48)' : 'rgba(0,80,81,0.48)';
              ctx.lineWidth = 1;
              ctx.beginPath(); ctx.arc(node.x, node.y, sz * 0.56 + 3.2, 0, Math.PI * 2); ctx.stroke();
            }
            ctx.restore();
          }
        }

        /* Signals (forward + backprop) */
        for (let i = netSignals.length - 1; i >= 0; i--) {
          const s = netSignals[i];
          s.t += s.speed;
          if (s.t >= 1) {
            if (!s.bp) fireNode(s.lj, s.nj);
            netSignals.splice(i, 1);
            continue;
          }
          const na = netLayers[s.li][s.ni], nb = netLayers[s.lj][s.nj];
          const px = lerp(na.x, nb.x, s.t);
          const py = lerp(na.y, nb.y, s.t);

          ctx.save();
          ctx.globalAlpha = a * 0.35;
          ctx.fillStyle = s.bp ? '#ffb599' : '#84d4d4';
          ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2); ctx.fill();
          ctx.globalAlpha = a;
          ctx.fillStyle = s.bp ? '#8f4d31' : '#006a6b';
          ctx.beginPath(); ctx.arc(px, py, 2.2, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
        }

        /* Batch packets arriving from left */
        for (let i = netBatches.length - 1; i >= 0; i--) {
          const b = netBatches[i];
          b.t += b.speed;
          if (b.t >= 1) { burstNode(0, b.ni); netBatches.splice(i, 1); continue; }
          const tgt = netLayers[0][b.ni];
          const px = lerp(-18, tgt.x, b.t);
          const py = lerp(b.sy, tgt.y, b.t);

          ctx.save();
          ctx.globalAlpha = a * 0.28;
          ctx.fillStyle = '#ffb599';
          ctx.beginPath(); ctx.arc(px, py, 6.5, 0, Math.PI * 2); ctx.fill();
          ctx.globalAlpha = a;
          ctx.fillStyle = '#8f4d31';
          ctx.beginPath(); ctx.arc(px, py, 2.8, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
        }

        /* Ripples on node activation */
        for (let i = netRipples.length - 1; i >= 0; i--) {
          const r = netRipples[i];
          r.t += 0.015;
          if (r.t >= 1) { netRipples.splice(i, 1); continue; }
          ctx.save();
          ctx.globalAlpha = a * (1 - r.t) * 0.52;
          ctx.strokeStyle = 'rgba(132,212,212,1)';
          ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.arc(r.x, r.y, 5 + r.t * 30, 0, Math.PI * 2); ctx.stroke();
          ctx.restore();
        }

        /* Loss curve chart — bottom strip of the square canvas */
        if (lossHist.length >= 2) {
          const lx = W * 0.05, ly = H * 0.72;
          const lw = W * 0.90, lh = H * 0.13;
          const lr = lx + lw, lb = ly + lh;
          const pts = lossHist.slice(-55);
          const LMAX = 1.0, LMIN = 0.04;

          ctx.save();
          // Panel bg
          ctx.globalAlpha = a * 0.07;
          ctx.fillStyle = '#005051';
          if (ctx.roundRect) ctx.roundRect(lx, ly, lw, lh, 3);
          else ctx.rect(lx, ly, lw, lh);
          ctx.fill();

          // Grid
          ctx.globalAlpha = a * 0.22;
          ctx.strokeStyle = 'rgba(0,80,81,0.6)';
          ctx.lineWidth = 0.5;
          ctx.strokeRect(lx, ly, lw, lh);
          for (let gi = 1; gi <= 2; gi++) {
            const gy = ly + lh * gi / 3;
            ctx.beginPath(); ctx.moveTo(lx, gy); ctx.lineTo(lr, gy); ctx.stroke();
          }

          // Labels
          ctx.globalAlpha = a * 0.42;
          ctx.fillStyle = '#3e4949';
          ctx.font = "500 7px 'Inter',sans-serif";
          ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
          ctx.fillText('TRAINING LOSS', lx, ly - 4);

          ctx.globalAlpha = a * 0.82;
          ctx.fillStyle = '#006a6b';
          ctx.font = "600 9px 'Inter',sans-serif";
          ctx.textAlign = 'right';
          ctx.fillText(netLoss.toFixed(4), lr, ly - 4);

          // Curve fill
          ctx.globalAlpha = a * 0.12;
          ctx.fillStyle = '#84d4d4';
          ctx.beginPath();
          ctx.moveTo(lx, lb);
          for (let pi = 0; pi < pts.length; pi++) {
            const cx = lx + (pi / (pts.length - 1)) * lw;
            const cy = lb - clamp((pts[pi] - LMIN) / (LMAX - LMIN), 0, 1) * lh;
            ctx.lineTo(cx, cy);
          }
          ctx.lineTo(lr, lb); ctx.fill();

          // Curve line
          ctx.globalAlpha = a * 0.88;
          ctx.strokeStyle = '#84d4d4';
          ctx.lineWidth = 1.5;
          ctx.lineJoin = 'round';
          ctx.beginPath();
          for (let pi = 0; pi < pts.length; pi++) {
            const cx = lx + (pi / (pts.length - 1)) * lw;
            const cy = lb - clamp((pts[pi] - LMIN) / (LMAX - LMIN), 0, 1) * lh;
            if (pi === 0) ctx.moveTo(cx, cy); else ctx.lineTo(cx, cy);
          }
          ctx.stroke();

          // Current-value dot at end of line
          const lastNorm = clamp((lossHist[lossHist.length - 1] - LMIN) / (LMAX - LMIN), 0, 1);
          const dotY = lb - lastNorm * lh;
          ctx.globalAlpha = a * 0.45;
          ctx.fillStyle = '#84d4d4';
          ctx.beginPath(); ctx.arc(lr, dotY, 5, 0, Math.PI * 2); ctx.fill();
          ctx.globalAlpha = a;
          ctx.fillStyle = '#005051';
          ctx.beginPath(); ctx.arc(lr, dotY, 2.2, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
        }

      }

      /* ── Tick DOM updates ───────────────────────────────── */
      const tTL = document.getElementById('ptick-tl');
      const tTR = document.getElementById('ptick-tr');
      const tBL = document.getElementById('ptick-bl');
      const tBR = document.getElementById('ptick-br');

      function updateTicks() {
        if (!tTL) return;
        const isPipe = blendT < 0.5;
        if (isPipe) {
          tTL.innerHTML = `RECORDS <span class="ptick-val">${pipeRecords}</span>`;
          tTR.innerHTML = `STAGE <span class="ptick-val">${pipeActiveLbl}</span>`;
          tBL.innerHTML = `BATCHES <span class="ptick-val">${pipeBatches}</span>`;
          if (tBR) tBR.textContent = 'DATA PIPELINE';
        } else {
          tTL.innerHTML = `EPOCH <span class="ptick-val">${netEpoch}</span>`;
          tTR.innerHTML = `LOSS <span class="ptick-val">${netLoss.toFixed(4)}</span>`;
          tBL.innerHTML = `BATCH <span class="ptick-val">${netBatchCount}</span>`;
          if (tBR) tBR.textContent = 'MODEL TRAINING';
        }
      }

      /* ── Main animation loop ────────────────────────────── */
      let rafId = null;

      function frame(now) {
        if (!lastTime) lastTime = now;
        const dt = Math.min(now - lastTime, 50);
        lastTime = now;

        // Crossfade: ML canvas fades in as _blendT rises toward 1
        const _bt = window._blendT || 0;
        canvas.style.opacity = Math.max(0, Math.min(1, _bt)).toFixed(3);

        if (_bt <= 0.005) {
          rafId = requestAnimationFrame(frame);
          return;
        }

        // Reset inner cycle when outer cycle signals return to globe
        if (window._mlInnerReset) {
          window._mlInnerReset = false;
          blendT = 0; inTransition = false; holdTimer = 0; trainSeeded = false;
        }

        /* Phase: pipeline → training (one-way, holds on training until reset)
           Only count hold time when ML canvas is fully visible (_bt >= 1) */
        if (!inTransition && blendT < 1 && _bt >= 1) {
          holdTimer += dt;
          if (holdTimer >= HOLD_MS) {
            holdTimer = 0;
            inTransition = true;
          }
        } else if (inTransition) {
          blendT = clamp(blendT + dt / TRANS_MS, 0, 1);
          if (blendT >= 1) inTransition = false;
        }

        // Sequential fade: pipeline dims out, then training fades in
        let pA, tA;
        if (blendT <= 0) { pA = 1; tA = 0; }
        else if (blendT >= 1) { pA = 0; tA = 1; }
        else if (blendT < 0.5) {
          const ft = blendT * 2;
          pA = 1 - ft * ft * (3 - 2 * ft); tA = 0;
        } else {
          const ft = (blendT - 0.5) * 2;
          pA = 0; tA = ft * ft * (3 - 2 * ft);
        }
        ctx.clearRect(0, 0, W, H);

        /* ── PIPELINE ── */
        if (pA > 0.005) {
          spawnTimer += dt;
          if (spawnTimer >= 440) {
            spawnTimer = 0;
            if (pipeParticles.filter(p => !p.dead).length < 22) {
              pipeParticles.push(makeParticle());
              pipeRecords++;
            }
          }

          const stageCounts = new Array(5).fill(0);
          for (let i = pipeParticles.length - 1; i >= 0; i--) {
            const p = pipeParticles[i];
            if (p.dead) { pipeParticles.splice(i, 1); continue; }
            p.progress += p.speed;

            const si = Math.floor(p.progress);
            if (si !== p.lastStageHit && si >= 0 && si <= 4) {
              p.lastStageHit = si;
              p.flashT = 1.0;
              if (stages[si] && Math.random() < 0.4) pipeRipples.push({ x: stages[si].x, y: stages[si].y, sid: si, t: 0 });
              if (si === 4) pipeBatches++;
            }
            if (si >= 0 && si < 5) stageCounts[si]++;
            if (p.progress > 4.68) p.dead = true;
          }

          const maxCnt = Math.max(...stageCounts);
          const activeIdx = maxCnt > 0 ? stageCounts.indexOf(maxCnt) : 0;
          if (stages[activeIdx]) pipeActiveLbl = stages[activeIdx].label;

          drawPipeline(pA);
        }

        /* ── TRAINING ── */
        if (tA > 0.005) {
          if (!trainSeeded && tA > 0.08) {
            trainSeeded = true;
            lossHist.push(netLoss);
            for (let ni = 0; ni < netLayers[0].length; ni++)
              setTimeout(() => burstNode(0, ni), ni * 180);
          }

          for (const layer of netLayers)
            for (const node of layer) node.activation *= 0.958;

          trainSpawnT += dt;
          if (trainSpawnT >= 750) {
            trainSpawnT = 0;
            if (netSignals.length < 6) {
              const ni = Math.floor(Math.random() * netLayers[0].length);
              burstNode(0, ni);
            }
          }

          batchSpawnT += dt;
          if (batchSpawnT >= 1900) {
            batchSpawnT = 0;
            netBatchCount++;

            if (netBatchCount % 8 === 0) {
              netEpoch++;
              netLoss = Math.max(0.04, netLoss * 0.91 + Math.random() * 0.014);
              if (Math.random() < 0.4) spawnBackprop();
            } else {
              netLoss = Math.max(0.04,
                netLoss * (0.997 + Math.random() * 0.004) + (Math.random() - 0.55) * 0.008);
            }
            lossHist.push(netLoss);
            if (lossHist.length > 60) lossHist.shift();

            const k = 1 + (Math.random() < 0.40 ? 1 : 0);
            for (let b = 0; b < k; b++) {
              const ni = Math.floor(Math.random() * netLayers[0].length);
              netBatches.push({
                ni,
                sy: netLayers[0][ni].y + (Math.random() - 0.5) * 48,
                t: 0,
                speed: 0.008 + Math.random() * 0.005,
              });
            }
          }

          if (tA < 0.10 && trainSeeded) trainSeeded = false;

          drawTraining(tA);
        }

        updateTicks();
        rafId = requestAnimationFrame(frame);
      }

      let mlVisible = true;
      if (typeof IntersectionObserver !== 'undefined') {
        new IntersectionObserver(entries => {
          mlVisible = entries[0].isIntersecting;
          if (mlVisible && !rafId) { lastTime = 0; rafId = requestAnimationFrame(frame); }
          else if (!mlVisible && rafId) { cancelAnimationFrame(rafId); rafId = null; }
        }, { threshold: 0 }).observe(canvas);
      }
      rafId = requestAnimationFrame(frame);
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) { cancelAnimationFrame(rafId); rafId = null; }
        else if (mlVisible && !rafId) { lastTime = 0; rafId = requestAnimationFrame(frame); }
      });
    })();

    /* ==================== GLOBE ↔ ML MORPH CYCLE ==================== */
    (function initMorphCycle() {
      const globeTicks = document.getElementById('globe-ticks-overlay');
      const pipeTicks = document.getElementById('pipeline-ticks-overlay');
      const host = document.getElementById('globe-canvas') || document.querySelector('.globe-frame');

      const GLOBE_HOLD = 4000;
      const ML_HOLD = 8800;  // pipeline 4s + fade 0.8s + training 4s
      const ENTER_MS = 1600;  // globe → ML crossfade in
      const EXIT_MS = 3000;  // ML → globe dedicated exit (smooth, no conflicts)

      let phase = 'globe';
      let timer = 0;
      let lastT = 0;
      let morphRaf = null;
      let morphVisible = true;

      function tick(now) {
        if (!lastT) lastT = now;
        const dt = Math.min(now - lastT, 50);
        lastT = now;

        switch (phase) {
          case 'globe':
            timer += dt;
            if (timer >= GLOBE_HOLD) { phase = 'to-ml'; timer = 0; }
            break;

          case 'to-ml':
            timer += dt;
            window._blendT = Math.min(1, timer / ENTER_MS);
            if (timer >= ENTER_MS) { window._blendT = 1; phase = 'ml'; timer = 0; }
            break;

          case 'ml':
            timer += dt;
            if (timer >= ML_HOLD) { phase = 'ml-exit'; timer = 0; }
            break;

          /* ── Dedicated exit phase ─────────────────────────────────
             ML canvas fades out with smoothstep over EXIT_MS.
             Inner cycle is NOT touched here — training stays shown
             while fading. Reset fires only once _blendT hits 0.     */
          case 'ml-exit': {
            timer += dt;
            const t = Math.min(1, timer / EXIT_MS);
            const ts = t * t * (3 - 2 * t);          // smoothstep: slow start, slow end
            window._blendT = 1 - ts;
            if (timer >= EXIT_MS) {
              window._blendT = 0;
              window._mlInnerReset = true;            // reset only after canvas is fully gone
              phase = 'globe'; timer = 0;
            }
            break;
          }
        }

        // Per-frame tick label opacity — no CSS transition needed
        const bt = window._blendT;
        const gT = Math.max(0, 1 - bt * 3.5);                         // gone by bt≈0.29
        const pT = Math.max(0, Math.min(1, (bt - 0.38) / 0.40));      // full by bt≈0.78
        if (globeTicks) globeTicks.style.opacity = gT.toFixed(3);
        if (pipeTicks) pipeTicks.style.opacity = pT.toFixed(3);

        morphRaf = requestAnimationFrame(tick);
      }

      if (host && typeof IntersectionObserver !== 'undefined') {
        new IntersectionObserver(entries => {
          morphVisible = entries[0].isIntersecting;
          if (morphVisible && !morphRaf) { lastT = 0; morphRaf = requestAnimationFrame(tick); }
          else if (!morphVisible && morphRaf) { cancelAnimationFrame(morphRaf); morphRaf = null; }
        }, { threshold: 0 }).observe(host);
      }
      morphRaf = requestAnimationFrame(tick);
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) { if (morphRaf) { cancelAnimationFrame(morphRaf); morphRaf = null; } }
        else if (morphVisible && !morphRaf) { lastT = 0; morphRaf = requestAnimationFrame(tick); }
      });
    })();

    /* ==================== CUSTOM CURSOR ==================== */
    (function initCursor() {
      if (!window.matchMedia('(pointer: fine)').matches) return;
      const cursorEl = document.getElementById('c-cursor');
      if (!cursorEl) return;
      cursorEl.removeAttribute('hidden');

      let cx = 0, cy = 0, raf = null;
      function flush() {
        cursorEl.style.transform = `translate3d(${cx}px,${cy}px,0)`;
        raf = null;
      }
      window.addEventListener('mousemove', e => {
        cx = e.clientX; cy = e.clientY;
        if (!raf) raf = requestAnimationFrame(flush);
      }, { passive: true });

      document.addEventListener('mouseleave', () => { cursorEl.style.opacity = '0'; });
      document.addEventListener('mouseenter', () => { cursorEl.style.opacity = '1'; });
    })();

