import { T } from '../content.js'
import { at, type } from '../lib/at.js'
import SectionHead from './SectionHead.jsx'
import './Scenarios.css'

// Тексты карточек — дословно из Figma (заголовки строчными, как в макете).
// Сетка 2 × 2: карточки 561×116, между колонками 10px (Figma Kk8K…, «варфрейм 3», 237:46).
const CARDS = [
  { x: 154, y: 596, title: T.card1Title, text: T.card1Text },
  { x: 725, y: 596, title: T.card2Title, text: T.card2Text },
  { x: 154, y: 748, title: T.card3Title, text: T.card3Text },
  { x: 725, y: 748, title: T.card4Title, text: T.card4Text },
]

// 03 — Сценарии (Figma: y 2990–4080)
export default function Scenarios() {
  return (
    <section id="scenarios" className="scen art" style={{ '--h': 1090 }}>
      <SectionHead num="03" title={T.scenTitle} numY={67} titleX={258} titleY={47} />

      <p className="ty-sub sh-sub abs" style={at(497, 197, 789)} data-anim="sub" data-k="scenSub">{T.scenSub}</p>

      <p className="ty-body abs scen__intro" style={at(40, 387, 789)} data-anim="text" data-k="scenIntro">{T.scenIntro}</p>

      <ul className="scen__cards">
        {CARDS.map((c, i) => (
          <li key={c.title} className="card abs" style={at(c.x, c.y, 561, 116)} data-anim="card">
            <div className="card__head" data-anim="card-head" />
            <h3 className="card__title">{c.title}</h3>
            <span className="card__dots" aria-hidden="true"><i /><i /><i /></span>
            <p className="card__text pre" data-k={`card${i + 1}Text`}>{c.text}</p>
          </li>
        ))}
      </ul>

      {/* Под карточками: небольшой астериск (Semi Bold 200, lh 95) и поясняющий текст */}
      <div className="scen__note">
        <span className="scen__star ty abs" style={{ ...at(606, 950), ...type(200, 95) }} aria-hidden="true" data-anim="scen-star">*</span>
        <p className="ty-body abs scen__outro" style={at(725, 949, 561)} data-anim="text" data-k="scenOutro">{T.scenOutro}</p>
      </div>
    </section>
  )
}
