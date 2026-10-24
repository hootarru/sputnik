import { T } from '../content.js'
import { at } from '../lib/at.js'
import SectionHead from './SectionHead.jsx'
import './About.css'

// 01 — О проекте (Figma: y 960–1790)
export default function About() {
  return (
    <section id="about" className="about art" style={{ '--h': 830 }}>
      <SectionHead num="01" title={T.aboutTitle} numY={60} titleX={268} titleY={60} titleLh={80} />

      <p className="ty-sub sh-sub abs" style={at(497, 170, 1018)} data-anim="sub" data-k="aboutSub">{T.aboutSub}</p>

      <p className="ty-body abs pre about__p1" style={at(40, 357, 650)} data-anim="text" data-k="aboutP1">
        {T.aboutP1}
      </p>

      <p className="ty-body abs about__p2" style={at(731, 537, 650)} data-anim="text" data-k="aboutP2">{T.aboutP2}</p>

      <p className="about__manifest ty-h3 abs d-nowrap" style={at(179, 708)} data-anim="text" data-k="aboutManifest">{T.aboutManifest}</p>
    </section>
  )
}
