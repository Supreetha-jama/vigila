export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-br from-rose/25 via-background to-gold/20 px-6 pb-24 pt-40 md:pb-32 md:pt-48"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-wine">
          VIGILA
        </p>
        <h1 className="max-w-3xl font-display text-5xl font-bold leading-[1.1] text-ink md:text-6xl">
          You&rsquo;re not imagining this.
        </h1>
        <p className="mt-6 max-w-md text-lg text-ink/70">
          Real information about PCOS, in one place. Whether you&rsquo;re diagnosed, wondering, or
          tired of being dismissed, this will help you trust what you already know.
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
      </div>
    </section>
  )
}
