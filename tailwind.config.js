/** @type {import('tailwindcss').Config} */
function pxToEm($px) {
  return $px / 16 + 'rem'
}

const height = {
  'exd-150': pxToEm(150),
}
const width = {
  'exd-312': pxToEm(312),
}

const fontSize = {
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
      colors: {
        'exd-red': {
          DEFAULT: 'hsla(var(--dark-red))', //#822820
        },
        'exd-gold': {
          DEFAULT: 'hsla(var(--gold))', //#D7A237
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
