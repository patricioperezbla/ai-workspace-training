// scripts/session-embedder/tiered-memory.ts
// 4-tier memory architecture (MemGPT/MIRIX/A-Mem inspired)

/**
 * Memory Tiers:
 * 1. Working   — Current session context (ephemeral)
 * 2. Episodic  — Recent sessions with recency decay (7-30 days)
 * 3. Semantic  — Distilled key concepts and decisions
 * 4. Resource  — Reusable code patterns and snippets
 */

// #region slide
export type MemoryTier = 'working' | 'episodic' | 'semantic' | 'resource';

export interface TieredEntry {
  id: string;
  tier: MemoryTier;
  session_id: string;
  chunk_text: string;
  embedding: number[];
  metadata: {
    date: string;
    chunk_index: number;
    recency_score: number;    // 0-1, higher = more recent
    importance_score: number; // 0-1, higher = more important
    access_count: number;
    last_accessed: string;
    tags?: string[];
    entities?: string[];
  };
}
// #endregion slide
