import { T } from '../content.js'
import { at } from '../lib/at.js'
import SectionHead from './SectionHead.jsx'
import Collage from './Collage.jsx'
import girl from '../assets/img/audience-girl.webp'
import boy from '../assets/img/audience-boy.webp'
import woman from '../assets/img/audience-woman.webp'
import man from '../assets/img/audience-man.webp'
import './Audience.css'

// 02 — Для подростков и родителей (Figma: y 1790–2990)
export default function Audience() {
  return (
    <section id="audience" className="audience art" style={{ '--h': 1200 }}>
      <SectionHead num="02" title={T.audTitle} numY={64} titleX={268} titleY={39} titleW={1150} />

      <p className="ty-sub sh-sub abs" style={at(497, 309, 799)} data-anim="sub" data-k="audSub">{T.audSub}</p>

      <h3 className="ty-h3 abs" style={at(40, 554)} data-anim="text" data-k="audTeens">{T.audTeens}</h3>
      <p className="ty-body abs aud__p" style={at(40, 631, 650)} data-anim="text" data-k="audTeensText">{T.audTeensText}</p>

      {/* Коллаж: парень снизу, девушка сверху */}
      <Collage
        className="aud__collage aud__collage--teens"
        x={725} y={509} w={675} h={379}
        layers={[
          { src: boy, x: 219, y: 99, w: 456, h: 280 },
          { src: girl, x: 0, y: 0, w: 422, h: 260 },
        ]}
      />

      <h3 className="ty-h3 abs aud__parents" style={at(725, 914)} data-anim="text" data-k="audParents">{T.audParents}</h3>
      <p className="ty-body abs aud__p" style={at(725, 991, 675)} data-anim="text" data-k="audParentsText">{T.audParentsText}</p>

      {/* Коллаж: мужчина снизу, женщина сверху */}
      <Collage
        className="aud__collage aud__collage--parents"
        x={41} y={769} w={674} h={401}
        layers={[
          { src: man, x: 200, y: 106, w: 474, h: 295 },
          { src: woman, x: 0, y: 0, w: 378, h: 280 },
        ]}
      />
    </section>
  )
}
