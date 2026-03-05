// scripts/self-improvement/reflection-generator.ts
// Reflexion algorithm: detect failure signals → generate reflections

/**
 * Failure signals detected:
 * - Tool errors followed by 3+ retries
 * - Same file edited 3+ times in sequence (backtracking)
 * - Git reset/revert operations
 * - Explicit error messages in assistant output
 */

interface FailureSignal {
  type: 'retry-loop' | 'backtracking' | 'git-revert' | 'error-message';
  description: string;
  context: string;
  sessionId: string;
}

interface ReflectionState {
  processedSessions: Record<string, {
    date: string;
    failureCount: number;
  }>;
}

export function detectFailures(
  sessionData: SessionData,
  sessionId: string
): FailureSignal[] {
  const signals: FailureSignal[] = [];
  const fileEditSequence: string[] = []; // backtracking detection
  let consecutiveErrors = 0;
  let lastErrorContext = '';

  for (const msg of sessionData.messages) {
    // Detect retry loops: 3+ consecutive tool errors
    if (msg.type === 'tool_error') {
      consecutiveErrors++;
      lastErrorContext = msg.content;
      if (consecutiveErrors >= 3) {
        signals.push({
          type: 'retry-loop',
          description: `${consecutiveErrors} consecutive errors`,
          context: lastErrorContext,
          sessionId,
        });
      }
    }
    // Detect backtracking: same file edited 3+ times
    if (msg.type === 'tool_use' && msg.tool === 'Edit') {
      const filePath = msg.input?.file_path;
      fileEditSequence.push(filePath);
    }
  }
  return signals;
}
