#!/usr/bin/env bash
# Session 6 Live Demo: Self-improvement system
# Run this from the ai-workspace root

WORKSPACE="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
cd "$WORKSPACE"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Session 6 Demo: The Self-Improvement System"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "Step 1: View current rules"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm run self:review 2>&1 | head -40
echo ""
echo "  Each rule: [id] (reinforced: N) [tags] description"
echo "  These are injected into Claude sessions contextually."
echo ""

echo "Press ENTER to continue..."
read -r

echo "Step 2: Self-improvement statistics"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm run self:stats
echo ""

echo "Press ENTER to continue..."
read -r

echo "Step 3: View the dashboard"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Generating dashboard..."
npm run self:dashboard 2>&1 | tail -5
echo ""
echo "  Opening .claude/visualizations/dashboard.html..."
xdg-open .claude/visualizations/dashboard.html 2>/dev/null || \
  echo "  (open .claude/visualizations/dashboard.html in your browser)"
echo ""

echo "Press ENTER to continue..."
read -r

echo "Step 4: Show rule injection in a live Claude session"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Start Claude Code and trigger inject-rules hook:"
echo "  $ claude"
echo "  > I need to add tests for the payment module"
echo ""
echo "  Watch the hook inject rules tagged [testing] automatically."
echo ""
echo "  Key insight: Rules compound over time — each session"
echo "  reinforces proven patterns and adds new learnings."
echo ""

echo "Press ENTER to end demo..."
read -r

echo ""
echo "✓ Session 6 demo complete."
