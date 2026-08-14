import SectionLabel from '../components/SectionLabel'
import AgeDistributionChart from '../components/AgeDistributionChart'

export default function Stats() {
  return (
    <section id="stats" className="scroll-mt-20 border-t border-wine/10 bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Stats</SectionLabel>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold text-ink md:text-4xl">
          Prevalence &amp; undiagnosed rates
        </h2>
        <p className="mt-4 max-w-xl text-ink/70">
          The headline prevalence/undiagnosed-rate pull-quote stat (WHO/epidemiological
          source, per PLANNING.md) is still pending your approval — added here once sourced.
        </p>

        <div className="mt-16 max-w-2xl">
          <h3 className="font-display text-xl font-semibold text-ink">
            Age at diagnosis, by bracket
          </h3>
          <div className="mt-6">
            <AgeDistributionChart />
          </div>
        </div>
      </div>
    </section>
  )
}
