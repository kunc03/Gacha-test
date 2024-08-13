<template>
  <div
    class="flex flex-col grow bg-[url('assets/images/bg-red2.svg')] bg-cover bg-center justify-between relative"
  >
    <div class="relative grow">
      <img
        :src="bgHeader"
        alt="bg-header"
        preload
        class="absolute top-0 left-0 right-0 w-full"
      />
      <img
        :src="intlRounded"
        alt="intl"
        preload
        height="40"
        width="40"
        class="absolute top-14 right-10"
      />
      <img
        :src="logoIcon"
        alt="logo-icon"
        preload
        height="129"
        width="226"
        class="absolute md:top-20 top-16 left-0 z-20"
      />
    </div>
    <img
      :src="gacha2"
      alt="gacha"
      preload
      width="300"
      class="absolute left-1/2 transform -translate-x-1/2 right-0 z-10 top-32"
    />
    <img
      :src="gachaEgg"
      alt="gacha-egg"
      preload
      class="absolute left-1/2 transform -translate-x-1/2 right-0 top-1/4 w-full"
    />
    <img
      :src="gachaInfo"
      alt="gacha-info"
      preload
      width="380"
      class="absolute left-1/2 transform -translate-x-1/2 right-0 z-10 top-40"
    />
    <div
      class="relative pb-7 gap-10 justify-center items-center w-full flex flex-col z-10"
    >
      <img
        :src="tapScreen"
        alt="intl"
        preload
        class="cursor-pointer"
        @click="handleShowModal"
      />
      <p class="text-white text-exd-1218 font-semibold">ホーム画面に追加</p>
    </div>
    <img
      :src="logo"
      alt="logo"
      preload
      height="135"
      width="363"
      class="absolute left-1/2 transform -translate-x-1/2 right-0 z-10 bottom-1/4"
    />
    <img
      :src="digitalTourist"
      alt="digital-tourist"
      preload
      height="135"
      width="363"
      class="absolute left-1/2 transform -translate-x-1/2 right-0 z-10 bottom-[22%]"
    />
    <img
      :src="bgLoginBottom"
      alt="bg-bottom"
      preload
      width="450"
      class="absolute bottom-0 left-0 right-0"
    />
  </div>

  <ModalLogin v-model="hasModal" />
</template>

<script setup>
import close from '~/assets/images/close.svg'
import bgHeader from '~/assets/images/login-header.png'
import intlRounded from '~/assets/images/intl-rounded.svg'
import logoIcon from '~/assets/images/logo-icon.svg'
import tapScreen from '~/assets/images/tap-screen.svg'
import bgLoginBottom from '~/assets/images/bg-login-bottom.png'
import logo from '~/assets/images/logo.png'
import digitalTourist from '~/assets/images/digital-tourist.png'
import gachaEgg from '~/assets/images/gacha-egg.png'
import gachaInfo from '~/assets/images/gacha-info.png'
import gacha2 from '~/assets/images/gacha2.png'
import arrow from '~/assets/images/arrow.svg'
import InputText from '~/components/InputText.vue'

const { setSourceFrom } = useRegister()
const hasModal = ref(false)

const handleShowModal = () => {
  hasModal.value = true
  setSourceFrom('top')
}
const handleCloseDialog = () => (hasModal.value = false)

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
</script>
