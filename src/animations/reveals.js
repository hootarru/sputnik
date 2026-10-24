import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const CLEAR = 'transform,opacity,visibility'
const all = (sel, root = document) => Array.from(root.querySelectorAll(sel))

// Появление контента при прокрутке. Каждый твин срабатывает один раз (once: true)
// и снимает инлайн-стили, поэтому после анимации вёрстка в точности как без неё.
export function scrollReveals({ desktop }) {
  const triggers = []
  const tweens = []
  const shift = desktop ? 1 : 0.6 // на телефоне смещения меньше

  const reveal = (targets, vars, trigger, start = 'top 82%') => {
    if (!targets || (Array.isArray(targets) && !targets.length)) return
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out', clearProps: CLEAR },
      scrollTrigger: { trigger, start, once: true },
    })
    vars(tl)
    tweens.push(tl)
  }

  // Заголовки секций: номер и название поднимаются вместе, плашка раскрывается по горизонтали,
  // курсивный подзаголовок — с задержкой.
  for (const section of all('main section:not(#hero)')) {
    const head = section.querySelector('[data-anim="sh"]')
    if (head) {
      reveal(head, (tl) => {
        tl.from([head.querySelector('[data-anim="num"]'), head.querySelector('[data-anim="title"]')],
          { autoAlpha: 0, y: 40 * shift, duration: 0.8 }, 0)
          .from(head.querySelector('[data-anim="band"]'),
            { scaleX: 0, duration: 0.7, ease: 'power2.inOut' }, 0.15)
      }, head)
    }
    for (const sub of all('[data-anim="sub"]', section)) {
      reveal(sub, (tl) => tl.from(sub, { autoAlpha: 0, y: 24 * shift, duration: 0.8 }, 0.2), sub, 'top 85%')
    }
  }

  // Абзацы и подписи — пачками, по мере появления.
  // Стартовое состояние ставится заранее, проявление — через .to (а не .from, иначе 0 → 0).
  const texts = all('[data-anim="text"]')
  gsap.set(texts, { autoAlpha: 0, y: 18 * shift })
  tweens.push({ kill: () => gsap.set(texts, { clearProps: CLEAR }) })
  triggers.push(
    ...ScrollTrigger.batch(texts, {
      start: 'top 88%',
      once: true,
      onEnter: (els) =>
        gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', clearProps: CLEAR }),
    }),
  )

  // Коллажи: рамка проявляется, слои — с небольшой задержкой и разным сдвигом.
  // Конечная композиция не меняется.
  for (const collage of all('[data-anim="collage"]')) {
    const layers = all('[data-anim="layer"]', collage)
    reveal(collage, (tl) => {
      tl.from(layers, {
        autoAlpha: 0,
        y: (i) => (i === 0 ? 34 : 18) * shift,
        duration: 1,
        stagger: 0.18,
      }, 0)
    }, collage, 'top 85%')
  }

  // Отдельные фото (секция 04)
  for (const photo of all('[data-anim="photo"]')) {
    reveal(photo, (tl) => tl.from(photo, { autoAlpha: 0, y: 26 * shift, duration: 0.9 }), photo, 'top 88%')
  }

  // 03 — карточки по очереди, лаймовые шапки раскрываются слева направо
  const cards = all('[data-anim="card"]')
  if (cards.length) {
    reveal(cards, (tl) => {
      tl.from(cards, { autoAlpha: 0, y: 14 * shift, duration: 0.6, stagger: 0.12 }, 0)
      if (desktop) {
        tl.from(all('[data-anim="card-head"]'), { scaleX: 0, duration: 0.6, ease: 'power2.inOut', stagger: 0.12 }, 0.15)
      }
    }, cards[0], 'top 85%')
  }
  const star = document.querySelector('[data-anim="scen-star"]')
  if (star) {
    reveal(star, (tl) => tl.from(star, { autoAlpha: 0, scale: 0.92, duration: 0.8, ease: 'power2.out' }), cards[0] || star, 'top 75%')
  }

  // 05 — шаги строго 01 → 02 → 03 → 04, каждый по мере прокрутки
  all('[data-anim="step"]').forEach((step, i) => {
    reveal(step, (tl) => {
      tl.from(step, { autoAlpha: 0, y: 22 * shift, duration: 0.7 }, 0)
        .from(step.querySelector('[data-anim="step-head"]'), { scaleX: 0, duration: 0.6, ease: 'power2.inOut' }, 0.1)
    }, step, `top ${88 - i * 2}%`)
  })

  // Финальный CTA: заголовок → маркерные штрихи → подзаголовок и кнопка
  const ctaTitle = document.querySelector('[data-anim="cta-title"]')
  if (ctaTitle) {
    reveal(ctaTitle, (tl) => {
      tl.from(ctaTitle, { autoAlpha: 0, y: 34 * shift, duration: 0.9 }, 0)
        .from(all('[data-anim="mark"]'), { scaleX: 0, duration: 0.55, ease: 'power2.inOut', stagger: 0.3 }, 0.45)
        .from(all('[data-anim="cta-rest"]'), { autoAlpha: 0, y: 16 * shift, duration: 0.6, stagger: 0.1 }, 0.9)
        .from('[data-anim="cta-btn"]', { autoAlpha: 0, y: 18 * shift, duration: 0.7 }, 1.15)
    }, ctaTitle, 'top 78%')
  }

  return () => {
    tweens.forEach((t) => {
      t.scrollTrigger?.kill()
      t.kill()
    })
    triggers.forEach((t) => t.kill())
  }
}
