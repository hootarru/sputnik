// Яндекс Метрика по правилам политики конфиденциальности:
// • по умолчанию выключена, счётчик загружается только после согласия посетителя;
// • без Вебвизора и записи форм (webvisor: false, trackForms не включён).
// Выбор хранится в localStorage этого браузера.

import { METRIKA_ID } from './config.js'

const KEY = 'sputnik-analytics-consent' // 'granted' | 'denied'
const TAG_SRC = `https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}`

export function getConsent() {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

export function setConsent(value) {
  try {
    localStorage.setItem(KEY, value)
  } catch {
    /* приватный режим и т.п. — выбор действует до перезагрузки */
  }
  if (value === 'granted') loadMetrika()
}

let loaded = false

// Официальный код счётчика из кабинета Метрики, обёрнутый в функцию.
export function loadMetrika() {
  if (loaded || typeof window === 'undefined') return
  loaded = true
  ;(function (m, e, t, r, i, k, a) {
    m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) }
    m[i].l = 1 * new Date()
    for (let j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) return
    }
    k = e.createElement(t)
    a = e.getElementsByTagName(t)[0]
    k.async = 1
    k.src = r
    a.parentNode.insertBefore(k, a)
  })(window, document, 'script', TAG_SRC, 'ym')

  window.ym(METRIKA_ID, 'init', {
    ssr: true,
    webvisor: false, // политика: Вебвизор не используется
    clickmap: true,
    referrer: document.referrer,
    url: location.href,
    accurateTrackBounce: true,
    trackLinks: true,
  })
}

// При загрузке страницы: если согласие уже дано раньше — подключаем сразу
export function initAnalytics() {
  if (getConsent() === 'granted') loadMetrika()
}
