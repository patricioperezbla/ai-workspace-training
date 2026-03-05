# Demo Creation Plan

## Goal
Create working demos for the 8-session presentation: live runner scripts + pre-recorded GIF fallbacks embedded in slides.

## Approach: Playwright + FFmpeg (no new deps)

**Available tools**: Node.js, Playwright (already in devDeps), FFmpeg (system)
**Not available**: Go (no VHS), asciinema, terminalizer

### Strategy
1. Run real workspace commands → capture output
2. Render output as animated terminal HTML pages
3. Use Playwright to record as video (WebM)
4. Convert WebM → GIF using FFmpeg
5. Embed GIFs in presentation slides
6. Create shell scripts for live demo fallback

---

## Phase 1: Demo Infrastructure

### Files to create:
```
presentations/ai-workspace-training/
├── demos/
│   ├── generate-demos.mjs        # Main generator (runs commands, creates GIFs)
│   ├── terminal.html             # Terminal animation template
│   └── scripts/                  # Live demo runner scripts
│       ├── session-01-demo.sh
│       ├── session-03-demo.sh
│       ├── session-05-demo.sh
│       ├── session-06-demo.sh
│       └── session-07-demo.sh
├── public/demos/                 # Generated GIFs (served by Slidev)
```

### terminal.html Template
- Dark terminal theme (dark bg, monospace, colored prompt)
- JavaScript receives: prompt command + output text
- Typing animation: prompt types character by character, then output appears line by line
- Fixed size: 800×500px (fits slides well)

### generate-demos.mjs Script
- Uses `child_process.execSync` to run real commands from workspace root
- For each demo:
  1. Capture real command output
  2. Launch Playwright browser
  3. Load terminal.html with command + output data
  4. Record video while animation plays
  5. Convert WebM → GIF via FFmpeg (`ffmpeg -i input.webm -vf "fps=10,scale=800:-1" -loop 0 output.gif`)
  6. Save to `public/demos/`

---

## Phase 2: Demos to Generate (6 GIFs)

| GIF Name | Command | Used In | Duration |
|----------|---------|---------|----------|
| `session-stats.gif` | `npm run session:stats` | S3, S5 | ~3s |
| `memory-search.gif` | `npm run tiered:search "auth timeout"` | S3, S5 | ~4s |
| `self-stats.gif` | `npm run self:stats` | S3, S6 | ~3s |
| `self-review.gif` | `npm run self:review` (first 20 rules) | S6 | ~5s |
| `hybrid-search.gif` | `npm run hybrid:search "database migration"` | S5 | ~4s |
| `hook-output.gif` | Simulated: Claude start + hook firing | S1, S3 | ~4s |

### Simulated demos (no real command):
- **hook-output.gif**: Fake terminal showing Claude Code startup with hook output (skill detection, rule injection, quality checks). Uses hardcoded text since we can't easily capture real Claude startup.

---

## Phase 3: Live Demo Scripts (5 scripts)

### session-01-demo.sh
```bash
# Demo: CLAUDE.md before/after + slot machine pattern
# 1. Show a project without CLAUDE.md
# 2. Add CLAUDE.md and repeat
# 3. Demonstrate commit → experiment → review → revert
```

### session-03-demo.sh
```bash
# Demo: Workspace walkthrough
npm run session:stats
npm run tiered:search "auth timeout"
npm run self:stats
# Then start Claude Code and show hooks firing
```

### session-05-demo.sh
```bash
# Demo: Memory search comparison
npm run session:search "authentication error"
npm run hybrid:search "database migration strategy"
npm run tiered:search "auth timeout fix"
npm run session:stats
```

### session-06-demo.sh
```bash
# Demo: Self-improvement system
npm run self:review
npm run self:stats
npm run self:dashboard
# Then trigger rule injection in Claude
```

### session-07-demo.sh
```bash
# Demo: MCP vs CLI comparison
# Show gh CLI: gh issue list --limit 5
# Show MCP equivalent: (via Claude Code)
# Compare context cost
```

---

## Phase 4: Slide Updates

For each session with a "Live Demo" slide, add the GIF as a visual fallback:

### Session 1 - Live Demo slide
Add `hook-output.gif` showing Claude startup

### Session 3 - Live Demo slide
Add `session-stats.gif` + `memory-search.gif`

### Session 5 - Live Demo slide
Add `memory-search.gif` + `hybrid-search.gif`

### Session 6 - Live Demo slide
Add `self-stats.gif` + `self-review.gif`

### Session 7 - Live Demo slide
No terminal GIF needed (demo is interactive comparison)

### Embedding format in slides:
```md
<img src="/demos/session-stats.gif" class="rounded shadow h-64" />
```

---

## Phase 5: Package.json Update

Add scripts for demo generation:
```json
{
  "scripts": {
    "demos:generate": "node demos/generate-demos.mjs",
    "demos:clean": "rm -rf public/demos/*.gif"
  }
}
```

---

## Implementation Order

1. Create `demos/` directory and `terminal.html` template
2. Create `generate-demos.mjs` script
3. Run generator to produce 6 GIFs
4. Create 5 live demo shell scripts
5. Update slides to embed GIFs
6. Rebuild PDF and verify
7. Update package.json with demo scripts

## Estimated output
- 6 animated GIFs (~200-500KB each)
- 5 runnable demo scripts
- Updated slides with visual demos embedded
