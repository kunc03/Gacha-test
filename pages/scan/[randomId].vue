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
        <InputOtp v-model="value" integerOnly class="!flex !flex-row !gap-3" />
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
            :loading="isLoading"
            @click="goToScanTokyo"
          >
            <span class="grow text-center">GO!</span>
            <LoadingIcon v-if="isLoading" />
            <NuxtImg
              v-else
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
            エラーが発生しました
          </p>
          <p class="font-bold text-exd-1424 text-exd-gray-scorpion">
            もう一度やりなおしてください
          </p>
        </div>
      </div>
    </template>
  </Dialog>
  <div class="overlay" v-if="isRequestingLocation" />
</template>

<script setup>
import warning from '~/assets/images/warning.svg'
import close from '~/assets/images/close.svg'

import InputOtp from 'primevue/inputotp'
import Header from '~/components/header.vue'
import Dialog from 'primevue/dialog'
import { useRouter } from 'vue-router'

const value = ref('')
const route = useRoute()
const router = useRouter()
const isNotAllowed = ref(false)
const isRequestingLocation = ref(false)
const isLoading = ref(false)
const handleCloseDialog = () => (isNotAllowed.value = false)

const checkPassword = async (params) => {
  try {
    isLoading.value = true
    const { status, data } = await useFetchApi('GET', 'gacha/spin', { params })

    sessionStorage.setItem('POINT_ID', data.point.id)
    sessionStorage.setItem('LOCATION_ID', data.location.id)

    isLoading.value = false
    return status
  } catch (error) {
    console.log("Error: Can't check password")

    isLoading.value = false
    sessionStorage.removeItem('POINT_ID')
    sessionStorage.removeItem('LOCATION_ID')
  }
}

const goToScanTokyo = async () => {
  const location = route.params.randomId
  const passwordValue = value.value

  const isTrue = await checkPassword({
    slug: location,
    password: passwordValue,
  })

  if (isTrue) router.push('/spin/tokyo')
  else isNotAllowed.value = true
}

onMounted(() => {
  if ('permissions' in navigator) {
    navigator.permissions
      .query({ name: 'geolocation' })
      .then((permissionStatus) => {
        if (permissionStatus.state === 'granted') {
          isRequestingLocation.value = false
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log(position)
            },
            (error) => {
              console.error(error)
            }
          )
        } else if (permissionStatus.state === 'prompt') {
          if ('geolocation' in navigator) {
            isRequestingLocation.value = true
            navigator.geolocation.getCurrentPosition(
              () => {
                isRequestingLocation.value = false
              },
              () => {
                isRequestingLocation.value = false
              }
            )
          } else {
            isRequestingLocation.value = false
          }
        } else if (permissionStatus.state === 'denied') {
          isRequestingLocation.value = true
        }

        // Listen for changes to the permission status
        permissionStatus.onchange = () => {
          if (permissionStatus.state === 'granted') {
            isRequestingLocation.value = false
          } else if (permissionStatus.state === 'denied') {
            isRequestingLocation.value = false
          }
        }
      })
  } else {
    if ('geolocation' in navigator) {
      isRequestingLocation.value = true
      navigator.geolocation.getCurrentPosition(
        () => {
          isRequestingLocation.value = false
        },
        () => {
          isRequestingLocation.value = false
        }
      )
    } else {
      // Geolocation is not available, show a dialog or handle accordingly
      isNotAllowed.value = true
    }
  }
})
</script>

<style scoped>
::v-deep(.p-inputtext) {
  @apply border border-exd-gray-44 bg-white w-exd-40 h-exd-50 text-exd-gray-scorpion;
}

::v-deep(.p-dialog-header) {
  @apply hidden;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
