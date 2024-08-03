<template>
  <div class="grow flex flex-col">
    <Header withLogo />

    <div
      class="flex flex-col grow bg-[url('assets/images/bg-red2.svg')] bg-cover bg-center relative"
    >
      <div
        class="grow w-full flex flex-col items-center justify-center relative mb-4"
      >
        <img
          :src="gacha2"
          alt="gacha2"
          class="absolute inset-x-1/2 -translate-x-1/2 -translate-y-3 w-full h-full object-scale-down small:h-3/4"
          preload
        />
      </div>
      <Button
        class="!inset-x-1/2 !z-50 !mb-3 !-translate-x-1/2 !-translate-y-1/4 !absolute !bottom-1 !bg-exd-gold !py-4 !w-exd-312 !uppercase !font-bold !text-exd-1424 !rounded-full !text-white !flex !flex-row !justify-between !px-5"
        raised
        @click="goToSpinPoint"
      >
        <span class="grow text-center">ガチャを回す</span>
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
  </div>
</template>

<script setup>
const router = useRouter()
import gacha2 from '~/assets/images/gacha2.png'
import arrow from '~/assets/images/arrow.svg'

const goToSpinPoint = () => {
  router.push('/spin/point/tokyo')
}
</script>
