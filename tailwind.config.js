/** @type {import('tailwindcss').Config} */
function pxToEm($px) {
  return $px / 16 + 'rem'
}

const padding = {
  'exd-22': pxToEm(22),
  'exd-46': pxToEm(46),
  'exd-42': pxToEm(42),
  'exd-15': pxToEm(15),
  'exd-60': pxToEm(60),
  'exd-81': pxToEm(81),
}

const height = {
  'exd-40': pxToEm(40),
  'exd-50': pxToEm(50),
  'exd-130': pxToEm(130),
  'exd-150': pxToEm(150),
  'exd-200': pxToEm(200),
  'exd-394': pxToEm(394),
  'exd-400': pxToEm(400),
}
const width = {
  'exd-40': pxToEm(40),
  'exd-50': pxToEm(50),
  'exd-148': pxToEm(148),
  'exd-190': pxToEm(190),
  'exd-300': pxToEm(300),
  'exd-312': pxToEm(312),
  'exd-394': pxToEm(394),
  'exd-400': pxToEm(400),
}

const fontSize = {
  'exd-0910': [pxToEm(9), { lineHeight: pxToEm(10.89) }],
  'exd-1013.62': [pxToEm(10), { lineHeight: pxToEm(13.62) }],
  'exd-1020': [pxToEm(10), { lineHeight: pxToEm(20) }],
  'exd-1218': [pxToEm(12), { lineHeight: pxToEm(18) }],
  'exd-1220': [pxToEm(12), { lineHeight: pxToEm(20) }],
  'exd-1220': [pxToEm(12), { lineHeight: pxToEm(20) }],
  'exd-12520': [pxToEm(12.5), { lineHeight: pxToEm(20) }],
  'exd-1320': [pxToEm(13.5), { lineHeight: pxToEm(20) }],
  'exd-1416': [pxToEm(14), { lineHeight: pxToEm(16) }],
  'exd-1424': [pxToEm(14), { lineHeight: pxToEm(24) }],
  'exd-1724': [pxToEm(17), { lineHeight: pxToEm(24) }],
  'exd-1824.52': [pxToEm(18), { lineHeight: pxToEm(24.52) }],
  'exd-2856': [pxToEm(28), { lineHeight: pxToEm(56) }],
  'exd-56112': [pxToEm(56), { lineHeight: pxToEm(112) }],
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
        small: { min: '150px', max: '380px' },
      },
      padding: { ...padding },
      colors: {
        'exd-red': {
          DEFAULT: 'hsla(var(--dark-red))', //#822820
        },
        'exd-red-vermilion': {
          DEFAULT: 'hsla(var(--red-vermilion))', //#D44D20
        },
        'exd-gold': {
          DEFAULT: 'hsla(var(--gold))', //#D7A237
        },
        'exd-gray-scorpion': {
          DEFAULT: 'hsla(var(--gray-scorpion))', //#606060
        },
        'exd-stone-300': {
          DEFAULT: 'hsla(var(--stone-300))', //#C3C3C3
        },
        'exd-zinc-100': {
          DEFAULT: 'hsla(var(--zinc-100))', //#F3F3F3
        },

        'exd-banana': {
          DEFAULT: 'hsla(var(--banana))', //#FFE9BC
        },
        'exd-gray-44': {
          DEFAULT: 'hsla(var(--gray-44))', //#707070
        },
        'exd-light-grey': {
          DEFAULT: 'hsla(var(--light-grey))', //#D0D0D0
        },
        'exd-neutral-400': {
          DEFAULT: 'hsla(var(--neutral-400))', //#8A9595
        },
        'exd-orange-700': {
          DEFAULT: 'hsla(var(--orange-700))', //#D44D20
        },
        'exd-red-900': {
          DEFAULT: 'hsla(var(--red-900))', //#822820
        },
        'exd-yellow-300': {
          DEFAULT: 'hsla(var(--yellow-300))', //#FFF958
        },
        'exd-red-500': {
          DEFAULT: 'hsla(var(--red-500))', //#D84F45
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
