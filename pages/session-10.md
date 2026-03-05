---
layout: cover
background: /images/session-08-bg.jpg
---

# Session 10: Workshop

Week 5 · Hands-On · 60 min (Session 10 of 11)

<!--
Bring your laptops! This is a fully hands-on session. Everyone completes a real task using the workspace, applying everything from the previous 9 sessions. Three tracks: developers, designers, and QA. We'll start with a quick setup check, then dive into exercises.
-->

---
layout: section
---

# Setup Check

5 minutes — Make sure you're ready

<!--
Quick verification that everyone's workspace is running before we start the exercises. If you're not set up, pair with someone who is.
-->

---

# Quick Setup Recap

```bash
# Verify everything
node --version            # v18+ required
claude --version          # Claude Code installed
docker-compose ps         # Qdrant running (optional)
npm run session:stats     # Memory system working (optional)

# If not set up yet:
cd starter-ai-workspace
npm install
docker-compose up -d      # Optional
claude                    # Start working
```

### Already set up?

Help a neighbor. Or warm up with: `npm run tiered:search "your team's domain"`

<!--
Quick check. Most of you should be fully set up from Session 3. If not, pair with someone and follow the quick setup. We need everyone ready in 5 minutes.
-->

---
layout: section
---

# Workshop Exercises

45 minutes — Pick your track, work through the exercise

<!--
Three parallel tracks. Developers do a full workspace workflow. Designers do the prototype playbook end-to-end. QA does test generation and bug investigation. Everyone applies the skills from the last 9 sessions. Ask for help if you get stuck.
-->

---

# Track A: Developers

<div class="grid grid-cols-2 gap-8">
<div>

### Full workflow exercise

1. **Search memory**: `npm run tiered:search "topic"`
2. **Start Claude Code** with a real task
3. **Observe** hooks (skills, rules, quality checks)
4. **Use `/commit`** then `/session-review`

```bash
claude
> [your task description]
```

### Suggested tasks

Pick one relevant to your project:

- Add input validation to a form
- Write tests for an existing function
- Fix a bug in the codebase
- Refactor a function using TDD
- Add a CLI command for a common operation

</div>
<div>

### Checklist

- [ ] Searched session memory before starting
- [ ] Observed skill suggestion firing
- [ ] Observed rule injection
- [ ] Used CLI over MCP where possible
- [ ] Reviewed Claude's output critically
- [ ] Used `/commit` with proper message
- [ ] Ran `/session-review`

### Advanced challenge

If you finish early:
- Try the **checkpoint-revert** pattern
- Use **sub-agents** for parallel research
- Convert an MCP operation to CLI

### Remember

> **Level 3 prompts**: action + where + constraints + patterns

</div>
</div>

<!--
Developers: full workflow practice. Search memory first, observe hooks, use CLI, commit properly. Focus on reviewing Claude's output—don't just accept everything. The advanced challenges are for those who finish early.
-->

---

# Track B: Designers

<div class="grid grid-cols-2 gap-8">
<div>

### End-to-end prototype exercise

1. **Clone** a template project
2. **Branch**: `git checkout -b workshop-change`
3. **Run**: `npm install && npm run dev`
4. **Change**: Use Claude Code to make a visual update
5. **Verify**: Check in browser at `localhost:3000`
6. **Commit**: `/commit`
7. **PR**: `gh pr create` with screenshots

```bash
claude
> Change the primary color to #6366f1
  and update the hero heading to
  "AI-Powered Workspace"
```

</div>
<div>

### Checklist

- [ ] Created a branch (not working on `main`)
- [ ] App runs locally
- [ ] Change matches intent
- [ ] Verified in browser
- [ ] Committed with `/commit`
- [ ] Opened PR with screenshots

### Safety reminders

| Safe | Dangerous |
|------|-----------|
| `git checkout .` | Pushing to `main` |
| `/commit` | Merging without review |
| Branch workflow | Editing unknown files |

### If stuck

Ask a developer neighbor or type: `> Is this change safe?`

</div>
</div>

<!--
Designers: this is the full prototype playbook from Session 8. Go through every step. The goal is confidence: by the end you should be able to make visual changes, verify them, and open a PR independently. Ask for help if git gives you trouble.
-->

---

# Track C: QA Engineers

<div class="grid grid-cols-2 gap-8">
<div>

### Test generation exercise

1. Pick a function in your codebase
2. Ask Claude to analyze test coverage:
   ```
   > Analyze test coverage for
     src/auth/session.ts.
     What gaps exist?
   ```
3. Generate tests for the gaps:
   ```
   > Write tests for the gaps.
     Follow patterns in tests/auth/.
   ```
4. Run tests: `npm test`
5. Review and `/commit`

</div>
<div>

### Bug investigation exercise

1. Find a known bug or create a test scenario
2. Use `/debug` for structured investigation:
   ```
   > /debug
   > The session expires after 5 minutes
     instead of the configured 30 minutes.
     Error: TTL value is 300000 instead
     of 1800000.
   ```
3. Follow the 4-phase analysis
4. Fix and verify

### Checklist

- [ ] Used `systematic-debugging` skill
- [ ] Searched memory for similar bugs
- [ ] Reviewed generated tests for correctness
- [ ] All tests pass
- [ ] Committed with clear message

</div>
</div>

<!--
QA engineers: two exercises. First, generate tests for an existing module—focus on reviewing the output for correctness. Second, use /debug for a structured bug investigation. Both exercises practice the tools covered in Session 8.
-->

---
layout: center
---

# Live Demo

### Full Workflow: Search → Work → Commit

<div class="grid grid-cols-5 gap-6">
<div class="col-span-2 text-gray-400 pt-2">

1. `npm run tiered:search` — find relevant past sessions
2. Open Claude Code with a **Level 3 prompt**
3. Watch it read patterns, write code, show diff
4. `/commit` — clean conventional commit message

</div>
<div class="col-span-3 flex items-center justify-center">

<img src="/demos/s10-full-workflow.gif" class="w-full rounded shadow" />

</div>
</div>

<!--
[LIVE DEMO] Show the complete OODA loop in a real task: search memory, work with Claude using a Level 3 prompt, review the output, commit. This demonstrates how everything from the previous 9 sessions comes together in practice.
-->

---

# Share & Compare

<div class="grid grid-cols-2 gap-8">
<div>

### Show & tell (5 min per track)

Each track shares:
1. **What you did** — brief demo of the result
2. **What surprised you** — something unexpected
3. **What was hard** — where you got stuck

### Cross-track questions

- **Developers → Designers**: What was your first PR experience like?
- **Designers → QA**: What edge cases did Claude find?
- **QA → Developers**: Did session memory help you find past bugs?

</div>
<div>

### Common observations

| Observation | Solution |
|-------------|----------|
| "Claude went off track" | More specific prompt next time |
| "I accepted without reviewing" | Always review before committing |
| "The session got confused" | Start fresh, one task per session |
| "I didn't know that command" | Check `CLAUDE.md` and `/help` |

### Celebrate wins!

> Every PR from a designer, every test from QA, and every clean commit from a developer is a win. The workspace makes it possible.

</div>
</div>

<!--
Take 10 minutes for show & tell. Each track shares briefly. Cross-track questions build empathy—developers hear about the designer experience, QA shares what Claude found. This builds the team culture around AI-assisted development.
-->

---

# Homework: One Real Task This Week

<div class="grid grid-cols-2 gap-8">
<div>

### For everyone
1. Complete **one real task** using the workspace this week
2. Use the full workflow: search → work → commit → review
3. Share your experience in **#ai-workspace**

### For developers
- Review a designer's PR this week
- Help a QA engineer with their first test generation

</div>
<div>

### For designers
- Open **one PR** with a real visual change
- Include before/after screenshots

### For QA
- Generate tests for **one module** and get them merged

### Track your experience

> Note what worked and what didn't. We'll use this feedback in the final session's retrospective.

</div>
</div>

<!--
The goal is one real task per person this week. Not a toy exercise—something that ships. Developers review across roles. Everyone tracks their experience for the retrospective in Session 11.
-->

---
layout: section
---

# Q&A

Session 10 of 11 complete · **Next**: Adoption Playbook & Retrospective (Session 11, final!)

<!--
Questions before you start your homework? Remember: one real task this week. Track what worked and what didn't. We'll use that feedback in the final session.
-->
