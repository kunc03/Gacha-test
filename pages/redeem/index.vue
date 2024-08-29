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
        v-for="(prize, key) in prizes"
        :key="key"
        :keyBody="key"
        :body="prize"
        :currentPoint="store.point"
      />
    </div>
  </div>
</template>

<script setup>
import { store } from '~/stores/dashboard.js'

definePageMeta({
  middleware: 'auth',
  layout: 'with-bottom-bar',
})

useHead({
  title: 'Redeem',
})

const prizes = ref([])

const fetchingPrizesData = async () => {
  try {
    const { data } = await useFetchApi('GET', 'prizes')

    prizes.value = dataArrays(data);
    console.log(prizes.value);
  } catch (error) {
    console.log(error)
  }
}

const dataArrays = ((data) => {
  return data.reduce((acc, obj) => {
    const key = Object.keys(obj)[0];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key] = acc[key].concat(obj[key]);
    return acc;
  }, {});
});

onMounted(() => {
  store.fetchingDashboardData()
  fetchingPrizesData();
})

</script>
