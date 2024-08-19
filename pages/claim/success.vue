<template>
  <Header withLogo />
  <div class="flex flex-col mt-[30%] grow justify-between px-8">
    <p
      class="text-exd-gray-scorpion text-exd-1424 text-center font-bold max-w-44 mx-auto"
    >
      完了しました
    </p>
    <div class="flex flex-col gap-5 mb-4">
      <Button
        class="!bg-exd-gold !py-4 !w-full !uppercase !font-bold !text-exd-1424 !rounded-full !text-white !flex !flex-row !justify-between !px-5 mx-auto"
        raised
      >
        <span class="grow text-center">デジタルマップTOP</span>
        <NuxtImg
          src="/arrow.svg"
          alt="arrow"
          width="10"
          height="10"
          preload
          class="shrink-0"
        />
      </Button>

      <Button
        class="!bg-exd-red-vermilion !py-4 !w-full !uppercase !font-bold !text-exd-1424 !rounded-full !text-white !flex !flex-row !justify-between !px-5 mx-auto"
        raised
      >
        <span class="grow text-center">ガチャTOP</span>
        <NuxtImg
          src="/arrow.svg"
          alt="arrow"
          width="10"
          height="10"
          preload
          class="shrink-0"
        />
      </Button>
    </div>
  </div>
</template>

<script setup>
import duck from '~/assets/images/duck.svg'
import { useRouter } from 'vue-router'

definePageMeta({
  middleware: 'auth',
  layout: 'default',
})

useHead({
  title: 'Redeem',
})
</script>
