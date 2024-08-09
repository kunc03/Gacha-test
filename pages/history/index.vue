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
    <PagesHistoryCard
      v-for="index in Array.from({ length: 100 })"
      :key="index"
    />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'with-bottom-bar',
})

useHead({
  title: 'History',
})
</script>
