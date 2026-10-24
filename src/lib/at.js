// Координаты элемента во фрейме «варфрейм 3» (px макета, относительно верха секции).
// Используются только в раскладке ≥ 1024px (класс .abs), см. styles/layout.css.
export function at(x, y, w, h) {
  const style = { '--x': x, '--y': y }
  if (w != null) style['--w-px'] = `calc(${w} * var(--s))`
  if (h != null) style['--h-px'] = `calc(${h} * var(--s))`
  return style
}

// Кегль / интерлиньяж из Figma (px макета) для класса .ty
export function type(fs, lh) {
  return { '--fs': fs, '--lh': lh }
}
