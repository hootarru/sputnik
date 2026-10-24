// Типограф: убирает висячие предлоги, союзы и частицы.
// Короткое служебное слово приклеивается неразрывным пробелом ( ) к следующему слову,
// тире — к предыдущему. Работает поверх текстов из Figma (там часть слов уже склеена).

const NBSP = ' '

// Предлоги, союзы и частицы, которые не должны оставаться в конце строки
const SHORT = [
  'а', 'в', 'во', 'и', 'к', 'ко', 'о', 'об', 'обо', 'с', 'со', 'у', 'я',
  'на', 'по', 'за', 'из', 'от', 'до', 'не', 'ни', 'но', 'да', 'же', 'ли', 'бы', 'то',
  'без', 'для', 'над', 'под', 'при', 'про', 'что', 'как', 'или', 'его', 'её', 'их', 'мы', 'ты', 'он', 'она', 'это',
]

// Без lookbehind — он ломает разбор скрипта в Safari < 16.4
const SHORT_RE = new RegExp(`(^|[\\s«(„"])(${SHORT.join('|')}) `, 'giu')
const DASH_RE = / ([—–])/g
const NUM_RE = /(\d) (?=\S)/g

export function typograph(text) {
  if (typeof text !== 'string') return text
  let out = text
  // Два прохода: «и в доме» — после первой замены второе слово остаётся без пары
  for (let i = 0; i < 2; i++) out = out.replace(SHORT_RE, `$1$2${NBSP}`)
  return out.replace(DASH_RE, `${NBSP}$1`).replace(NUM_RE, `$1${NBSP}`)
}

export function typographAll(obj) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, typograph(v)]))
}
