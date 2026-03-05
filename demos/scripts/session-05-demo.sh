#!/usr/bin/env bash
# Session 5 Live Demo: Memory strategies in action
# Run this from the ai-workspace root

WORKSPACE="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
cd "$WORKSPACE"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Session 5 Demo: Memory Strategies in Action"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "Step 1: Commit-based memory — verbose git log"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
git log --oneline -8
echo ""
echo "  These commits are searchable context for Claude."
echo ""

echo "Press ENTER to continue..."
read -r

echo "Step 2: Semantic search"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm run session:search "authentication error handling"
echo ""

echo "Press ENTER to continue..."
read -r

echo "Step 3: Hybrid search (semantic + entity extraction)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm run hybrid:search "database migration strategy"
echo ""

echo "Press ENTER to continue..."
read -r

echo "Step 4: Tiered search (recency-weighted)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm run tiered:search "auth timeout fix"
echo ""

echo "Press ENTER to continue..."
read -r

echo "Step 5: Storage stats"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm run session:stats
echo ""

echo "  Key insight: Choose the strategy based on what you need:"
echo "  session:search  → general concepts"
echo "  hybrid:search   → specific terms + entities"
echo "  tiered:search   → recent context weighted higher"
echo ""

echo "Press ENTER to end demo..."
read -r

echo ""
echo "✓ Session 5 demo complete."
