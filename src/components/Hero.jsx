import { T } from '../content.js'
import { at } from '../lib/at.js'
import { HeroCharacter } from './characters.jsx'
import './Hero.css'

export default function Hero() {
  return (
    <section id="hero" className="hero art" style={{ '--h': 960 }} aria-label="Спутник">
      {/* Заголовок, лаймовая полоса и персонаж привязаны друг к другу в em от кегля 214 */}
      <div className="hero__mark abs" style={at(233, 184, 974, 259)}>
        <span className="hero__band" aria-hidden="true" data-anim="hero-band" />
        <h1 className="hero__title" data-anim="hero-title" data-k="heroTitle">{T.heroTitle}</h1>
        <HeroCharacter className="hero__char" />
      </div>

      <p className="hero__tagline abs d-nowrap" style={at(535, 402)} data-anim="hero-tagline" data-k="heroTagline">{T.heroTagline}</p>

      <p className="hero__lead ty-body abs" style={at(725, 517, 675)} data-anim="hero-rest" data-k="heroLead">{T.heroLead}</p>

      <p className="hero__utp abs" style={at(40, 721, 655)} data-anim="hero-rest" data-k="heroUtp">{T.heroUtp}</p>

      <a className="btn btn--hero abs" href="#try" style={at(725, 714, 650, 82)} data-anim="hero-rest" data-k="heroButton">{T.heroButton}</a>

      <p className="hero__note abs d-nowrap" style={at(773, 816)} data-anim="hero-rest" data-k="heroNote">{T.heroNote}</p>
    </section>
  )
}
