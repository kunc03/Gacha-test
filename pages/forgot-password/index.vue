<template>
  <div class="grow flex flex-col">
    <Header :hasBack="!isSuccessSendLinkResetPassword">
      <p
        style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
        class="text-exd-gray-scorpion font-bold text-exd-1824.52"
      >
        パスワード再設定
      </p>
    </Header>

    <div
      class="flex flex-col grow px-8 mt-32 pb-3 justify-between gap-6 w-full"
    >
      <template v-if="isSuccessSendLinkResetPassword">
        <div class="flex flex-col grow gap-6 items-center">
          <h1 class="font-bold text-exd-1424 text-exd-gray-scorpion">
            メール送信完了
          </h1>
          <p class="text-exd-1424 text-exd-gray-scorpion font-medium">
            入力いただいたメールアドレスにパスワード再設定メールを送信しました。
            メールをご確認の上、パスワードの再設定を行なってください。
          </p>
        </div>
      </template>
      <template v-else>
        <div class="flex flex-col grow gap-6">
          <p class="text-exd-1424 text-exd-gray-scorpion font-medium">
            パスワードの再設定手続きを行います。登録されたログインID（メールアドレス）をご入力の上「送信」ボタンをタップしてください。
          </p>
          <InputText
            :model="form.email"
            label="ログインID（メールアドレス）"
            @update:model="updateModel('email', $event)"
            @validate="validateInput('email', $event)"
          />
          <ul>
            <li class="font-medium text-exd-1220 text-exd-gray-scorpion">
              ※ご登録メールアドレスにパスワード再設定受付メールを送信しますので、ご確認ください。
            </li>
            <li class="font-medium text-exd-1220 text-exd-gray-scorpion">
              ※迷惑メール防止設定をされている場合は「00000000@000.com」または、ドメイン「@000.com」からの受信を許可してください。
            </li>
            <li class="font-medium text-exd-1220 text-exd-gray-scorpion">
              ※お使いのメール及びメールソフトにより、自動的に迷惑メールフォルダに振り分けられる場合があります。
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
          !isSuccessSendLinkResetPassword ? '登録する' : 'TOP'
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
import { useRouter } from 'vue-router'

const router = useRouter()
// tobe used composable
const form = ref({
  email: '',
})

const message = ref(null);

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
      email: form.value.email
    }
    
    try {
      const { status, message } = await useFetchApi('POST', 'email/forgot', { body: payload});

      if (status) {
        isSuccessSendLinkResetPassword.value = true
      }

      // console.log(response)
    } catch (error) {
      console.log(error);
    }
  }
}

useHead({
  title: 'Reset Password',
})
</script>
