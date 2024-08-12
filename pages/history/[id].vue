<template>
  <Header hasBack>
    <p
      style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
      class="text-exd-gray-scorpion font-bold text-exd-1824.52"
    >
      コレクション
    </p>
  </Header>
  <div class="flex flex-col bg-center text-black mt-[30%] px-8 gap-3">
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <div
        class="w-full h-80 relative bg-[url('assets/images/bg-orange-image.png')] bg-cover bg-center"
      >
        <img
          :src="duck"
          alt="duck"
          class="absolute left-1/2 top-[45%] md:top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 object-scale-down"
          preload
        />
      </div>
      <div class="p-5 flex flex-col gap-2">
        <div class="inline-flex justify-between w-full">
          <p class="font-bold text-exd-1424 text-exd-gray-scorpion">
            キャラ名キャラ名キャラ名
          </p>
          <p class="font-bold text-exd-1424 text-exd-gold">10pt</p>
        </div>
        <p class="font-medium text-exd-1218 text-exd-gray-scorpion">
          ダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミー
        </p>
        <div class="inline-flex gap-3 w-full justify-center">
          <img :src="download" alt="download" class="size-8" preload />
          <img :src="line" alt="line" class="size-8" preload />
          <img :src="x" alt="x" class="size-8" preload />
          <img :src="facebook" alt="facebook" class="size-8" preload />
        </div>
        <div class="flex flex-col gap-2">
          <div class="w-full h-5 bg-exd-gray-44 pl-3">
            <p class="text-white text-exd-1220 font-bold">スポット</p>
          </div>
          <p class="text-exd-gray-scorpion font-medium text-exd-1218">
            ダミーダミーダミーダミーダミーダミーダミー
            ダミーダミーダミーダミーダミーダミーダミー
          </p>
        </div>
        <div class="w-full h-72">
          <img
            :src="maps"
            alt="maps"
            class="w-full h-full object-cover"
            preload
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import duck from '~/assets/images/duck.svg'
import download from '~/assets/images/download.svg'
import facebook from '~/assets/images/facebook.svg'
import line from '~/assets/images/line.svg'
import x from '~/assets/images/x.svg'
import maps from '~/assets/images/maps.svg'

definePageMeta({
  layout: 'with-bottom-bar',
})

useHead({
  title: 'History',
})
</script>
