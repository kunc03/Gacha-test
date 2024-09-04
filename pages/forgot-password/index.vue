<template>
  <div class="grow flex flex-col">
    <HeaderBar :hasBack="!isSuccessSendLinkResetPassword">
      <p
        style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
        class="text-exd-gray-scorpion font-bold text-exd-1824.52"
      >
        {{ $t('resetPassword') }}
      </p>
    </HeaderBar>

    <div
      class="flex flex-col grow px-8 mt-32 pb-3 justify-between gap-6 w-full"
    >
      <template v-if="isSuccessSendLinkResetPassword">
        <div class="flex flex-col grow gap-6 items-center">
          <h1 class="font-bold text-exd-1424 text-exd-gray-scorpion">
            {{ $t('emailSentCompleted') }}
          </h1>
          <p class="text-exd-1424 text-exd-gray-scorpion font-medium">
            {{ $t('emailSentCompletedMessage') }}
          </p>
        </div>
      </template>
      <template v-else>
        <div class="flex flex-col grow gap-6">
          <p class="text-exd-1424 text-exd-gray-scorpion font-medium">
            {{ $t('resetPasswordDescription') }}
          </p>
          <InputText
            :model="form.email"
            :label="$t('loginID')"
            @update:model="updateModel('email', $event)"
            @validate="validateInput('email', $event)"
          />
          <ul>
            <li class="font-medium text-exd-1220 text-exd-gray-scorpion">
              {{ $t('resetPasswordRequirement1') }}
            </li>
            <li class="font-medium text-exd-1220 text-exd-gray-scorpion">
              {{ $t('resetPasswordRequirement2') }}
            </li>
            <li class="font-medium text-exd-1220 text-exd-gray-scorpion">
              {{ $t('resetPasswordRequirement3') }}
            </li>
          </ul>
          <div>
            <p>{{ message }}</p>
          </div>
        </div>
      </template>

      <Button
        class="!bg-exd-gold !py-4 !w-full !uppercase !font-bold !text-exd-1424 !rounded-full !text-white !flex !flex-row !justify-between !px-5 mx-auto"
        raised
        @click="handleSubmit"
      >
        <span class="grow text-center">{{
          !isSuccessSendLinkResetPassword ? $t('send') : 'TOP'
        }}</span>
        <img :src="arrow" alt="warning" width="10" height="10" preload />
      </Button>
    </div>
  </div>
</template>

<script setup>
import InputText from '~/components/InputText.vue'
import arrow from '~/assets/images/arrow.svg'
import { useRouter } from 'vue-router'

const router = useRouter()
// tobe used composable
const form = ref({
  email: '',
})

const message = ref(null)

const isSuccessSendLinkResetPassword = ref(false)
const updateModel = (field, value) => {
  form.value[field] = value
}

const validateInput = (field, value) => {
  console.log(`Validated ${field}:`, value)
}

const handleSubmit = async () => {
  if (isSuccessSendLinkResetPassword.value) {
    navigateTo('/')
  } else {
    let payload = {
      email: form.value.email,
    }

    try {
      const { status, message } = await useFetchApi('POST', 'email/forgot', {
        body: payload,
      })

      if (status) {
        isSuccessSendLinkResetPassword.value = true
      }

      // console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
}

useHead({
  title: 'Reset Password',
})
</script>
