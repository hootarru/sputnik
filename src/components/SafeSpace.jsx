import { T } from '../content.js'
import { at } from '../lib/at.js'
import SectionHead from './SectionHead.jsx'
import hands from '../assets/img/safespace-hands.webp'
import sleep from '../assets/img/safespace-sleep.webp'
import './SafeSpace.css'

// 04 — Пространство без оценок (Figma: y 4080–5200)
export default function SafeSpace() {
  return (
    <section id="safe-space" className="safe art" style={{ '--h': 1120 }}>
      <SectionHead num="04" title={T.safeTitle} numY={69} titleX={268} titleY={44} titleW={1019} />

      <div className="safe__block">
        <p className="ty-sub abs safe__sub" style={at(498, 314, 789)} data-anim="sub" data-k="safeSub1">{T.safeSub1}</p>
        <p className="ty-body abs safe__p" style={at(497, 469, 649)} data-anim="text" data-k="safeText1">{T.safeText1}</p>
        <img
          className="safe__img abs" style={at(40, 420, 447, 198)} src={hands} width="447" height="198"
          alt="" loading="lazy" decoding="async" data-anim="photo"
        />
      </div>

      <div className="safe__block">
        <p className="ty-sub abs safe__sub safe__sub--alt" style={at(497, 744, 787)} data-anim="sub" data-k="safeSub2">{T.safeSub2}</p>
        <p className="ty-body abs safe__p" style={at(498, 899, 649)} data-anim="text" data-k="safeText2">{T.safeText2}</p>
        <img
          className="safe__img abs" style={at(40, 824, 447, 193)} src={sleep} width="447" height="193"
          alt="" loading="lazy" decoding="async" data-anim="photo"
        />
      </div>
    </section>
  )
}
