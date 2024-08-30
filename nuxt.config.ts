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
        { rel: 'icon', type: 'image/x-icon', href: '/logo-icon.ico' },
        // { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        // { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        // { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
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
      API_URL: process.env.API_URL,
      GOOGLE_API: process.env.GOOGLE_API,
      APP_NAME: process.env.APP_NAME,
      META_TITLE: process.env.META_TITLE,
      META_DESCRIPTION: process.env.META_DESCRIPTION,
      META_IMAGE: process.env.META_IMAGE,
      META_URL: process.env.META_URL
    },
  },

  experimental: {
    externalVue: false,
  },

  tailwindcss: {
    cssPath: 'assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
  },

  compatibilityDate: '2024-07-29',
})
