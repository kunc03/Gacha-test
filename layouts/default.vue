<template>
  <main
    class="w-full max-w-md mx-auto h-full overflow-auto bg-white flex flex-col relative"
  >
    <slot />
  </main>
</template>
<script setup>
import { useI18n } from 'vue-i18n'

const config = useRuntimeConfig()
const { t } = useI18n()

useHead({
  title: t('headTitle'),
  meta: [
    { name: 'description', content: config.public.META_TITLE },
    // Facebook
    { name: 'og:title', content: config.public.META_TITLE },
    { name: 'og:description', content: config.public.META_DESCRIPTION },
    { name: 'og:image', content: config.public.META_IMAGE },
    { name: 'og:url', content: config.public.META_URL },
    { name: 'og:type', content: 'Website' },
    { name: 'og:image:width', content: '1200' },
    { name: 'og:image:height', content: '630' },
    // twitter
    { name: 'twitter:title', content: config.public.META_TITLE },
    { name: 'twitter:description', content: config.public.META_DESCRIPTION },
    { name: 'twitter:image', content: config.public.META_IMAGE },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image:width', content: '1200' },
    { name: 'twitter:image:height', content: '630' },
  ],
  script:
    process.env.NODE_ENV === 'production'
      ? [
          {
            src: `https://www.googletagmanager.com/gtag/js?id=${config.public.NUXT_PUBLIC_GTAG_ID}`,
            async: true,
          },
          {
            children: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${config.public.NUXT_PUBLIC_GTAG_ID}');
      `,
            type: 'text/javascript',
          },
        ]
      : [],
})

onMounted(() => {
  console.log('Environment:', process.env.NODE_ENV)
  console.log('GTAG ID:', process.env.NUXT_PUBLIC_GTAG_ID)
})
</script>
