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
        npm <InputOtp v-model="value" class="!flex !flex-row !gap-3" />
      </div>
      <div class="grow w-full flex flex-col gap-5">
        <div
          class="bg-exd-banana mx-3 font-bold text-exd-gray-scorpion text-exd-1424 p-5"
        >
          パスワードは「名古屋観光デジタルマップ」　 で このスポットを探してGET!
        </div>
        <div class="w-full grow bg-gray-100 p-5 relative flex flex-col">
          <div class="overflow-y-auto grow max-h-[calc(100dvh-550px)]">
            <p class="font-bold text-exd-1424 text-exd-gray-scorpion mb-1">
              注意事項
            </p>
            <p class="text-exd-1220 text-exd-gray-scorpion font-medium">
              ダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミー
            </p>
            <p class="text-exd-1220 text-exd-gray-scorpion font-medium">
              ダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミー
            </p>
            <p class="text-exd-1220 text-exd-gray-scorpion font-medium">
              ダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミー
            </p>
          </div>

          <Button
            class="!inset-x-1/2 !z-50 !mb-3 !-translate-x-1/2 !-translate-y-1/4 !absolute !bottom-1 !bg-exd-gold !py-4 !w-exd-312 !uppercase !font-bold !text-exd-1424 !rounded-full !text-white !flex !flex-row !justify-between !px-5"
            raised
          >
            <span class="grow text-center">GO!</span>
            <NuxtImg
              src="/arrow.svg"
              alt="arrow"
              width="10"
              height="10"
              preload
              class="shrink-0"
            />
          </Button>
        </div>
      </div>
    </div>
  </div>

  <Dialog
    v-model:visible="isNotAllowed"
    modal
    class="!bg-white !w-11/12 !max-w-sm border border-exd-gray-44"
  >
    <template #container>
      <div class="w-full flex flex-col justify-center items-center gap-4 py-6">
        <NuxtImg
          src="/warning.svg"
          alt="warning"
          width="40"
          height="40"
          preload
        />
        <div class="text-center w-10/12">
          <p class="font-bold text-exd-1424 text-exd-gray-scorpion">
            エラーが発生しました
          </p>
          <p class="font-bold text-exd-1424 text-exd-gray-scorpion">
            もう一度やりなおしてください
          </p>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import InputOtp from 'primevue/inputotp'
import Header from '~/components/header.vue'
import Dialog from 'primevue/dialog'

const isNotAllowed = ref(true)
</script>

<style scoped>
::v-deep(.p-inputtext) {
  @apply border border-exd-gray-44 bg-white w-exd-40 h-exd-50;
}

::v-deep(.p-dialog-header) {
  @apply hidden;
}
</style>
