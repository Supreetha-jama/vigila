import { useEffect, useRef, useState } from 'react'

// IntersectionObserver-based scroll-spy. rootMargin's top offset accounts for the
// sticky header so a section only registers "active" once it clears the header —
// see PLANNING.md's nav section for why this approach (vs a scroll library) was chosen.
export function useScrollSpy(sectionIds, headerHeight) {
  const [activeId, setActiveId] = useState(sectionIds[0])
  const visibility = useRef(new Map())

  useEffect(() => {
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.current.set(entry.target.id, entry.isIntersecting)
        })
        const stillVisible = sectionIds.find((id) => visibility.current.get(id))
        if (stillVisible) setActiveId(stillVisible)
      },
      { rootMargin: `-${headerHeight}px 0px -60% 0px`, threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds, headerHeight])

  return activeId
}
