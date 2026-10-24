import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { heroIntro } from './hero.js'
import { scrollReveals } from './reveals.js'
import { heroCharacter, footerCharacter } from './character.js'

// Анимации — прогрессивное улучшение.
// • Без JS / при ошибке / при prefers-reduced-motion: reduce — статичная страница, весь контент виден.
// • Скрытые стартовые состояния задаёт только GSAP (gsap.from), CSS ничего не прячет,
//   кроме короткого класса .anim-pending на первом экране (снимается здесь или по таймауту в index.html).
// • Все твины в конце очищают transform/opacity, итоговая композиция = Figma.

export function initAnimations() {
  const root = document.documentElement
  const release = () => root.classList.remove('anim-pending')

  if (!gsap || !ScrollTrigger) {
    release()
    throw new Error('GSAP не загружен')
  }
  gsap.registerPlugin(ScrollTrigger)

  const mm = gsap.matchMedia()
  mm.add(
    {
      motion: '(prefers-reduced-motion: no-preference)',
      desktop: '(min-width: 1024px)',
      finePointer: '(hover: hover) and (pointer: fine)',
    },
    (ctx) => {
      const { motion, desktop, finePointer } = ctx.conditions
      if (!motion) return // reduced motion: ничего не анимируем

      const cleanups = [
        heroIntro(),
        scrollReveals({ desktop }),
        heroCharacter({ finePointer }),
        footerCharacter({ finePointer }),
      ]
      return () => cleanups.forEach((fn) => typeof fn === 'function' && fn())
    },
  )
  release()

  // Пересчитать позиции после загрузки шрифтов и картинок
  const refresh = () => ScrollTrigger.refresh()
  document.fonts?.ready.then(refresh)
  window.addEventListener('load', refresh, { once: true })

  return () => {
    window.removeEventListener('load', refresh)
    mm.revert()
    release()
  }
}
