import { motion, useReducedMotion } from 'framer-motion'

// Reusable pull-quote stat pattern (PLANNING.md: "big number + short label", used on
// /stats). Numbers render in gold — a known WCAG AA contrast gap against the cream
// background (no opacity fixes it), kept deliberately because wine-only read as too
// monochrome across the page.
export default function PullQuoteStat({ value, label, source }) {
  const reduceMotion = useReducedMotion()

  return (
    <div>
      <motion.p
        className="font-display text-4xl font-semibold text-gold md:text-[2.75rem]"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {value}
      </motion.p>
      <p className="mt-1 max-w-xs text-sm text-ink/70">{label}</p>
      {source && (
        <a
          href={source.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-block text-xs text-ink/70 underline decoration-ink/20 underline-offset-2 hover:text-wine"
        >
          {source.label}
        </a>
      )}
    </div>
  )
}
