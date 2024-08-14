<template>
  <div class="grow flex flex-col">
    <Header withLogo />

    <div
      class="flex flex-col grow bg-[url('assets/images/bg-red2.svg')] bg-cover bg-center relative"
    >
      <div
        class="grow w-full flex flex-col items-center justify-center relative mb-4 mt-[15%]"
      >
        <img
          :src="gacha2"
          alt="gacha2"
          class="absolute inset-x-1/2 -translate-x-1/2 -translate-y-3 w-full h-full object-scale-down small:h-3/4"
          preload
        />
      </div>
      <Button
        class="!inset-x-1/2 !z-50 !mb-3 !-translate-x-1/2 !-translate-y-1/4 !absolute !bottom-1 !bg-exd-gold !py-4 !w-exd-312 !uppercase !font-bold !text-exd-1424 !rounded-full !text-white !flex !flex-row !justify-between !px-5"
        raised
        @click="goToSpinPoint"
      >
        <span class="grow text-center">ガチャを回す</span>
        <img
          :src="arrow"
          alt="arrow"
          width="10"
          height="10"
          preload
          class="shrink-0"
        />
      </Button>
    </div>
  </div>

  <Dialog
    v-model:visible="isNotAllowed"
    modal
    class="!bg-white !w-11/12 !max-w-sm border border-exd-gray-44"
  >
    <template #container>
      <img
        :src="close"
        alt="close"
        width="30"
        height="30"
        preload
        class="absolute right-1 top-1 cursor-pointer z-50"
        @click="handleCloseDialog"
      />
      <div class="w-full flex flex-col justify-center items-center gap-4 py-6">
        <img :src="warning" alt="warning" width="40" height="40" preload />
        <div class="text-center w-10/12">
          <p class="font-bold text-exd-1424 text-exd-gray-scorpion">
            {{ errorMessages }}
          </p>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
import gacha2 from '~/assets/images/gacha2.png'
import arrow from '~/assets/images/arrow.svg'
import warning from '~/assets/images/warning.svg'
import close from '~/assets/images/close.svg'

const isLoading = ref(false)
const isNotAllowed = ref(false)
const errorMessages = ref('')
const handleCloseDialog = () => (isNotAllowed.value = false)
const handleOpenDialog = () => (isNotAllowed.value = true)

const goToSpinPoint = async () => {
  const token = localStorage.getItem('TOKEN')
  const user = localStorage.getItem('USER')

  let isSuccess

  if (token && user) {
    isSuccess = await spinAfterLogin()
  } else {
    isSuccess = await spinBeforeLogin()
  }

  if (isSuccess) {
    router.push(`/spin/point/${route.params.randomCode}`)
  }
}

const spinAfterLogin = async () => {
  if (isLoading.value) return
  isLoading.value = true
  try {
    const payload = JSON.parse(localStorage.getItem('VALID_PASSWORD')) || {}

    const { data, status } = await useFetchApi('POST', 'gacha/spin', {
      body: { ...payload },
    })

    localStorage.setItem('POINT_ID', data.userPoint.prize_id)
    localStorage.setItem('LOCATION_ID', data.userPoint.location_id)

    isLoading.value = false
    return status
  } catch (error) {
    console.log("Error: Can't spin after login")

    if (error?._data?.message) {
      errorMessages.value = error._data.message
      handleOpenDialog()
    }

    isLoading.value = false
  }
}

const spinBeforeLogin = async () => {
  if (isLoading.value) return
  isLoading.value = true

  try {
    const params = JSON.parse(localStorage.getItem('VALID_PASSWORD')) || {}

    const { data, status } = await useFetchApi('GET', 'gacha/spin', {
      params,
    })

    localStorage.setItem('POINT_ID', data.point.id)
    localStorage.setItem('LOCATION_ID', data.location.id)

    isLoading.value = false
    return status
  } catch (error) {
    console.log("Error: Can't spin before login")

    if (error?._data?.message) {
      errorMessages.value = error._data.message
      handleOpenDialog()
    }

    isLoading.value = false
  }
}
</script>
