# AI usage log (Vigila)

Notes for the **Best Use of AI** bonus track — source material for the submission writeup, not
the writeup itself.

**Companion chatbot system prompt** (`backend/system_prompt.py`): built specifically to satisfy
the Wellness track's rule that mood/companion bots must not reinforce negative spirals. Key design
choices — validate in calmer language rather than mirroring the user's intensity back; no
open-ended "tell me more about how bad it's gotten" follow-ups; two separate triggers, explicit
crisis language (immediate redirect) vs. a conversation *trending* negative over several turns
(softer redirect toward a real clinician), the second requiring recent chat history, not just the
latest message, since one message can't show a trend.

**Verify, don't invent, applied throughout:** every real-world fact on the site (WHO prevalence
stats, the 2023 PCOS guideline, symptom/treatment sources, crisis hotline numbers, the Kaggle
dataset) was checked against a live source before being wired in, not trusted from model recall.
Same standard applied to tooling: when a docs fetch for the Gemini API returned a plausible but
nonexistent method during a mid-build Claude to Gemini provider switch, the fix was introspecting
the actually-installed SDK directly rather than trusting a second fetch.

**Dataviz:** the age-distribution chart uses a single-hue ordinal ramp (age brackets are ordered,
not categorical), validated with a palette-contrast script rather than eyeballed.

**Accessibility pass:** contrast checked with a script across every text/background pair; a real
nav-overflow bug at phone width and a missing chart screen-reader label were both found and
confirmed fixed via in-browser DOM checks, not just visual screenshots.
