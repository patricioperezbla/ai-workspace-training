# AI Workspace Training Program — Session Outline

**Presented by**: Patricio Perez, Tech Lead — Node Backend Team
**Format**: 8 sessions · 4 weeks · 2 sessions/week · 1 hour each
**Audience**: Whole company (executives to junior developers)

---

## Week 1: What is AI-Assisted Development?

### Session 1: The AI Coding Revolution
*Non-technical · 60 min*

- What is an LLM? (5-min explainer, no jargon)
- From ChatGPT to coding agents: the evolution (2020–2026 timeline)
- What is Claude Code? Live demo of a real task
- Business value: productivity gains, code quality, knowledge retention
- What Claude Code is NOT (not replacing developers, not autonomous)
- **Homework**: Install Claude Code, complete one task, share results

### Session 2: How Claude Code Works
*Light technical · 60 min*

- The agentic conversation loop: prompt → think → tool use → result
- Claude Code's tool belt: Read, Write, Edit, Bash, Grep, Glob
- The context window: what the AI "sees" and forgets
- CLAUDE.md — giving the AI project knowledge
- Permissions model: what it can/can't do without asking
- Costs & token usage (ROI: 8–15x at typical usage)
- **Homework**: Write a CLAUDE.md for your project (pairs workshop)

---

## Week 2: The Workspace — Why & What

### Session 3: Why a Workspace?
*Mixed audience · 60 min*

- Three problems with vanilla Claude Code: amnesia, knowledge silos, no guardrails
- Solution: starter-ai-workspace (the "operating system" for Claude Code)
- Architecture overview with diagrams
- The virtuous cycle: every session makes the next one better
- What changes for each role (PMs, executives, designers, QA, devs)
- **Homework**: Fork & explore the workspace, discuss with team

### Session 4: Skills, Hooks & Commands
*Technical · 60 min*

- Skills system: domain expertise auto-loaded on demand
- Hooks system: lifecycle events for quality enforcement and automation
- Code quality hooks: block `as any`, block hardcoded secrets, warn on debug code
- Slash commands: `/commit`, `/debug`, `/pr-review`, `/session-review`
- How to create your own skill (live walkthrough)
- **Homework**: Create a skill for your team's conventions (trios workshop on custom hooks)

---

## Week 3: Memory & Intelligence

### Session 5: Session Memory & Semantic Search
*Technical · 60 min*

- The memory problem: Claude forgets between sessions
- How embeddings work: text → vector → similarity search (local model, no API calls)
- Qdrant vector database and the embedding pipeline
- Three search modes: semantic, hybrid, tiered
- Knowledge graph: entity extraction and session relationships
- Tiered memory architecture (Working → Episodic → Semantic → Resource)
- **Homework**: Embed sessions, search them, pairs workshop

### Session 6: The Self-Improving Agent
*Technical · 60 min*

- Research foundations: ExpeL, Voyager, Reflexion, MemGPT
- The self-improvement pipeline: quality scoring → insight extraction → reflections → rules
- Rule lifecycle: proposed → active → reinforced → stale → retired
- Runtime injection: keyword-matched rules injected into Claude's context
- Safety: atomic git commits, revertable, 500-rule cap
- **Homework**: Run insight extraction, review rules, write a manual rule

---

## Week 4: Orchestration & Putting It Together

### Session 7: Agent Orchestration & MCP
*Technical · 60 min*

- MCP (Model Context Protocol) — the "USB-C for AI"
- Workspace MCP servers: GitHub, Chrome DevTools, custom workspace MCP
- MCP for designers: Figma ecosystem, Storybook, Design Systems MCP, design tokens pipeline
- Multi-agent architecture: sub-agents (1 context) vs Agent Teams (N contexts)
- Context management and the OODA loop
- **Homework**: Build an MCP integration, pairs scenario planning

### Session 8: Workshop & Adoption Playbook
*Hands-on · 60 min*

- Setup walkthrough: fork, clone, configure, first embed (15 min)
- Hands-on exercise: complete a real task using the full workspace (25 min)
  - Role-specific tasks for devs, PMs, designers
- Adoption playbook: 5-phase ladder from CLAUDE.md to self-improvement (20 min)
- ROI discussion: where the value compounds over time
- Getting started checklist + take-home assignments
- **Group challenge**: 3 team skills + 10 embedded sessions in 2 weeks

---

## Key Outcomes

By the end of this program, participants will be able to:

1. Use Claude Code effectively for daily development tasks
2. Write CLAUDE.md files that dramatically improve AI output quality
3. Create domain-specific skills that codify team conventions
4. Search past sessions for solutions, decisions, and context
5. Understand and monitor the self-improvement pipeline
6. Connect design and development workflows through MCP integrations
7. Choose between sub-agents and agent teams for parallel work
8. Roll out the workspace incrementally using the adoption playbook

---

## Requirements

- **All participants**: GitHub account, Claude Code access
- **Technical sessions**: Laptop with Node.js 18+, Docker Desktop
- **Recommended**: VS Code or terminal comfort for sessions 4–8
