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
      ],
      meta: [
        { name: 'description', content: process.env.META_TITLE },
        // Facebook
        { name: 'og:title', content: process.env.META_TITLE },
        { name: 'og:description', content: process.env.META_DESCRIPTION},
        { name: 'og:image', content: process.env.META_IMAGE},
        { name: 'og:url', content: process.env.META_URL},
        { name: 'og:type', content: 'Website' },
        // twitter
        { name: 'twitter:title', content: process.env.META_TITLE },
        { name: 'twitter:description', content: process.env.META_DESCRIPTION},
        { name: 'twitter:image', content: process.env.META_IMAGE},
        { name: 'twitter:card', content: 'summary_large_image' },
        // // LINE
        { name: 'line:title', content: process.env.META_TITLE },
        { name: 'line:description', content: process.env.META_DESCRIPTION},
        { name: 'line:image', content: process.env.META_IMAGE},
        { name: 'line:card', content: 'summary_large_image' },
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
      META_URL: process.env.META_URL,
      META_QUOTE: process.env.META_QUOTE
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
