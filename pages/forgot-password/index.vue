<template>
  <div class="grow flex flex-col">
    <Header hasBack>
      <p
        style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
        class="text-exd-gray-scorpion font-bold text-exd-1824.52"
      >
        パスワード再設定
      </p>
    </Header>

    <div
      class="flex flex-col grow px-8 mt-12 pb-3 justify-between gap-6 w-full"
    >
      <div class="flex flex-col grow gap-6">
        <p class="text-exd-1424 text-exd-gray-scorpion">
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
      </div>
      <Button
        class="!bg-exd-gold !py-4 !w-full !uppercase !font-bold !text-exd-1424 !rounded-full !text-white !flex !flex-row !justify-between !px-5 mx-auto"
        raised
      >
        <span class="grow text-center">登録する</span>
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

// tobe used composable
const form = ref({
  email: '',
})
const updateModel = (field, value) => {
  form.value[field] = value
}

const validateInput = (field, value) => {
  console.log(`Validated ${field}:`, value)
}
</script>
