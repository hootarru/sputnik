import { T } from '../content.js'
import { at } from '../lib/at.js'
import { TELEGRAM_URL, VK_URL } from '../config.js'
import { FooterCharacter, FOOTER_CHAR_BOX as B } from './characters.jsx'
import './Footer.css'

// Подвал (Figma: y 7040–7624). Персонаж тянется лапками вверх, к кнопке «Перейти в бота».
export default function Footer() {
  return (
    <footer id="contacts" className="footer">
      <div className="art footer__art" style={{ '--h': 584 }}>
        <div className="footer__char abs" style={at(B.x, B.y - 7040, B.w, B.h)}>
          <FooterCharacter />
        </div>

        <p className="footer__logo abs" style={at(-61, 152, 1561)} aria-hidden="true">СПУТНИК</p>

        <p className="footer__tag abs d-nowrap" style={at(337, 484)} data-k="footerTag">{T.footerTag}</p>

        <div className="footer__bar" aria-hidden="true" />

        <div className="footer__contacts">
          <h2 className="footer__title abs d-nowrap" style={at(381, 544)} data-k="footerContacts">{T.footerContacts}</h2>
          <ul className="footer__links">
            <li>
              <a className="footer__link abs d-nowrap" style={at(725, 544)} href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                //telegram<span className="visually-hidden"> (откроется в новой вкладке)</span>
              </a>
            </li>
            <li>
              <a className="footer__link abs d-nowrap" style={at(953, 544)} href={VK_URL} target="_blank" rel="noopener noreferrer">
                //вк<span className="visually-hidden"> — ВКонтакте (откроется в новой вкладке)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
