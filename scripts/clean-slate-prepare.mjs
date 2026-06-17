#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { accessSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rel = (...parts) => path.join(ROOT, ...parts);

const ACTIVE_RENDER_DIR = "render/current";
const ACTIVE_RENDER_FILE = "render/current/index.html";
const MANIFEST_FILE = "render/current/manifest.json";
const MIRROR_STAGING_DIR = ".render-work/render-staging";
const SEGMENTED_PROJECT_ROOT = "render/current/akee-30s";
const SEGMENTED_PROJECT_INDEX = "render/current/akee-30s/index.html";

const GENERATED_RENDER_DIRS = [
  "render/active",
  "render/output",
  "render/out",
  "render/dist",
  "render/tmp",
  "render/cache",
  "renders",
  "out",
  "output",
  "frames",
  "dist",
  "tmp",
  "temp",
  ".github-render-staging",
  "mirror-staging",
  MIRROR_STAGING_DIR,
  ".render-work/downloads",
];

const STALE_RENDER_FILENAMES = new Set([
  "active-render.html",
  "current-render.html",
  "render.html",
  "index.render.html",
  "scene.render.html",
]);

const MANIFEST = {
  protocol: "Clean-Slate Protocol",
  project: "current-project",
  activeRenderDir: ACTIVE_RENDER_DIR,
  activeRenderFile: ACTIVE_RENDER_FILE,
  mirrorStagingDir: MIRROR_STAGING_DIR,
  renderMode: "github-actions-only",
  localFinalRenderAllowed: false,
};

function segmentedTargets(variantName) {
  return Array.from({ length: 6 }, (_, index) => {
    const segmentNumber = String(index + 1).padStart(2, "0");
    return `${SEGMENTED_PROJECT_ROOT}/${variantName}/segment-${segmentNumber}.html`;
  });
}

function hasSegmentedProject() {
  if (!exists(SEGMENTED_PROJECT_INDEX)) return false;
  return [...segmentedTargets("mobile"), ...segmentedTargets("web")].every((target) => exists(target));
}

function buildSegmentedManifest() {
  const mobileSegments = segmentedTargets("mobile");
  const webSegments = segmentedTargets("web");

  return {
    protocol: "Clean-Slate Protocol",
    project: "akee-30s-cinematic-promo",
    projectRoot: SEGMENTED_PROJECT_ROOT,
    projectIndex: SEGMENTED_PROJECT_INDEX,
    hubFile: ACTIVE_RENDER_FILE,
    activeRenderDir: ACTIVE_RENDER_DIR,
    activeRenderFile: ACTIVE_RENDER_FILE,
    manifestFile: MANIFEST_FILE,
    mirrorStagingDir: MIRROR_STAGING_DIR,
    renderMode: "github-actions-only",
    localFinalRenderAllowed: false,
    durationSeconds: 30,
    segmentDurationSeconds: 5,
    activeRenderTargets: [...mobileSegments, ...webSegments],
    finalOutputs: ["akee-mobile-30s.mp4", "akee-web-30s.mp4"],
    variants: {
      mobile: {
        size: "1080x1920",
        aspectRatio: "9:16",
        projectRoot: `${SEGMENTED_PROJECT_ROOT}/mobile`,
        segments: mobileSegments,
      },
      web: {
        size: "1920x1080",
        aspectRatio: "16:9",
        projectRoot: `${SEGMENTED_PROJECT_ROOT}/web`,
        segments: webSegments,
      },
    },
  };
}

function exists(relativePath) {
  try {
    accessSync(rel(relativePath));
    return true;
  } catch {
    return false;
  }
}

function describe(relativePath) {
  return exists(relativePath) ? "present" : "missing";
}

function remove(relativePath, reason, removed) {
  if (!exists(relativePath)) return;
  rmSync(rel(relativePath), { recursive: true, force: true });
  removed.push(`${relativePath} (${reason})`);
}

function scanForStaleFiles() {
  const matches = [];
  const stack = ["."];

  while (stack.length > 0) {
    const current = stack.pop();
    const absCurrent = rel(current);
    let entries = [];

    try {
      entries = readdirSync(absCurrent, { withFileTypes: true });
    } catch {
      continue;
    }

    for (const entry of entries) {
      const childRel = current === "." ? entry.name : path.posix.join(current, entry.name);
      const normalized = childRel.replaceAll(path.sep, "/");

      if (normalized === ".git" || normalized.startsWith(".git/")) continue;
      if (normalized.startsWith(".render-work/")) continue;
      if (normalized.startsWith(".agents/skills/")) continue;

      if (entry.isDirectory()) {
        stack.push(childRel);
        continue;
      }

      if (STALE_RENDER_FILENAMES.has(path.basename(normalized))) {
        matches.push(normalized);
      }
    }
  }

  return matches;
}

function printJson(label, value) {
  console.log(`${label}: ${JSON.stringify(value, null, 2)}`);
}

const removed = [];

console.log("[Clean-Slate Protocol] Inspecting current render environment");
try {
  const status = execFileSync("git", ["status", "--short", "--branch"], {
    cwd: ROOT,
    encoding: "utf8",
  }).trimEnd();
  if (status) {
    console.log(status);
  }
} catch (error) {
  console.warn(`[Clean-Slate Protocol] git status unavailable: ${error.message}`);
}

printJson("[Clean-Slate Protocol] State", {
  activeRenderDir: describe(ACTIVE_RENDER_DIR),
  activeRenderFile: describe(ACTIVE_RENDER_FILE),
  manifest: describe(MANIFEST_FILE),
});

for (const dir of GENERATED_RENDER_DIRS) {
  remove(dir, "generated render artifact", removed);
}

for (const staleFile of scanForStaleFiles()) {
  remove(staleFile, "stale generated HTML filename", removed);
}

mkdirSync(rel(ACTIVE_RENDER_DIR), { recursive: true });

const segmentedMode = hasSegmentedProject();
const indexHtml = segmentedMode
  ? `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <title>AKEE 30s Promo | Render Hub</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      :root {
        color-scheme: dark;
        --bg: #04050a;
        --panel: rgba(14, 14, 22, 0.84);
        --line: rgba(255, 255, 255, 0.12);
        --text: #f7f5ff;
        --muted: rgba(247, 245, 255, 0.68);
        --accent: #d92d20;
        --gold: #f5c96a;
      }
      * {
        box-sizing: border-box;
      }
      html,
      body {
        width: 100%;
        height: 100%;
        margin: 0;
        overflow: hidden;
        color: var(--text);
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background:
          radial-gradient(circle at 16% 18%, rgba(217, 45, 32, 0.2), transparent 26%),
          radial-gradient(circle at 82% 22%, rgba(245, 201, 106, 0.1), transparent 24%),
          linear-gradient(180deg, #101116 0%, var(--bg) 100%);
      }
      #root {
        position: relative;
        width: 1920px;
        height: 1080px;
        padding: 86px 104px;
      }
      .panel {
        height: 100%;
        padding: 64px;
        border: 1px solid var(--line);
        border-radius: 28px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02)), var(--panel);
        box-shadow: 0 34px 120px rgba(0, 0, 0, 0.38);
      }
      .kicker {
        margin: 0 0 20px;
        color: var(--gold);
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }
      h1 {
        max-width: 1120px;
        margin: 0;
        font-size: 88px;
        line-height: 0.98;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 24px;
        margin-top: 54px;
      }
      .card {
        min-height: 250px;
        padding: 30px;
        border: 1px solid var(--line);
        border-radius: 22px;
        background: rgba(5, 6, 10, 0.42);
      }
      h2 {
        margin: 0;
        font-size: 34px;
      }
      p {
        max-width: 720px;
        margin: 16px 0 0;
        color: var(--muted);
        font-size: 22px;
        line-height: 1.42;
      }
      code {
        display: block;
        margin-top: 22px;
        color: var(--accent);
        font-size: 18px;
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <main id="root" data-composition-id="akee-render-hub" data-width="1920" data-height="1080" data-duration="5">
      <section class="panel clip" data-start="0" data-duration="5" data-track-index="1">
        <p class="kicker">AKEE / render workspace</p>
        <h1>Segmented render hub for the 30-second cinematic promo.</h1>
        <div class="grid">
          <article class="card">
            <h2>Mobile</h2>
            <p>Six 5-second portrait segments render from the shared project root.</p>
            <code>mobile/segment-01.html ... segment-06.html</code>
          </article>
          <article class="card">
            <h2>Web</h2>
            <p>Six 5-second landscape segments render from the same HyperFrames project root.</p>
            <code>web/segment-01.html ... segment-06.html</code>
          </article>
        </div>
      </section>
    </main>
    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });
      tl.from(".panel", { y: 28, opacity: 0, duration: 0.6, ease: "power3.out" }, 0.12);
      tl.from(".card", { y: 18, opacity: 0, duration: 0.45, stagger: 0.06, ease: "power2.out" }, 0.38);
      window.__timelines["akee-render-hub"] = tl;
    </script>
  </body>
</html>
`
  : `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <title>HyperFrames Clean-Slate Protocol Workspace</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      :root {
        color-scheme: dark;
        --bg: #06070a;
        --panel: rgba(255, 255, 255, 0.04);
        --panel-border: rgba(255, 255, 255, 0.09);
        --text: #f5f2ee;
        --muted: rgba(245, 242, 238, 0.7);
        --accent: #d92d20;
        --glow: rgba(217, 45, 32, 0.24);
      }
      html,
      body {
        margin: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background:
          radial-gradient(circle at 50% 38%, rgba(217, 45, 32, 0.18), transparent 34%),
          radial-gradient(circle at 50% 120%, rgba(217, 45, 32, 0.08), transparent 28%),
          linear-gradient(180deg, #0b0c10 0%, #06070a 100%);
        color: var(--text);
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      #root {
        position: relative;
        width: 1920px;
        height: 1080px;
        overflow: hidden;
      }
      .scene {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        padding: 120px 160px;
        box-sizing: border-box;
      }
      .panel {
        position: relative;
        width: min(1240px, 100%);
        padding: 84px 92px;
        border: 1px solid var(--panel-border);
        border-radius: 32px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.03));
        box-shadow:
          0 28px 120px rgba(0, 0, 0, 0.42),
          0 0 0 1px rgba(255, 255, 255, 0.02) inset,
          0 0 80px var(--glow);
        backdrop-filter: blur(14px);
      }
      .kicker {
        margin: 0 0 18px;
        color: var(--accent);
        letter-spacing: 0.24em;
        text-transform: uppercase;
        font-size: 20px;
        font-weight: 700;
      }
      h1 {
        margin: 0;
        font-size: 88px;
        line-height: 0.96;
        letter-spacing: -0.04em;
      }
      p {
        margin: 24px 0 0;
        max-width: 860px;
        color: var(--muted);
        font-size: 28px;
        line-height: 1.4;
      }
      .rule {
        width: 160px;
        height: 4px;
        margin: 0 0 28px;
        border-radius: 999px;
        background: linear-gradient(90deg, var(--accent), rgba(217, 45, 32, 0.18));
        box-shadow: 0 0 24px rgba(217, 45, 32, 0.4);
      }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-width="1920" data-height="1080" data-duration="5">
      <section id="scene" class="scene clip" data-start="0" data-duration="5" data-track-index="1">
        <div class="panel">
          <div class="rule"></div>
          <p class="kicker">Clean-Slate Protocol ready</p>
          <h1>render/current/index.html</h1>
          <p>This placeholder is the fresh active render target. Replace it when the next Clean-Slate Protocol starts.</p>
        </div>
      </section>
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });
      tl.from(".panel", { y: 42, opacity: 0, duration: 0.75, ease: "power3.out" }, 0.15);
      tl.from(".rule", { scaleX: 0, transformOrigin: "left center", duration: 0.55, ease: "power2.out" }, 0.28);
      tl.from(".kicker", { y: 10, opacity: 0, duration: 0.45, ease: "sine.out" }, 0.34);
      tl.from("h1", { y: 12, opacity: 0, duration: 0.6, ease: "expo.out" }, 0.42);
      tl.from("p:last-of-type", { y: 12, opacity: 0, duration: 0.5, ease: "power2.out" }, 0.54);
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`;

writeFileSync(rel(ACTIVE_RENDER_FILE), indexHtml, "utf8");
writeFileSync(rel(MANIFEST_FILE), `${JSON.stringify(segmentedMode ? buildSegmentedManifest() : MANIFEST, null, 2)}\n`, "utf8");

console.log("[Clean-Slate Protocol] Cleanup summary");
if (removed.length === 0) {
  console.log("- no stale generated render artifacts were found");
} else {
  for (const entry of removed) {
    console.log(`- removed ${entry}`);
  }
}

console.log("[Clean-Slate Protocol] Fresh workspace created");
console.log(`- active render file: ${ACTIVE_RENDER_FILE}`);
console.log(`- manifest: ${MANIFEST_FILE}`);
