<template>
  <div
    class="flex flex-col grow bg-[url('assets/images/bg-red3.webp')] bg-cover bg-center justify-between relative cursor-pointer"
    @click="handleShowModal"
  >
    <div class="relative grow">
      <img
        :src="intlRounded"
        alt="intl"
        preload
        height="48"
        width="48"
        class="absolute top-14 right-10 small:right-6 small:!h-10 small:!w-10 small:!top-8"
      />
      <img
        :src="logoIcon"
        alt="logo-icon"
        preload
        height="129"
        width="226"
        class="absolute top-8 small:top-4 h-[129px] small:h-20 w-[226px] small:w-auto left-0 z-20"
      />
    </div>
    <div class="absolute inset-x-0 top-[96px] small:top-10">
      <img
        :src="picture1"
        alt="picture1"
        class="absolute -left-2 w-auto small:w-auto"
      />
      <img
        :src="picture2"
        alt="picture2"
        class="absolute -right-[4.5rem] top-8 w-auto small:w-auto"
      />
      <img :src="get" alt="get" class="absolute right-4 top-4" />

      <img
        :src="gacha"
        alt="gacha"
        preload
        class="absolute left-5 top-40 w-[172px] small:w-[150px]"
      />
    </div>
    <div
      class="relative pb-7 small:pb-4 gap-10 small:gap-5 justify-center items-center w-full flex flex-col z-10"
    >
      <img :src="tapScreen" alt="intl" class="h-auto small:w-40" preload />
      <p class="text-white text-exd-1218 font-semibold">
        {{ $t('addToHomeScreen') }}
      </p>
    </div>
    <img
      :src="character"
      alt="character"
      class="absolute right-28 small:right-24 top-[calc(50%-3rem)] small:top-[calc(52%-3.5rem)]"
    />
    <img
      :src="intl"
      alt="intl"
      class="absolute right-6 small:right-4 top-[calc(50%-1.2rem)] small:top-[calc(52%-1.7rem)]"
    />
    <img
      :src="logo"
      alt="logo"
      preload
      height="135"
      width="363"
      class="absolute left-1/2 transform -translate-x-1/2 right-0 z-10 top-[55%] small:top-[calc(57%)] small:!h-auto small:!w-[20rem]"
    />
    <img
      :src="digitalTourist"
      alt="digital-tourist"
      preload
      height="135"
      width="363"
      class="absolute left-1/2 transform -translate-x-1/2 right-0 z-10 top-[calc(55%+140px)] small:top-[calc(57%+120px)] w-[363px] small:w-[19rem]"
    />
  </div>

  <ModalLogin v-model="hasModal" />

  <WarningPopUp
    :is-open="isComplete"
    :on-close="handleClose"
    :has-button="true"
    :on-click-button="handleDialog"
    label-button="GO!"
    modal-title=" 会員登録が完了しました。"
  />
</template>

<script setup>
import bgHeader from '~/assets/images/login-header.png'
import intlRounded from '~/assets/images/intl-rounded.svg'
import logoIcon from '~/assets/images/logo-icon.svg'
import tapScreen from '~/assets/images/tap-screen.svg'
import bgLoginBottom from '~/assets/images/bg-login-bottom.png'
import logo from '~/assets/images/logo.png'
import digitalTourist from '~/assets/images/digital-tourist.png'
import { nextTick } from 'vue'
import WarningPopUp from '~/components/WarningPopUp.vue'
import gacha from '~/assets/images/gacha.png'
import picture1 from '~/assets/images/picture1.png'
import picture2 from '~/assets/images/picture2.png'
import get from '~/assets/images/get.png'
import intl from '~/assets/images/intl.png'
import character from '~/assets/images/character.png'

const router = useRouter()
const { setSourceFrom } = useRegister()
const hasModal = ref(false)
const isComplete = ref(false)

const TOKEN = useCookie('TOKEN')
const USER = useCookie('USER')

// definePageMeta({
//   middleware: async (to, from) => {
//     const TOKEN = useCookie('TOKEN')
//     const USER = useCookie('USER')

//     if (TOKEN.value) {
//       // Jika token ada, redirect ke dashboard
//       return navigateTo('/dashboard')
//     }
//   },
// })

const handleShowModal = () => {
  hasModal.value = true
  setSourceFrom('top')
}
const handleDialog = async () => {
  isComplete.value = false
  router.push('/')
  await nextTick() // Memastikan reactivity update selesai sebelum lanjut
  handleShowModal()
}

const handleClose = () => {
  isComplete.value = false
}

const form = ref({
  emailAddress: '',
  password: '',
})

const updateModel = (field, value) => {
  form.value[field] = value
}

const validateInput = (field, value) => {
  console.log(`Validated ${field}:`, value)
}

onMounted(async () => {
  if (window.location.hash === '#verification-completed') {
    isComplete.value = true
    // Clear localStorage, sessionStorage, and cookies
    localStorage.clear()
    sessionStorage.clear()
    TOKEN.value = null
    USER.value = null
  } else {
    if (TOKEN.value) {
      return await navigateTo('/dashboard')
    }
  }
})

useHead({
  title: 'Welcome',
})
</script>
