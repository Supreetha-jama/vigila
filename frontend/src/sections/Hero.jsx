import PullQuoteStat from '../components/PullQuoteStat'

const WHO_SOURCE = {
  label: 'WHO fact sheet: Polycystic ovary syndrome',
  href: 'https://www.who.int/news-room/fact-sheets/detail/polycystic-ovary-syndrome',
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pb-24 pt-40 md:pb-32 md:pt-48">
      {/* Asymmetric, low-opacity gradient blobs — the one intentional exception to
          "no gradient blobs" per PLANNING.md, positioned off-center in a corner. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-rose/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[5%] top-32 h-[320px] w-[320px] rounded-full bg-gold/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-wine">
          VIGILA
        </p>
        <h1 className="max-w-3xl font-display text-5xl font-bold leading-[1.1] text-ink md:text-6xl">
          You&rsquo;re not imagining this.
        </h1>
        <p className="mt-6 max-w-md text-lg text-ink/70">
          Real information and support for PCOS, built for people who&rsquo;ve been told
          &ldquo;you&rsquo;re fine&rdquo; one too many times.
        </p>
        <a
          href="#learn"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('learn')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
          className="mt-8 inline-flex items-center rounded-full bg-wine px-6 py-3 text-sm font-semibold text-surface transition-opacity hover:opacity-90"
        >
          Start with the basics
        </a>

        <div className="mt-14">
          <PullQuoteStat
            value="70%"
            label="of women with PCOS worldwide don’t know they have it."
            source={WHO_SOURCE}
          />
        </div>
      </div>
    </section>
  )
}
