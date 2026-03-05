#!/usr/bin/env bash
# Session 3 Live Demo: Workspace walkthrough
# Run this from the ai-workspace root

WORKSPACE="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
cd "$WORKSPACE"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Session 3 Demo: The Workspace Experience"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "Step 1: Session memory stats"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm run session:stats
echo ""

echo "Press ENTER to continue..."
read -r

echo "Step 2: Tiered memory search"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm run tiered:search "auth timeout"
echo ""

echo "Press ENTER to continue..."
read -r

echo "Step 3: Self-improvement stats"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm run self:stats
echo ""

echo "Press ENTER to continue..."
read -r

echo "Step 4: Start Claude Code — observe hooks firing"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Hooks to watch for:"
echo "  ◆ skill-suggest  → detects file type, suggests skill"
echo "  ◆ inject-rules   → matches context, injects rules"
echo "  ◆ block-as-any   → blocks TypeScript type escapes"
echo ""
echo "  $ claude"
echo ""
echo "  (start Claude Code and show hooks in action)"
echo ""
echo "  Press ENTER to end demo..."
read -r

echo ""
echo "✓ Session 3 demo complete."
