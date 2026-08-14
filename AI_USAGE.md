# AI usage log (Vigila)

Running log kept for the **Best Use of AI** bonus track, which judges prompt/agent design
specifically. This is raw notes-as-we-go, not the submission writeup — rewrite in your own words
for the actual submission, using this as the source material.

Format per entry: **Stage — what Claude Code was used for**, then any prompt/system-prompt
decisions worth calling out.

---

## Pre-kickoff — Planning (Aug 13, 2026, before the hard gate)

Used Claude Code (chat only, no code/asset creation — hackathon rule was no `Write`/`Edit` before
Aug 14 6PM EST kickoff) for:
- Landing on the "Wine & Blush" palette and locking it to exactly 6 hex values, with a rule that
  every color anywhere on the site must trace back to one of those six (tints = same hex at partial
  opacity, never a new invented hex). This was actually enforced iteratively — an invented "sage"
  green slipped into an early mockup card and had to be caught and corrected. Worth noting for the
  writeup: the interesting part isn't that Claude proposed a palette, it's that a *hard constraint*
  ("only these 6 values, forever") was set and then had to be actively re-checked against, because
  the model drifted from it once under normal generation.
- Reviewing 3 live sites as design references (untillabs.com, superpower.com, integratedbio.com)
  via screenshots, extracting specific *reusable mechanisms* (sticky numbered stepper nav,
  progressive text-fill-on-scroll, status-dot label chips) rather than copying visual style —
  explicitly rejecting the heaviest reference (untillabs' canvas scroll-scrub) as not worth the
  48-hour engineering budget. This is a "know what to say no to" prompting pattern worth mentioning.
- Producing a disposable HTML mockup for visual review (deleted per the no-assets-before-kickoff
  rule; still exists as a private Claude Artifact, never shared).
- Writing a staged build plan (`~/.claude/plans/project-vigila-technology-staged-shell.md`) as a
  hard gate enforcement mechanism — Claude Code was told explicitly not to run `Write`/`Edit`/scaffold
  commands until the timestamp passed, so planning and execution were cleanly separated.

## Stage 1 — Scaffold & design system (Aug 14, 2026, post-kickoff)

Track decision made at the start of this stage: submitting to **Wellness** (main track) +
**Best Use of AI** (bonus track). This is why this file exists, and why the companion chatbot's
system prompt below got an explicit anti-negative-spiral pass — the Wellness track organizers
flagged that mood/companion chatbots specifically must not reinforce or mirror worsening negative
self-talk.

**System prompt decision — companion chatbot (drafted here, wired to the API call in Stage 3):**
Full text lives in `backend/prompts/companion_system_prompt.md`. The interesting design choices,
for the submission writeup:
1. **Validate, don't mirror.** Explicit instruction to reflect distress in calmer, more grounded
   language than the user used — not agree with or repeat their catastrophizing framing back
   (a naive "be warm and validating" prompt tends to do the opposite: it *echoes* intensity because
   that reads as empathetic in a single turn, even though it compounds badly across a conversation).
2. **No open-ended spiral-inviting follow-ups.** Told explicitly not to ask "tell me more about how
   bad it's gotten" — narrow toward something concrete instead. This is the difference between a
   prompt that's warm-in-isolation vs. warm-in-aggregate over a multi-turn conversation.
3. **Trend-aware, not just keyword-aware.** Two separate triggers: (a) crisis language (self-harm,
   suicidal ideation) → immediate redirect to crisis resources regardless of history; (b) a
   *pattern* of the conversation trending negative despite validation+redirection → a softer,
   still-warm redirect toward a real therapist/doctor, explicitly framed as care rather than a
   guardrail/refusal. This required sending recent conversation turns to the model, not just the
   latest message — a stateless single-message call can't judge a trend.
4. Crisis resources (988 Suicide & Crisis Lifeline, Crisis Text Line) are flagged in the prompt
   itself to be re-verified as current before the live demo, per the project's "don't invent
   real-world facts" rule.

Scaffold work done in this stage:
- `frontend/`: Vite + React 19 + Tailwind (JS, not TS), `tailwind.config.js` wired with the Wine &
  Blush tokens, `react-router-dom`, base layout/nav shell (sticky stepper + progress bar) per
  PLANNING.md, ESLint mirroring `sluggram-vite`'s config adapted for JS.
- `backend/`: Python venv, FastAPI + pandas/numpy/anthropic/python-dotenv, `/api/health`.

**Verification done for this stage:** `npm run lint` and `npm run build` clean on the frontend;
loaded the dev server in a real browser (via Claude in Chrome) and visually confirmed the palette,
self-hosted Fraunces/Inter fonts, hero blob decoration, and sticky-nav scroll-spy (dots correctly
show passed/active/upcoming while scrolling) — not just "the build didn't error." Backend:
`uvicorn` boots and `curl localhost:8000/api/health` returns `{"status":"ok"}`.

## Stage 2 (partial) — Stats page: age-distribution chart

First real dataset wired in: `backend/data/pcos_dataset.csv` (user-supplied, 1000 rows). Built
`GET /api/stats/age-distribution` (pandas `pd.cut` to bucket ages into 5 brackets, count
`PCOS_Diagnosis==1` per bracket) and a Recharts bar chart on `/stats`.

**Prompting choice worth noting for the writeup:** this stage was explicitly run in "explain, don't
just generate" mode — before each piece, a one-line rationale (why `pd.cut` here, why `GET` not
`POST`), then a full line-by-line walkthrough of the pandas logic after writing it, on request. The
point wasn't the code (that part's fast either way) — it was making sure the pandas technique itself
transfers, since it'll need to be explained again in the actual submission/demo.

**Color/design decision:** ran the `dataviz` skill's chosen-form step, which flagged this as
*ordinal* data (age brackets), not nominal categorical — so it took a single-hue lightness ramp
(one color, five monotone steps) rather than five arbitrary categorical hues. The ramp is wine
(`#8E4459`) blended over the surface color at 5 opacity steps, so it's still built entirely from
the locked 6-hex palette rather than introducing new colors — then validated with the skill's
`validate_palette.js --ordinal` script (lightness monotonicity, step separation, light-end contrast
against the surface) rather than eyeballed.

**Labeling decision (Wellness-track-adjacent, re: "don't invent"):** this CSV reads as a clean/
synthetic Kaggle-style practice dataset, not verified clinical records — so its chart carries its
own distinct, lower-authority caption (small, italic, muted) rather than being styled like the
cited WHO/epidemiological stat elsewhere on the site. Kept the two visually distinguishable so a
reader doesn't accidentally weight a synthetic-data illustration the same as a cited real statistic.

_(Continue logging here at each subsequent stage — remaining stats work, chatbot wiring, education
content, polish/accessibility, deploy.)_
