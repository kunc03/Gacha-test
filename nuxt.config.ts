// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  typescript: {
    strict: false,
  },
  devtools: { enabled: true },
  modules: [
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
        options: {
          cssLayer: false,
        },
      },
    },
  },
  tailwindcss: {
    cssPath: 'assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
  },
  srcDir: 'src/',
})
