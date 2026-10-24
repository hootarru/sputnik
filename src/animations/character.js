import { gsap } from 'gsap'

// Персонаж-астериск. Двигаются только отдельные группы оригинального вектора:
// лапки — поворот вокруг точки крепления к телу (data-origin, координаты viewBox),
// глаза — моргание (scaleY), зрачки — небольшой сдвиг к курсору.

const pick = (root, name) => root.querySelector(`[data-anim="${name}"]`)
const origin = (el) => el.getAttribute('data-origin')

// Моргание с паузами 2.5–6 с, иногда двойное
function blinkLoop(eyes) {
  let call
  const blink = () => {
    const tl = gsap.timeline()
    tl.to(eyes, { scaleY: 0.12, transformOrigin: '50% 50%', duration: 0.07, ease: 'power1.in' })
      .to(eyes, { scaleY: 1, duration: 0.11, ease: 'power1.out' })
    if (Math.random() < 0.25) {
      tl.to(eyes, { scaleY: 0.12, duration: 0.07, ease: 'power1.in' }, '+=0.12')
        .to(eyes, { scaleY: 1, duration: 0.11, ease: 'power1.out' })
    }
    call = gsap.delayedCall(gsap.utils.random(2.5, 6), blink)
  }
  call = gsap.delayedCall(gsap.utils.random(1.5, 3), blink)
  return () => call && call.kill()
}

// Зрачки смотрят в сторону курсора (сдвиг ≤ 1.2 единицы вектора)
function lookAt(svg, pupils, area) {
  const onMove = (e) => {
    const r = svg.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height * 0.36
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const len = Math.hypot(dx, dy) || 1
    const k = Math.min(1, len / 300)
    gsap.to(pupils, { x: (dx / len) * 1.2 * k, y: (dy / len) * 0.9 * k, duration: 0.35, ease: 'power2.out', overwrite: 'auto' })
  }
  const onLeave = () => gsap.to(pupils, { x: 0, y: 0, duration: 0.5, ease: 'power2.out', overwrite: 'auto' })
  area.addEventListener('pointermove', onMove)
  area.addEventListener('pointerleave', onLeave)
  return () => {
    area.removeEventListener('pointermove', onMove)
    area.removeEventListener('pointerleave', onLeave)
  }
}

/* ---------- Hero: лапки машут волной, немного асинхронно ---------- */
export function heroCharacter({ finePointer }) {
  const svg = document.querySelector('[data-anim="hero-char"]')
  if (!svg) return
  const pawL = pick(svg, 'paw-l')
  const pawR = pick(svg, 'paw-r')
  const eyes = svg.querySelectorAll('[data-anim="eye"]')
  const pupils = svg.querySelectorAll('[data-anim="pupil"]')
  const cleanups = []

  // Волна: подъём → лёгкий откат → покой, у правой лапки другой ритм и задержка.
  const wave = (paw, dir, delay, rest) =>
    gsap.timeline({ repeat: -1, repeatDelay: rest, delay })
      .to(paw, { rotation: -9 * dir, svgOrigin: origin(paw), duration: 0.55, ease: 'sine.inOut' })
      .to(paw, { rotation: 4 * dir, svgOrigin: origin(paw), duration: 0.5, ease: 'sine.inOut' })
      .to(paw, { rotation: -3 * dir, svgOrigin: origin(paw), duration: 0.45, ease: 'sine.inOut' })
      .to(paw, { rotation: 0, svgOrigin: origin(paw), duration: 0.5, ease: 'sine.out' })

  const tlL = wave(pawL, 1, 1.4, 1.6)
  const tlR = wave(pawR, -1, 1.75, 2.1)
  cleanups.push(() => { tlL.kill(); tlR.kill(); gsap.set([pawL, pawR], { clearProps: 'transform' }) })
  cleanups.push(blinkLoop(eyes))

  if (finePointer) {
    const hero = document.getElementById('hero')
    cleanups.push(lookAt(svg, pupils, hero))
    // Наведение на персонажа: короткий «привет» обеими лапками
    const onEnter = () => {
      gsap.timeline()
        .to(pawL, { rotation: -14, svgOrigin: origin(pawL), duration: 0.25, ease: 'sine.out' })
        .to(pawL, { rotation: 0, svgOrigin: origin(pawL), duration: 0.6, ease: 'sine.inOut' })
      gsap.timeline({ delay: 0.08 })
        .to(pawR, { rotation: 14, svgOrigin: origin(pawR), duration: 0.25, ease: 'sine.out' })
        .to(pawR, { rotation: 0, svgOrigin: origin(pawR), duration: 0.6, ease: 'sine.inOut' })
    }
    const mark = svg.parentElement
    mark.addEventListener('pointerenter', onEnter)
    cleanups.push(() => mark.removeEventListener('pointerenter', onEnter))
  }

  return () => cleanups.forEach((fn) => fn && fn())
}

/* ---------- Подвал: персонаж тянется к кнопке «Перейти в бота» и «нажимает» её ---------- */
export function footerCharacter({ finePointer }) {
  const svg = document.querySelector('[data-anim="footer-char"]')
  const btn = document.querySelector('[data-anim="cta-btn"]')
  if (!svg || !btn) return
  const pawL = pick(svg, 'paw-l')
  const pawR = pick(svg, 'paw-r')
  const eyes = svg.querySelectorAll('[data-anim="eye"]')
  const pupils = svg.querySelectorAll('[data-anim="pupil"]')
  const cleanups = []
  // Положительный поворот левой лапки (и отрицательный правой) поднимает кончики вверх, к кнопке.
  const reach = (deg, dur, ease = 'sine.inOut') => [
    gsap.to(pawL, { rotation: deg, svgOrigin: origin(pawL), duration: dur, ease }),
    gsap.to(pawR, { rotation: -deg, svgOrigin: origin(pawR), duration: dur, ease }),
  ]

  // Появление: лапки опущены, персонаж поднимается и дотягивается до кнопки
  gsap.set(pawL, { rotation: -26, svgOrigin: origin(pawL) })
  gsap.set(pawR, { rotation: 26, svgOrigin: origin(pawR) })
  gsap.set(svg, { y: 34 })

  let idle
  const intro = gsap.timeline({
    paused: true,
    onComplete: () => {
      // «Нажатие»: каждые несколько секунд лапки упираются в кнопку, кнопка чуть проседает
      idle = gsap.timeline({ repeat: -1, repeatDelay: 2.6, delay: 1 })
        .to(pawL, { rotation: 4, svgOrigin: origin(pawL), duration: 0.22, ease: 'power2.out' }, 0)
        .to(pawR, { rotation: -4, svgOrigin: origin(pawR), duration: 0.22, ease: 'power2.out' }, 0)
        .to(svg, { y: -3, duration: 0.22, ease: 'power2.out' }, 0)
        .to(btn, { y: -2, duration: 0.18, ease: 'power2.out' }, 0.06)
        .to([pawL, pawR], { rotation: 0, svgOrigin: (i, el) => origin(el), duration: 0.45, ease: 'sine.inOut' }, 0.3)
        .to(svg, { y: 0, duration: 0.45, ease: 'sine.inOut' }, 0.3)
        .to(btn, { y: 0, duration: 0.4, ease: 'sine.inOut' }, 0.3)
    },
  })
  intro
    .to(svg, { y: 0, duration: 0.7, ease: 'power3.out' }, 0)
    .to(pawL, { rotation: 0, svgOrigin: origin(pawL), duration: 0.8, ease: 'power3.out' }, 0.15)
    .to(pawR, { rotation: 0, svgOrigin: origin(pawR), duration: 0.8, ease: 'power3.out' }, 0.25)

  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        intro.play()
        io.disconnect()
      }
    },
    { threshold: 0.35 },
  )
  io.observe(svg)
  cleanups.push(() => io.disconnect())

  cleanups.push(blinkLoop(eyes))

  if (finePointer) {
    // Наведение на кнопку: персонаж тянется сильнее и смотрит вверх
    const onEnter = () => {
      if (!intro.progress()) intro.progress(1)
      idle?.pause()
      reach(6, 0.35, 'power2.out')
      gsap.to(svg, { y: -5, duration: 0.35, ease: 'power2.out' })
      gsap.to(pupils, { y: -1, duration: 0.3 })
    }
    const onLeave = () => {
      reach(0, 0.5)
      gsap.to(svg, { y: 0, duration: 0.5, ease: 'sine.inOut' })
      gsap.to(pupils, { y: 0, duration: 0.4, onComplete: () => idle?.restart(true) })
    }
    btn.addEventListener('pointerenter', onEnter)
    btn.addEventListener('pointerleave', onLeave)
    cleanups.push(() => {
      btn.removeEventListener('pointerenter', onEnter)
      btn.removeEventListener('pointerleave', onLeave)
    })
  }

  return () => {
    cleanups.forEach((fn) => fn && fn())
    intro.kill()
    idle?.kill()
    gsap.set([svg, pawL, pawR, btn, ...pupils], { clearProps: 'transform' })
  }
}
