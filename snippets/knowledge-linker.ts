// scripts/session-embedder/knowledge-linker.ts
// Session knowledge graph with typed relationships

/**
 * Relationship Types:
 * - shared_tool:     Sessions using the same tool
 * - shared_concept:  Sessions discussing same concept
 * - shared_file:     Sessions referencing same files
 * - shared_decision: Sessions making related decisions
 * - temporal:        Sessions in close time proximity
 * - continuation:    Sessions continuing previous work
 */

export type EntityType = 'tool' | 'concept' | 'decision' | 'file' | 'action';
export type RelationType =
  | 'shared_tool' | 'shared_concept' | 'shared_file'
  | 'shared_decision' | 'temporal' | 'continuation';

export interface EntityNode {
  id: string;
  type: EntityType;
  name: string;
  sessions: string[];     // Session IDs referencing this entity
  contexts: string[];     // Surrounding text from each mention
  totalMentions: number;
  firstSeen: string;
  lastSeen: string;
}

export interface Relationship {
  id: string;
  type: RelationType;
  sourceSessionId: string;
  targetSessionId: string;
  strength: number; // 0-1
  entities: string[]; // shared entity names
}
