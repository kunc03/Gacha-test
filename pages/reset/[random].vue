<template>
  <div class="grow flex flex-col">
    <HeaderBar>
      <p
        style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
        class="text-black font-bold text-exd-1824.52"
      >
        {{ $t('resetPassword') }}
      </p>
    </HeaderBar>

    <div class="flex flex-col grow mt-32 justify-between px-8 pb-3">
      <template v-if="!isSuccessSendResetPassword">
        <div>
          <h1
            class="text-exd-gray-scorpion font-bold text-exd-1424 text-center"
          >
            {{ $t('enterYourNewPassword') }}
          </h1>
          <div class="flex flex-col gap-7 mt-14">
            <InputText
              :model="form.email"
              :label="$t('loginID')"
              @validate="validateInput('email', $event)"
              disabled
            />
            <InputText
              type="password"
              :model="form.password"
              :label="$t('loginPassword')"
              @validate="validateInput('password', $event)"
              @update:model="updateModel('password', $event)"
            />
            <InputText
              type="password"
              :model="form.confirmPassword"
              :label="$t('reenterPassword')"
              @validate="validateInput('confPassword', $event)"
              @update:model="updateModel('confirmPassword', $event)"
            />
          </div>
        </div>
      </template>
      <template v-else>
        <h1 class="text-exd-gray-scorpion font-bold text-exd-1424 text-center">
          {{ $t('passwordResetCompleted') }}
        </h1>
      </template>
      <Button
        class="!bg-exd-gold !py-4 !w-full !uppercase !font-bold !text-exd-1424 !rounded-full !text-white !flex !flex-row !justify-between !px-5 mx-auto"
        raised
        @click="handleSubmit"
      >
        <span class="grow text-center">{{
          !isSuccessSendResetPassword ? $t('send') : $t('myPage')
        }}</span>
        <img :src="arrow" alt="warning" width="10" height="10" preload />
      </Button>
    </div>
  </div>
  <Dialog
    v-model:visible="isErrorMessage"
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
        <div class="text-center w-10/12 text-exd-gray-scorpion">
          <p>
            {{ errorMessage }}
          </p>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import InputText from '~/components/InputText.vue'
import HeaderBar from '~/components/HeaderBar.vue'
import { useRouter } from 'vue-router'
import warning from '~/assets/images/warning.svg'
import close from '~/assets/images/close.svg'
import arrow from '~/assets/images/arrow.svg'

const route = useRoute()
const router = useRouter()
const isLoading = ref(false)
const token = route.params.random
const isErrorMessage = ref(false)
const errorMessage = ref(null)

const isSuccessSendResetPassword = ref(false)
const handleCloseDialog = () => (isErrorMessage.value = false)

const form = ref({
  email: null,
  password: null,
  confirmPassword: null,
})

const updateModel = (field, value) => {
  form.value[field] = value
}

const handleSubmit = async () => {
  if (isSuccessSendResetPassword.value) {
    navigateTo('/')
  } else {
    let payload = {
      token: token,
      email: form.value.email,
      password: form.value.password,
      password_confirmation: form.value.confirmPassword,
    }

    try {
      const { status, message } = await useFetchApi('POST', 'email/reset', {
        body: payload,
      })

      if (status) {
        isSuccessSendResetPassword.value = true
      }

      // console.log(response)
    } catch (error) {
      const message = error._data.message
      console.log(errorMessage.value)

      if (error) {
        errorMessage.value = message
        isErrorMessage.value = true
      }
    }
  }
}

useHead({
  title: 'Reset Password',
})

const fetchingEmailData = async () => {
  try {
    const { data } = await useFetchApi('GET', 'email/decrypt?token=' + token)
    form.value.email = data.email
  } catch (error) {
    console.log("Error: Can't save spin result")
  }
}

const validateInput = (field, value) => {
  // console.log(`Validated ${field}:`, value)
}

onMounted(() => {
  fetchingEmailData()
})
</script>
