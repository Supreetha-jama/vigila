# Vigila — Planning Notes

Compiled Aug 13, 2026, the day before hackathon kickoff (Technology For Wellness, Aug 14 6PM EST – Aug 16 6PM EST). This is a summary of everything decided in planning/design-reference sessions before any code was written — kickoff's hard gate (no coding/asset creation before Aug 14, 6PM EST) held throughout.

## Project

- **Name:** Vigila
- **Concept:** an educational + supportive website for people with PCOS, built around the idea that people are often dismissed or told "you're fine" when they know something isn't right — Vigila validates that with real information and support.
- **Core pages:** PCOS-types education (scroll-triggered, tied to real content), a stats/graphs page (pandas/numpy → Recharts), a symptoms + management-tips page (evidence-based, cited), and a supportive chatbot companion (explicitly non-diagnostic/non-therapist, with a crisis-resource fallback).

## Color palette — "Wine & Blush" (final, locked)

| Role | Hex |
|---|---|
| Background | `#FBF1EC` |
| Surface | `#FFFBF9` |
| Primary (wine) | `#8E4459` |
| Secondary (rose) | `#D98E9B` |
| Accent (gold) | `#C9A25E` |
| Text (ink) | `#3B2430` |

**Rule: every color anywhere on the site must come from only these six values.** Tints/washes should be these exact colors at partial opacity (e.g. `rgba(142,68,89,0.10)` for a soft wine wash) — never a new, separately-invented hex, even one that looks close. This was violated once during mockup iteration (an invented green "sage" tone for a fourth card, plus a few hand-approximated tint hexes) and had to be corrected — worth auditing against this exact list before shipping anything in the real build.

## Typography

- **Display / headlines:** Fraunces, weight 600/700
- **Body / UI:** Inter, weight 400/600
- Self-hosted variable font files (not a Google Fonts CDN link), latin subset

## Hero layout direction

- Asymmetric, left-aligned — not centered, not a symmetric template layout
- Oversized Fraunces headline, wraps across 2 lines naturally
- Small letter-spaced "VIGILA" eyebrow label above the headline
- Body copy: 1–2 sentences, narrower max-width than the headline
- One CTA button only — no competing secondary button
- Decoration: two overlapping soft radial-gradient blobs (rose + gold), low opacity, positioned asymmetrically in a corner — not centered/symmetric icon grids or blob-mesh backgrounds (that reads as generic/AI-templated)
- **Pull-quote stat component** (big number + short label) — a reusable pattern, also used on `/stats`. Stat numbers render in gold (not wine), so gold consistently reads as "this is a stat" across the site.
- Numbers used in mockups (`70%`, `1 in 10`) are **placeholders only** — real prevalence/undiagnosed-rate figures still need a real, citable source before shipping. Do not invent numbers.

## Navigation — hybrid scroll + sticky stepper

- Single long-scroll page, four sections in order: **Learn → Symptoms → Stats → Companion**
- Sticky top bar showing all section labels + progress dots (filled = passed, hollow = upcoming, current highlighted)
- Thin progress bar under the nav fills left-to-right based on scroll position through the page
- Clicking a nav label smooth-scrolls directly to that section
- **Recommended implementation** (no scroll library needed): native `IntersectionObserver` per section for scroll-spy, with `rootMargin` offset by the sticky header's height so a section only activates once it clears the header; CSS `scroll-margin-top` + native `scrollIntoView({behavior:'smooth'})` for click-to-section.

## Interactive phenotype cards (Learn section)

- Replaced an earlier "wall of text" paragraph layout with **four interactive cards** for the PCOS phenotypes (A/B/C/D)
- Full container width on desktop (not squeezed into the same narrow reading column as body paragraphs) — responsive grid, folds to fewer columns / single column on smaller screens
- At rest: shows the letter + a short teaser line
- On hover *or* click/tap: reveals the full detail text — click persists the open state (works for touch and keyboard via `aria-expanded`), hover is a desktop convenience layered on top
- Each card has a distinct but strictly on-palette tint (translucent wine / rose / gold / text — never a new invented color)

## Motion direction

- Real build uses **Framer Motion** in React (`whileInView` pattern)
- Headlines/paragraphs: fade + slight upward translate as they scroll into view
- Multi-line text / list items stagger ~60–100ms apart, reading as a sequential reveal
- Stat numbers count up from 0 to the real value on scroll-in, not static text
- Hero background blobs get a subtle parallax drift (different depths move at different speeds, for a sense of depth)
- Highlighted key terms in body copy fade in with a slight stagger relative to their sentence
- **Must respect `prefers-reduced-motion`** — skip animation, show final content state immediately. This is an accessibility requirement, not optional polish.

## Design references reviewed (for direction, not literal copying)

- **untillabs.com** — cinematic scroll-scrubbed hero; judged too heavy/engineering-expensive for a 48-hour build, not being replicated
- **superpower.com** — sticky right-side numbered stepper nav with dim/highlight states; informed the sticky-nav pattern above
- **integratedbio.com** — progressive text-fill-on-scroll; informed the original Learn-section motion concept, since evolved into the interactive phenotype cards instead

## Logo

**Not resolved — being designed independently, outside this planning process.** The "Vigila" wordmark used in mockups so far is placeholder text (Fraunces, set as a wordmark), not a real logo treatment. Do not attempt to design or rebuild a logo as part of implementation; treat it as an asset that will be dropped in separately.

## Stack

- **Frontend:** React (Vite), JavaScript (not TypeScript), Tailwind CSS
- **Backend:** FastAPI, pandas/numpy, Gemini API (`google-genai`) for the chatbot — switched from
  Claude mid-build; see Stage 3 notes in AI_USAGE.md and `backend/prompts/companion_system_prompt.md`
- **Deployment:** Vercel (frontend) + Render (backend), live for judges
- **Structure:** monorepo — `vigila/frontend`, `vigila/backend`

## Content that still needs a real, citable source (do not invent)

1. ~~PCOS prevalence & undiagnosed-rate statistics (`/stats` page, hero pull-quote, phenotype-card context)~~ —
   **resolved**: WHO fact sheet on polycystic ovary syndrome (verified by fetching the live page, not
   from training-data recall) — "PCOS affects an estimated 10–13% of reproductive-aged women" and
   "up to 70% of women with PCOS worldwide do not know they have this condition."
   https://www.who.int/news-room/fact-sheets/detail/polycystic-ovary-syndrome — wired into the hero
   and `/stats` pull-quotes, and now also in the shared Sources footer (`/learn`, `/stats`).
   Phenotype-card content itself (item 2 below) is cited separately.
2. ~~Phenotype-card content (`/learn`)~~ — **resolved**: cited to the 2023 International
   Evidence-based Guideline for the Assessment and Management of PCOS (International PCOS Network,
   39 endorsing societies) — verified via PubMed E-utilities (PMID 37580861) before wiring in.
   https://pubmed.ncbi.nlm.nih.gov/37580861/ — shown in the shared Sources footer alongside the WHO
   citation.
3. ~~Symptom & management-tip claims (`/symptoms` page)~~ — **resolved**: 6 sources verified
   (PubMed, Harvard Health, Contemporary OB/GYN, a clinicaltrials.gov consent form, a Springer
   meta-analysis) — see AI_USAGE.md Stage 4 for verification method per source.
4. ~~Crisis-resource hotlines/services in the chatbot fallback~~ — **resolved**: 988 Suicide &
   Crisis Lifeline and Crisis Text Line (text HOME to 741741) verified against the live
   988lifeline.org and crisistextline.org pages during Stage 3 — see AI_USAGE.md.
5. ~~Age-distribution dataset (`/stats` page bar chart)~~ — **resolved**: an open, synthetic/practice
   PCOS dataset, not verified clinical records, captioned as such (deliberately lower authority than
   the WHO/guideline citations above). Kaggle: PCOS Diagnosis Dataset —
   https://www.kaggle.com/datasets/samikshadalvi/pcos-diagnosis-dataset (verified the URL resolves
   before wiring it in). Was left as a "[CITATION NEEDED]" placeholder in the component through
   Stage 5; caught and fixed during the accessibility/polish pass.

## Stage 1 notes

- Corrected an initial git configuration issue early in Stage 1 (before any commit was made) —
  the repo is now `git init`'d cleanly scoped to `vigila/`, with a `.gitignore` covering
  `node_modules/`, `.env`/secrets, and Python venv/cache dirs, verified against a dry-run `git add -A`
  before the first real commit.

## Related files

- Full staged build plan (stages, architecture, verification steps): `~/.claude/plans/project-vigila-technology-staged-shell.md`
- A disposable HTML design mockup was built and reviewed during planning, then deleted per the hackathon's no-assets-before-kickoff rule. It was also published as a private Claude Artifact for visual review — that hosted page isn't something available tools can delete; it's private by default (never shared), but note it still exists if that matters.
