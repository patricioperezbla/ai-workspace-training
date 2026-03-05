#!/usr/bin/env bash
# Session 7 Live Demo: MCP vs CLI comparison
# Run this from the ai-workspace root

WORKSPACE="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
cd "$WORKSPACE"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Session 7 Demo: MCP vs CLI — Context Cost Comparison"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "Approach A: GitHub CLI (fast, cheap)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Cost: ~100 tokens (one CLI call)"
echo ""
if command -v gh &>/dev/null; then
  echo "  \$ gh issue list --limit 5 --state open"
  gh issue list --limit 5 --state open 2>/dev/null || \
    echo "  (no issues or not authenticated — tokens still minimal)"
else
  echo "  gh not installed — but the cost would be ~100 tokens"
fi
echo ""

echo "Press ENTER to continue..."
read -r

echo "Approach B: GitHub MCP (richer, expensive)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Cost: ~55,000 tokens (full schema loaded on connect)"
echo ""
echo "  GitHub MCP loads the entire API schema (~55K tokens)"
echo "  before executing a single operation."
echo ""
echo "  Same result. 275× more expensive."
echo ""
cat .mcp.json 2>/dev/null | python3 -c "
import json,sys
data = json.load(sys.stdin)
servers = list(data.get('mcpServers', {}).keys())
print(f'  Configured MCP servers: {servers}')
print(f'  Each server loads schema on start.')
" 2>/dev/null || echo "  (.mcp.json not shown — contains auth tokens)"
echo ""

echo "Press ENTER to continue..."
read -r

echo "Approach C: Sub-agents for parallel research"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Start Claude Code:"
echo "  $ claude"
echo ""
echo "  > Investigate the top 3 open bugs in parallel."
echo "    Use sub-agents for each bug. Summarize findings."
echo ""
echo "  Watch Claude launch 3 sub-agents simultaneously"
echo "  using the Task tool — parallel, isolated contexts."
echo ""
echo "  Key insight: Sub-agents = parallel work + clean context"
echo "  CLI over MCP = 275× less token waste"
echo ""

echo "Press ENTER to end demo..."
read -r

echo ""
echo "✓ Session 7 demo complete."
