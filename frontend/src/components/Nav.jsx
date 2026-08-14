import { useScrollSpy } from '../hooks/useScrollSpy'
import { useScrollProgress } from '../hooks/useScrollProgress'

const SECTIONS = [
  { id: 'learn', label: 'Learn' },
  { id: 'symptoms', label: 'Symptoms' },
  { id: 'stats', label: 'Stats' },
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
  const activeIndex = sectionIds.indexOf(activeId)
  const progress = useScrollProgress()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-wine/10 bg-surface/90 backdrop-blur">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
        aria-label="Section navigation"
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            scrollToId('top')
          }}
          className="font-display text-lg font-semibold tracking-wide text-wine"
        >
          VIGILA
        </a>

        <ul className="flex items-center gap-6">
          {SECTIONS.map(({ id, label }, index) => {
            const isActive = id === activeId
            const isPassed = activeIndex >= 0 && index < activeIndex
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToId(id)
                  }}
                  aria-current={isActive ? 'true' : undefined}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-wine' : 'text-ink/50 hover:text-ink/80'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${
                      isActive || isPassed ? 'bg-wine' : 'border border-ink/30'
                    }`}
                  />
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
