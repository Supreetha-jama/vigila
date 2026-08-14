// Status-dot + letter-spaced caps label chip (e.g. "■ SYMPTOMS"), per PLANNING.md's
// design references — reused above every section heading.
export default function SectionLabel({ children }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
      <span aria-hidden="true" className="h-2 w-2 bg-gold" />
      {children}
    </span>
  )
}
