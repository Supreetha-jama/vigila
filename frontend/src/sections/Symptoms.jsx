import SectionLabel from '../components/SectionLabel'

// Placeholder shell — symptoms + management tips, each footnoted with a real
// citation, gathered in Stage 4 (see PLANNING.md "flagged: content that must NOT
// be invented", item 2).
export default function Symptoms() {
  return (
    <section id="symptoms" className="scroll-mt-20 border-t border-wine/10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Symptoms</SectionLabel>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold text-ink md:text-4xl">
          Symptoms &amp; management
        </h2>
        <p className="mt-4 max-w-xl text-ink/70">
          Evidence-based symptom and management-tip content, each claim cited — added in Stage 4.
        </p>
      </div>
    </section>
  )
}
