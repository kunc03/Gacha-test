<template>
  <SplashScreen />

  <div class="grow flex flex-col">
    <HeaderBar withLogo />

    <div
      class="flex flex-col grow bg-[url('/images/bg-red2.webp')] bg-cover bg-center relative"
    >
      <div
        class="grow w-full flex flex-col items-center justify-center relative mb-4 mt-[15%]"
      >
        <img
          src="/images/gacha2.webp"
          alt="gacha2"
          class="absolute inset-x-1/2 -translate-x-1/2 -translate-y-3 w-[calc(100%-100px)] h-full object-scale-down small:h-3/4"
          preload
        />
      </div>

      <SolidButton
        :label="$t('spinTheGacha')"
        :on-click="goToSpinPoint"
        has-bottom
      />
    </div>
  </div>

  <Modal :is-open="isNotAllowed" :on-close="() => handleCloseDialog()">
    <template v-slot:body>
      <div class="w-full flex flex-col justify-center items-center gap-4 py-6">
        <img
          src="/images/warning.svg"
          alt="warning"
          width="40"
          height="40"
          preload
        />
        <div class="text-center w-10/12">
          <p class="font-bold text-exd-1424 text-exd-gray-scorpion">
            {{ errorMessages }}
          </p>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup>
const route = useRoute()
const router = useRouter()

const isLoading = ref(false)
const isNotAllowed = ref(false)
const errorMessages = ref('')
const handleCloseDialog = () => (isNotAllowed.value = false)
const handleOpenDialog = () => (isNotAllowed.value = true)

const goToSpinPoint = async () => {
  router.push(`/spin/point`)
}

useHead({
  title: 'Spin',
})
</script>
