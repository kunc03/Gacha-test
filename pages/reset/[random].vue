<template>
  <div class="grow flex flex-col">
    <Header>
      <p
        style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
        class="text-black font-bold text-exd-1824.52"
      >
        パスワード再設定
      </p>
    </Header>

    <div class="flex flex-col grow mt-11 justify-between px-8 pb-3">
      <template v-if="!isSuccessSendResetPassword">
        <div>
          <h1
            class="text-exd-gray-scorpion font-bold text-exd-1424 text-center"
          >
            新しいパスワードを入力してください
          </h1>
          <div class="flex flex-col gap-7 mt-14">
            <InputText
              :model="form.email"
              label="ログインID（メールアドレス）"
              @update:model="updateModel('email', $event)"
              @validate="validateInput('email', $event)"
            />
            <InputText
              :model="form.password"
              label="パスワード"
              @update:model="updateModel('password', $event)"
              @validate="validateInput('password', $event)"
            />
            <InputText
              :model="form.confPassword"
              label="パスワード（再入力"
              @update:model="updateModel('confPassword', $event)"
              @validate="validateInput('confPassword', $event)"
            />
          </div>
        </div>
      </template>
      <template v-else>
        <h1 class="text-exd-gray-scorpion font-bold text-exd-1424 text-center">
          パスワードの再設定が完了しました
        </h1>
      </template>
      <Button
        class="!bg-exd-gold !py-4 !w-full !uppercase !font-bold !text-exd-1424 !rounded-full !text-white !flex !flex-row !justify-between !px-5 mx-auto"
        raised
        @click="handleSubmit"
      >
        <span class="grow text-center">{{
          !isSuccessSendResetPassword ? '送信' : 'マイページ'
        }}</span>
        <NuxtImg
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
</template>

<script setup>
import InputText from '~/components/InputText.vue'
import Header from '~/components/Header.vue'
import { useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isLoading = ref(false)

const isSuccessSendResetPassword = ref(false)

const form = ref({
  email: '',
  password: '',
  confPassword: '',
})

const handleSubmit = () => {
  const isSuccess = isSuccessSendResetPassword.value
  if (isSuccess) {
    router.push('/dashboard')
    isSuccessSendResetPassword.value = false
    return
  }
  isSuccessSendResetPassword.value = true
}
</script>
