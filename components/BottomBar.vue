<template>
  <div class="bg-white bottom-0 left-0 right-0 absolute h-16 z-50">
    <div class="inline-flex gap-3 w-full pt-3">
      <div
        class="absolute -top-10 bg-[url('assets/images/point_navbar.svg')] bg-cover bg-center w-[104px] h-[104px] flex flex-col justify-center items-center"
      >
        <p class="text-white text-exd-1020 font-bold mt-10 -ml-4">
          現在のポイント
        </p>
        <p class="text-white text-exd-2856 font-bold relative -top-2 -ml-4">
          {{ store.point }}<span class="text-exd-1020">pt</span>
        </p>
      </div>

      <div class="inline-flex flex-row gap-7 ml-28 justify-evenly w-full">
        <BottomBarMenuIcon
          v-for="(item, index) in menuItems"
          :key="index"
          :icon="item.icon"
          :label="item.label"
          :on-click="item.onClick"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import iconPin from '~/assets/images/icon-pin.svg'
import iconStar from '~/assets/images/icon-star.svg'
import iconPerson from '~/assets/images/icon-person.svg'
import { store } from '~/stores/dashboard.js'
import { useRouter } from 'vue-router'
const router = useRouter()

const menuItems = ref([
  {
    icon: iconPin,
    label: 'デジタルマップ',
    onClick: () => window.open('https://www.nagoya-info.jp/#dmap', '_blank'),
  },
  {
    icon: iconStar,
    label: '景品一覧・交換',
    onClick: () => router.push('/redeem'),
  },
  {
    icon: iconPerson,
    label: 'マイページ',
    onClick: () => router.push('/dashboard'),
  },
])
</script>
