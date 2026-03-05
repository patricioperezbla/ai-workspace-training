// .claude/hooks/scripts/inject-rules.js
// Triggered on UserPromptSubmit — keyword-frequency scoring
// Runs within 1s hook timeout (no embeddings, no network)

const prompt = (process.env.USER_PROMPT || '').toLowerCase();
const promptKeywords = prompt
  .replace(/[^a-z0-9\s\-_.]/g, ' ')
  .split(/\s+/)
  .filter(w => w.length > 2);

const activeRules = rules.filter(r => r.status === 'active');

// Score each rule by keyword overlap
const scored = [];
for (const rule of activeRules) {
  const searchText = rule.text.toLowerCase()
    + ' ' + (rule.categories || []).join(' ').toLowerCase();
  let score = 0;
  for (const keyword of promptKeywords) {
    if (searchText.includes(keyword)) score++;
  }
  if (score > 0) scored.push({ rule, score });
}

// Top 8 rules, minimum 2 keyword hits
scored.sort((a, b) => b.score - a.score);
const topRules = scored.slice(0, 8).filter(s => s.score >= 2);

// Output injected as system context for Claude
if (topRules.length > 0) {
  const categories = [...new Set(topRules.flatMap(s => s.rule.categories || []))];
  console.log(`[${topRules.length} rules injected | categories: ${categories.join(', ')}]`);
  console.log('Relevant learned rules:');
  for (const { rule } of topRules) {
    console.log(`- ${rule.text}`);
  }
}
