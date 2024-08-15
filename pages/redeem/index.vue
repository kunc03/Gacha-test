<template>
  <Header hasBack>
    <p
      style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
      class="text-exd-gray-scorpion font-bold text-exd-1824.52"
    >
      景品一覧・交換
    </p>
  </Header>
  <div class="flex flex-col bg-center w-full px-8">
    <div class="flex flex-col mt-[40%] items-center mb-4">
      <p class="text-white text-exd-2856 font-bold">現在のポイント</p>
      <p class="text-white text-exd-56112 font-bold relative -top-7">
        {{ store.point }}<span class="text-exd-1020">pt</span>
      </p>
    </div>

    <div class="flex flex-col gap-8">
      <PagesRedeemCard
        :data="{ id: 1, point: 20 }"
        :body="[{ id: 1, name: 'asd', value: 'asd' }]"
      />
      <PagesRedeemCard :data="{ id: 2, point: 30 }" :body="dummyData" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  layout: 'with-bottom-bar',
})

useHead({
  title: 'Redeem',
})

const dummyData = ref(
  Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
    value: `Value ${index + 1}`,
  }))
)
</script>
