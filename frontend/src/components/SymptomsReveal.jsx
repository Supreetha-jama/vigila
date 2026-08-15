import { motion, useReducedMotion } from 'framer-motion'
import flowerLogo from '../assets/flower-logo.png'

// A large, richly-visible copy of the real logo sitting behind the symptom
// cards and slowly spinning in place — a background flourish, the same idea
// as the hero's gradient blobs, rather than a foreground interactive object.
// Cards are opaque, so no amount of pigment here ever competes with the
// text; it only shows through the gaps between them as you scroll past.
export default function SymptomsReveal() {
  const reduceMotion = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
    >
      <motion.img
        src={flowerLogo}
        alt=""
        className="h-[105vmin] w-[105vmin] max-w-none object-contain opacity-65"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={reduceMotion ? undefined : { duration: 60, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}
