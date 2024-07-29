/** @type {import('tailwindcss').Config} */
function pxToEm($px) {
  return $px / 16 + 'rem'
}

const padding = {
  'exd-42': pxToEm(42),
  'exd-15': pxToEm(15),
  'exd-60': pxToEm(60),
  'exd-81': pxToEm(81),
}

const height = {
  'exd-40': pxToEm(40),
  'exd-50': pxToEm(50),
  'exd-150': pxToEm(150),
  'exd-394': pxToEm(394),
}
const width = {
  'exd-40': pxToEm(40),
  'exd-50': pxToEm(50),
  'exd-312': pxToEm(312),
}

const fontSize = {
  'exd-1218': [pxToEm(12), { lineHeight: pxToEm(18) }],
  'exd-1220': [pxToEm(12), { lineHeight: pxToEm(20) }],
  'exd-1220': [pxToEm(12), { lineHeight: pxToEm(20) }],
  'exd-1424': [pxToEm(14), { lineHeight: pxToEm(24) }],
  'exd-1824.52': [pxToEm(18), { lineHeight: pxToEm(24.52) }],
  'exd-6081.72': [pxToEm(60), { lineHeight: pxToEm(81.72) }],
}

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    fontFamily: {
      primary: ['Noto Sans'],
    },

    extend: {
      screens: {
        small: { min: '150px', max: '375px' },
      },
      padding: { ...padding },
      colors: {
        'exd-red': {
          DEFAULT: 'hsla(var(--dark-red))', //#822820
        },
        'exd-gold': {
          DEFAULT: 'hsla(var(--gold))', //#D7A237
        },
        'exd-gray-scorpion': {
          DEFAULT: 'hsla(var(--gray-scorpion))', //#606060
        },
        'exd-banana': {
          DEFAULT: 'hsla(var(--banana))', //#FFE9BC
        },
        'exd-gray-44': {
          DEFAULT: 'hsla(var(--gray-44))', //#707070
        },
      },
      height: {
        ...height,
      },
      width: {
        ...width,
      },
      fontSize: { ...fontSize },
    },
  },
  plugins: [],
}
