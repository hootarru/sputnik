import { gsap } from 'gsap'

const q = (sel) => document.querySelectorAll(`[data-anim="${sel}"]`)
const CLEAR = 'transform,opacity,visibility'

// Появление первого экрана: ≈1.4 с. Размеры и геометрия не меняются — только opacity / сдвиг / scaleX.
export function heroIntro() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out', clearProps: CLEAR } })

  tl.from(q('hero-title'), { autoAlpha: 0, y: 28, duration: 0.8 }, 0)
    // лаймовая полоса «проводится маркером» слева направо
    .from(q('hero-band'), { scaleX: 0, duration: 0.7, ease: 'power2.inOut' }, 0.25)
    .from(q('hero-char'), { autoAlpha: 0, y: -12, duration: 0.6 }, 0.4)
    .from(q('hero-tagline'), { autoAlpha: 0, y: 14, duration: 0.6 }, 0.6)
    .from(q('hero-rest'), { autoAlpha: 0, y: 18, duration: 0.6, stagger: 0.08 }, 0.75)

  return () => tl.kill()
}
