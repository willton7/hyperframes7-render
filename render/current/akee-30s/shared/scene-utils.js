(function () {
  const AKEE = (window.AKEE = window.AKEE || {});
  const SCENES = window.AKEE_SCENES || {};
  const SVG_NS = "http://www.w3.org/2000/svg";

  const LAYOUTS = {
    void: {
      mobile: {
        ghost: { x: 50, y: 50 },
        core: { x: 50, y: 51 },
        shockwave: { x: 50, y: 51, w: 48 },
        cursor: { x: 50, y: 51, fromX: 220, fromY: -120 },
        fragments: [
          { x: 16, y: 21, rotate: -8, width: 168 },
          { x: 70, y: 15, rotate: 7, width: 178 },
          { x: 18, y: 74, rotate: -5, width: 220 },
          { x: 68, y: 80, rotate: 6, width: 170 },
        ],
      },
      web: {
        ghost: { x: 50, y: 48 },
        core: { x: 51, y: 51 },
        shockwave: { x: 51, y: 51, w: 44 },
        cursor: { x: 51, y: 51, fromX: 300, fromY: -80 },
        fragments: [
          { x: 13, y: 20, rotate: -7, width: 176 },
          { x: 74, y: 16, rotate: 8, width: 188 },
          { x: 17, y: 74, rotate: -6, width: 240 },
          { x: 69, y: 79, rotate: 5, width: 186 },
        ],
      },
    },
    ignite: {
      mobile: {
        ghost: { x: 50, y: 50 },
        core: { x: 50, y: 48 },
        ring: { x: 50, y: 48, w: 70 },
        cursor: { x: 50, y: 48, fromX: -180, fromY: 170 },
        nodes: [
          { x: 29, y: 28 },
          { x: 70, y: 24 },
          { x: 24, y: 55 },
          { x: 75, y: 55 },
          { x: 34, y: 80 },
          { x: 66, y: 79 },
        ],
        cards: [
          { x: 18, y: 26, w: 23, h: 13, rotate: -5 },
          { x: 82, y: 24, w: 25, h: 13, rotate: 4 },
          { x: 16, y: 53, w: 27, h: 14, rotate: 6 },
          { x: 83, y: 54, w: 25, h: 14, rotate: -4 },
          { x: 26, y: 82, w: 24, h: 13, rotate: -5 },
          { x: 74, y: 81, w: 24, h: 13, rotate: 5 },
        ],
      },
      web: {
        ghost: { x: 50, y: 50 },
        core: { x: 51, y: 50 },
        ring: { x: 51, y: 50, w: 68 },
        cursor: { x: 51, y: 50, fromX: 210, fromY: -130 },
        nodes: [
          { x: 22, y: 28 },
          { x: 78, y: 28 },
          { x: 18, y: 58 },
          { x: 82, y: 58 },
          { x: 31, y: 81 },
          { x: 70, y: 79 },
        ],
        cards: [
          { x: 18, y: 22, w: 19, h: 14, rotate: -8 },
          { x: 82, y: 22, w: 19, h: 14, rotate: 6 },
          { x: 14, y: 53, w: 20, h: 15, rotate: 4 },
          { x: 86, y: 53, w: 20, h: 15, rotate: -4 },
          { x: 24, y: 82, w: 20, h: 14, rotate: -6 },
          { x: 76, y: 81, w: 20, h: 14, rotate: 5 },
        ],
      },
    },
    layers: {
      mobile: {
        ghost: { x: 50, y: 50 },
        cursor: { x: 50, y: 50, fromX: 170, fromY: -120 },
        panels: [
          { x: 50, y: 28, w: 72, h: 16, rotate: 0, kind: "timeline" },
          { x: 50, y: 50, w: 76, h: 18, rotate: -1, kind: "video" },
          { x: 50, y: 68, w: 74, h: 18, rotate: 1, kind: "diagram" },
          { x: 32, y: 86, w: 34, h: 14, rotate: -4, kind: "explain" },
          { x: 68, y: 86, w: 34, h: 14, rotate: 4, kind: "path" },
        ],
      },
      web: {
        ghost: { x: 50, y: 50 },
        cursor: { x: 50, y: 50, fromX: 240, fromY: -90 },
        panels: [
          { x: 28, y: 60, w: 28, h: 30, rotate: -4, kind: "timeline" },
          { x: 67, y: 30, w: 24, h: 16, rotate: 2, kind: "video" },
          { x: 27, y: 26, w: 25, h: 20, rotate: -2, kind: "diagram" },
          { x: 76, y: 62, w: 22, h: 16, rotate: 5, kind: "explain" },
          { x: 51, y: 83, w: 24, h: 15, rotate: 0, kind: "path" },
        ],
      },
    },
    clarity: {
      mobile: {
        ghost: { x: 50, y: 50 },
        cursor: { x: 50, y: 50, fromX: -160, fromY: 140 },
        ring: { x: 52, y: 51, w: 48 },
        pathNodes: [
          { x: 50, y: 88, labelX: 50, labelY: 92 },
          { x: 50, y: 72, labelX: 50, labelY: 76 },
          { x: 50, y: 56, labelX: 50, labelY: 60 },
          { x: 50, y: 40, labelX: 50, labelY: 44 },
          { x: 50, y: 24, labelX: 50, labelY: 28 },
        ],
        fragments: [
          { x: 18, y: 26, rotate: -8, width: 170 },
          { x: 76, y: 22, rotate: 7, width: 160 },
          { x: 20, y: 74, rotate: -5, width: 196 },
        ],
      },
      web: {
        ghost: { x: 50, y: 50 },
        cursor: { x: 50, y: 50, fromX: 190, fromY: -120 },
        ring: { x: 76, y: 46, w: 30 },
        pathNodes: [
          { x: 20, y: 76, labelX: 19, labelY: 82 },
          { x: 34, y: 63, labelX: 33, labelY: 69 },
          { x: 49, y: 50, labelX: 48, labelY: 56 },
          { x: 64, y: 37, labelX: 63, labelY: 43 },
          { x: 80, y: 24, labelX: 79, labelY: 30 },
        ],
        fragments: [
          { x: 16, y: 22, rotate: -7, width: 182 },
          { x: 76, y: 18, rotate: 5, width: 170 },
          { x: 18, y: 78, rotate: -4, width: 208 },
        ],
      },
    },
    engine: {
      mobile: {
        ghost: { x: 50, y: 50 },
        frame: { x: 50, y: 56, w: 76, h: 58 },
        cursor: { x: 50, y: 56, fromX: -180, fromY: 100 },
        rings: [
          { x: 50, y: 53, w: 88 },
          { x: 50, y: 56, w: 64 },
          { x: 50, y: 56, w: 42 },
        ],
        tiles: [
          { x: 30, y: 38, w: 18, h: 11, kind: "input" },
          { x: 70, y: 38, w: 18, h: 11, kind: "path" },
          { x: 26, y: 55, w: 20, h: 12, kind: "timeline" },
          { x: 74, y: 55, w: 20, h: 12, kind: "timeline" },
          { x: 32, y: 72, w: 18, h: 10, kind: "tiles" },
          { x: 68, y: 72, w: 18, h: 10, kind: "tiles" },
        ],
      },
      web: {
        ghost: { x: 50, y: 50 },
        frame: { x: 51, y: 54, w: 64, h: 56 },
        cursor: { x: 51, y: 54, fromX: 220, fromY: 120 },
        rings: [
          { x: 51, y: 50, w: 78 },
          { x: 51, y: 54, w: 58 },
          { x: 51, y: 54, w: 36 },
        ],
        tiles: [
          { x: 32, y: 40, w: 15, h: 11, kind: "input" },
          { x: 69, y: 40, w: 16, h: 11, kind: "path" },
          { x: 30, y: 58, w: 17, h: 11, kind: "timeline" },
          { x: 69, y: 58, w: 17, h: 11, kind: "timeline" },
          { x: 27, y: 76, w: 17, h: 11, kind: "tiles" },
          { x: 74, y: 76, w: 17, h: 11, kind: "tiles" },
        ],
      },
    },
    brand: {
      mobile: {
        ghost: { x: 50, y: 50 },
        cursor: { x: 50, y: 67, fromX: 160, fromY: 100 },
        cta: { x: 50, y: 68, w: 78 },
      },
      web: {
        ghost: { x: 50, y: 50 },
        cursor: { x: 60, y: 69, fromX: 200, fromY: 100 },
        cta: { x: 58, y: 70, w: 44 },
      },
    },
  };

  function seeded(seed) {
    let value = seed % 2147483647;
    if (value <= 0) value += 2147483646;
    return function () {
      value = (value * 16807) % 2147483647;
      return (value - 1) / 2147483646;
    };
  }

  function pick(rng, values) {
    return values[Math.floor(rng() * values.length)];
  }

  function el(tag, className, parent, text, attrs = {}) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    for (const [key, value] of Object.entries(attrs)) {
      if (value === false || value === null || value === undefined) continue;
      if (key === "style" && typeof value === "object") {
        Object.assign(node.style, value);
      } else if (key === "dataset" && typeof value === "object") {
        Object.assign(node.dataset, value);
      } else if (key === "html") {
        node.innerHTML = value;
      } else {
        node.setAttribute(key, String(value));
      }
    }
    if (parent) parent.appendChild(node);
    return node;
  }

  function position(node, spec = {}) {
    node.style.left = `${spec.x ?? 50}%`;
    node.style.top = `${spec.y ?? 50}%`;
    if (spec.w !== undefined) {
      node.style.width = typeof spec.w === "number" && spec.w <= 100 ? `${spec.w}%` : `${spec.w}px`;
    }
    if (spec.h !== undefined) {
      node.style.height = typeof spec.h === "number" && spec.h <= 100 ? `${spec.h}%` : `${spec.h}px`;
    }
    node.dataset.anchor = spec.anchor || "center";
    node.dataset.rotate = spec.rotate ? String(spec.rotate) : "0";
    node.dataset.scale = spec.scale ? String(spec.scale) : "1";
    if (node.dataset.anchor === "center") {
      gsap.set(node, { xPercent: -50, yPercent: -50, rotation: spec.rotate || 0, scale: spec.scale || 1 });
    } else if (node.dataset.anchor === "left") {
      gsap.set(node, { xPercent: 0, yPercent: -50, rotation: spec.rotate || 0, scale: spec.scale || 1 });
    } else {
      gsap.set(node, { xPercent: -50, yPercent: -50, rotation: spec.rotate || 0, scale: spec.scale || 1 });
    }
    return node;
  }

  function svg(parent, viewBox = "0 0 100 100", className = "line-layer") {
    const node = document.createElementNS(SVG_NS, "svg");
    node.setAttribute("viewBox", viewBox);
    node.setAttribute("preserveAspectRatio", "none");
    node.classList.add(className);
    parent.appendChild(node);
    return node;
  }

  function path(svgNode, d, cls) {
    const node = document.createElementNS(SVG_NS, "path");
    node.setAttribute("d", d);
    node.setAttribute("pathLength", "1");
    node.setAttribute("vector-effect", "non-scaling-stroke");
    node.style.fill = "none";
    node.style.strokeDasharray = "1";
    node.style.strokeDashoffset = "1";
    node.classList.add(cls);
    svgNode.appendChild(node);
    return node;
  }

  function line(svgNode, x1, y1, x2, y2, cls) {
    const node = document.createElementNS(SVG_NS, "line");
    node.setAttribute("x1", x1);
    node.setAttribute("y1", y1);
    node.setAttribute("x2", x2);
    node.setAttribute("y2", y2);
    node.setAttribute("pathLength", "1");
    node.setAttribute("vector-effect", "non-scaling-stroke");
    node.style.strokeDasharray = "1";
    node.style.strokeDashoffset = "1";
    node.classList.add(cls);
    svgNode.appendChild(node);
    return node;
  }

  function setLineAnimation(lineNode) {
    lineNode.style.strokeDasharray = "1";
    lineNode.style.strokeDashoffset = "1";
    return lineNode;
  }

  function buildBackdrop(root, scene) {
    const shell = el("section", "scene scene-shell", root, null, {
      "data-start": "0",
      "data-duration": "5",
      "data-track-index": "1",
    });

    const bg = el("div", "scene-bg", shell, null, {
      "data-layout-ignore": "true",
    });

    el("div", "", bg, null, {
      style: {
        position: "absolute",
        left: "16%",
        top: "12%",
        width: "54%",
        height: "54%",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(189, 167, 255, 0.28) 0%, rgba(189, 167, 255, 0.12) 22%, rgba(189, 167, 255, 0) 74%)",
        filter: "blur(12px)",
        mixBlendMode: "screen",
      },
    });

    el("div", "", bg, null, {
      style: {
        position: "absolute",
        right: "-8%",
        top: "8%",
        width: "48%",
        height: "48%",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(134, 203, 255, 0.22) 0%, rgba(134, 203, 255, 0.08) 26%, rgba(134, 203, 255, 0) 76%)",
        filter: "blur(12px)",
        mixBlendMode: "screen",
      },
    });

    el("div", "", bg, null, {
      style: {
        position: "absolute",
        left: "50%",
        bottom: "-18%",
        width: "72%",
        height: "72%",
        transform: "translateX(-50%)",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(93, 120, 255, 0.18) 0%, rgba(93, 120, 255, 0.07) 18%, rgba(93, 120, 255, 0) 76%)",
        filter: "blur(16px)",
        mixBlendMode: "screen",
      },
    });

    const grid = el("div", "scene-grid", bg);
    const fineGrid = el("div", "scene-grid scene-grid--fine", bg);
    const noise = el("div", "scene-noise", bg);
    const vignette = el("div", "scene-vignette", bg);

    const ghost = el("div", "scene-ghost", shell, scene.ghost || scene.title || "");
    const content = el("div", "scene-content", shell, null, {
      "data-copy-align": scene.copyAlign || "center",
    });
    const hero = el("div", "hero-copy", content);
    const kicker = el("p", "kicker", hero, scene.kicker || "");
    const headline = el("h1", "headline", hero, scene.title || "");
    const subline = el("p", "subline", hero, scene.subline || "");

    const stage = el("div", "stage", shell, null, {
      "data-layout-allow-overflow": "true",
    });

    const particleLayer = el("div", "stage", shell, null, {
      "data-layout-ignore": "true",
      style: {
        zIndex: "1",
      },
    });

    return {
      shell,
      bg,
      grid,
      fineGrid,
      noise,
      vignette,
      ghost,
      content,
      hero,
      kicker,
      headline,
      title: headline,
      subline,
      stage,
      particleLayer,
    };
  }

  function addParticles(layer, scene, rng) {
    const particles = [];
    const total = scene.variant === "mobile" ? 18 : 24;
    for (let i = 0; i < total; i += 1) {
      const node = el("span", "particle", layer, null);
      const x = 4 + rng() * 92;
      const y = 6 + rng() * 88;
      const size = 2 + rng() * 7;
      const type = i % 5 === 0 ? "particle--cyan" : i % 11 === 0 ? "particle--amber" : "";
      if (type) node.classList.add(type);
      Object.assign(node.style, {
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
      });
      gsap.set(node, { xPercent: -50, yPercent: -50 });
      particles.push(node);
    }
    return particles;
  }

  function addAmbient(tl, scene, ctx) {
    const { rng, particles, bg } = ctx;
    tl.to(ctx.ghost, { opacity: 0.06, duration: 5, ease: "sine.inOut" }, 0);
    tl.to(ctx.grid, { opacity: scene.variant === "mobile" ? 0.22 : 0.28, duration: 5, ease: "sine.inOut" }, 0);
    tl.to(ctx.fineGrid, { opacity: scene.variant === "mobile" ? 0.14 : 0.12, duration: 5, ease: "sine.inOut" }, 0);
    tl.to(ctx.noise, { opacity: scene.variant === "mobile" ? 0.16 : 0.18, duration: 5, ease: "sine.inOut" }, 0);
    tl.to(ctx.vignette, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0);
    tl.to(bg, { scale: 1.02, duration: 5, ease: "sine.inOut" }, 0);
    particles.forEach((particle, index) => {
      const dx = (rng() - 0.5) * (scene.variant === "mobile" ? 18 : 24);
      const dy = (rng() - 0.5) * (scene.variant === "mobile" ? 18 : 24);
      const drift = 0.2 + (index % 4) * 0.08;
      tl.to(
        particle,
        {
          x: dx,
          y: dy,
          opacity: index % 3 === 0 ? 0.92 : 0.72,
          duration: 5,
          ease: index % 2 === 0 ? "sine.inOut" : "power1.inOut",
        },
        0,
      );
      tl.to(
        particle,
        {
          scale: 1 + drift * 0.04,
          duration: 2.5 + (index % 5) * 0.15,
          ease: "sine.inOut",
        },
        0.2 + (index % 4) * 0.12,
      );
    });
    return particles;
  }

  function createCard(parent, label, title, body, extraClass = "") {
    const card = el("article", `card ${extraClass}`.trim(), parent);
    const eyebrow = el("p", "card__eyebrow", card, label);
    const head = el("h3", "card__title", card, title);
    const copy = el("p", "card__body", card, body);
    const bars = el("div", "card__bars", card);
    el("div", "card__bar card__bar--short", bars);
    el("div", "card__bar card__bar--med", bars);
    el("div", "card__bar card__bar--long", bars);
    return { card, eyebrow, head, copy };
  }

  function createPill(parent, text, extraClass = "") {
    const pill = el("div", `pill ${extraClass}`.trim(), parent);
    el("span", "pill__text", pill, text);
    return pill;
  }

  function createCta(parent, text) {
    const pill = el("div", "cta-pill", parent);
    el("span", "cta-pill__text", pill, text);
    return pill;
  }

  function createStep(parent, label) {
    const wrap = el("div", "timeline-step", parent);
    el("div", "timeline-step__dot", wrap);
    el("div", "timeline-step__label", wrap, label);
    return wrap;
  }

  function createPathNode(parent, label) {
    const wrap = el("div", "path-node", parent);
    el("div", "path-node__dot", wrap);
    el("div", "path-node__label", wrap, label);
    return wrap;
  }

  function setStagePositions(nodes, positions) {
    nodes.forEach((node, index) => {
      const spec = positions[index];
      if (!spec) return;
      position(node, spec);
    });
  }

  function createSvgLayer(stage) {
    const layer = el("div", "line-layer", stage);
    const node = svg(layer, "0 0 100 100");
    return { layer, node };
  }

  function buildVoid(ctx, scene) {
    const { stage, title, subline, kicker, timeline } = ctx;
    const layout = LAYOUTS.void[scene.variant];
    const ghost = ctx.ghost;
    const core = position(el("div", "core", stage), layout.core);
    const shock = position(el("div", "shockwave", stage), {
      ...layout.shockwave,
      w: layout.shockwave.w || 44,
      h: layout.shockwave.w || 44,
    });
    const cursor = position(el("div", "cursor", stage), layout.cursor);
    const fragments = scene.fragments.map((text, index) => {
      const fragment = el("div", "fragment", stage, text);
      const spec = layout.fragments[index];
      position(fragment, { ...spec, anchor: "center" });
      return fragment;
    });

    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
      [kicker, title, subline],
      { opacity: 0, y: 18, filter: "blur(18px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        stagger: 0.08,
        ease: "power4.out",
      },
      0.18,
    );
    tl.fromTo(
      fragments,
      { opacity: 0, y: 24, scale: 0.92, filter: "blur(14px)" },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.52,
        stagger: 0.1,
        ease: "power3.out",
      },
      0.45,
    );
    tl.fromTo(
      cursor,
      {
        opacity: 0,
        x: layout.cursor.fromX,
        y: layout.cursor.fromY,
        scale: 0.8,
      },
      { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.8, ease: "expo.out" },
      1.08,
    );
    tl.to(core, { scale: 1.05, duration: 0.35, ease: "power2.out" }, 2.15);
    tl.to(cursor, { scale: 0.88, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out" }, 2.84);
    tl.to(shock, { opacity: 0.96, scale: 1.8, duration: 0.6, ease: "expo.out" }, 2.74);
    tl.to(fragments, { x: 0, y: 0, scale: 0.84, opacity: 0.38, duration: 0.62, ease: "power2.inOut" }, 2.94);
    tl.to(core, { scale: 1.42, duration: 0.4, ease: "power2.out" }, 2.98);
    tl.to(shock, { opacity: 0, scale: 2.5, duration: 0.4, ease: "power3.out" }, 3.18);
    tl.to([fragments, cursor], { opacity: 0.2, duration: 0.42, ease: "power2.out" }, 4.45);
    tl.to(ghost, { opacity: 0.07, duration: 5, ease: "sine.inOut" }, 0);
    addAmbient(tl, scene, ctx);
    window.__timelines[scene.compositionId] = tl;
  }

  function createGraphLines(stage, scene, layout, nodes) {
    const { layer, node: svgNode } = createSvgLayer(stage);
    const core = layout.core;
    const lines = [];
    const corePoint = { x: core.x, y: core.y };
    nodes.forEach((nodeSpec, index) => {
      const lineNode = line(
        svgNode,
        corePoint.x,
        corePoint.y,
        nodeSpec.x,
        nodeSpec.y,
        index % 2 === 0 ? "line-primary" : "line-cyan",
      );
      lines.push(lineNode);
    });
    return { layer, svgNode, lines };
  }

  function buildIgnite(ctx, scene) {
    const { stage, title, subline, kicker } = ctx;
    const layout = LAYOUTS.ignite[scene.variant];
    const ghost = ctx.ghost;
    const core = position(el("div", "core", stage), layout.core);
    const ring = position(el("div", "ring ring--cyan", stage), { ...layout.ring, w: layout.ring.w, h: layout.ring.w });
    const ring2 = position(el("div", "ring", stage), {
      x: layout.core.x,
      y: layout.core.y,
      w: layout.ring.w * 0.72,
      h: layout.ring.w * 0.72,
    });
    const nodes = layout.nodes.map((spec, index) => {
      const node = position(el("div", `node ${index % 3 === 0 ? "node--cyan" : ""}`.trim(), stage), spec);
      return node;
    });
    const cards = scene.labels.map((label, index) => {
      const cardData = createCard(stage, label, label, index % 2 === 0 ? "The engine assigns context automatically." : "Fresh answers assemble from the graph.");
      position(cardData.card, { ...layout.cards[index], anchor: "center" });
      return cardData.card;
    });
    const { svgNode, lines } = createGraphLines(stage, scene, layout, layout.nodes);
    svgNode.style.position = "absolute";
    svgNode.style.inset = "0";

    const tl = gsap.timeline({ paused: true });
    tl.fromTo([kicker, title, subline], { opacity: 0, y: 18, filter: "blur(16px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.56, stagger: 0.08, ease: "power4.out" }, 0.16);
    tl.fromTo(core, { opacity: 0, scale: 0.26, filter: "blur(20px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.7, ease: "expo.out" }, 0.35);
    tl.fromTo(ring, { opacity: 0, scale: 0.14 }, { opacity: 1, scale: 1, duration: 0.65, ease: "expo.out" }, 0.28);
    tl.fromTo(ring2, { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 0.75, ease: "power3.out" }, 0.42);
    tl.fromTo(lines, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.72, stagger: 0.06, ease: "power2.out" }, 0.7);
    tl.fromTo(
      nodes,
      { opacity: 0, scale: 0.28, filter: "blur(16px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.45, stagger: 0.08, ease: "back.out(1.8)" },
      0.76,
    );
    tl.fromTo(
      cards,
      { opacity: 0, y: scene.variant === "mobile" ? 100 : 60, scale: 0.94, filter: "blur(16px)", rotate: -4 },
      { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", rotate: 0, duration: 0.55, stagger: 0.07, ease: "power4.out" },
      1.1,
    );
    tl.to(ring, { rotation: 120, duration: 4.6, ease: "none" }, 0.28);
    tl.to(ring2, { rotation: -160, duration: 4.8, ease: "none" }, 0.2);
    tl.to(core, { scale: 1.12, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.out" }, 2.2);
    tl.to(cards, { y: -8, duration: 2.4, ease: "sine.inOut", stagger: 0.01 }, 2.2);
    tl.to(ghost, { opacity: 0.06, duration: 5, ease: "sine.inOut" }, 0);
    addAmbient(tl, scene, ctx);
    window.__timelines[scene.compositionId] = tl;
  }

  function buildPanel(stage, kind, label, body) {
    const card = el("article", "card glass-card motion-ready", stage);
    el("p", "card__eyebrow", card, label);
    el("h3", "card__title", card, label);
    el("p", "card__body", card, body);
    const bars = el("div", "card__bars", card);
    el("div", "card__bar card__bar--short", bars);
    el("div", "card__bar card__bar--med", bars);
    el("div", "card__bar card__bar--long", bars);

    if (kind === "timeline") {
      const rail = el("div", "timeline-rail", card);
      Object.assign(rail.style, {
        left: "16px",
        right: "16px",
        top: "58%",
        height: "4px",
      });
      const dot = el("div", "timeline-dot", card);
      Object.assign(dot.style, {
        left: "18px",
        top: "calc(58% - 6px)",
      });
      const marks = el("div", "timeline", card);
      createStep(marks, "Start");
      createStep(marks, "Explore");
      createStep(marks, "Resolve");
    }

    if (kind === "video") {
      const frame = el("div", "", card, null, {
        style: {
          marginTop: "12px",
          height: "68px",
          borderRadius: "16px",
          border: "1px solid rgba(189,167,255,0.22)",
          background:
            "linear-gradient(120deg, rgba(134,203,255,0.2), rgba(189,167,255,0.08)), linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
          position: "relative",
          overflow: "hidden",
        },
      });
      el("div", "", frame, null, {
        style: {
          position: "absolute",
          left: "-20%",
          top: "0",
          width: "22%",
          height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.24), transparent)",
          transform: "skewX(-28deg)",
          opacity: "0.66",
        },
      });
      el("div", "", frame, null, {
        style: {
          position: "absolute",
          inset: "12px 16px",
          borderRadius: "12px",
          background: "linear-gradient(180deg, rgba(4,4,10,0.24), rgba(4,4,10,0.55))",
        },
      });
    }

    if (kind === "diagram") {
      const diagram = el("div", "", card, null, {
        style: {
          marginTop: "12px",
          height: "72px",
          borderRadius: "16px",
          background:
            "radial-gradient(circle at 50% 50%, rgba(134,203,255,0.14), transparent 44%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
          position: "relative",
          overflow: "hidden",
        },
      });
      const svgNode = svg(diagram, "0 0 100 100");
      line(svgNode, 18, 74, 48, 40, "line-primary");
      line(svgNode, 48, 40, 78, 24, "line-cyan");
      line(svgNode, 48, 40, 64, 78, "line-muted");
      [18, 48, 78, 64].forEach((x, index) => {
        const dot = document.createElementNS(SVG_NS, "circle");
        dot.setAttribute("cx", String(x));
        dot.setAttribute("cy", String(index === 0 ? 74 : index === 1 ? 40 : index === 2 ? 24 : 78));
        dot.setAttribute("r", "4.5");
        dot.setAttribute("fill", index % 2 === 0 ? "#bda7ff" : "#86cbff");
        dot.setAttribute("opacity", "0.92");
        svgNode.appendChild(dot);
      });
    }

    if (kind === "explain") {
      const list = el("div", "", card, null, {
        style: {
          marginTop: "12px",
          display: "grid",
          gap: "8px",
        },
      });
      ["Structured prompt", "Visual response", "Guided follow-up"].forEach((copyLine, index) => {
        el("div", "", list, null, {
          style: {
            height: "8px",
            borderRadius: "999px",
            width: `${82 - index * 14}%`,
            background: "linear-gradient(90deg, rgba(189,167,255,0.2), rgba(134,203,255,0.8), rgba(189,167,255,0.14))",
          },
        });
      });
    }

    if (kind === "path") {
      const pathWrap = el("div", "", card, null, {
        style: {
          marginTop: "12px",
          display: "grid",
          gap: "10px",
        },
      });
      ["Start", "Connect", "Master"].forEach((step, index) => {
        const row = el("div", "", pathWrap, null, {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "10px",
          },
        });
        el("div", "", row, null, {
          style: {
            width: "9px",
            height: "9px",
            borderRadius: "50%",
            background: index === 2 ? "rgba(245,201,106,0.9)" : "rgba(189,167,255,0.9)",
            boxShadow: "0 0 14px rgba(189,167,255,0.22)",
          },
        });
        el("div", "micro", row, step);
      });
    }

    if (kind === "input") {
      const input = el("div", "", card, null, {
        style: {
          marginTop: "12px",
          height: "50px",
          borderRadius: "16px",
          border: "1px solid rgba(189,167,255,0.22)",
          background: "rgba(4,4,10,0.34)",
          position: "relative",
          overflow: "hidden",
        },
      });
      el("div", "", input, null, {
        style: {
          position: "absolute",
          left: "14px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "78%",
          height: "10px",
          borderRadius: "999px",
          background: "linear-gradient(90deg, rgba(189,167,255,0.22), rgba(134,203,255,0.76))",
        },
      });
      el("div", "", input, null, {
        style: {
          position: "absolute",
          right: "14px",
          top: "50%",
          width: "12px",
          height: "20px",
          borderRadius: "999px",
          transform: "translateY(-50%)",
          background: "rgba(245,201,106,0.82)",
          boxShadow: "0 0 18px rgba(245,201,106,0.36)",
        },
      });
    }

    if (kind === "tiles") {
      const tiles = el("div", "", card, null, {
        style: {
          marginTop: "12px",
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "10px",
        },
      });
      [1, 2, 3, 4].forEach((n) => {
        el("div", "", tiles, null, {
          style: {
            height: "30px",
            borderRadius: "10px",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02)), rgba(12,12,22,0.56)",
            border: "1px solid rgba(189,167,255,0.16)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)",
          },
        });
      });
    }

    return card;
  }

  function buildLayers(ctx, scene) {
    const { stage, title, subline, kicker } = ctx;
    const layout = LAYOUTS.layers[scene.variant];
    const ghost = ctx.ghost;
    const panels = scene.labels.map((label, index) => {
      const kind = ["timeline", "video", "diagram", "explain", "path"][index];
      const card = buildPanel(stage, kind, label, label === "Video" ? "A tiny motion sample keeps the frame alive." : "Every layer contributes to the explanation.");
      position(card, { ...layout.panels[index], anchor: "center" });
      return card;
    });
    const cursor = position(el("div", "cursor", stage), layout.cursor);
    const svgNode = svg(el("div", "line-layer", stage), "0 0 100 100");
    svgNode.style.position = "absolute";
    svgNode.style.inset = "0";
    const lineNode = path(svgNode, "M 24 52 C 35 50, 44 50, 52 50 S 70 50, 84 46", "line-cyan");
    const guideLine = path(svgNode, "M 17 82 C 27 68, 36 64, 47 54 S 68 38, 84 22", "line-primary");
    const orbit = position(el("div", "ring ring--cyan", stage), { x: 50, y: 49, w: scene.variant === "mobile" ? 68 : 60, h: scene.variant === "mobile" ? 68 : 60 });
    const orbit2 = position(el("div", "ring", stage), { x: 50, y: 49, w: scene.variant === "mobile" ? 50 : 42, h: scene.variant === "mobile" ? 50 : 42 });

    const tl = gsap.timeline({ paused: true });
    tl.fromTo([kicker, title, subline], { opacity: 0, y: 18, filter: "blur(16px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.56, stagger: 0.08, ease: "power4.out" }, 0.18);
    tl.fromTo(
      panels,
      { opacity: 0, y: scene.variant === "mobile" ? 90 : 60, scale: 0.92, filter: "blur(16px)", rotateY: -16, rotateX: 14 },
      { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", rotateY: 0, rotateX: 0, duration: 0.55, stagger: 0.08, ease: "power4.out" },
      0.72,
    );
    tl.fromTo(cursor, { opacity: 0, x: layout.cursor.fromX, y: layout.cursor.fromY, scale: 0.82 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.78, ease: "expo.out" }, 1.32);
    tl.fromTo(lineNode, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.72, ease: "power2.out" }, 1.32);
    tl.fromTo(guideLine, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.84, ease: "power2.out" }, 1.92);
    tl.to(cursor, { scale: 1.03, duration: 0.16, yoyo: true, repeat: 1, ease: "power2.out" }, 2.36);
    tl.to(panels[1], { scale: 1.12, y: -8, duration: 0.26, ease: "power2.out" }, 2.42);
    tl.to(panels[1], { scale: 1, y: 0, duration: 0.22, ease: "power2.inOut" }, 2.68);
    tl.to(panels, { y: -10, duration: 2.4, ease: "sine.inOut", stagger: 0.01 }, 2.28);
    tl.to(orbit, { rotation: 110, duration: 4.6, ease: "none" }, 0.24);
    tl.to(orbit2, { rotation: -120, duration: 4.4, ease: "none" }, 0.34);
    tl.to(ghost, { opacity: 0.06, duration: 5, ease: "sine.inOut" }, 0);
    addAmbient(tl, scene, ctx);
    window.__timelines[scene.compositionId] = tl;
  }

  function buildClarity(ctx, scene) {
    const { stage, title, subline, kicker } = ctx;
    const layout = LAYOUTS.clarity[scene.variant];
    const ghost = ctx.ghost;
    const fragmentNodes = (scene.fragments || ["Why does…", "How can I…", "Explain this…"]).map((text, index) => {
      const frag = el("div", "fragment fragment--soft", stage, text);
      position(frag, { ...layout.fragments[index], anchor: "center" });
      return frag;
    });
    const ring = position(el("div", "ring ring--amber", stage), { ...layout.ring, w: layout.ring.w, h: layout.ring.w });
    const ringCore = position(el("div", "core", stage), { x: layout.ring.x, y: layout.ring.y });
    const cursor = position(el("div", "cursor", stage), layout.cursor);
    const pathSvg = svg(el("div", "line-layer", stage), "0 0 100 100");
    pathSvg.style.position = "absolute";
    pathSvg.style.inset = "0";
    const rail = path(pathSvg, scene.variant === "mobile" ? "M 50 86 C 50 76, 50 70, 50 62 S 50 44, 50 24" : "M 18 80 C 31 70, 41 62, 50 52 S 69 36, 82 20", "line-primary");
    const guide = path(pathSvg, scene.variant === "mobile" ? "M 50 88 C 50 75, 50 64, 50 52 S 50 38, 50 22" : "M 18 76 C 31 66, 41 58, 50 48 S 69 32, 82 18", "line-cyan");
    const nodes = layout.pathNodes.map((spec, index) => {
      const nodeWrap = createPathNode(stage, scene.steps[index]);
      position(nodeWrap, { x: spec.x, y: spec.y, anchor: "center" });
      return nodeWrap;
    });
    const progressRing = position(el("div", "ring", stage), { x: layout.ring.x, y: layout.ring.y, w: layout.ring.w * 0.78, h: layout.ring.w * 0.78 });

    const tl = gsap.timeline({ paused: true });
    tl.fromTo([kicker, title, subline], { opacity: 0, y: 18, filter: "blur(16px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.56, stagger: 0.08, ease: "power4.out" }, 0.18);
    tl.fromTo(fragmentNodes, { opacity: 0, y: 24, scale: 0.92, filter: "blur(14px)" }, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.5, stagger: 0.08, ease: "power3.out" }, 0.52);
    tl.fromTo(cursor, { opacity: 0, x: layout.cursor.fromX, y: layout.cursor.fromY, scale: 0.82 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.72, ease: "expo.out" }, 0.94);
    tl.fromTo(rail, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.82, ease: "power2.out" }, 1.2);
    tl.fromTo(guide, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, ease: "power2.out" }, 1.66);
    tl.fromTo(nodes, { opacity: 0, scale: 0.3, filter: "blur(14px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.4, stagger: 0.11, ease: "back.out(1.9)" }, 1.68);
    tl.fromTo(progressRing, { opacity: 0, scale: 0.28 }, { opacity: 1, scale: 1, duration: 0.62, ease: "expo.out" }, 1.78);
    tl.fromTo(ring, { opacity: 0, scale: 0.18 }, { opacity: 1, scale: 1, duration: 0.68, ease: "expo.out" }, 1.32);
    tl.fromTo(ringCore, { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 0.58, ease: "power3.out" }, 1.4);
    tl.to(progressRing, { scale: 1.06, duration: 0.22, yoyo: true, repeat: 1, ease: "power2.out" }, 2.75);
    tl.to(nodes, { color: "#f5f4ff", duration: 0.18 }, 2.36);
    tl.to(ring, { rotation: 140, duration: 4.5, ease: "none" }, 0.32);
    tl.to(progressRing, { rotation: -110, duration: 4.2, ease: "none" }, 0.26);
    tl.to(fragmentNodes, { opacity: 0.18, duration: 0.44, ease: "power2.out" }, 4.34);
    tl.to(ghost, { opacity: 0.055, duration: 5, ease: "sine.inOut" }, 0);
    addAmbient(tl, scene, ctx);
    window.__timelines[scene.compositionId] = tl;
  }

  function buildEngine(ctx, scene) {
    const { stage, title, subline, kicker } = ctx;
    const layout = LAYOUTS.engine[scene.variant];
    const ghost = ctx.ghost;
    const frame = el("div", "interface-frame", stage);
    position(frame, layout.frame);
    frame.style.width = `${layout.frame.w}%`;
    frame.style.height = `${layout.frame.h}%`;
    const header = el("div", "interface-frame__header", frame);
    const dots = el("div", "interface-frame__dots", header);
    el("div", "interface-frame__dot", dots);
    el("div", "interface-frame__dot", dots);
    el("div", "interface-frame__dot", dots);
    el("div", "micro", header, "AKEE / learning engine");
    const body = el("div", "interface-frame__body", frame);
    const field = el("div", "card glass-card motion-ready", body);
    field.style.position = "relative";
    field.style.marginBottom = "16px";
    el("p", "card__eyebrow", field, "Question input");
    el("h3", "card__title", field, "How does a question become an experience?");
    el("p", "card__body", field, "AKEE routes the question into visuals, timelines, and guided follow-up.");

    const tileGrid = el("div", "", body, null, {
      style: {
        display: "grid",
        gridTemplateColumns: scene.variant === "mobile" ? "repeat(2, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))",
        gap: "14px",
      },
    });
    const tileNames = scene.labels;
    const tiles = tileNames.map((label, index) => {
      const tile = el("div", "card glass-card--tight", tileGrid);
      el("p", "card__eyebrow", tile, label);
      el("h3", "card__title", tile, index % 2 === 0 ? "Adaptive" : "Guided");
      el(
        "p",
        "card__body",
        tile,
        index % 2 === 0 ? "Relevant surfaces assemble in sequence." : "Each layer adjusts to the topic.",
      );
      return tile;
    });
    const cursor = position(el("div", "cursor", stage), layout.cursor);
    const rings = layout.rings.map((spec, index) => {
      const ring = position(el("div", `ring ${index === 0 ? "ring--cyan" : index === 2 ? "ring--gold" : ""}`.trim(), stage), {
        x: spec.x,
        y: spec.y,
        w: spec.w,
        h: spec.w,
      });
      return ring;
    });

    const tl = gsap.timeline({ paused: true });
    tl.fromTo([kicker, title, subline], { opacity: 0, y: 18, filter: "blur(16px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.56, stagger: 0.08, ease: "power4.out" }, 0.18);
    tl.fromTo(frame, { opacity: 0, scale: 0.72, y: 32, filter: "blur(20px)", rotateX: 16 }, { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", rotateX: 0, duration: 0.8, ease: "expo.out" }, 0.64);
    tl.fromTo(cursor, { opacity: 0, x: layout.cursor.fromX, y: layout.cursor.fromY, scale: 0.82 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.76, ease: "expo.out" }, 1.08);
    tl.fromTo(tiles, { opacity: 0, y: 24, scale: 0.92, filter: "blur(16px)" }, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.42, stagger: 0.06, ease: "power3.out" }, 1.32);
    rings.forEach((ring, index) => {
      tl.fromTo(ring, { opacity: 0, scale: 0.18 }, { opacity: 1, scale: 1, duration: 0.72, ease: "expo.out" }, 0.96 + index * 0.1);
      tl.to(ring, { rotation: index % 2 === 0 ? 120 : -140, duration: 4.6 - index * 0.1, ease: "none" }, 0.3 + index * 0.08);
    });
    tl.to(cursor, { scale: 0.9, duration: 0.14, yoyo: true, repeat: 1, ease: "power2.out" }, 2.72);
    tl.to(field, { y: -8, duration: 0.3, ease: "power2.out" }, 2.48);
    tl.to(frame, { scale: 1.02, duration: 0.22, yoyo: true, repeat: 1, ease: "power2.out" }, 3.12);
    tl.to(ghost, { opacity: 0.06, duration: 5, ease: "sine.inOut" }, 0);
    addAmbient(tl, scene, ctx);
    window.__timelines[scene.compositionId] = tl;
  }

  function buildBrand(ctx, scene) {
    const { stage, title, subline, kicker } = ctx;
    const layout = LAYOUTS.brand[scene.variant];
    const ghost = ctx.ghost;
    const lockup = el("div", "brand-lockup", ctx.hero);
    lockup.style.maxWidth = scene.variant === "mobile" ? "100%" : "920px";
    const lineEl = el("div", "accent-line accent-line--gold", lockup);
    const cta = createCta(lockup, scene.cta);
    const url = el("div", "brand-url", lockup, scene.url);
    gsap.set([lineEl, cta, url], { opacity: 0 });
    const cursor = position(el("div", "cursor", stage), layout.cursor);
    const ring = position(el("div", "ring ring--gold", stage), {
      x: 50,
      y: 50,
      w: scene.variant === "mobile" ? 78 : 62,
      h: scene.variant === "mobile" ? 78 : 62,
    });
    const ring2 = position(el("div", "ring ring--cyan", stage), {
      x: 50,
      y: 50,
      w: scene.variant === "mobile" ? 56 : 42,
      h: scene.variant === "mobile" ? 56 : 42,
    });
    const pathSvg = svg(el("div", "line-layer", stage), "0 0 100 100");
    pathSvg.style.position = "absolute";
    pathSvg.style.inset = "0";
    const branch = pathSvg;
    const branchLines = [
      line(branch, 14, 24, 36, 34, "line-muted"),
      line(branch, 84, 26, 64, 34, "line-muted"),
      line(branch, 22, 76, 36, 64, "line-muted"),
      line(branch, 78, 74, 64, 64, "line-muted"),
      line(branch, 50, 48, 50, 50, "line-amber"),
    ];
    const dots = [
      position(el("div", "node", stage), { x: 14, y: 24 }),
      position(el("div", "node node--cyan", stage), { x: 84, y: 26 }),
      position(el("div", "node node--cyan", stage), { x: 22, y: 76 }),
      position(el("div", "node node--amber", stage), { x: 78, y: 74 }),
    ];

    const tl = gsap.timeline({ paused: true });
    tl.fromTo([kicker, title, subline], { opacity: 0, y: 18, filter: "blur(16px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.52, stagger: 0.08, ease: "power4.out" }, 0.18);
    tl.fromTo(lineEl, { scaleX: 0, transformOrigin: "center center" }, { opacity: 1, scaleX: 1, duration: 0.48, ease: "power3.out" }, 1.26);
    tl.fromTo(cta, { opacity: 0, y: 18, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, 1.72);
    tl.fromTo(url, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.32, ease: "power2.out" }, 2.02);
    tl.fromTo(cursor, { opacity: 0, x: layout.cursor.fromX, y: layout.cursor.fromY, scale: 0.82 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.72, ease: "expo.out" }, 2.26);
    tl.fromTo(branchLines, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.64, stagger: 0.06, ease: "power2.out" }, 0.54);
    tl.fromTo(dots, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.34, stagger: 0.08, ease: "back.out(1.8)" }, 0.64);
    tl.fromTo(ring, { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 0.72, ease: "expo.out" }, 0.36);
    tl.fromTo(ring2, { opacity: 0, scale: 0.26 }, { opacity: 1, scale: 1, duration: 0.72, ease: "expo.out" }, 0.44);
    tl.to(ring, { rotation: 110, duration: 4.6, ease: "none" }, 0.26);
    tl.to(ring2, { rotation: -140, duration: 4.2, ease: "none" }, 0.32);
    tl.to(cursor, { scale: 0.9, duration: 0.14, yoyo: true, repeat: 1, ease: "power2.out" }, 3.16);
    tl.to(cta, { scale: 1.03, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, 3.08);
    tl.to(ghost, { opacity: 0.05, duration: 5, ease: "sine.inOut" }, 0);
    addAmbient(tl, scene, ctx);
    window.__timelines[scene.compositionId] = tl;
  }

  function createSceneRoot(scene) {
    const root = document.getElementById(scene.compositionId);
    if (!root) {
      throw new Error(`Missing root element for ${scene.compositionId}`);
    }
    root.dataset.variant = scene.variant;
    root.dataset.copyAlign = scene.copyAlign || "center";
    root.dataset.sceneType = scene.type;
    root.dataset.sceneId = scene.id;
    return root;
  }

  function mount(sceneId) {
    const scene = SCENES[sceneId];
    if (!scene) throw new Error(`Unknown AKEE scene: ${sceneId}`);
    const root = createSceneRoot(scene);
    const ctx = buildBackdrop(root, scene);
    ctx.rng = seeded(scene.seed || 1);
    ctx.particles = addParticles(ctx.particleLayer, scene, ctx.rng);

    if (scene.type === "void") {
      buildVoid(ctx, scene);
    } else if (scene.type === "ignite") {
      buildIgnite(ctx, scene);
    } else if (scene.type === "layers") {
      buildLayers(ctx, scene);
    } else if (scene.type === "clarity") {
      buildClarity(ctx, scene);
    } else if (scene.type === "engine") {
      buildEngine(ctx, scene);
    } else if (scene.type === "brand") {
      buildBrand(ctx, scene);
    } else {
      throw new Error(`Unsupported scene type: ${scene.type}`);
    }

    if (ctx.subline && !scene.subline) {
      ctx.subline.remove();
    }
    return ctx;
  }

  AKEE.mount = mount;
  AKEE.seeded = seeded;
  AKEE.pick = pick;
})();
