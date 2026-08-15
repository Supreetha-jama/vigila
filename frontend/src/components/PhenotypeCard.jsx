import { useState } from 'react'

// Translucent wine / rose / gold / ink — the four on-palette tint options per
// PLANNING.md's interactive-card spec. Never a new invented color.
const TINTS = {
  wine: 'bg-wine/10 border-wine/20',
  rose: 'bg-rose/15 border-rose/30',
  gold: 'bg-gold/10 border-gold/25',
  ink: 'bg-ink/5 border-ink/15',
}

// At rest: title + teaser. Click persists the open state (keyboard/touch
// accessible via a real <button> + aria-expanded); hover is a desktop-only
// convenience layered on top via group-hover, per PLANNING.md.
export default function PhenotypeCard({ title, teaser, detail, tint }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`group rounded-2xl border p-6 transition-colors ${TINTS[tint]}`}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left"
      >
        <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
        <p className="mt-2 text-sm text-ink/70">{teaser}</p>
      </button>
      <p
        className={`overflow-hidden text-sm text-ink/70 transition-[max-height,opacity,margin] duration-300 group-hover:mt-3 group-hover:max-h-40 group-hover:opacity-100 ${
          open ? 'mt-3 max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {detail}
      </p>
    </div>
  )
}
