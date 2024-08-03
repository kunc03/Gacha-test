<template>
  <div
    class="grow bg-[url('assets/images/bg-green.webp')] bg-cover bg-center relative flex flex-col justify-center items-center"
  >
    <img
      :src="gacha2"
      alt="gacha2"
      class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
      preload
    />
    <img
      :src="sparkling"
      alt="sparkling"
      class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover z-10"
      preload
    />
    <div
      class="left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 absolute bg-[url('assets/images/circle-white.svg')] bg-contain bg-center w-full h-full md:h-1/2 bg-no-repeat"
    >
      <div class="relative h-full w-full">
        <img
          :src="point"
          alt="10point"
          class="absolute w-3/4 object-fill h-full left-1/2 top-[45%] md:top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          preload
        />
        <img
          :src="hatchedEgg"
          alt="10point"
          preload
          class="absolute bottom-10 md:-bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1/4 object-scale-down small:h-3/4"
        />
      </div>
    </div>

    <Button
      class="!inset-x-1/2 !z-50 !mb-3 !-translate-x-1/2 !-translate-y-1/4 !absolute !bottom-1 !bg-exd-gold !py-4 !w-exd-312 !uppercase !font-bold !text-exd-1424 !rounded-full !text-white !flex !flex-row !justify-between !px-5"
      raised
      @click="handleGoToCharacter"
    >
      <span class="grow text-center">次へ</span>
      <img
        :src="arrow"
        alt="arrow"
        width="10"
        height="10"
        preload
        class="shrink-0"
      />
    </Button>
  </div>
</template>

<script setup>
import point from '~/assets/images/10point.svg'
import gacha2 from '~/assets/images/gacha2.png'
import sparkling from '~/assets/images/sparkling.svg'
import hatchedEgg from '~/assets/images/hatched-egg.svg'
import arrow from '~/assets/images/arrow.svg'

const router = useRouter()
const route = useRoute()
const handleGoToCharacter = () =>
  router.push(`/spin/character/${route.params.randomCode}`)
</script>
