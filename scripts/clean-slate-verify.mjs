#!/usr/bin/env node
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rel = (...parts) => path.join(ROOT, ...parts);
const toPosix = (p) => p.replaceAll(path.sep, "/");

const ACTIVE_RENDER_DIR = "render/current";
const ACTIVE_RENDER_FILE = "render/current/index.html";
const MANIFEST_FILE = "render/current/manifest.json";
const MIRROR_STAGING_DIR = ".render-work/render-staging";

const GENERATED_RENDER_DIRS = [
  "render/current",
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
];

const BASE_MIRROR_FILES = new Set([
  ".gitignore",
  ".github/workflows/render.yml",
  "package.json",
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "scripts/clean-slate-prepare.mjs",
  "scripts/clean-slate-verify.mjs",
  "render/current/index.html",
  "render/current/manifest.json",
]);

const FORBIDDEN_TOKENS = [
  "clean-room",
  "Clean-Room",
  "preflight",
  "hyperframes:preflight",
  "hyperframes:verify",
  "hyperframes:new",
  "active-render.html",
  "current-render.html",
  "render.html",
  "index.render.html",
  "scene.render.html",
  "RENDER_COMMAND",
  "render_command",
  "npm run render",
];

function exists(relativePath) {
  try {
    statSync(rel(relativePath));
    return true;
  } catch {
    return false;
  }
}

function read(relativePath) {
  return readFileSync(rel(relativePath), "utf8");
}

function walkFiles(relativePath, matches = []) {
  if (!exists(relativePath)) return matches;
  const abs = rel(relativePath);
  for (const entry of readdirSync(abs, { withFileTypes: true })) {
    const child = relativePath === "." ? entry.name : path.posix.join(relativePath, entry.name);
    const normalized = toPosix(child);
    if (normalized === ".git" || normalized.startsWith(".git/")) continue;
    if (normalized.startsWith(".agents/skills/")) continue;
    if (normalized.startsWith(".render-work/hyperframes7-render/")) continue;
    if (entry.isDirectory()) {
      walkFiles(child, matches);
    } else {
      matches.push(normalized);
    }
  }
  return matches;
}

function fail(message) {
  throw new Error(message);
}

function readManifest() {
  if (!exists(MANIFEST_FILE)) {
    fail(`Missing manifest: ${MANIFEST_FILE}`);
  }

  const manifest = JSON.parse(read(MANIFEST_FILE));

  if (manifest.protocol !== "Clean-Slate Protocol") {
    fail(`Manifest protocol must be "Clean-Slate Protocol", found ${JSON.stringify(manifest.protocol)}`);
  }
  if (typeof manifest.project !== "string" || manifest.project.trim() === "") {
    fail("Manifest project must be a non-empty string.");
  }
  if (manifest.activeRenderDir !== ACTIVE_RENDER_DIR) {
    fail(`Manifest activeRenderDir must be ${ACTIVE_RENDER_DIR}, found ${JSON.stringify(manifest.activeRenderDir)}`);
  }
  if (manifest.activeRenderFile !== ACTIVE_RENDER_FILE) {
    fail(`Manifest activeRenderFile must be ${ACTIVE_RENDER_FILE}, found ${JSON.stringify(manifest.activeRenderFile)}`);
  }
  if (manifest.renderMode !== "github-actions-only") {
    fail(`Manifest renderMode must be "github-actions-only", found ${JSON.stringify(manifest.renderMode)}`);
  }
  if (manifest.localFinalRenderAllowed !== false) {
    fail(`Manifest localFinalRenderAllowed must be false, found ${JSON.stringify(manifest.localFinalRenderAllowed)}`);
  }
  if (manifest.mirrorStagingDir !== MIRROR_STAGING_DIR) {
    fail(`Manifest mirrorStagingDir must be ${MIRROR_STAGING_DIR}, found ${JSON.stringify(manifest.mirrorStagingDir)}`);
  }

  return manifest;
}

function collectHtmlFiles() {
  const activeHtmlFiles = [];
  for (const dir of GENERATED_RENDER_DIRS) {
    if (!exists(dir)) continue;
    const files = walkFiles(dir);
    for (const file of files) {
      if (file.endsWith(".html")) {
        activeHtmlFiles.push(file);
      }
    }
  }
  return [...new Set(activeHtmlFiles)];
}

function collectExpectedMirrorFiles(manifest) {
  const expected = new Set(BASE_MIRROR_FILES);
  const projectRoot = typeof manifest.projectRoot === "string" ? manifest.projectRoot : "";

  if (projectRoot && exists(projectRoot)) {
    for (const file of walkFiles(projectRoot)) {
      expected.add(file);
    }
  }

  if (manifest.hubFile) {
    expected.add(manifest.hubFile);
  }
  if (manifest.manifestFile) {
    expected.add(manifest.manifestFile);
  }

  return expected;
}

function validateSingleFileManifest(manifest) {
  const htmlFiles = collectHtmlFiles();
  if (htmlFiles.length === 0) {
    fail("No active render HTML files were found in render locations.");
  }
  if (htmlFiles.length > 1) {
    fail(`More than one active render target exists: ${htmlFiles.join(", ")}`);
  }
  if (htmlFiles[0] !== ACTIVE_RENDER_FILE) {
    fail(`Active render target must be ${ACTIVE_RENDER_FILE}, found ${htmlFiles[0]}`);
  }
  if (manifest.activeRenderFile !== ACTIVE_RENDER_FILE) {
    fail(`Manifest activeRenderFile must be ${ACTIVE_RENDER_FILE}, found ${JSON.stringify(manifest.activeRenderFile)}`);
  }
}

function validateSegmentedManifest(manifest) {
  const variants = manifest.variants;
  const targetSet = new Set();

  if (!variants || typeof variants !== "object") {
    fail("Segmented manifests must define a variants object.");
  }
  if (!Array.isArray(manifest.activeRenderTargets) || manifest.activeRenderTargets.length === 0) {
    fail("Segmented manifests must define activeRenderTargets.");
  }
  if (manifest.projectRoot !== "render/current/akee-30s") {
    fail(`Manifest projectRoot must be render/current/akee-30s, found ${JSON.stringify(manifest.projectRoot)}`);
  }
  if (manifest.projectIndex !== "render/current/akee-30s/index.html") {
    fail(`Manifest projectIndex must be render/current/akee-30s/index.html, found ${JSON.stringify(manifest.projectIndex)}`);
  }
  if (manifest.durationSeconds !== 30) {
    fail(`Manifest durationSeconds must be 30, found ${JSON.stringify(manifest.durationSeconds)}`);
  }
  if (manifest.segmentDurationSeconds !== 5) {
    fail(`Manifest segmentDurationSeconds must be 5, found ${JSON.stringify(manifest.segmentDurationSeconds)}`);
  }
  if (!Array.isArray(manifest.finalOutputs) || manifest.finalOutputs[0] !== "akee-mobile-30s.mp4" || manifest.finalOutputs[1] !== "akee-web-30s.mp4") {
    fail("Manifest finalOutputs must list akee-mobile-30s.mp4 and akee-web-30s.mp4 in order.");
  }

  for (const variantName of ["mobile", "web"]) {
    const variant = variants[variantName];
    if (!variant) {
      fail(`Missing ${variantName} variant in manifest.`);
    }
    if (variantName === "mobile") {
      if (variant.size !== "1080x1920" || variant.aspectRatio !== "9:16") {
        fail(`Mobile variant must be 1080x1920 at 9:16, found ${JSON.stringify(variant.size)} and ${JSON.stringify(variant.aspectRatio)}`);
      }
    } else if (variant.size !== "1920x1080" || variant.aspectRatio !== "16:9") {
      fail(`Web variant must be 1920x1080 at 16:9, found ${JSON.stringify(variant.size)} and ${JSON.stringify(variant.aspectRatio)}`);
    }
    if (!Array.isArray(variant.segments) || variant.segments.length !== 6) {
      fail(`Variant ${variantName} must define exactly 6 segments.`);
    }
    if (!exists(variant.projectRoot)) {
      fail(`Variant project root is missing: ${variant.projectRoot}`);
    }
    for (const segment of variant.segments) {
      if (!exists(segment)) {
        fail(`Missing active render target: ${segment}`);
      }
      targetSet.add(segment);
    }
  }

  if (manifest.hubFile) {
    targetSet.add(manifest.hubFile);
  }
  if (manifest.projectIndex) {
    targetSet.add(manifest.projectIndex);
  }

  const declaredTargets = Array.isArray(manifest.activeRenderTargets) ? manifest.activeRenderTargets : [];
  const expectedTargets = new Set([...variants.mobile.segments, ...variants.web.segments]);
  if (declaredTargets.length !== expectedTargets.size) {
    fail("Manifest activeRenderTargets must list all 12 unique segment HTML files.");
  }
  for (const target of declaredTargets) {
    if (!expectedTargets.has(target)) {
      fail(`Manifest activeRenderTargets includes an unexpected path: ${target}`);
    }
  }

  const htmlFiles = collectHtmlFiles();
  for (const file of htmlFiles) {
    if (!targetSet.has(file)) {
      fail(`Unexpected HTML file outside active render targets: ${file}`);
    }
  }
  for (const file of targetSet) {
    if (!htmlFiles.includes(file)) {
      fail(`Declared active render target is missing: ${file}`);
    }
  }
}

const manifest = readManifest();

if (Array.isArray(manifest.activeRenderTargets) && manifest.activeRenderTargets.length > 0) {
  validateSegmentedManifest(manifest);
} else {
  validateSingleFileManifest(manifest);
}

const workflowFiles = [
  ".render-pipeline/sync-render-mirror.sh",
  ".render-pipeline/trigger-render.sh",
  ".render-pipeline/download-latest-render.sh",
  ".render-pipeline/render-allowlist.txt",
  "package.json",
  "AGENTS.md",
  ".agent-rules/hyperframes-workflow.md",
  "docs/github-render-mirror.md",
];

for (const file of workflowFiles) {
  if (!exists(file)) continue;
  const content = read(file);
  for (const token of FORBIDDEN_TOKENS) {
    if (content.includes(token)) {
      fail(`${file} still references forbidden render target or local-render token: ${token}`);
    }
  }
}

const syncScript = exists(".render-pipeline/sync-render-mirror.sh") ? read(".render-pipeline/sync-render-mirror.sh") : "";
if (!syncScript.includes("render/current/manifest.json")) {
  fail(".render-pipeline/sync-render-mirror.sh must read render/current/manifest.json when generating the mirror workflow.");
}
if (syncScript.includes("npm run render") || syncScript.includes("RENDER_COMMAND") || syncScript.includes("render_command")) {
  fail(".render-pipeline/sync-render-mirror.sh is still configured for a local render command.");
}

const triggerScript = exists(".render-pipeline/trigger-render.sh") ? read(".render-pipeline/trigger-render.sh") : "";
if (triggerScript.includes("render_command") || triggerScript.includes("RENDER_COMMAND") || triggerScript.includes("npm run render")) {
  fail(".render-pipeline/trigger-render.sh still passes a local render command to the mirror workflow.");
}

const allowlist = exists(".render-pipeline/render-allowlist.txt") ? read(".render-pipeline/render-allowlist.txt") : "";
for (const token of ["AGENTS.md", "docs/", ".agent-rules/"]) {
  if (allowlist.includes(token)) {
    fail(`.render-pipeline/render-allowlist.txt contains a non-sanitized entry: ${token}`);
  }
}
for (const required of ["render/current/index.html", "render/current/manifest.json", "render/current/akee-30s"]) {
  if (!allowlist.includes(required)) {
    fail(`.render-pipeline/render-allowlist.txt is missing required mirror file or directory: ${required}`);
  }
}

const stagingDir = manifest.mirrorStagingDir || MIRROR_STAGING_DIR;
if (exists(stagingDir)) {
  const stagedFiles = walkFiles(stagingDir).map((file) => {
    const prefix = `${stagingDir}/`;
    return file.startsWith(prefix) ? file.slice(prefix.length) : file;
  });
  const expectedMirrorFiles = collectExpectedMirrorFiles(manifest);
  const unexpected = stagedFiles.filter((file) => !expectedMirrorFiles.has(file));
  if (unexpected.length > 0) {
    fail(`Public mirror staging area contains stale or unexpected files: ${unexpected.join(", ")}`);
  }
}
