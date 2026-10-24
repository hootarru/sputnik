import { at, type } from '../lib/at.js'

// Номер секции на лаймовой плашке + крупное название.
// На десктопе оба элемента позиционируются по Figma, на мобильном идут одной строкой.
export default function SectionHead({ num, title, numY, titleX, titleY, titleW, titleLh = 120 }) {
  return (
    <h2 className="sh" data-anim="sh">
      <span className="num ty-num abs" style={at(40, numY)} data-anim="num">
        <span className="num__band" aria-hidden="true" data-anim="band" />
        {num}
        <span className="visually-hidden"> — </span>
      </span>
      <span
        className={`sh__title ty-h2 abs${titleW ? '' : ' d-nowrap'}`}
        style={{ ...at(titleX, titleY, titleW), ...type(150, titleLh) }}
        data-anim="title"
      >
        {title}
      </span>
    </h2>
  )
}
