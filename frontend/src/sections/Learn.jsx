import SectionLabel from '../components/SectionLabel'
import PhenotypeCard from '../components/PhenotypeCard'
import Sources from '../components/Sources'

const PHENOTYPES = [
  {
    title: 'All the Signs at Once',
    teaser:
      'Irregular or unpredictable periods, higher levels of hormones like testosterone, and ovaries that show a specific pattern on ultrasound — all three at the same time.',
    detail:
      'This is the version most people picture when they hear "PCOS," which is part of why the other types get missed.',
    tint: 'wine',
  },
  {
    title: 'The One Ultrasounds Miss',
    teaser:
      'Irregular periods and elevated hormone levels — but the ovaries look completely normal on ultrasound.',
    detail:
      'This is one of the most commonly overlooked types, because a "normal-looking" ultrasound often gets treated as proof there’s nothing wrong.',
    tint: 'rose',
  },
  {
    title: 'The One Regular Cycles Hide',
    teaser:
      'Elevated hormone levels and the ultrasound pattern are both present — but periods still show up fairly regularly.',
    detail:
      'Here’s the catch: regular bleeding doesn’t always mean regular ovulation. A lot of people with this type assume they’re fine because their cycle "looks normal," and so do their doctors.',
    tint: 'gold',
  },
  {
    title: 'The One Without the Obvious Symptoms',
    teaser:
      'Irregular periods and the ultrasound pattern are present, but none of the typical hormone-related symptoms — no acne, no excess hair growth, no hair thinning.',
    detail:
      'Because this type doesn’t come with the "classic" visible symptoms, it’s easy for both patients and doctors to overlook entirely.',
    tint: 'ink',
  },
]

export default function Learn() {
  return (
    <section id="learn" className="scroll-mt-20 border-t border-wine/10 bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Learn</SectionLabel>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold text-ink md:text-4xl">
          PCOS phenotypes, explained
        </h2>
        <p className="mt-4 max-w-xl text-ink/70">
          PCOS isn&rsquo;t one fixed picture — it shows up differently depending on which signs are
          present. Tap a card for the full picture.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PHENOTYPES.map((p) => (
            <PhenotypeCard key={p.title} {...p} />
          ))}
        </div>

        <Sources />
      </div>
    </section>
  )
}
