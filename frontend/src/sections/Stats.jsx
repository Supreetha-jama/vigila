import SectionLabel from '../components/SectionLabel'
import PullQuoteStat from '../components/PullQuoteStat'
import AgeDistributionChart from '../components/AgeDistributionChart'

const WHO_SOURCE = {
  label: 'WHO fact sheet: Polycystic ovary syndrome',
  href: 'https://www.who.int/news-room/fact-sheets/detail/polycystic-ovary-syndrome',
}

export default function Stats() {
  return (
    <section id="stats" className="scroll-mt-20 border-t border-wine/10 bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Stats</SectionLabel>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold text-ink md:text-4xl">
          Prevalence &amp; undiagnosed rates
        </h2>

        <div className="mt-10 flex flex-wrap gap-16">
          <PullQuoteStat
            value="10–13%"
            label="of reproductive-aged women worldwide are affected by PCOS."
            source={WHO_SOURCE}
          />
          <PullQuoteStat
            value="70%"
            label="of women with PCOS worldwide don’t know they have it."
            source={WHO_SOURCE}
          />
        </div>

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
