import { T } from '../content.js'
import { at } from '../lib/at.js'
import { TELEGRAM_BOT_URL } from '../config.js'
import './FinalCta.css'

// l / r — вынос плашки за границы слова (em), подобран по координатам Figma.
function Mark({ children, l, r }) {
  return (
    <span className="mark" style={{ '--mark-l': `${l}em`, '--mark-r': `${r}em` }}>
      <span className="mark__bg" aria-hidden="true" data-anim="mark" />
      {children}
    </span>
  )
}

// Финальный CTA (Figma: y 6340–7040). Якорь #try — сюда ведут «попробовать ↓» и «Хочу разобраться!».
export default function FinalCta() {
  const botProps = TELEGRAM_BOT_URL
    ? { href: TELEGRAM_BOT_URL, target: '_blank', rel: 'noopener noreferrer' }
    : { 'aria-disabled': 'true', title: 'Ссылка на бота скоро появится' }

  return (
    <section id="try" className="cta art" style={{ '--h': 700 }} aria-labelledby="cta-title">
      <h2 id="cta-title" className="cta__title abs d-nowrap" style={at(40, 51, 1360)} data-anim="cta-title">
        {/* Текст 254:478. Во второй строке Figma склеивает все слова неразрывными пробелами — на десктопе
            строка и так помещается, а на телефоне ей нужно переноситься, поэтому там обычные пробелы. */}
        Не{'\u00a0'}знаешь, что{'\u00a0'}<Mark l={-0.046} r={-0.07}>делать?</Mark><br className="d-br" /> Уже есть с чего <Mark l={0} r={-0.061}>начать.</Mark>
      </h2>

      <p className="cta__say abs d-nowrap" style={at(611, 349)} data-anim="cta-rest" data-k="ctaSay">{T.ctaSay}</p>
      <p className="cta__then ty-body abs d-nowrap" style={at(611, 428)} data-anim="cta-rest" data-k="ctaThen">{T.ctaThen}</p>

      <a className="btn btn--cta abs" style={at(337, 586, 766, 107)} data-anim="cta-btn" {...botProps} data-k="ctaButton">{T.ctaButton}</a>
    </section>
  )
}
