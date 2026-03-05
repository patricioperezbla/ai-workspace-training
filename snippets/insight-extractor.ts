// scripts/self-improvement/insight-extractor.ts
// ExpeL algorithm: compare high vs. low quality chunks → extract rules

/**
 * Algorithm:
 * 1. Query Qdrant for high-quality (>=7) and low-quality (<=3) chunks
 * 2. For each success/failure pair, prompt Claude to extract rules
 * 3. Deduplicate against existing rules
 * 4. Apply or stage via proposal-manager
 */

interface ChunkGroup {
  highQuality: Array<{ text: string; score: number; sessionId: string }>;
  lowQuality: Array<{ text: string; score: number; sessionId: string }>;
}

// Filter meta-observations — keep only actionable imperative rules
function isActionableRule(text: string): boolean {
  const metaObservationPatterns = [
    /^the (first|second|high|low|good|bad) (chunk|quality)/i,
    /chunk (was|is|failed|succeeded|provided|lacked)/i,
    /was successful because/i,
    /failed (because|due to)/i,
  ];
  for (const pattern of metaObservationPatterns) {
    if (pattern.test(text)) return false;
  }

  // Prefer imperative verb starts
  const imperativeStarts = [
    'always', 'never', 'verify', 'ensure', 'include',
    'check', 'use', 'avoid', 'prefer', 'when',
    'before', 'after', 'validate', 'confirm',
  ];
  return imperativeStarts.some(verb =>
    text.toLowerCase().startsWith(verb)
  );
}
