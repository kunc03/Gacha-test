<template>
  <Dialog
    :visible="modelValue"
    @update:visible="$emit('update:modelValue', $event)"
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
        @click="$emit('update:modelValue', false)"
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
          type="email"
          :model="form.email"
          placeholder="ログインID（メールアドレス）"
          @update:model="updateModel('email', $event)"
          @validate="validateInput('email', $event)"
        />
        <InputText
          type="password"
          :model="form.password"
          placeholder="パスワード"
          @update:model="updateModel('password', $event)"
          @validate="validateInput('password', $event)"
        />

        <a
          class="underline text-exd-1220 font-medium text-exd-gray-scorpion cursor-pointer"
          style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
          @click="navigateTo('/forgot-password')"
        >
          パスワードを忘れた方
        </a>
        <Button
          class="!bg-exd-gold !py-4 !w-exd-312 !uppercase !font-bold !text-exd-1424 !rounded-full !text-white !flex !flex-row !justify-between !px-5 h-exd-50"
          raised
          @click="handleToRegister"
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
          :disabled="!isValidInput || isLoading"
          :loading="isLoading"
          @click="handleSubmit"
        >
          <span class="grow text-center">ログイン</span>
          <LoadingIcon v-if="isLoading" />
          <img
            v-else
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
        @click="isErrorMessage = false"
      />
      <div class="w-full flex flex-col justify-center items-center gap-4 py-6">
        <img :src="warning" alt="warning" width="40" height="40" preload />
        <div class="text-center w-10/12">
          <p
            v-for="(item, index) in errorMessages"
            class="font-bold text-exd-1424 text-exd-gray-scorpion"
            :key="index"
          >
            {{ item }}
          </p>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import close from '~/assets/images/close.svg'
import arrow from '~/assets/images/arrow.svg'
import warning from '~/assets/images/warning.svg'
import InputText from '~/components/InputText.vue'
import useRegister from '~/composables/useRegister'

const register = useRegister()
const { isSpin } = storeToRefs(register)
const { setSourceFrom } = register

const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue', 'callback'])

const isLoading = ref(false)
const form = ref({
  email: '',
  password: '',
})

const isErrorMessage = ref(false)
const errorMessages = ref([])

const isValidInput = computed(
  () => form.value.email !== '' && form.value.password !== ''
)

const updateModel = (field, value) => {
  form.value[field] = value
}

const validateInput = (field, value) => {
  // console.log(`Validated ${field}:`, value)
}

const handleToRegister = () => {
  setSourceFrom('top')
  navigateTo('/register')
}
const handleSubmit = async () => {
  if (isLoading.value) return
  isLoading.value = true

  try {
    const response = await useFetchApi('POST', 'login', {
      body: { ...form.value },
    })

    localStorage.setItem('TOKEN', response.data.token)
    localStorage.setItem('USER', JSON.stringify(response.data.user))

    await saveSpin()
    navigateTo('/dashboard')
    isLoading.value = false
  } catch (error) {
    console.log("Error: Can't login", error)

    const { errors, message } = error._data

    if (errors) {
      const message = Object.keys(errors).map((item) => errors[item][0])
      errorMessages.value = message
      isErrorMessage.value = true
    }

    if (message && !errors) {
      errorMessages.value = [message]
      isErrorMessage.value = true
    }
    isLoading.value = false
  }
}

const saveSpin = async () => {
  if (!isSpin.value) return
  try {
    const response = await useFetchApi('POST', 'gacha/save', {
      body: {
        point_id: localStorage.getItem('POINT_ID'),
        location_id: localStorage.getItem('LOCATION_ID'),
      },
    })

    console.log(response)
  } catch (error) {
    console.log("Error: Can't save spin result")
  }
}
</script>
