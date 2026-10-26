import { T } from '../content.js'
import { at } from '../lib/at.js'
import { TELEGRAM_URL, VK_URL, INSTAGRAM_URL, PRIVACY_URL } from '../config.js'
import { FooterCharacter, FOOTER_CHAR_BOX as B } from './characters.jsx'
import './Footer.css'

const NEW_TAB = { target: '_blank', rel: 'noopener noreferrer' }
const NewTabHint = () => <span className="visually-hidden"> (откроется в новой вкладке)</span>

// Подвал (Figma: y 7040–7703). Персонаж тянется лапками вверх, к кнопке «Перейти в бота».
// Лаймовая полоса 141px: слева «сделано в вышке», год и политика, справа контакты столбиком.
export default function Footer() {
  return (
    <footer id="contacts" className="footer">
      <div className="art footer__art" style={{ '--h': 663 }}>
        <div className="footer__char abs" style={at(B.x, B.y - 7040, B.w, B.h)}>
          <FooterCharacter />
        </div>

        <p className="footer__logo abs" style={at(-61, 152, 1561)} aria-hidden="true">СПУТНИК</p>

        <p className="footer__tag abs d-nowrap" style={at(337, 484)} data-k="footerTag">{T.footerTag}</p>

        <div className="footer__bar" aria-hidden="true" />

        <div className="footer__bottom">
          <div className="footer__meta">
            <p className="footer__made abs d-nowrap" style={at(268, 544)}>{T.footerMade}</p>
            <p className="footer__year abs d-nowrap" style={at(268, 571)}>{T.footerYear}</p>
            <a className="footer__privacy abs d-nowrap" style={at(268, 627)} href={PRIVACY_URL} {...NEW_TAB}>
              {T.footerPrivacy}<NewTabHint />
            </a>
          </div>

          <div className="footer__contacts">
            <h2 className="footer__title abs d-nowrap" style={at(839, 545)} data-k="footerContacts">{T.footerContacts}</h2>
            <ul className="footer__links">
              <li>
                <a className="footer__link abs d-nowrap" style={at(1068, 545)} href={TELEGRAM_URL} {...NEW_TAB}>
                  //telegram<NewTabHint />
                </a>
              </li>
              <li>
                <a className="footer__link abs d-nowrap" style={at(1067, 579)} href={VK_URL} {...NEW_TAB}>
                  //вк<span className="visually-hidden"> — ВКонтакте (откроется в новой вкладке)</span>
                </a>
              </li>
              <li className="footer__ig">
                {INSTAGRAM_URL ? (
                  <a className="footer__link abs d-nowrap" style={at(1068, 613)} href={INSTAGRAM_URL} {...NEW_TAB}>
                    //instagram*<NewTabHint />
                  </a>
                ) : (
                  <span className="footer__link footer__link--plain abs d-nowrap" style={at(1068, 613)}>//instagram*</span>
                )}
                {/* Figma 312:383: Regular 8 / lh 10, чёрный 40% */}
                <small className="footer__ig-note abs d-nowrap" style={at(1082, 635)}>*запрещён в{' '}РФ</small>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
