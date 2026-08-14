import SectionLabel from '../components/SectionLabel'

// Placeholder shell — Recharts fed by GET /api/stats (pandas/numpy-processed), wired
// in Stage 2 once a real, citable prevalence dataset is sourced and approved (see
// PLANNING.md "flagged: content that must NOT be invented", item 1). No mock numbers
// here in the meantime.
export default function Stats() {
  return (
    <section id="stats" className="scroll-mt-20 border-t border-wine/10 bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Stats</SectionLabel>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold text-ink md:text-4xl">
          Prevalence &amp; undiagnosed rates
        </h2>
        <p className="mt-4 max-w-xl text-ink/70">
          Charts wired to a live <code className="text-wine">/api/stats</code> endpoint — sourced
          dataset pending your approval, added in Stage 2.
        </p>
      </div>
    </section>
  )
}
