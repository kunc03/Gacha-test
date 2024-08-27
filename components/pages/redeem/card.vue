<template>
  <div
    class="rounded-xl max-w-sm overflow-hidden cursor-pointer"
  >
    <div class="bg-exd-red-900 inline-flex justify-between w-full pt-2 px-4">
      <p class="text-white font-bold text-exd-1824.52">{{ keyBody }}pt</p>
      <p class="text-exd-yellow-300 font-medium text-exd-1824.52">
        <!-- 交換できます -->
      </p>
    </div>
    <div
      class="bg-white p-2 inline-flex gap-2 border-b border-b-exd-light-grey w-100"
      v-for="item in body"
      :key="item.id"
      @click="handleGoToDetailRedeem(item.id)"
    >
      <img
        :src="item.image"
        alt="duck"
        class="object-scale-down"
        preload
        width="79"
        height="64"
      />
      <div class="inline-flex justify-between w-100">
        <div class="flex flex-col justify-center gap-1">
          <p class="text-exd-gray-scorpion font-semibold text-exd-1218">
            {{ item.name }}
          </p>
          <p class="text-exd-red-500 text-exd-1013.62">
            利用可能期間：{{ item.started_at }}〜 {{ item.expired_at }}
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
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import duck from '~/assets/images/duck.svg'
import arrow from '~/assets/images/arrow.svg'

const props = defineProps({
  body: {
    type: Object,
    default: () => {},
  },
  keyBody: {
    type: String
  }
})

const router = useRouter()
const handleGoToDetailRedeem = (id) => router.push(`/redeem/${id}`)
</script>
