// https://nuxt.com/docs/api/configuration/nuxt-config

import Aura from '@primevue/themes/aura'

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap',
        },
      ],
    },
  },

  image: {
    dir: 'assets/images',
  },

  typescript: {
    strict: false,
  },

  devtools: { enabled: false },

  modules: [
    '@nuxt/image',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
  ],

  pinia: {
    disableVuex: true,
  },

  primevue: {
    options: {
      ripple: true,
      inputVariant: 'filled',
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: 'system',
          cssLayer: {
            name: 'primevue',
            order: 'tailwind-base, primevue, tailwind-utilities',
          },
        },
      },
    },
  },

  runtimeConfig: {
    public: {
      BASE_API: process.env.NUXT_BASE_API,
    },
  },

  tailwindcss: {
    cssPath: 'assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
  },

  compatibilityDate: '2024-07-29',
})
