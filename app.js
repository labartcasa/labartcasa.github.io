document.addEventListener("DOMContentLoaded", function () {
  setupDiagram();
});

/**
 * Create and animate the conceptual diagram.
 * Animated diagram: person asking storage table for an item.
 */
function setupDiagram() {
  const container = document.querySelector(".diagram-container");
  if (!container) return;

  // Check motion preferences
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const width = 560;
  const height = 220;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("role", "img");
  svg.setAttribute(
    "aria-label",
    "User making a short spoken request to storage furniture which selects a compartment."
  );
  svg.classList.add("diagram-svg");
  container.appendChild(svg);

  const NS = "http://www.w3.org/2000/svg";

  // Helper to create SVG elements.
  function makeEl(tag, attrs) {
    const el = document.createElementNS(NS, tag);
    for (const [key, value] of Object.entries(attrs || {})) {
      el.setAttribute(key, String(value));
    }
    return el;
  }

  // Add gradient definitions for futuristic look
  const defs = makeEl("defs", {});
  defs.innerHTML = `
    <linearGradient id="userGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4f8ef7"/>
      <stop offset="100%" stop-color="#1e56d0"/>
    </linearGradient>
    <linearGradient id="tableGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#e8ecf3"/>
      <stop offset="100%" stop-color="#c8d0dc"/>
    </linearGradient>
  `;
  svg.appendChild(defs);

  // Positions: person left, table right (bigger curve distance), table lower
  const userX = 70;
  const userY = height / 2 + 10;

  // Table: flat top + two legs, moved down toward floor
  const tableTopX = 380;
  const tableTopY = height / 2 + 8;
  const tableTopWidth = 150;
  const tableTopHeight = 10;
  const legHeight = 32;
  const legWidth = 10;

  // Ground line with gradient fade
  const ground = makeEl("line", {
    x1: 60,
    y1: userY + 40,
    x2: width - 40,
    y2: userY + 40,
    stroke: "#d0d8e8",
    "stroke-width": 1.5,
    "stroke-linecap": "round",
    opacity: 0.6,
  });
  svg.appendChild(ground);

  // Person: slightly stylised figure
  const personGroup = makeEl("g", {});
  svg.appendChild(personGroup);

  const head = makeEl("circle", {
    cx: userX,
    cy: userY - 30,
    r: 15,
    class: "diagram-user",
  });
  personGroup.appendChild(head);

  const body = makeEl("path", {
    d: `M ${userX} ${userY - 14} L ${userX} ${userY + 14}`,
    stroke: "#4f8ef7",
    "stroke-width": 2.5,
    "stroke-linecap": "round",
    fill: "none",
  });
  personGroup.appendChild(body);

  const leftArm = makeEl("path", {
    d: `M ${userX} ${userY - 4} L ${userX - 18} ${userY + 6}`,
    stroke: "#4f8ef7",
    "stroke-width": 2,
    "stroke-linecap": "round",
    fill: "none",
  });
  const rightArm = makeEl("path", {
    d: `M ${userX} ${userY - 4} L ${userX + 22} ${userY + 2}`,
    stroke: "#4f8ef7",
    "stroke-width": 2,
    "stroke-linecap": "round",
    fill: "none",
  });
  personGroup.appendChild(leftArm);
  personGroup.appendChild(rightArm);

  const leftLeg = makeEl("path", {
    d: `M ${userX} ${userY + 14} L ${userX - 12} ${userY + 36}`,
    stroke: "#4f8ef7",
    "stroke-width": 2,
    "stroke-linecap": "round",
    fill: "none",
  });
  const rightLeg = makeEl("path", {
    d: `M ${userX} ${userY + 14} L ${userX + 12} ${userY + 36}`,
    stroke: "#4f8ef7",
    "stroke-width": 2,
    "stroke-linecap": "round",
    fill: "none",
  });
  personGroup.appendChild(leftLeg);
  personGroup.appendChild(rightLeg);

  const userLabel = makeEl("text", {
    x: userX,
    y: userY + 52,
    "text-anchor": "middle",
    class: "diagram-label",
  });
  userLabel.textContent = "You";
  personGroup.appendChild(userLabel);

  // Furniture: table = flat top + two legs
  const furnitureGroup = makeEl("g", {});
  svg.appendChild(furnitureGroup);

  const tableTop = makeEl("rect", {
    x: tableTopX,
    y: tableTopY,
    width: tableTopWidth,
    height: tableTopHeight,
    rx: 4,
    ry: 4,
    class: "diagram-storage",
  });
  furnitureGroup.appendChild(tableTop);

  const leftLegTable = makeEl("rect", {
    x: tableTopX + 18,
    y: tableTopY + tableTopHeight,
    width: legWidth,
    height: legHeight,
    fill: "url(#tableGradient)",
    stroke: "#a0aec0",
    "stroke-width": 1,
    rx: 2,
    ry: 2,
  });
  const rightLegTable = makeEl("rect", {
    x: tableTopX + tableTopWidth - 18 - legWidth,
    y: tableTopY + tableTopHeight,
    width: legWidth,
    height: legHeight,
    fill: "url(#tableGradient)",
    stroke: "#a0aec0",
    "stroke-width": 1,
    rx: 2,
    ry: 2,
  });
  furnitureGroup.appendChild(leftLegTable);
  furnitureGroup.appendChild(rightLegTable);

  // Compartment indicator on table surface (small band)
  const compartmentStrip = makeEl("rect", {
    x: tableTopX + 24,
    y: tableTopY + 2,
    width: tableTopWidth - 48,
    height: 6,
    rx: 3,
    ry: 3,
    class: "diagram-compartment",
  });
  furnitureGroup.appendChild(compartmentStrip);

  const compartmentDot = makeEl("circle", {
    cx: tableTopX + tableTopWidth / 2,
    cy: tableTopY + tableTopHeight / 2,
    r: 4,
    class: "diagram-compartment",
  });
  furnitureGroup.appendChild(compartmentDot);

  const tableLabel = makeEl("text", {
    x: tableTopX + tableTopWidth / 2,
    y: tableTopY + tableTopHeight + legHeight + 18,
    "text-anchor": "middle",
    class: "diagram-label",
  });
  tableLabel.textContent = "Storage table";
  furnitureGroup.appendChild(tableLabel);

  // Dashed path: from person toward table (curve)
  const pathStartX = userX + 28;
  const pathStartY = userY - 12;
  const pathEndX = tableTopX - 14;
  const pathEndY = tableTopY + tableTopHeight / 2;

  const controlX = (pathStartX + pathEndX) / 2;
  const controlY = pathStartY - 32;

  const pathCurve = makeEl("path", {
    d: `M ${pathStartX} ${pathStartY} Q ${controlX} ${controlY} ${pathEndX} ${pathEndY}`,
    stroke: "#d0d7df",
    "stroke-width": 1.4,
    fill: "none",
    "stroke-linecap": "round",
    "stroke-dasharray": "6 5",
  });
  svg.appendChild(pathCurve);

  // Voice waves near the head
  const waveGroup = makeEl("g", {});
  const wave1 = makeEl("path", {
    d: `M ${userX + 22} ${userY - 30} q 10 -6 22 0`,
    class: "diagram-wave-line",
  });
  const wave2 = makeEl("path", {
    d: `M ${userX + 20} ${userY - 24} q 12 -7 26 0`,
    class: "diagram-wave-line",
  });
  waveGroup.appendChild(wave1);
  waveGroup.appendChild(wave2);
  svg.appendChild(waveGroup);

  // Speech capsule: content centered at (0,0) so translate(x,y) puts it ON the path
  const capsuleWidth = 160;
  const capsuleHeight = 24;
  const capsuleGroup = makeEl("g", {});
  const capsuleBody = makeEl("rect", {
    x: -capsuleWidth / 2,
    y: -capsuleHeight / 2,
    width: capsuleWidth,
    height: capsuleHeight,
    rx: capsuleHeight / 2,
    ry: capsuleHeight / 2,
    class: "diagram-bubble",
  });
  const capsuleText = makeEl("text", {
    x: -capsuleWidth / 2 + 12,
    y: 4,
    class: "diagram-bubble-text",
  });
  capsuleText.textContent = "";
  capsuleGroup.appendChild(capsuleBody);
  capsuleGroup.appendChild(capsuleText);
  svg.appendChild(capsuleGroup);

  // Predefined queries that rotate over time.
  const queries = [
    "Where are my keys?",
    "Where did I put my headphones?",
    "I need scissors.",
    "Find my glasses.",
    "Something to cut paper.",
    "My USB-C cable.",
  ];

  let currentQueryIndex = 0;
  function pickNextQuery() {
    // Avoid repeating the same phrase consecutively.
    const previousIndex = currentQueryIndex;
    let index = Math.floor(Math.random() * queries.length);
    if (index === previousIndex) {
      index = (index + 1) % queries.length;
    }
    currentQueryIndex = index;
    return queries[index];
  }

  // Initial text.
  capsuleText.textContent = queries[currentQueryIndex];

  // Quadratic Bezier interpolation along the curve
  function pointOnCurve(t) {
    const x =
      (1 - t) * (1 - t) * pathStartX +
      2 * (1 - t) * t * controlX +
      t * t * pathEndX;
    const y =
      (1 - t) * (1 - t) * pathStartY +
      2 * (1 - t) * t * controlY +
      t * t * pathEndY;
    return { x, y };
  }

  let animationFrameId;
  let cycleTimeoutId;
  let highlightTimeoutId;

  function setCapsulePosition(t) {
    const { x, y } = pointOnCurve(t);
    capsuleGroup.setAttribute("transform", `translate(${x}, ${y})`);
  }

  function setActiveState(isActive) {
    if (isActive) {
      tableTop.classList.add("diagram-storage--active");
      compartmentDot.classList.add("diagram-compartment--active");
    } else {
      tableTop.classList.remove("diagram-storage--active");
      compartmentDot.classList.remove("diagram-compartment--active");
    }
  }

  function runCycle() {
    const phrase = pickNextQuery();
    capsuleText.textContent = phrase;
    setActiveState(false);
    setCapsulePosition(0);

    const duration = 2200; // ms
    const highlightDuration = 650; // ms
    let startTime = null;

    // brief voice waves at the start of each cycle
    waveGroup.setAttribute("opacity", "1");
    window.setTimeout(() => {
      waveGroup.setAttribute("opacity", "0");
    }, 500);

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const tRaw = elapsed / duration;
      const t = Math.max(0, Math.min(1, tRaw));

      // Ease-in-out for gentler movement.
      const eased = 0.5 - 0.5 * Math.cos(Math.PI * t);
      setCapsulePosition(eased);

      if (t < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        // Highlight storage briefly when the query "arrives".
        setActiveState(true);
        if (highlightTimeoutId) clearTimeout(highlightTimeoutId);
        highlightTimeoutId = window.setTimeout(() => {
          setActiveState(false);
        }, highlightDuration);

        // Schedule the next cycle after a short pause.
        cycleTimeoutId = window.setTimeout(runCycle, 900);
      }
    }

    animationFrameId = requestAnimationFrame(step);
  }

  if (!prefersReducedMotion) {
    // Start animated cycles
    runCycle();
  } else {
    // Static diagram: keep a single query near the person, no motion.
    capsuleText.textContent = "Where are my keys?";
    setCapsulePosition(0);
    setActiveState(false);
  }

  // Clean up if needed in the future (not strictly necessary for a static page).
  window.addEventListener("beforeunload", function () {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    if (cycleTimeoutId) clearTimeout(cycleTimeoutId);
    if (highlightTimeoutId) clearTimeout(highlightTimeoutId);
  });
}
