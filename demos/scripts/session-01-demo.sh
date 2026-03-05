#!/usr/bin/env bash
# Session 1 Live Demo: CLAUDE.md before/after + slot machine pattern
# Run this from the ai-workspace root

set -e
WORKSPACE="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
cd "$WORKSPACE"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Session 1 Demo: Claude Code in Action"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Demo 1: Without CLAUDE.md"
echo "  → Claude will spend time discovering project structure"
echo "  → Notice the exploration overhead"
echo ""
echo "  Press ENTER to start Claude Code (no CLAUDE.md scenario)..."
read -r

# Show what Claude would see without CLAUDE.md
echo ""
echo "  (Simulating: rename CLAUDE.md to CLAUDE.md.bak)"
echo "  $ mv CLAUDE.md CLAUDE.md.bak"
echo "  $ claude"
echo ""
echo "  Notice: Claude reads README, package.json, explores..."
echo ""
echo "  Press ENTER to restore CLAUDE.md and show the difference..."
read -r

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Demo 2: With CLAUDE.md"
echo "  → Claude has immediate context: structure, commands, rules"
echo "  → Same task, dramatically faster start"
echo ""
echo "  Press ENTER to start Claude Code (with CLAUDE.md)..."
read -r

echo ""
echo "  $ claude"
echo ""
echo "  Notice: Claude confirms CLAUDE.md loaded, hooks firing, ready."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Demo 3: The Slot Machine Pattern"
echo ""
echo "  Step 1 - Create a checkpoint commit:"
echo "  $ git add -A && git commit -m 'checkpoint: before experiment'"
echo ""
echo "  Step 2 - Give Claude an experimental task (auto-accept mode)"
echo "  Step 3 - Review the result"
echo "  Step 4 - If bad: git reset --hard HEAD~1 → retry"
echo ""
echo "  Key insight: restarting fresh beats course-correcting."
echo ""
echo "  Press ENTER to end demo..."
read -r

echo ""
echo "✓ Session 1 demo complete."
