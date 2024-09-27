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
          class="absolute left-1/2 top-[25px] transform -translate-x-1/2 w-full h-auto max-h-[88vh] object-contain"
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

definePageMeta({
  middleware: 'valid-password',
})

const goToSpinPoint = async () => {
  router.push(`/spin/point`)
}

useHead({
  title: 'Spin',
})
</script>
