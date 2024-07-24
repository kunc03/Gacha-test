<template>
  <div
    class="grow bg-[url('assets/images/bg-red.webp')] bg-cover bg-center justify-between items-center flex flex-col"
  >
    <div class="flex-1 items-center justify-center flex flex-col gap-11">
      <NuxtImg src="/logo.webp" alt="logo" width="190" height="71" preload />
      <div class="flex flex-col gap-8 mx-8 justify-start items-center">
        <h1
          class="text-center font-bold text-exd-1824.52 text-white"
          style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
        >
          Password
        </h1>
        <div
          class="bg-white h-exd-150 rounded-xl text-center grid place-items-center text-exd-6081.72 text-exd-red w-full font-bold"
        >
          <p style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)">1234</p>
        </div>
        <div class="text-white font-bold text-xs text-start">
          <p style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)">
            ※ガチャラリーのパスワードは本日限り有効です。
          </p>
          <p style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)">
            ※Gacharary password is valid only for today.
          </p>
        </div>
      </div>
    </div>
    <Button
      label="close"
      class="!mb-4 !bg-exd-gold !py-4 !w-exd-312 !uppercase !font-bold !text-exd-1424 !rounded-full"
      raised
    />
  </div>
</template>

<script setup>
import Button from 'primevue/button'

const route = useRoute()
const router = useRouter()

onMounted(() => {
  if (route.params.randomCode !== 'tokyo') {
    router.push('/')
  }
})
</script>
