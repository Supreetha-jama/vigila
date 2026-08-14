// Reusable pull-quote stat pattern (PLANNING.md: "big number + short label", used in
// the hero and again on /stats). Numbers render in gold — not wine — so gold reads
// consistently as "this is a stat" everywhere it appears on the site.
export default function PullQuoteStat({ value, label, source }) {
  return (
    <div>
      <p className="font-display text-4xl font-semibold text-gold md:text-[2.75rem]">
        {value}
      </p>
      <p className="mt-1 max-w-xs text-sm text-ink/70">{label}</p>
      {source && (
        <a
          href={source.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-block text-xs text-ink/40 underline decoration-ink/20 underline-offset-2 hover:text-wine"
        >
          {source.label}
        </a>
      )}
    </div>
  )
}
