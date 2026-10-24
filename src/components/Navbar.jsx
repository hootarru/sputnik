import { useEffect, useState } from 'react'
import { T } from '../content.js'
import { at, type } from '../lib/at.js'
import { NavLogo } from './characters.jsx'
import './Navbar.css'

// Ровно три пункта + «попробовать ↓». Цифры — порядковые номера пунктов, не номера секций.
const LINKS = [
  { n: 1, label: T.navAbout, href: '#about', x: 322, fs: 18, lh: 22 },
  { n: 2, label: T.navAudience, href: '#audience', x: 627, fs: 18, lh: 22 },
  { n: 3, label: T.navHow, href: '#how-it-works', x: 923, fs: 18, lh: 22 },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="nav" id="site-nav" data-open={open || undefined}>
      <div className="nav__inner art" style={{ '--h': 56 }}>
        <a className="nav__logo abs" href="#hero" style={at(51, -10, 80, 55)} onClick={close} aria-label="Спутник — в начало страницы">
          <NavLogo />
        </a>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'закрыть' : 'меню'}
        </button>

        <nav className="nav__menu" id="nav-menu" aria-label="Разделы страницы">
          <ul className="nav__list">
            {LINKS.map((l) => (
              <li key={l.n}>
                <a className="nav__link ty abs d-nowrap" href={l.href} style={{ ...at(l.x, 18), ...type(l.fs, l.lh) }} onClick={close}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="nav__try ty abs d-nowrap" href="#try" style={{ ...at(1260, 18, 140, 22), ...type(18, 22) }} onClick={close}>
          <span className="nav__try-bg" aria-hidden="true" />
          <span className="nav__try-label">{T.navTry.replace(' ↓', ' ')}<span className="nav__arrow">↓</span></span>
        </a>
      </div>
    </header>
  )
}
