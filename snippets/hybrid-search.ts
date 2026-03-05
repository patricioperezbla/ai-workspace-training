// scripts/session-embedder/hybrid-search.ts
// 5-stage pipeline: semantic + knowledge-graph search

/**
 * Search Strategy:
 * 1. Semantic search    — Find similar content via embeddings
 * 2. Entity extraction  — Identify entities in query
 * 3. Entity search      — Find sessions with matching entities
 * 4. Relationship expansion — Include related sessions via KG
 * 5. Score fusion       — Combine scores with configurable weights
 */

// #region slide
export type MemoryTier = 'working' | 'episodic' | 'semantic' | 'resource';

export interface HybridSearchResult {
  id: string;
  sessionId: string;
  chunkText: string;
  tier: MemoryTier;

  // Individual scores
  semanticScore: number;
  entityScore: number;
  recencyScore: number;
  hybridScore: number; // weighted combination

  matchedEntities: string[];
  metadata: {
    date: string;
    chunk_index: number;
  };
}
// #endregion slide
