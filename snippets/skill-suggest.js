// .claude/hooks/scripts/skill-suggest.js
// Triggered on UserPromptSubmit — static trigger-word lookup

const SKILL_TRIGGERS = {
  'systematic-debugging': ['error', 'bug', 'broken', 'not working', 'crash', 'debug', 'root cause'],
  'test-driven-development': ['test', 'tdd', 'spec', 'coverage', 'unit test', 'integration test'],
  'security-guidance': ['auth', 'password', 'token', 'secret', 'injection', 'xss', 'csrf'],
  'swe-csharp': ['.cs', 'csharp', 'c#', 'dotnet', '.net', 'unity'],
  'swe-frontend': ['react', 'next.js', 'nextjs', 'component', 'frontend', 'typescript', 'jsx', 'tailwind'],
  'mcp-builder': ['mcp server', 'mcp tool', 'model context protocol'],
  'compliance-and-consent': ['gdpr', 'ccpa', 'consent', 'privacy', 'cookie', 'analytics'],
};

const prompt = (process.env.USER_PROMPT || '').toLowerCase();
const suggestions = [];

for (const [skill, triggers] of Object.entries(SKILL_TRIGGERS)) {
  if (triggers.some(trigger => prompt.includes(trigger))) {
    suggestions.push(skill);
  }
}

// Only suggest if 1-3 matches (avoid noise on broad prompts)
if (suggestions.length > 0 && suggestions.length <= 3) {
  console.log(`Suggested skills: ${suggestions.join(', ')}`);
}
