<template>
  <main
    class="w-full max-w-md mx-auto h-full overflow-auto bg-white flex flex-col relative"
  >
    <slot />
  </main>
</template>
<script setup>
const config = useRuntimeConfig()
useHead({
  meta: [
    { name: 'description', content: config.public.META_TITLE },
    // Facebook
    { name: 'og:title', content: config.public.META_TITLE },
    { name: 'og:description', content: config.public.META_DESCRIPTION },
    { name: 'og:image', content: config.public.META_IMAGE },
    { name: 'og:url', content: config.public.META_URL },
    { name: 'og:type', content: 'Website' },
    // twitter
    { name: 'twitter:title', content: config.public.META_TITLE },
    { name: 'twitter:description', content: config.public.META_DESCRIPTION },
    { name: 'twitter:image', content: config.public.META_IMAGE },
    { name: 'twitter:card', content: 'summary_large_image' },
    // // LINE
    { name: 'line:title', content: config.public.META_TITLE },
    { name: 'line:description', content: config.public.META_DESCRIPTION },
    { name: 'line:image', content: config.public.META_IMAGE },
    { name: 'line:card', content: 'summary_large_image' },
  ],
})
</script>
