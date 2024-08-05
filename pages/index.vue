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
        class="w-full flex flex-col justify-center items-center gap-4 py-6 relative px-4"
      >
        <div class="font-bold text-exd-1424 text-center text-exd-gray-scorpion">
          <p style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)">
            ログイン／新規会員登録
          </p>
        </div>

        <InputText
          :model="form.emailAddress"
          placeholder="ログインID（メールアドレス）"
          @update:model="updateModel('emailAddress', $event)"
          @validate="validateInput('emailAddress', $event)"
        />
        <InputText
          :model="form.password"
          placeholder="パスワード"
          @update:model="updateModel('password', $event)"
          @validate="validateInput('password', $event)"
        />

        <p
          class="underline text-exd-1220 font-medium text-exd-gray-scorpion"
          style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
        >
          パスワードを忘れた方
        </p>
        <Button
          class="!bg-exd-gold !py-4 !w-exd-312 !uppercase !font-bold !text-exd-1424 !rounded-full !text-white !flex !flex-row !justify-between !px-5 h-exd-50"
          raised
        >
          <span class="grow text-center">新規会員登録</span>
          <img
            :src="arrow"
            alt="arrow"
            width="10"
            height="10"
            preload
            class="shrink-0"
          />
        </Button>
        <Button
          class="!bg-exd-red-vermilion !py-4 !w-exd-312 !uppercase !font-bold !text-exd-1424 !rounded-full !text-white !flex !flex-row !justify-between !px-5 h-exd-50"
          raised
        >
          <span class="grow text-center">ログイン</span>
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
    </template>
  </Dialog>
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

const hasModal = ref(false)

const handleShowModal = () => (hasModal.value = true)
const handleCloseDialog = () => (hasModal.value = false)

import InputText from '~/components/InputText.vue'
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
