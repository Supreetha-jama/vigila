import { useState } from 'react'

// Symptom is the prominent heading, solution sits below it. The "why" /
// "what can help" explanation is hidden until hover (desktop convenience) or
// click (persists — keyboard/touch accessible), same interaction pattern as
// the Learn section's phenotype cards, so the two content pages behave
// consistently. `prescriptionNote` and `mentalHealthNote` stay visible at
// rest — they're safety-relevant, not explanatory detail to tuck away.
export default function SymptomCard({
  symptom,
  solutionName,
  why,
  solution,
  source,
  prescriptionNote = false,
  mentalHealthNote = false,
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="group rounded-2xl border border-wine/10 bg-surface p-6">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left"
      >
        <h3 className="font-display text-2xl font-semibold text-ink">{symptom}</h3>
        <p className="mt-1 text-base font-semibold text-wine">{solutionName}</p>
      </button>

      <div
        className={`overflow-hidden text-sm text-ink/70 transition-[max-height,opacity,margin] duration-300 group-hover:mt-4 group-hover:max-h-96 group-hover:opacity-100 ${
          open ? 'mt-4 max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-3">
          <p>
            <span className="font-semibold text-ink">Why: </span>
            {why}
          </p>
          <p>
            <span className="font-semibold text-ink">What can help: </span>
            {solution}
          </p>
        </div>
      </div>

      {prescriptionNote && (
        <p className="mt-4 rounded-lg bg-gold/10 px-3 py-2 text-xs text-ink/70">
          As always, talk to your doctor about whether this is right for you.
        </p>
      )}

      {mentalHealthNote && (
        <p className="mt-4 rounded-lg bg-wine/10 px-3 py-2 text-xs text-ink/70">
          If this ever feels like more than everyday stress — including any thoughts of harming
          yourself — support is available any time: 988 Suicide &amp; Crisis Lifeline (call or text
          988) or the Crisis Text Line (text HOME to 741741).
        </p>
      )}

      <a
        href={source.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-xs text-ink/40 underline decoration-ink/20 underline-offset-2 hover:text-wine"
      >
        {source.label}
      </a>
    </div>
  )
}
