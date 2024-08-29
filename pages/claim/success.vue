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
        @click="goTo('external')"
      >
        <span class="grow text-center">デジタルマップTOP</span>
        <img :src="arrow" alt="warning" width="10" height="10" preload />
      </Button>

      <Button
        class="!bg-exd-red-vermilion !py-4 !w-full !uppercase !font-bold !text-exd-1424 !rounded-full !text-white !flex !flex-row !justify-between !px-5 mx-auto"
        raised
        @click="goTo('top')"
      >
        <span class="grow text-center">ガチャTOP</span>
        <img :src="arrow" alt="warning" width="10" height="10" preload />
      </Button>
    </div>
  </div>
</template>

<script setup>
import duck from '~/assets/images/duck.svg'
import arrow from '~/assets/images/arrow.svg'
import { useRouter } from 'vue-router'

definePageMeta({
  middleware: 'auth',
  layout: 'default',
})

const router = useRouter();

const goTo = (type) => {
  switch (type) {
    case "top":
      router.push('/dashboard')
      break;
    case "external":
      window.open("https://nospot.new-ordinary.co.jp/maps/nagoya");
      break;
  
    default:
      break;
  }
}

useHead({
  title: 'Redeem',
})
</script>
