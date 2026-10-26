import { useEffect, useState } from 'react'
import { getConsent, setConsent, initAnalytics } from '../analytics.js'
import { PRIVACY_URL } from '../config.js'
import './ConsentBanner.css'

// Запрос согласия на аналитику. Пока посетитель не нажал «Разрешить», Метрика не загружается.
export default function ConsentBanner() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    initAnalytics()
    if (!getConsent()) setOpen(true)
  }, [])

  if (!open) return null

  const choose = (value) => {
    setConsent(value)
    setOpen(false)
  }

  return (
    <section className="consent" role="region" aria-label="Согласие на аналитику">
      <p className="consent__text">
        Хотим понимать, как люди пользуются сайтом. Для этого нужна Яндекс{' '}Метрика{' '}— включим её
        только с{' '}твоего согласия.{' '}
        <a className="consent__more" href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">
          Подробнее<span className="visually-hidden"> в политике конфиденциальности (откроется в новой вкладке)</span>
        </a>
      </p>
      <div className="consent__actions">
        <button type="button" className="consent__btn consent__btn--yes" onClick={() => choose('granted')}>
          Разрешить
        </button>
        <button type="button" className="consent__btn consent__btn--no" onClick={() => choose('denied')}>
          Отказаться
        </button>
      </div>
    </section>
  )
}
