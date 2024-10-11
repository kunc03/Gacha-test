<template>
  <div
    @touchmove="(e) => e.preventDefault()"
    class="flex flex-col grow bg-[url('assets/images/bg-red3.webp')] bg-cover bg-center justify-between relative cursor-pointer overflow-hidden"
  >
    <div class="absolute top-[10px] small:-top-1 -right-1 w-[50px] z-[1000]">
      <img
        @click="langPanelToggle"
        :src="intlRounded"
        alt="intl"
        preload
        height="48"
        width="48"
        class="absolute top-14 right-6 small:!h-10 small:!w-10 small:!top-8 z-[1000]"
      />
      <div class="relative top-[6.5rem] right-6 small:!h-10 small:!top-[2rem]">
        <LanguangePanel v-model:visible="langPanel" />
      </div>
    </div>
    <div class="inner-container" @click="handleShowModal">
      <div class="relative grow">
        <img
          :src="logoIcon"
          alt="logo-icon"
          preload
          height="129"
          width="226"
          class="absolute top-8 small:top-2 h-[129px] small:h-24 w-[75%] small:w-auto left-0 z-20"
        />
      </div>
      <div class="absolute inset-x-0 top-[96px] small:top-10">
        <img
          :src="picture1"
          alt="picture1"
          class="picture1-small absolute -left-2 -top-1 w-[220px] small:w-[180px] small:top-3 extraSmall:w-36"
        />
        <img
          :src="picture2"
          alt="picture2"
          class="picture2-small absolute -right-[6rem] top-7 w-[480px] small:w-auto extraSmall:w-60 extraSmall:-right-[3rem]"
        />

        <img
          :src="get"
          alt="get"
          class="get-small absolute top-14 small:top-2 w-[65%] small:w-auto left-1/3 z-20"
        />

        <img
          :src="gacha"
          alt="gacha"
          preload
          class="gacha-small absolute left-5 extraSmall:left-2 top-40 small:top-36 extraSmall:top-[108px] w-[200px] extraSmall:w-32"
        />
      </div>
      <div
        class="absolute bottom-[10%] small:pb-4 justify-center items-center w-full flex flex-col z-10"
      >
        <img
          :src="tapScreen"
          alt="intl"
          class="tap-small h-auto small:w-36 extraSmall:w-32 small:absolute small:top-[calc(52%-1.7rem)] extraSmall:top-[calc(95%-1.7rem)]"
          preload
        />
        <p
          class="text-exd-1218 small:text-exd-1020 small:absolute small:bottom-[calc(80%-1.7rem)] extraSmall:bottom-[calc(90%-1.7rem)] text-white"
        >
          {{ $t('loginOrRegisterTop') }}
        </p>
      </div>

      <img
        :src="character"
        alt="character"
        class="character-small absolute right-28 small:right-[98px] extraSmall:right-[68px] top-[calc(50%-3rem)] small:top-[calc(56.2%-3.5rem)] extraSmall:top-[calc(60%-3.5rem)] small:w-[100px] extraSmall:w-[70px]"
      />
      <img
        :src="intl"
        alt="intl"
        class="intl-small absolute right-6 small:right-4 extraSmall:right-3 top-[calc(50%-1.2rem)] small:top-[calc(55.5%-1.7rem)] extraSmall:top-[calc(57.5%-1.7rem)] small:w-[75px] extraSmall:w-[55px]"
      />

      <img
        :src="talk"
        alt="talk"
        class="talk-small absolute left-14 transform -translate-x-1/2 z-10 top-[52%] small:top-[calc(55%)] small:!h-auto w-[6.5rem] small:w-[5.5rem]"
      />

      <img
        :src="logo"
        alt="logo"
        preload
        height="135"
        width="363"
        class="logo-small absolute left-1/2 transform -translate-x-1/2 right-0 z-10 top-[58%] small:top-[calc(61%)] small:!h-auto small:!w-[20rem] extraSmall:!w-[15rem]"
      />
      <!-- <img
        :src="digitalTourist"
        alt="digital-tourist"
        preload
        height="135"
        width="363"
        class="absolute left-1/2 transform -translate-x-1/2 right-0 z-10 top-[calc(55%+140px)] small:top-[calc(62%+120px)] extraSmall:top-[calc(57.5%+120px)] w-[363px] small:w-[20rem] extraSmall:w-[14rem]"
      /> -->
    </div>
    <div
      class="absolute bottom-[30px] small:bottom-[20px] left-[0px] right-[0px]"
    >
      <p
        class="text-white text-center text-exd-1218 font-semibold text-underline cursor-pointer"
      >
        <a href="https://www.google.com" target="_blank">
          {{ $t('addToHomeScreen') }}
        </a>
      </p>
    </div>
  </div>

  <ModalLogin v-model="hasModal" />

  <WarningPopUp
    :is-open="isComplete"
    :on-close="handleClose"
    :has-button="true"
    :on-click-button="handleDialog"
    label-button="GO!"
    :modal-title="$t('verificationCompleted')"
  />

  <WarningPopUp
    :is-open="isFailed"
    :on-close="handleClose"
    :has-button="true"
    :on-click-button="handleDialog"
    label-button="GO!"
    :modal-title="$t('verificationFailed')"
  />
</template>

<script setup>
import intlRounded from '~/assets/images/intl-rounded.svg'
import logoIcon from '~/assets/images/logo-icon.png'
import tapScreen from '~/assets/images/tap-screen.png'
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
import talk from '~/assets/images/talk.png'

const router = useRouter()
const { setSourceFrom } = useRegister()
const hasModal = ref(false)
const isComplete = ref(false)
const isFailed = ref(false)

const TOKEN = useCookie('TOKEN')
const USER = useCookie('USER')
const VALID_PASSWORD = useCookie('VALID_PASSWORD')
const langPanel = ref(false)

const handleShowModal = () => {
  hasModal.value = true
  setSourceFrom('top')
}
const handleDialog = async () => {
  isComplete.value = false
  isFailed.value = false
  router.push('/')
  await nextTick()
  handleShowModal()
}

const handleClose = () => {
  isComplete.value = false
  isFailed.value = false
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

const langPanelToggle = (event) => {
  langPanel.value = !langPanel.value
}

onMounted(() => {
  const hash = window.location.hash
  const clearSession = () => {
    localStorage.clear()
    sessionStorage.clear()
    TOKEN.value = null
    USER.value = null
    VALID_PASSWORD.value = null
  }

  if (hash === '#verification-completed') {
    isComplete.value = true
    clearSession()
  } else if (hash === '#verification-failed') {
    isFailed.value = true
    clearSession()
  } else if (TOKEN.value) {
    navigateTo('/dashboard')
  }
})
</script>

<style scoped>
@media screen and (max-width: 380px) and (max-height: 570px) {
  .picture1-small {
    width: 40%;
    left: 1%;
  }

  .picture2-small {
    width: 80%;
    left: 35%;
  }

  .get-small {
    width: 65%;
    top: 45px;
  }
  .gacha-small {
    width: 40%;
    top: 120px;
  }

  .tap-small {
    width: 35%;
  }

  .talk-small {
    top: 52%;
    width: 20%;
  }

  .logo-small {
    top: 59%;
    width: 75% !important;
  }

  .character-small {
    width: 25%;
  }

  .intl-small {
    width: 18%;
  }
}
</style>
