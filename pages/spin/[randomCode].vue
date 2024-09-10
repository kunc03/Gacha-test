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

      <SolidButton label="ガチャを回す" :on-click="goToSpinPoint" has-bottom />
    </div>
  </div>

  <Modal :is-open="isNotAllowed" :on-close="() => handleCloseDialog()">
    <template v-slot:body>
      <div class="w-full flex flex-col justify-center items-center gap-4 py-6">
        <img :src="warning" alt="warning" width="40" height="40" preload />
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
import gacha2 from '~/assets/images/gacha2.png'
import warning from '~/assets/images/warning.svg'

const isLoading = ref(false)
const isNotAllowed = ref(false)
const errorMessages = ref('')
const handleCloseDialog = () => (isNotAllowed.value = false)
const handleOpenDialog = () => (isNotAllowed.value = true)

const goToSpinPoint = async () => {
  // const token = localStorage.getItem('TOKEN')
  // const user = localStorage.getItem('USER')

  // let isSuccess

  // if (token && user) {
  //   isSuccess = await spinAfterLogin()
  // } else {
  //   isSuccess = await spinBeforeLogin()
  // }

  // if (isSuccess) {
  router.push(`/spin/point`)
  // console.log('Success')
  // }
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

useHead({
  title: 'Spin',
})
</script>
