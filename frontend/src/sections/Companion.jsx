import SectionLabel from '../components/SectionLabel'

// Placeholder shell — chat UI wired to POST /api/chat in Stage 3. The system prompt
// (non-diagnostic/non-therapist, anti-negative-spiral per the Wellness track's
// requirement) is already drafted at backend/prompts/companion_system_prompt.md.
export default function Companion() {
  return (
    <section id="companion" className="scroll-mt-20 border-t border-wine/10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Companion</SectionLabel>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold text-ink md:text-4xl">
          A listening space, not a diagnosis
        </h2>
        <p className="mt-4 max-w-xl text-ink/70">
          Vigila&rsquo;s companion chatbot is here to validate, not diagnose or replace a doctor or
          therapist. Chat UI wired to a live backend in Stage 3.
        </p>
      </div>
    </section>
  )
}
