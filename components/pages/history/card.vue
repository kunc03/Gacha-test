<template>
  <div
    class="bg-white w-full rounded-xl p-2 inline-flex justify-between cursor-pointer"
  >
    <div class="inline-flex gap-2 justify-center items-center">
      <div
        class="size-20 relative bg-[url('assets/images/bg-orange-image.png')] bg-cover bg-center"
      >
        <img
          :src="duck"
          alt="duck"
          class="absolute left-1/2 top-[45%] md:top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 object-scale-down"
          preload
        />
      </div>
      <div>
        <p class="text-exd-gold text-exd-1724 font-bold">10<span>pt</span></p>
        <p lass="text-exd-gray-scorpion font-medium text-exd-1020">
          0000/00/00 00:00
        </p>
        <p class="text-exd-gray-scorpion font-semibold text-exd-1218">
          獲得スポット名獲得スポット名
        </p>
      </div>
    </div>
    <img
      :src="arrow"
      alt="arrow"
      width="12"
      height="12"
      preload
      class="invert mr-3"
    />
  </div>
</template>

<script setup>
import duck from '~/assets/images/duck.svg'
import arrow from '~/assets/images/arrow.svg'
</script>
