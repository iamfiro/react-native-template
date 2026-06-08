# Claude Prompt Engineering Reference

Collected from Anthropic's official docs, Claude Code system prompt analysis, and community research.

## Core Principles

### 1. XML Tags for Structural Isolation

Anthropic trained Claude specifically on XML-structured prompts. XML tags act as semantic separators — content inside a tag gets treated as a distinct, bounded unit.

```xml
<critical_rules>
Rule 1 here.
Rule 2 here.
</critical_rules>

<context>
Background information here.
</context>
```

Use consistent, descriptive tag names. Nest tags for hierarchy when needed.

### 2. Primacy + Recency — Double-Anchor Critical Rules

Instructions at the top and bottom of context get the most attention weight. Middle content fades (U-shaped attention curve). Put your most important rules at both the start AND end of the file.

```markdown
<critical_rules>
1. Do X before Y.
2. Always read Z first.
</critical_rules>

[... rest of content ...]

<critical_rules>
REMINDER —
1. Do X before Y.
2. Always read Z first.
</critical_rules>
```

Reserve this for 2-3 hard constraints only. Repeating everything negates the priority signal.

### 3. Give Rules a Reason (and a Consequence)

Rules without reasons are treated as suggestions. Rules with reasons get internalized as principles — Claude can apply them to novel situations the rule didn't anticipate.

```markdown
# Weak
Before any pipeline work → read docs/ai-pipeline-guide.md

# Strong
Before any pipeline work → read docs/ai-pipeline-guide.md directly.
Pipeline accuracy is the top priority; guessing from memory risks silent regressions
that are hard to detect.
```

Three layers work best: the rule → the reason → the consequence of breaking it.

### 4. Positive Framing Over Negation

Language models struggle with negation — the concept gets activated even when negated. Positive instructions outperform negative ones.

| Instead of | Use |
|---|---|
| Do NOT guess from AGENTS.md alone | Always read the relevant doc directly before proceeding |
| Never skip the clarification step | Ask for clarification before any complex pipeline change |
| Don't assume intent | Confirm intent explicitly before touching stages/ or pipeline.py |

### 5. Name the Anti-Pattern You're Overriding

Telling Claude what TO do isn't always enough — explicitly name and reject the wrong behavior it would default to.

```markdown
# Weak
Read the docs before proceeding.

# Strong
Read docs/ai-pipeline-guide.md directly (NOT from memory, NOT from this AGENTS.md summary).
```

From Claude Code's own system prompt:
```
- File search: Use Glob (NOT find or ls)
- Content search: Use Grep (NOT grep or rg)
```

### 6. Severity Grading — Reserve CRITICAL for Real Failures

If everything is CRITICAL, nothing is. Use exactly three tiers:

- **CRITICAL** — system fails if violated (2-3 rules max)
- **IMPORTANT** — strong preference with reasoning + escape hatch
- **Plain imperative** — everything else

Claude 4.5+ responds better to normal language than aggressive emphasis. Where you might say `CRITICAL: You MUST use this tool when...`, prefer `Use this tool when...`.

### 7. Teach Judgment, Not Just Rules

Rule lists break when Claude encounters a situation the list didn't anticipate. Principles scale because Claude can apply them to novel cases.

```markdown
# Rule (brittle)
Ask for clarification before touching pipeline.py

# Principle (scales)
Pipeline accuracy is the only metric that matters. Any change to stages/ or pipeline.py
carries accuracy risk that's hard to detect without domain context. When in doubt about
intent, the cost of asking is always lower than the cost of a silent regression.
```

## Structural Patterns from Production Repos

### Signal Word Hierarchy (from astral-sh/uv)

Use a consistent vocabulary across the file:

- `NEVER` — hard constraint, no exceptions
- `ALWAYS` — required behavior
- `PREFER` — default choice when alternatives exist
- `AVOID` — soft constraint with exceptions

### Dedicated "Do Not" Block (from vercel/ai)

Put all prohibitions in one scannable section. Don't bury them in prose.

```markdown
## Do Not
- Add minor/major changesets
- Change public APIs without updating documentation
- Use `require()` for imports
```

### Exact Commands, Not Descriptions

Every effective instruction file does this. The agent executes commands literally.

```markdown
# Weak
Run the test suite

# Strong
make check-test
```

### Negative Examples Inline

Show the bad pattern explicitly — more useful than the rule alone.

```markdown
AVOID shortening variable names, e.g., use `version` instead of `ver`
NEVER use dated model IDs (e.g., `claude-sonnet-4-6-20250514`). Always use the non-dated alias.
```

### Task Completion Definitions (from vercel/ai)

Define what "done" means per task type. Without this, agents close tasks prematurely.

```markdown
### Bug Fixes
A complete bug fix includes:
1. Reproduction example
2. Unit tests that would fail without the fix
3. Implementation
4. Changeset describing what was broken
```

## The 30-Line Rule

A focused 30-line file outperforms a comprehensive 200-line file. Every rule past the compliance ceiling doesn't improve behavior — it degrades it by diluting attention weight on everything else.

Audit test for each rule: "If I remove this, will Claude make a mistake it wouldn't otherwise make?" If no → delete it.

## Known Failure Modes

| Failure Mode | Description |
|---|---|
| Priority inflation | Marking everything CRITICAL/MUST/ALWAYS. When everything is urgent, nothing is |
| Negation overload | Long lists of "never do X" — first to fail under attention pressure |
| Middle burial | Most important rules in the middle of a long file — least attention weight |
| Mega-prompt accumulation | Adding a new rule every time something goes wrong. File grows, compliance shrinks |
| Conflicting instructions | When two instructions conflict, position wins (earlier = higher priority). More specific beats more general |

## Context Window Behavior

- Stable compliance below ~80K tokens
- Degrading at 80-120K tokens
- Significant degradation above 120K tokens
- Severe above 180K tokens

Instructions degrade over the course of a conversation. The model reverts to default trained behaviors as more tool call results accumulate in context, even though the instructions are still present.

## Prompt Format Influences Output Format

The formatting style used in your prompt influences Claude's response style. If your instructions use heavy markdown headers and bullets, Claude will tend to respond that way. If you want prose output, write the instructions in prose.

## Sources

- Anthropic official docs: docs.anthropic.com/en/docs/build-with-claude/prompt-engineering
- Claude Code system prompt analysis: northparkgroup.co/blog/claude-code-leak-prompt-engineering-rules
- Agent patterns: agentpatterns.ai/instructions
- Production examples: astral-sh/uv, vercel/ai, openai/codex, anthropics/anthropic-cookbook
