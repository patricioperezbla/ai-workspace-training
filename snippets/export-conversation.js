// .claude/hooks/scripts/export-conversation.js
// Triggered on SessionEnd — exports JSONL transcript to structured JSON

const hookInput = JSON.parse(stdinData);
const transcriptPath = hookInput.transcript_path; // JSONL from Claude

// Parse JSONL line by line
for await (const line of rl) {
  const entry = JSON.parse(line);
  conversation.push(entry);
}

// Structured export for knowledge extraction
const conversationExport = {
  sessionId,
  exportReason: reason, // 'exit' | 'clear'
  metadata: {
    totalMessages,
    userMessages: userMessages.length,
    assistantMessages: assistantMessages.length,
    toolCalls: toolCalls.length,
  },
  messages: conversation, // full JSONL parsed array
};

// Written to: .claude/logs/sessions/conversation-<sessionId>.json
// Also creates lightweight summary (first 5 prompts + 10 tool calls)
const summary = {
  userPrompts: userMessages.slice(0, 5).map(m => ({
    content: m.content.substring(0, 200),
    timestamp: m.timestamp,
  })),
  toolCallSummary: toolCalls.slice(0, 10).map(t => ({
    toolName: t.name,
    id: t.id,
  })),
};
