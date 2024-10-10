<template>
  <div class="grow flex flex-col h-full overflow-hidden">
    <HeaderBar :hasBack="!isSuccessSendLinkResetPassword">
      <p
        style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
        class="text-exd-gray-scorpion font-bold text-exd-1824.52"
      >
        {{ $t('resetPassword') }}
      </p>
    </HeaderBar>

    <div
      class="flex flex-col grow px-8 pt-32 pb-20 justify-between gap-6 w-full overflow-auto"
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
    </div>
    <div class="fixed bottom-0 w-full max-w-md mx-auto px-8 mb-3">
      <SolidButton
        :label="!isSuccessSendLinkResetPassword ? $t('send') : 'TOP'"
        :has-loading="isLoading"
        :on-click="handleSubmit"
        has-bottom
      />
    </div>
  </div>
</template>

<script setup>
import InputText from '~/components/InputText.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// tobe used composable
const form = ref({
  email: '',
})

const message = ref(null)
const isLoading = ref(false)

const isSuccessSendLinkResetPassword = ref(false)
const updateModel = (field, value) => {
  form.value[field] = value
}

const validateInput = (field, value) => {
  // console.log(`Validated ${field}:`, value)
}

const handleSubmit = async () => {
  if (isSuccessSendLinkResetPassword.value) {
    navigateTo('/')
  } else {
    let payload = {
      email: form.value.email,
    }

    try {
      isLoading.value = true
      const { status, message } = await useFetchApi('POST', 'email/forgot', {
        body: payload,
      })

      if (status) {
        isSuccessSendLinkResetPassword.value = true
      }

      // console.log(response)
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }
}

useHead({
  title: '名古屋ぐるっとツアー マイページ',
})
</script>
