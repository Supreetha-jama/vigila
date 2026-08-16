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
   real-world facts" rule. (Verified in Stage 3 — see below.)

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

## Stage 2 (continued) — real WHO citation wired into the hero/stats pull-quotes

User supplied the WHO fact-sheet URL and the two figures to use (10–13% prevalence, 70%
undiagnosed). Before wiring them in, fetched the live WHO page directly and confirmed both figures
verbatim on the page, rather than trusting either the user's paraphrase or model recall of the
number — this project's "do not invent" rule applies as much to *verifying* a supplied figure as to
not inventing one outright. Built a reusable `PullQuoteStat` component (gold number + label +
visible source link) per PLANNING.md's hero pattern, used in both the hero (70% figure) and `/stats`
(both figures) so the two placements stay visually consistent. Marked item 1 of PLANNING.md's
"content that must NOT be invented" list as resolved with the citation.

## Stage 3 — Companion chatbot wired to a live model

Verified the two crisis-resource phone/text lines by fetching 988lifeline.org and
crisistextline.org directly, rather than trusting training-data recall — both confirmed current.
Consistent theme across this whole project: "don't invent" applies to *verifying* real-world facts
(a phone number, a stat, a dataset source), not just refusing to make numbers up outright.

Backend built against the Claude API (Anthropic SDK), capping conversation history sent per request
to the last 12 messages so the system prompt's "watch the trend, not just the last message"
instruction actually had material to reason over — a single stateless message can't judge a trend.

**Mid-build provider switch, Claude → Gemini** (user-directed, partway through Stage 3): the
Anthropic account hit a billing/credit wall; the user supplied a Gemini key instead and asked to
swap providers. Notable for the writeup because of *how* the swap was verified, not just that it
happened — same "verify, don't guess" discipline applied to a completely different SDK:
1. First WebFetch of Google's live Gemini docs returned a plausible-looking "Interactions API"
   (`client.interactions.create`, `previous_interaction_id`, etc.) with a specific, detailed code
   example.
2. Wrote `chat.py` against that shape — it failed immediately: `AttributeError: 'Client' object has
   no attribute 'interactions'`. The installed SDK (`google-genai==1.47.0`) has no such API — the
   fetched documentation was wrong (whether hallucinated by the fetch tool's summarizing model, or
   describing a not-yet-shipped API, wasn't worth chasing down).
3. Rather than trust a second fetch, switched to directly introspecting the *installed* package —
   `dir(client)`, `inspect.signature(...)`, reading `errors.APIError`'s actual source — to get the
   real API surface (`client.models.generate_content`, `types.GenerateContentConfig`,
   `google.genai.errors.APIError` with `.code`/`.message`). Also queried `client.models.list()`
   against the live API with the real key to get actual current model IDs, rather than reuse the
   (also fetch-sourced, also unverified) model name from the same bad doc fetch — landed on
   `gemini-flash-latest`, an alias Google maintains to always point at their current flash model.
4. Re-verified all three test scenarios (normal question, explicit crisis language, multi-turn
   negative-trend escalation) against the new Gemini backend — same pass/fail bar as the original
   Claude version, all three passed. The system prompt text itself needed zero changes; it was
   already provider-agnostic (no Claude-specific behavior baked into the wording).

The general lesson, worth stating plainly in the submission: when a tool result (fetched docs, in
this case) and ground truth (the actual installed library) disagree, trust the ground truth and
verify by execution — a failed `AttributeError` was a faster and more reliable signal than a second
round of fetching more documentation would have been.

Frontend `CompanionChat.jsx` verified live in-browser, not just via curl.

## Stage 4 — Learn section: phenotype cards + shared citations

User supplied exact card copy + citation (2023 International PCOS Guideline, PMID 37580861).
Verified the citation via PubMed's E-utilities API (the raw PubMed page just returns a cookie wall
to a plain fetch) before wiring it in. Split each card's two user-supplied sentences into
teaser/detail at the existing sentence boundary — no paraphrasing, nothing invented for the UI
pattern's sake. Built one shared `Sources` component (used on `/learn` and `/stats`) with citations
as inline-linked sentences per the user's "clean text, not raw academic format" ask. The four tint
options PLANNING.md specified for cards (wine/rose/gold/ink) mapped 1:1 onto the four cards.

## Stage 4 (continued) — Symptoms page: 6 cards + disclaimers + logo animation

Verified all 6 medical sources before wiring in (PubMed E-utilities, a clinicaltrials.gov PDF via
`pypdf`, a paywalled article resolved via PubMed search); one stat flagged as cross-verified rather
than directly confirmed. Disclaimers implemented per spec (site-wide note, per-card note only on
prescription cards, crisis-resource line only on the mental-health card, deterministic chatbot
opening line). Reused Learn's existing card hover/click pattern for consistency.

**Logo animation** iterated through several failed approaches (fade-in-place, `sticky` full-cover —
broke layout, then a `top:50%` vs `top:50vh` containing-block bug) before landing on the simplest
option: a large, slowly-rotating copy of the real logo behind the opaque cards, decorative like the
hero's gradient blobs rather than interactive. Also fixed a real bug found along the way:
`prefers-reduced-motion` was hiding the mark instead of showing it statically, contradicting
PLANNING.md's own rule. Diagnosed each failure from actual computed DOM state, not screenshots.

## Stage 5 — Polish & accessibility

Scripted WCAG contrast audit (not eyeballed) across every text/background pair; gold text never
clears AA, kept anyway as a documented tradeoff. Added site-wide keyboard focus states, fixed an
a11y gap in the chart and a real nav overflow bug at phone width (both verified via in-browser DOM
checks, not screenshots), and caught a leftover `[CITATION NEEDED]` placeholder in the chart caption.

_(Continue logging here at each subsequent stage — deploy.)_
