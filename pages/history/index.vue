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
    <div class="text-white w-full inline-flex justify-between">
      <p class="text-exd-2856">キャラクター図鑑</p>
      <p class="font-bold text-exd-1824.52 leading-tight">
        <span class="text-exd-2856">000</span>/000
      </p>
    </div>
    <PagesHistoryCard
      v-for="(history, index) in histories"
      :key="index"
      :data="history"
    />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  layout: 'with-bottom-bar',
})

useHead({
  title: 'History',
})

const histories = ref([])

const fetchingHistoryData = async () => {
  try {
    const { data } = await useFetchApi('GET', 'history')

    histories.value = data
    console.log(data)
  } catch (error) {
    console.log("Error: Can't save spin result")
  }
}

onMounted(() => {
  fetchingHistoryData()
})
</script>
