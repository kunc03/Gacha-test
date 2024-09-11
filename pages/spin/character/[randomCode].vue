<template>
  <div
    class="grow bg-[url('assets/images/bg-green.webp')] bg-cover bg-center relative flex flex-col justify-center items-center"
  >
    <img
      :src="gacha2"
      alt="gacha2"
      class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
      preload
    />
    <img
      :src="sparkling"
      alt="sparkling"
      class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover z-10 animate-sparkling"
      preload
    />
    <div class="absolute inset-0 flex justify-center z-20">
      <CircleSpinCharacter
        class="relative top-1/2 -translate-y-[50%]"
        :imageSrc="characterImageUrl"
        width="100%"
        height="100%"
      />
    </div>
    <!-- <div
      class="left-1/2 top-[30%] transform -translate-x-1/2 -translate-y-1/2 z-20 absolute bg-[url('assets/images/circle-white.svg')] bg-contain bg-center w-full h-full bg-no-repeat"
    >
      <div class="relative h-full w-full">
        <img
          :src="characterImageUrl"
          alt="duck"
          class="absolute w-3/4 object-fill max-h-80 left-1/2 top-[45%] md:top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          preload
        />
        <img
          :src="jackpot"
          alt="jackpot"
          preload
          class="absolute -bottom-10 md:-bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1/4 object-scale-down small:h-3/4"
        />
      </div>
    </div> -->

    <div class="absolute bottom-0 w-full">
      <SolidButton label="次へ" :on-click="handleButton" has-bottom />
    </div>
  </div>

  <Dialog
    v-model:visible="hasModal"
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
      <div
        class="w-full flex flex-col justify-center items-center gap-4 py-6 relative"
      >
        <div class="font-bold text-exd-1424 text-center text-exd-gray-scorpion">
          <p style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)">景品獲得には</p>
          <p style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)">
            会員登録が必要です
          </p>
        </div>
        <SolidButton label="新規会員登録" :on-click="handleToRegister" />
        <SolidButton
          label="マイページから引き換え"
          :on-click="handleToLogin"
          variant="red"
        />

        <div
          class="font-medium text-exd-1218 text-center text-exd-gray-scorpion"
        >
          <p style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)">
            ポイントと景品の交換方法は
          </p>
          <p style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)">
            こちら
            <img
              :src="exportImg"
              alt="export"
              width="15"
              height="15"
              class="inline"
              preload
            />をご覧ください。
          </p>
        </div>
      </div>
    </template>
  </Dialog>

  <ModalLogin v-model="modalLogin" @check-spin="checkPoint" />

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
        @click="handleClose"
      />
      <div
        class="w-full flex flex-col justify-center items-center gap-4 py-6 px-6"
      >
        <img :src="warning" alt="warning" width="40" height="40" preload />
        <div class="text-center w-10/12">
          <p class="font-bold text-exd-1424 text-exd-gray-scorpion">
            {{ errorMessages }}
          </p>
        </div>
        <SolidButton label="ガチャTOP" :on-click="() => goTo('/dashboard')" />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import gacha2 from '~/assets/images/gacha2.png'
import sparkling from '~/assets/images/sparkling.svg'
import duck from '~/assets/images/duck.svg'
import jackpot from '~/assets/images/jackpot.svg'
import arrow from '~/assets/images/arrow.svg'
import close from '~/assets/images/close.svg'
import exportImg from '~/assets/images/export.svg'
import useRegister from '~/composables/useRegister'
import warning from '~/assets/images/warning.svg'
import SpinCharacter from '~/components/CircleSpinCharacter.vue'

const { setSourceFrom } = useRegister()

const router = useRouter()
const hasModal = ref(false)
const modalLogin = ref(false)
const isNotAllowed = ref(false)
const route = useRoute()
const isLoading = ref(false)
const errorMessages = ref('')

const characterImageUrl = ref(null)
const TOKEN = useCookie('TOKEN')
const USER = useCookie('USER')

const handleCloseDialog = () => (hasModal.value = false)
const handleShowDialog = () => (hasModal.value = true)
const handleClose = () => (isNotAllowed.value = false)
const handleOpenDialog = () => (isNotAllowed.value = true)
const isAlreadySpin = ref(null)

const handleButton = async () => {
  if (!TOKEN.value && !USER.value) {
    handleShowDialog()
  } else {
    checkPoint()
    // goToSpinPoint()
  }
}

const updateSpinStatus = (newStatus) => {
  return new Promise((resolve) => {
    const currentStatus = localStorage.getItem('IS_ALREADY_SPIN')
    if (currentStatus !== newStatus.toString()) {
      localStorage.setItem('IS_ALREADY_SPIN', newStatus.toString())
      isAlreadySpin.value = newStatus
    }
    setTimeout(() => {
      resolve()
    }, 0)
  })
}

const showErrorMessage = (
  message = '1日に2回以上ガチャがプレイされました。同じスポットでは1日に1回しかポイントが貯まりません。'
) => {
  errorMessages.value = message
  handleOpenDialog()
}

const checkPoint = async () => {
  const router = useRouter()

  try {
    const isAlreadySpin = localStorage.getItem('IS_ALREADY_SPIN')
    if (isAlreadySpin) {
      showErrorMessage()
    } else {
      router.push('/dashboard')
    }
  } catch (error) {
    console.error('Error checking point:', error)
    showErrorMessage('An unexpected error occurred. Please try again later.')
  }
}

const fetchImage = async () => {
  try {
    const storedData = localStorage.getItem('VALID_PASSWORD')

    if (!storedData) {
      console.error('No verified data found in localStorage')
      return
    }

    let parsedData
    try {
      parsedData = JSON.parse(storedData)
    } catch (e) {
      console.error('Error parsing stored data:', e)
      return
    }

    const imageUrl = localStorage.getItem('CHARACTER_IMAGE')
    characterImageUrl.value = imageUrl
  } catch (e) {
    console.error('Unexpected error:', e)
  }
}

const handleToRegister = () => {
  setSourceFrom('spin')
  navigateTo('/register')
}

const handleToLogin = () => {
  setSourceFrom('spin')
  hasModal.value = false
  modalLogin.value = true
}

const goTo = (url) => {
  navigateTo(url)
}

onMounted(() => {
  fetchImage()
})
</script>

<style scoped>
::v-deep(.p-dialog-header) {
  display: none;
}

@keyframes sparkle {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

.animate-sparkling {
  opacity: 0.4;
  transform-box: fill-box;
  transform-origin: center center;
  animation: sparkle 1s infinite cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
