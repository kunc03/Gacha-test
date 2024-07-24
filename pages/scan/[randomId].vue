<template>
  <div class="grow flex flex-col">
    <Header>
      <p
        style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
        class="text-black font-bold text-exd-1824.52"
      >
        パスワード入力
      </p>
    </Header>

    <div class="flex flex-col grow items-center justify-center">
      <div
        class="flex flex-col gap-4 pt-exd-81 pb-exd-60 justify-center items-center"
      >
        <p>パスワードを入力してください</p>
        <InputOtp v-model="value" />
      </div>
      <div class="grow w-full flex flex-col gap-5">
        <div
          class="bg-exd-banana mx-3 font-bold text-exd-gray-scorpion text-exd-1424 p-5"
        >
          パスワードは「名古屋観光デジタルマップ」　 で このスポットを探してGET!
        </div>
        <div class="w-full grow bg-gray-100 p-5">bawah</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import InputOtp from 'primevue/inputotp'
import Header from '~/components/header.vue'
</script>

<style scoped>
::v-deep(.p-inputtext) {
  @apply border border-exd-gray-44 bg-white w-exd-40 h-exd-50;
}
</style>
