// Shared citation footer — clean readable sentences with an inline link,
// not raw academic citation formatting. Reused on /learn and /stats.
export default function Sources() {
  return (
    <div className="mt-16 border-t border-wine/10 pt-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">Sources</p>
      <ul className="mt-3 space-y-2 text-xs text-ink/50">
        <li>
          Based on the{' '}
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/37580861/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-ink/20 underline-offset-2 hover:text-wine"
          >
            2023 International Evidence-based Guideline for the Assessment and Management of PCOS
          </a>
          , developed by the International PCOS Network and endorsed by 39 medical societies
          worldwide.
        </li>
        <li>
          Prevalence and undiagnosed-rate statistics: World Health Organization,{' '}
          <a
            href="https://www.who.int/news-room/fact-sheets/detail/polycystic-ovary-syndrome"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-ink/20 underline-offset-2 hover:text-wine"
          >
            &ldquo;Polycystic ovary syndrome&rdquo; fact sheet
          </a>
          .
        </li>
      </ul>
    </div>
  )
}
