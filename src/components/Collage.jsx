import { at } from '../lib/at.js'

// Фотоколлаж из нескольких слоёв. Позиции слоёв — в % от рамки коллажа,
// поэтому композиция одинакова и на артборде, и в мобильном потоке.
// layers: [{ src, x, y, w, h }] в px макета относительно рамки; порядок = снизу вверх.
export default function Collage({ x, y, w, h, layers, className = '' }) {
  return (
    <div
      className={`collage abs ${className}`}
      style={{ ...at(x, y, w, h), '--ar': `${w} / ${h}` }}
      data-anim="collage"
    >
      {layers.map((l, i) => (
        <img
          key={i}
          className="collage__layer"
          src={l.src}
          alt=""
          width={l.w}
          height={l.h}
          loading="lazy"
          decoding="async"
          data-anim="layer"
          style={{
            left: `${(l.x / w) * 100}%`,
            top: `${(l.y / h) * 100}%`,
            width: `${(l.w / w) * 100}%`,
          }}
        />
      ))}
    </div>
  )
}
