import { useScrollSpy } from '../hooks/useScrollSpy'
import { useScrollProgress } from '../hooks/useScrollProgress'
import wordmark from '../assets/vigila-wordmark.png'

const SECTIONS = [
  { id: 'learn', label: 'Learn' },
  { id: 'symptoms', label: 'Symptoms' },
  { id: 'stats', label: 'Statistics' },
  { id: 'companion', label: 'Companion' },
]

// Keep in sync with the nav's actual rendered height (h-16 = 64px) — used both for
// the scroll-spy rootMargin and each section's scroll-margin-top.
export const HEADER_HEIGHT = 64

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Nav() {
  const sectionIds = SECTIONS.map((s) => s.id)
  const activeId = useScrollSpy(sectionIds, HEADER_HEIGHT)
  const progress = useScrollProgress()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-wine/10 bg-surface/90 backdrop-blur">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
        aria-label="Section navigation"
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            scrollToId('top')
          }}
          className="flex shrink-0 items-center"
        >
          <img src={wordmark} alt="Vigila" className="h-8 w-auto sm:h-11" />
        </a>

        {/* Same serif logotype voice as the wordmark — italic Fraunces — rather than
            a small-caps UI label. Color alone (gold on hover/active) carries state
            now that the dots are gone. Tighter gap/size below sm — four full labels
            plus the wordmark overflow a real phone width otherwise. */}
        <ul className="flex items-center gap-3 sm:gap-7">
          {SECTIONS.map(({ id, label }) => {
            const isActive = id === activeId
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToId(id)
                  }}
                  aria-current={isActive ? 'true' : undefined}
                  className={`font-display text-sm italic transition-colors sm:text-lg ${
                    isActive ? 'text-gold' : 'text-ink/70 hover:text-gold'
                  }`}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="h-0.5 w-full bg-wine/10">
        <div
          className="h-full bg-wine transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </header>
  )
}
