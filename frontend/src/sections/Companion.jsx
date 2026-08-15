import SectionLabel from '../components/SectionLabel'
import CompanionChat from '../components/CompanionChat'
import DisclaimerNote from '../components/DisclaimerNote'

export default function Companion() {
  return (
    <section id="companion" className="scroll-mt-20 border-t border-wine/10 px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <SectionLabel>Companion</SectionLabel>
        <h2 className="mt-4 font-display text-3xl font-semibold text-ink md:text-4xl">
          A listening space, not a diagnosis
        </h2>
        <p className="mt-4 text-ink/70">
          This is a space to talk through what you&rsquo;re feeling — not therapy, not a diagnosis,
          and not a replacement for a real doctor or therapist. If anything here ever feels like
          more than a chat can hold, it will point you toward real support.
        </p>

        <div className="mt-8">
          <CompanionChat />
        </div>

        <div className="mt-4">
          <DisclaimerNote />
        </div>
      </div>
    </section>
  )
}
