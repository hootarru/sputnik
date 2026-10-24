import { T } from '../content.js'
import { at } from '../lib/at.js'
import SectionHead from './SectionHead.jsx'
import './HowItWorks.css'

// Ступенчатая раскладка из Figma: x/y — верх-лево серой карточки 561×148, tw — ширина текста.
const STEPS = [
  { n: '01//', name: T.step1Name, x: 186, y: 546, tw: 528, text: T.step1Text },
  { n: '02//', name: T.step2Name, x: 693, y: 679, tw: 528, text: T.step2Text },
  { n: '03//', name: T.step3Name, x: 186, y: 812, tw: 544, text: T.step3Text },
  { n: '04//', name: T.step4Name, x: 693, y: 945, tw: 544, text: T.step4Text },
]

// 05 — Как работает наш бот? (Figma: y 5200–6340)
export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how art" style={{ '--h': 1140 }}>
      <SectionHead num="05" title={T.howTitle} numY={67} titleX={268} titleY={47} titleW={1006} />

      <p className="ty-sub sh-sub abs" style={at(498, 317, 789)} data-anim="sub" data-k="howSub">{T.howSub}</p>

      <ol className="steps">
        {STEPS.map((s, i) => (
          <li key={s.n} className={`step step--${i % 2 ? 'right' : 'left'} abs`} style={at(s.x, s.y, 561, 148)} data-anim="step">
            <div className="step__head" data-anim="step-head" />
            <span className="step__num" aria-hidden="true">{s.n}</span>
            <h3 className="step__name"><span className="visually-hidden">Шаг {i + 1}. </span>{s.name}</h3>
            <p className="step__text" style={{ '--tw': s.tw }} data-k={`step${i + 1}Text`}>{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
