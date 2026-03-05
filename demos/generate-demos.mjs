#!/usr/bin/env node
/**
 * Demo GIF Generator
 * Renders animated terminal HTML via Playwright, records WebM, converts to GIF.
 *
 * Usage:
 *   node demos/generate-demos.mjs              — generate all demos
 *   node demos/generate-demos.mjs <name>       — generate one demo
 *   node demos/generate-demos.mjs --list       — list available demos
 */

import { execSync } from 'child_process';
import { chromium } from 'playwright-chromium';
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.resolve(__dirname, '..');
const TEMPLATE  = path.join(__dirname, 'terminal.html');
const OUT_DIR   = path.join(ROOT, 'public', 'demos');
const TMP_DIR   = path.join(__dirname, '.tmp');

mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(TMP_DIR, { recursive: true });

const W = 'patricio@workspace:~/ai-workspace';
const P = 'patricio@workspace:~/my-project';

// ══════════════════════════════════════════════════════════════════════════════
//  Demo library — one story per session
// ══════════════════════════════════════════════════════════════════════════════

const DEMOS = {

  // ── Session 1: Starting Claude Code & the CLAUDE.md effect ───────────────
  'hook-output': {
    title: 'Claude Code starts — hooks firing',
    charDelay: 30, lineGap: 60, cmdPause: 550, endPause: 1800,
    commands: [{
      prompt: W,
      cmd: 'claude',
      output: [
        { text: '',                                         cls: '' },
        { text: '   ●■▲',                                  cls: 'bold-blue' },
        { text: '   Claude Code  v1.x.x',                 cls: 'bold-green' },
        { text: '',                                         cls: '' },
        { text: '✓ CLAUDE.md loaded (312 lines)',          cls: 'success' },
        { text: '',                                         cls: '' },
        { text: '◆ Hook: skill-suggest fired',             cls: 'yellow' },
        { text: '  → Detected .tsx file in context',       cls: 'muted' },
        { text: '  → Suggested: react-typescript-standards', cls: 'blue' },
        { text: '',                                         cls: '' },
        { text: '◆ Hook: inject-rules fired',              cls: 'yellow' },
        { text: '  → 3 rules matched [testing, file-editing]', cls: 'muted' },
        { text: '  → Rules injected into system prompt',   cls: 'blue' },
        { text: '',                                         cls: '' },
        { text: '◆ Hook: block-as-any  active',            cls: 'yellow' },
        { text: '◆ Hook: warn-debug-code  active',         cls: 'yellow' },
        { text: '',                                         cls: '' },
        { text: '  Type your task ↓   Ctrl+C to exit',     cls: 'dim' },
      ],
    }],
  },

  // ── Session 2: The conversation loop — read → reason → edit ─────────────
  's02-conversation': {
    title: 'The conversation loop — Claude Code',
    charDelay: 26, lineGap: 50, cmdPause: 480, blockPause: 500, endPause: 1600,
    commands: [
      {
        prompt: P,
        cmd: 'claude',
        output: [
          { text: '   ●■▲  Claude Code  v1.x.x',          cls: 'bold-green' },
          { text: '✓ CLAUDE.md loaded',                    cls: 'success' },
          { text: '',                                       cls: '' },
        ],
      },
      {
        prompt: P,
        cmd: '> Look at src/auth/session.ts — what does it do?',
        output: [
          { text: '● Reading src/auth/session.ts',         cls: 'tool' },
          { text: '',                                       cls: '' },
          { text: 'The session module manages auth tokens:', cls: 'claude' },
          { text: '  • Creates JWTs with configurable TTL', cls: 'claude' },
          { text: '  • Validates and refreshes tokens',    cls: 'claude' },
          { text: '  • TTL is hardcoded at 300000ms (5 min)', cls: 'warn' },
        ],
      },
      {
        prompt: P,
        cmd: '> Fix the TTL — should read from env.SESSION_TTL',
        output: [
          { text: '● Reading  src/auth/session.ts',        cls: 'tool' },
          { text: '● Editing  src/auth/session.ts (line 12)', cls: 'tool' },
          { text: '',                                       cls: '' },
          { text: '  - const TTL = 300000;',               cls: 'diff-rem' },
          { text: '  + const TTL = parseInt(process.env.SESSION_TTL ?? \'300000\', 10);', cls: 'diff-add' },
          { text: '',                                       cls: '' },
          { text: '✓ Done. SESSION_TTL reads from environment.', cls: 'success' },
        ],
      },
    ],
  },

  // ── Session 3: Workspace tour — memory + stats ────────────────────────────
  'memory-search': {
    title: 'Session memory search — ai-workspace',
    charDelay: 28, lineGap: 55, cmdPause: 500, endPause: 1600,
    commands: [{
      prompt: W,
      cmd: 'npm run tiered:search "auth timeout"',
      output: [
        { text: '',                                         cls: '' },
        { text: '> ai-workspace@1.0.0 tiered:search',     cls: 'dim' },
        { text: '',                                         cls: '' },
        { text: '🔍 Searching: "auth timeout"',            cls: 'blue' },
        { text: '',                                         cls: '' },
        { text: 'Found 5 results from 5 sessions:',       cls: 'bold-green' },
        { text: '',                                         cls: '' },
        { text: '────────────────────────────────────────', cls: 'sep' },
        { text: '#1 [WORKING]  Combined: 77.6%  Recency: 91.5%', cls: 'yellow' },
        { text: 'Session: conversation-55e1003e  Age: Fresh (1d)', cls: 'white' },
        { text: '────────────────────────────────────────', cls: 'sep' },
        { text: '',                                         cls: '' },
        { text: '────────────────────────────────────────', cls: 'sep' },
        { text: '#2 [EPISODIC]  Combined: 75.5%  Recency: 82.4%', cls: 'blue' },
        { text: 'Session: conversation-9f043aad  Age: Fresh (2d)', cls: 'white' },
        { text: '────────────────────────────────────────', cls: 'sep' },
        { text: '',                                         cls: '' },
        { text: '────────────────────────────────────────', cls: 'sep' },
        { text: '#3 [EPISODIC]  Combined: 75.5%  Recency: 86.7%', cls: 'blue' },
        { text: 'Session: conversation-0ff4bf1f  Age: Fresh (1d)', cls: 'white' },
        { text: '────────────────────────────────────────', cls: 'sep' },
        { text: '',                                         cls: '' },
        { text: '5 sessions • 48,147 chunks searched',    cls: 'dim' },
      ],
    }],
  },

  // ── Session 4: Hooks blocking bad patterns ────────────────────────────────
  's04-hooks-block': {
    title: 'Hooks enforcing code quality',
    charDelay: 26, lineGap: 58, cmdPause: 500, blockPause: 450, endPause: 1600,
    commands: [
      {
        prompt: P,
        cmd: 'claude',
        output: [
          { text: '   ●■▲  Claude Code  v1.x.x',          cls: 'bold-green' },
          { text: '✓ CLAUDE.md loaded  |  4 hooks active', cls: 'success' },
        ],
      },
      {
        prompt: P,
        cmd: '> Add a user parser — use `any` type for flexibility',
        output: [
          { text: '● Writing  src/utils/parser.ts',        cls: 'tool' },
          { text: '',                                       cls: '' },
          { text: '◆ Hook: block-as-any BLOCKED',          cls: 'error' },
          { text: '  Found: userInput as any',             cls: 'muted' },
          { text: '  Rule: as any breaks the type system', cls: 'dim' },
          { text: '',                                       cls: '' },
          { text: '  Claude is revising to use unknown…',  cls: 'yellow' },
          { text: '',                                       cls: '' },
          { text: '  - function parseUser(data: any): User {', cls: 'diff-rem' },
          { text: '  + function parseUser(data: unknown): User {', cls: 'diff-add' },
          { text: '',                                       cls: '' },
          { text: '✓ Written with proper types.',          cls: 'success' },
          { text: '  Hook enforced TypeScript safety.',    cls: 'muted' },
        ],
      },
    ],
  },

  // ── Session 5: Hybrid memory search ──────────────────────────────────────
  'hybrid-search': {
    title: 'Hybrid search — semantic + entities',
    charDelay: 28, lineGap: 55, cmdPause: 500, endPause: 1600,
    commands: [{
      prompt: W,
      cmd: 'npm run hybrid:search "database migration"',
      output: [
        { text: '',                                         cls: '' },
        { text: '> ai-workspace@1.0.0 hybrid:search',     cls: 'dim' },
        { text: '',                                         cls: '' },
        { text: '🔍 Hybrid search: "database migration"',  cls: 'blue' },
        { text: '',                                         cls: '' },
        { text: 'Found 10 results from 7 sessions:',      cls: 'bold-green' },
        { text: '',                                         cls: '' },
        { text: '────────────────────────────────────────', cls: 'sep' },
        { text: '#1 [WORKING]  Hybrid: 46.6%',             cls: 'yellow' },
        { text: 'Session: conversation-55e1003e  Age: Fresh (1d)', cls: 'white' },
        { text: '────────────────────────────────────────', cls: 'sep' },
        { text: '',                                         cls: '' },
        { text: '────────────────────────────────────────', cls: 'sep' },
        { text: '#2 [EPISODIC]  Hybrid: 43.8%',           cls: 'blue' },
        { text: 'Session: conversation-116f4c6b  Age: Fresh (2d)', cls: 'white' },
        { text: '────────────────────────────────────────', cls: 'sep' },
        { text: '',                                         cls: '' },
        { text: '────────────────────────────────────────', cls: 'sep' },
        { text: '#3 [EPISODIC]  Hybrid: 43.7%',           cls: 'blue' },
        { text: 'Session: conversation-f0f1b841  Age: Fresh (2d)', cls: 'white' },
        { text: '────────────────────────────────────────', cls: 'sep' },
        { text: '',                                         cls: '' },
        { text: '10 results  •  semantic + entity extraction', cls: 'dim' },
      ],
    }],
  },

  // ── Session 6: Self-improvement review ───────────────────────────────────
  'self-review': {
    title: 'Self-improvement — active rules',
    charDelay: 28, lineGap: 52, cmdPause: 480, endPause: 1600,
    commands: [{
      prompt: W,
      cmd: 'npm run self:review',
      output: [
        { text: '',                                         cls: '' },
        { text: '> ai-workspace@1.0.0 self:review',       cls: 'dim' },
        { text: '',                                         cls: '' },
        { text: 'Self-Improvement Review',                 cls: 'bold-green' },
        { text: '══════════════════════════════════════', cls: 'dim' },
        { text: 'Active rules: 46',                        cls: 'blue' },
        { text: '',                                         cls: '' },
        { text: '  [eqdlcvnw] ×10  [debugging]',          cls: 'white' },
        { text: '    Read source files before attempting fixes', cls: 'muted' },
        { text: '',                                         cls: '' },
        { text: '  [l4ilwark] ×22  [file-editing]',       cls: 'white' },
        { text: '    Investigate ordering after batch refactors', cls: 'muted' },
        { text: '',                                         cls: '' },
        { text: '  [gz9z6ntr] ×19  [config]',             cls: 'white' },
        { text: '    No Bash arrays in Alpine containers', cls: 'muted' },
        { text: '',                                         cls: '' },
        { text: '  [svuru1sb] ×17  [general]',             cls: 'white' },
        { text: '    Wrap .catch() — never scatter it',    cls: 'muted' },
        { text: '',                                         cls: '' },
        { text: '  ... 42 more rules ...',                 cls: 'dim' },
        { text: '',                                         cls: '' },
        { text: '✓ 46 rules active  •  50 synced to Qdrant', cls: 'success' },
      ],
    }],
  },

  // ── Session 7: MCP vs CLI token cost ─────────────────────────────────────
  's07-mcp-vs-cli': {
    title: 'MCP vs CLI — token cost comparison',
    charDelay: 27, lineGap: 60, cmdPause: 520, blockPause: 600, endPause: 1800,
    commands: [
      {
        prompt: W,
        cmd: 'gh issue list --limit 5 --state open',
        output: [
          { text: '',                                       cls: '' },
          { text: 'TOKEN COST: ~100 tokens',               cls: 'success' },
          { text: '',                                       cls: '' },
          { text: '#42  Fix session TTL bug           open  2d', cls: 'white' },
          { text: '#41  Add rate limiting to /api/auth open  3d', cls: 'white' },
          { text: '#38  Checkout blank screen fix     open  5d', cls: 'white' },
          { text: '#36  Dark mode token mismatch      open  1w', cls: 'white' },
          { text: '#34  Storybook upgrade blockers    open  2w', cls: 'white' },
          { text: '',                                       cls: '' },
          { text: '  ✓ Result: 5 issues  •  Fast  •  Cheap', cls: 'success' },
        ],
      },
      {
        prompt: W,
        cmd: '# GitHub MCP equivalent (same result)',
        output: [
          { text: '',                                       cls: '' },
          { text: 'TOKEN COST: ~55,000 tokens',            cls: 'error' },
          { text: '',                                       cls: '' },
          { text: '  Loading GitHub API schema…',          cls: 'muted' },
          { text: '  Loading repository metadata…',        cls: 'muted' },
          { text: '  Loading issue schema definitions…',   cls: 'muted' },
          { text: '',                                       cls: '' },
          { text: '  ✓ Same 5 issues returned.',           cls: 'muted' },
          { text: '',                                       cls: '' },
          { text: '  CLI is 275× cheaper per call.',       cls: 'yellow' },
          { text: '  Prefer CLI for standard git/gh ops.', cls: 'blue' },
        ],
      },
    ],
  },

  // ── Session 8: Designer git workflow ─────────────────────────────────────
  's08-designer-workflow': {
    title: 'Designer git workflow — branch → change → commit',
    charDelay: 27, lineGap: 58, cmdPause: 480, blockPause: 400, endPause: 1600,
    commands: [
      {
        prompt: P,
        cmd: 'git checkout -b update-hero',
        output: [
          { text: "Switched to a new branch 'update-hero'", cls: 'success' },
        ],
      },
      {
        prompt: P,
        cmd: '> Change hero heading to "AI-Powered" and CTA to #6366f1',
        output: [
          { text: '● Reading  src/components/Hero.tsx',    cls: 'tool' },
          { text: '● Editing  src/components/Hero.tsx (2 changes)', cls: 'tool' },
          { text: '',                                       cls: '' },
          { text: '  - <h1>Welcome to our platform</h1>', cls: 'diff-rem' },
          { text: '  + <h1>AI-Powered Workspace</h1>',    cls: 'diff-add' },
          { text: '  - className="bg-blue-600"',           cls: 'diff-rem' },
          { text: '  + className="bg-[#6366f1]"',         cls: 'diff-add' },
          { text: '',                                       cls: '' },
          { text: '✓ Done. Verify at localhost:3000',      cls: 'success' },
        ],
      },
      {
        prompt: P,
        cmd: '/commit',
        output: [
          { text: '→ Staged: src/components/Hero.tsx',    cls: 'blue' },
          { text: '→ Commit: feat(ui): update hero heading and CTA color', cls: 'white' },
          { text: '',                                       cls: '' },
          { text: '✓ Committed on branch update-hero.',   cls: 'success' },
          { text: '  Ready to push and open PR.',         cls: 'muted' },
        ],
      },
    ],
  },

  // ── Session 9: Checkpoint-revert pattern ─────────────────────────────────
  's09-checkpoint-revert': {
    title: 'Checkpoint-revert pattern',
    charDelay: 27, lineGap: 55, cmdPause: 460, blockPause: 500, endPause: 1800,
    commands: [
      {
        prompt: P,
        cmd: 'git commit -m "checkpoint: before auth refactor"',
        output: [
          { text: '[main abc1234] checkpoint: before auth refactor', cls: 'success' },
        ],
      },
      {
        prompt: P,
        cmd: '> Refactor auth module with Strategy pattern',
        output: [
          { text: '● Reading  src/auth/ (8 files)',        cls: 'tool' },
          { text: '● Writing  src/auth/strategies/ (3 files)', cls: 'tool' },
          { text: '● Editing  5 files',                    cls: 'tool' },
          { text: '',                                       cls: '' },
          { text: '  review: over-engineered, too abstract', cls: 'warn' },
        ],
      },
      {
        prompt: P,
        cmd: 'git reset --hard HEAD~1',
        output: [
          { text: 'HEAD is now at abc1234 checkpoint: before auth refactor', cls: 'yellow' },
        ],
      },
      {
        prompt: P,
        cmd: '> Extract token validation only — keep it under 50 lines',
        output: [
          { text: '● Reading  src/auth/session.ts',        cls: 'tool' },
          { text: '● Editing  src/auth/session.ts',        cls: 'tool' },
          { text: '',                                       cls: '' },
          { text: '  + extractTokenPayload(token): Payload', cls: 'diff-add' },
          { text: '  + validateExpiry(payload): boolean',  cls: 'diff-add' },
          { text: '',                                       cls: '' },
          { text: '✓ Done. 38 lines. Clean and simple.',   cls: 'success' },
        ],
      },
    ],
  },

  // ── Session 10: Full workshop workflow ────────────────────────────────────
  's10-full-workflow': {
    title: 'Full workspace workflow — search → work → commit',
    charDelay: 27, lineGap: 55, cmdPause: 460, blockPause: 420, endPause: 1600,
    commands: [
      {
        prompt: W,
        cmd: 'npm run tiered:search "checkout form validation"',
        output: [
          { text: '🔍 Searching: "checkout form validation"', cls: 'blue' },
          { text: '#1 [WORKING] 81.2% — Found: form validation patterns (1d ago)', cls: 'success' },
          { text: '#2 [EPISODIC] 74.4% — Found: Zod schema examples (3d ago)', cls: 'blue' },
        ],
      },
      {
        prompt: P,
        cmd: '> Add Zod validation to CheckoutForm — follow patterns in ProductForm.tsx',
        output: [
          { text: '● Reading  src/components/ProductForm.tsx', cls: 'tool' },
          { text: '● Reading  src/components/CheckoutForm.tsx', cls: 'tool' },
          { text: '● Editing  src/components/CheckoutForm.tsx', cls: 'tool' },
          { text: '',                                       cls: '' },
          { text: '  + const schema = z.object({',         cls: 'diff-add' },
          { text: '  +   email: z.string().email(),',      cls: 'diff-add' },
          { text: '  +   card:  z.string().length(16),',   cls: 'diff-add' },
          { text: '  + });',                               cls: 'diff-add' },
          { text: '',                                       cls: '' },
          { text: '✓ 3 fields validated. Follows ProductForm pattern.', cls: 'success' },
        ],
      },
      {
        prompt: P,
        cmd: '/commit',
        output: [
          { text: '→ feat(checkout): add Zod validation to checkout form', cls: 'white' },
          { text: '✓ Committed.',                          cls: 'success' },
        ],
      },
    ],
  },

  // ── Session 11: Adoption setup ────────────────────────────────────────────
  's11-adoption-setup': {
    title: 'Adoption — CLAUDE.md + hooks in 5 minutes',
    charDelay: 28, lineGap: 60, cmdPause: 480, blockPause: 400, endPause: 1800,
    commands: [
      {
        prompt: P,
        cmd: 'cp CLAUDE.md.example CLAUDE.md',
        output: [
          { text: '✓ CLAUDE.md created',                   cls: 'success' },
        ],
      },
      {
        prompt: P,
        cmd: 'cat CLAUDE.md | head -8',
        output: [
          { text: '',                                       cls: '' },
          { text: '# Project: my-app',                     cls: 'bold-green' },
          { text: '## Stack: React, TypeScript, Node.js',  cls: 'blue' },
          { text: '## Commands: npm test, npm run dev',    cls: 'white' },
          { text: '## Conventions: no any types, prefer for..of', cls: 'white' },
          { text: '## Architecture: feature-first, colocate tests', cls: 'white' },
        ],
      },
      {
        prompt: P,
        cmd: 'claude',
        output: [
          { text: '',                                       cls: '' },
          { text: '   ●■▲  Claude Code  v1.x.x',          cls: 'bold-green' },
          { text: '',                                       cls: '' },
          { text: '✓ CLAUDE.md loaded  (Phase 1 complete)', cls: 'success' },
          { text: '✓ 4 code quality hooks active',         cls: 'success' },
          { text: '',                                       cls: '' },
          { text: '  → Estimated output improvement: +50%', cls: 'blue' },
          { text: '  → Total setup time: < 5 minutes',    cls: 'blue' },
          { text: '',                                       cls: '' },
          { text: '  Ready. Type your first task ↓',       cls: 'dim' },
        ],
      },
    ],
  },

  // ── Session 3 — self:stats (used in session 3 GIF pair) ──────────────────
  'self-stats': {
    title: 'Self-improvement statistics',
    charDelay: 28, lineGap: 52, cmdPause: 480, endPause: 1600,
    commands: [{
      prompt: W,
      cmd: 'npm run self:stats',
      output: [
        { text: '',                                         cls: '' },
        { text: '> ai-workspace@1.0.0 self:stats',        cls: 'dim' },
        { text: '',                                         cls: '' },
        { text: 'Self-Improvement Statistics',             cls: 'bold-green' },
        { text: '════════════════════════════════════════', cls: 'dim' },
        { text: '',                                         cls: '' },
        { text: 'Rules:',                                  cls: 'blue' },
        { text: '  Active:   46 / 500 max',                cls: 'success' },
        { text: '  Proposed: 55',                          cls: 'white' },
        { text: '  Proven (10+): 46',                      cls: 'success' },
        { text: '',                                         cls: '' },
        { text: '  By source:',                            cls: 'white' },
        { text: '    insight-extraction: 28',              cls: 'white' },
        { text: '    reflection:         18',              cls: 'white' },
        { text: '',                                         cls: '' },
        { text: 'Reflections: 24  •  Qdrant: 50 rules',   cls: 'blue' },
        { text: 'Config: mode=autonomous, staleness=60d',  cls: 'dim' },
      ],
    }],
  },

  // ── Session 5 — session:stats ─────────────────────────────────────────────
  'session-stats': {
    title: 'Session memory stats',
    charDelay: 28, lineGap: 55, cmdPause: 480, endPause: 1600,
    commands: [{
      prompt: W,
      cmd: 'npm run session:stats',
      output: [
        { text: '',                                         cls: '' },
        { text: '> ai-workspace@1.0.0 session:stats',     cls: 'dim' },
        { text: '',                                         cls: '' },
        { text: 'Vector Store Statistics:',                cls: 'bold-green' },
        { text: '  Model:         bge-small-en-v1.5',      cls: 'white' },
        { text: '  Dimensions:    384',                    cls: 'white' },
        { text: '  Total chunks:  48,147',                 cls: 'success' },
        { text: '  Storage:       70.53 MB',               cls: 'white' },
        { text: '  Status:        healthy',                cls: 'success' },
      ],
    }],
  },

};

// ══════════════════════════════════════════════════════════════════════════════
//  Renderer
// ══════════════════════════════════════════════════════════════════════════════

async function renderDemo(name, demo) {
  const htmlPath = path.join(TMP_DIR, `${name}.html`);
  const webmPath = path.join(TMP_DIR, `${name}.webm`);
  const gifPath  = path.join(OUT_DIR, `${name}.gif`);

  console.log(`\n🎬 Rendering ${name}…`);

  // Inject demo data before the body script
  const template   = readFileSync(TEMPLATE, 'utf8');
  const dataScript = `<script>window.DEMO_DATA = ${JSON.stringify(demo)};</script>`;
  const finalHtml  = template.replace('</head>', `${dataScript}\n</head>`);
  writeFileSync(htmlPath, finalHtml);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport:    { width: 800, height: 500 },
    recordVideo: { dir: TMP_DIR, size: { width: 800, height: 500 } },
  });
  const page = await context.newPage();
  await page.goto(`file://${htmlPath}`);

  const maxWait = (demo.durationMs ?? 12000) + 4000;
  await page.waitForFunction(() => window.__DEMO_DONE__ === true, { timeout: maxWait })
    .catch(() => console.log(`  ⚠ Animation timeout for ${name} — continuing`));

  await page.waitForTimeout(800);
  const videoPath = await page.video()?.path();
  await context.close();
  await browser.close();

  if (!videoPath || !existsSync(videoPath)) {
    console.error(`  ✗ No video file found for ${name}`);
    return;
  }
  execSync(`cp "${videoPath}" "${webmPath}"`);

  console.log(`  ⚙ Converting to GIF…`);
  execSync(
    `ffmpeg -y -i "${webmPath}" ` +
    `-vf "fps=12,scale=800:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer" ` +
    `-loop 0 "${gifPath}" 2>/dev/null`,
    { stdio: 'pipe' }
  );

  const kb = Math.round(statSync(gifPath).size / 1024);
  console.log(`  ✓ ${name}.gif  (${kb} KB)`);
}

// ══════════════════════════════════════════════════════════════════════════════
//  Entry point
// ══════════════════════════════════════════════════════════════════════════════

async function main() {
  const arg = process.argv[2];

  if (arg === '--list') {
    console.log('\nAvailable demos:\n');
    for (const [name, demo] of Object.entries(DEMOS)) {
      console.log(`  ${name.padEnd(28)} ${demo.title}`);
    }
    console.log('');
    return;
  }

  const entries = arg
    ? Object.entries(DEMOS).filter(([n]) => n === arg)
    : Object.entries(DEMOS);

  if (entries.length === 0) {
    console.error(`No demo "${arg}". Run --list to see available demos.`);
    process.exit(1);
  }

  console.log(`\n🎬 Generating ${entries.length} GIF(s) → public/demos/`);
  for (const [name, demo] of entries) {
    try { await renderDemo(name, demo); }
    catch (err) { console.error(`  ✗ ${name}: ${err.message}`); }
  }
  console.log('\n✅ Done!\n');
}

main().catch(err => { console.error(err); process.exit(1); });
