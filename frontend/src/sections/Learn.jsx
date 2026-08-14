import SectionLabel from '../components/SectionLabel'

// Placeholder shell — the four interactive phenotype cards (A/B/C/D) with real,
// cited content land here in Stage 4 (see PLANNING.md "Interactive phenotype cards").
export default function Learn() {
  return (
    <section id="learn" className="scroll-mt-20 border-t border-wine/10 bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Learn</SectionLabel>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold text-ink md:text-4xl">
          PCOS phenotypes, explained
        </h2>
        <p className="mt-4 max-w-xl text-ink/70">
          Interactive phenotype cards (A/B/C/D) — content sourced and cited in Stage 4.
        </p>
      </div>
    </section>
  )
}
