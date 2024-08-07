<template>
  <div class="grow flex flex-col">
    <Header hasBack>
      <p
        style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
        class="text-exd-gray-scorpion font-bold text-exd-1824.52"
      >
        新規会員登録
      </p>
    </Header>

    <div
      class="flex flex-col grow px-3 mt-32 pb-3 justify-between gap-6 w-full"
    >
      <div class="flex flex-col grow">
        <div
          class="inline-flex gap-4 border-b border-b-exd-light-grey pb-5 px-4"
        >
          <InputText
            :model="form.surname"
            label="姓"
            @update:model="updateModel('surname', $event)"
            @validate="validateInput('surname', $event)"
          />
          <InputText
            :model="form.givenName"
            label="名"
            @update:model="updateModel('givenName', $event)"
            @validate="validateInput('givenName', $event)"
          />
        </div>
        <div
          class="inline-flex flex-col border-b border-b-exd-light-grey py-5 px-4"
        >
          <label
            for="生年月日"
            class="text-exd-gray-scorpion font-bold text-exd-1424"
            >生年月日</label
          >
          <div class="inline-flex gap-4">
            <Dropdown
              :model="form.yearOfBirth"
              @update:model="updateModel('yearOfBirth', $event)"
              @validate="validateInput('yearOfBirth', $event)"
              :options="yearOptions"
              suffix="年"
            />
            <Dropdown
              :model="form.monthOfBirth"
              @update:model="updateModel('monthOfBirth', $event)"
              @validate="validateInput('monthOfBirth', $event)"
              :options="monthOptions"
              suffix="月"
            />
            <Dropdown
              :model="form.dateOfBirth"
              @update:model="updateModel('dateOfBirth', $event)"
              @validate="validateInput('dateOfBirth', $event)"
              :options="dayOptions"
              suffix="日"
            />
          </div>
        </div>
        <div
          class="inline-flex flex-col border-b border-b-exd-light-grey py-5 px-4"
        >
          <label
            for="性別"
            class="text-exd-gray-scorpion font-bold text-exd-1424"
            >性別</label
          >
          <ButtonGroup
            class="text-exd-gray-scorpion w-full h-10 rounded-none"
            style="box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1608)"
          >
            <Button
              @click="updateModel('gender', 'Male')"
              label="男性"
              :class="[
                'bg-exd-zinc-100 w-4/12 h-full border border-exd-stone-300 rounded-none !text-exd-gray-scorpion',
                form.gender === 'Male' && '!bg-exd-banana',
              ]"
            />
            <Button
              @click="updateModel('gender', 'Female')"
              label="女性"
              :class="[
                'bg-white w-4/12 h-full border-t border-b border-t-exd-stone-300 border-b-exd-stone-300 rounded-none !text-exd-gray-scorpion',
                form.gender === 'Female' && '!bg-exd-banana',
              ]"
            />
            <Button
              @click="updateModel('gender', '')"
              label="無回答"
              :class="[
                'bg-exd-zinc-100 w-4/12 h-full border border-exd-stone-300 rounded-none !text-exd-gray-scorpion',
                form.gender === '' && '!bg-exd-banana',
              ]"
            />
          </ButtonGroup>
        </div>
        <div
          class="inline-flex flex-col border-b border-b-exd-light-grey py-5 px-4"
        >
          <label
            for="性別"
            class="text-exd-gray-scorpion font-bold text-exd-1424"
            >居住地</label
          >
          <ButtonGroup
            class="w-full h-10 rounded-none"
            style="box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1608)"
          >
            <Button
              @click="updateModel('residenceType', '')"
              label="無回答"
              :class="[
                'bg-white w-1/2 h-full border border-exd-stone-300 rounded-none !text-exd-gray-scorpion',
                form.residenceType === '' && '!bg-exd-banana',
              ]"
            />
            <Button
              @click="updateModel('residenceType', 'oversease')"
              label="海外"
              :class="[
                'bg-white w-1/2 h-full border-t border-b border-r border-t-exd-stone-300 border-b-exd-stone-300 border-r-exd-stone-300 rounded-none !text-exd-gray-scorpion',
                form.residenceType === 'oversease' && '!bg-exd-banana',
              ]"
            />
          </ButtonGroup>
        </div>
        <div
          class="inline-flex gap-4 border-b border-b-exd-light-grey py-5 px-4"
        >
          <InputText
            :model="form.postCode"
            label="郵便番号（ハイフンなし)"
            @update:model="
              ($event) => {
                updateModel('postCode', $event)
                checkPostalCode($event)
              }
            "
            @validate="validateInput('postCode', $event)"
          />
        </div>
        <div
          class="flex flex-col gap-4 border-b border-b-exd-light-grey py-5 px-4"
        >
          <InputText
            :model="form.address1"
            label="住所1"
            disabled
            @update:model="updateModel('address1', $event)"
            @validate="validateInput('address1', $event)"
          />
          <InputText
            :model="form.address2"
            label="住所２"
            @update:model="updateModel('address2', $event)"
            @validate="validateInput('address2', $event)"
          />
          <p class="text-exd-gray-scorpion font-medium text-exd-1220">
            景品送付に使用する場合があるため正しく入力してください
          </p>
        </div>
        <div
          class="inline-flex gap-4 border-b border-b-exd-light-grey py-5 px-4"
        >
          <InputText
            :model="form.phoneNumber"
            :onlyNumeric="true"
            label="電話番号（ハイフンなし)"
            @update:model="updateModel('phoneNumber', $event)"
            @validate="validateInput('phoneNumber', $event)"
          />
        </div>
        <div
          class="inline-flex gap-4 border-b border-b-exd-light-grey py-5 px-4"
        >
          <InputText
            type="email"
            :model="form.email"
            label="メールアドレス"
            @update:model="updateModel('email', $event)"
            @validate="validateInput('email', $event)"
          />
        </div>
        <div
          class="flex flex-col gap-4 border-b border-b-exd-light-grey py-5 px-4"
        >
          <InputText
            type="password"
            :model="form.password"
            label="パスワード"
            @update:model="updateModel('password', $event)"
            @validate="validateInput('password', $event)"
          />
          <InputText
            type="password"
            :model="form.confPassword"
            label="パスワード（再入力）"
            @update:model="updateModel('confPassword', $event)"
            @validate="validateInput('confPassword', $event)"
          />
        </div>
        <div
          class="flex flex-col gap-4 border-b border-b-exd-light-grey py-5 px-4"
        >
          <InputTextArea
            :model="form.questionnaire1"
            label="アンケート"
            @update:model="updateModel('questionnaire1', $event)"
            @validate="validateInput('questionnaire1', $event)"
          />
          <InputTextArea
            :model="form.questionnaire2"
            label="アンケート"
            @update:model="updateModel('questionnaire2', $event)"
            @validate="validateInput('questionnaire2', $event)"
          />
          <InputTextArea
            :model="form.questionnaire3"
            label="アンケート"
            @update:model="updateModel('questionnaire3', $event)"
            @validate="validateInput('questionnaire3', $event)"
          />
        </div>

        <div class="w-full inline-flex gap-2 items-center justify-center mt-7">
          <Checkbox v-model="form.checked" :binary="true" />
          <p class="text-exd-gray-scorpion font-bold text-exd-1424">
            利用規約に同意する
          </p>
        </div>
        <div
          class="w-full mt-5 border border-exd-gray-44 rounded-xl bg-white h-28 max-w-xs mx-auto text-exd-gray-scorpion pr-2"
          style="box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1608)"
        >
          <div class="max-h-28 scrollable-content overflow-y-auto px-4">
            <p class="text-exd-1424 font-bold text-center pt-2">利用規約</p>
            <p class="text-exd-1220 font-medium leading-relaxed">
              ダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミー
            </p>
          </div>
        </div>
      </div>
      <Button
        class="!bg-exd-gold !py-4 !w-exd-312 !uppercase !font-bold !text-exd-1424 !rounded-full !text-white !flex !flex-row !justify-between !px-5 mx-auto"
        raised
        :disabled="!form.checked"
        :loading="isLoading"
        @click="handleSubmit"
      >
        <span class="grow text-center">登録する</span>
        <LoadingIcon v-if="isLoading" />
        <NuxtImg
          v-else
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
        <div class="text-center w-10/12">
          <p
            v-for="item in errorMessages"
            class="font-bold text-exd-1424 text-exd-gray-scorpion"
          >
            {{ item }}
          </p>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import warning from '~/assets/images/warning.svg'
import close from '~/assets/images/close.svg'

import Dropdown from '~/components/Dropdown.vue'
import InputText from '~/components/InputText.vue'
import InputTextArea from '~/components/InputTextArea.vue'
import JapanPostalCode from 'japan-postal-code'

const isLoading = ref(false)
const isErrorMessage = ref(false)
const form = ref({
  surname: '',
  givenName: '',
  yearOfBirth: '',
  monthOfBirth: '',
  dateOfBirth: '',
  gender: '',
  residenceType: '',
  postCode: '',
  address1: '',
  address2: '',
  phoneNumber: '',
  email: '',
  password: '',
  confPassword: '',
  questionnaire1: '',
  questionnaire2: '',
  questionnaire3: '',
  checked: false,
})
const errorMessages = ref([])

const handleCloseDialog = () => (isErrorMessage.value = false)

const updateModel = (field, value) => {
  form.value[field] = value
}

const validateInput = (field, value) => {
  // console.log(`Validated ${field}:`, value)
}

const yearOptions = computed(() => {
  const currentYear = new Date().getFullYear()
  return [...new Array(100)].map((item, index) => currentYear - index)
})

const monthOptions = computed(() => {
  return [...new Array(12)].map((item, index) =>
    String(index + 1).padStart(2, '0')
  )
})

const dayOptions = computed(() => {
  return [...new Array(31)].map((item, index) =>
    String(index + 1).padStart(2, '0')
  )
})

const handleSubmit = async () => {
  if (isLoading.value) return
  isLoading.value = true

  let payload = {
    name: form.value.surname + ' ' + form.value.givenName,
    birthdate: `${form.value.yearOfBirth}-${form.value.monthOfBirth}-${form.value.dateOfBirth}`,
    gender: form.value.gender,
    postal_code: parseInt(form.value.postCode.replaceAll('-', '')),
    residence: form.value.address1,
    address: form.value.address2,
    phone_number: form.value.phoneNumber,
    email: form.value.email,
    password: form.value.password,
    password_confirmation: form.value.confPassword,
    questionnaire_1: form.value.questionnaire1,
    questionnaire_2: form.value.questionnaire2,
    questionnaire_3: form.value.questionnaire3,
  }

  try {
    const { data } = await useFetchApi('POST', 'register', { body: payload })

    sessionStorage.setItem('USER_ID', data.user.id)
    navigateTo('/register/complete')
  } catch (error) {
    console.log("Error: Can't register")
    const errors = error._data.errors

    if (errors) {
      const message = Object.keys(errors).map((item) => errors[item][0])
      errorMessages.value = message
      isErrorMessage.value = true
    }
  } finally {
    isLoading.value = false
  }
}

let postCodeBounds
const checkPostalCode = async (code) => {
  clearTimeout(postCodeBounds)
  try {
    const address = await new Promise((resolve, reject) => {
      JapanPostalCode.get(code, function (address) {
        return resolve(address)
      })

      postCodeBounds = setTimeout(() => {
        reject(new Error('Postal code not found'))
      }, 800)
    })

    form.value.address1 = `${address.prefecture}, ${address.city}`
  } catch (error) {
    console.log(error)
    form.value.address1 = ''
  }
}
</script>

<style scoped>
::v-deep(.p-checkbox-box) {
  @apply !bg-white !size-5 !border !border-exd-gray-44 !rounded-none;
}

.scrollable-content::-webkit-scrollbar {
  display: block !important;
  width: 7px !important; /* Lebar scrollbar */
}

.scrollable-content::-webkit-scrollbar-track {
  display: block !important;
  margin-block: 10px;
  background: #f1f1f1 !important; /* Warna background track */
  border-radius: 10px !important; /* Membuat track lebih membulat */
}

.scrollable-content::-webkit-scrollbar-thumb {
  display: block !important;
  height: 30px !important;
  background: #d7a237 !important; /* Warna scrollbar */
  border-radius: 10px !important; /* Membuat scrollbar lebih membulat */
}

.scrollable-content::-webkit-scrollbar-thumb:hover {
  display: block !important;
  background: #555 !important; /* Warna scrollbar saat hover */
}
</style>
