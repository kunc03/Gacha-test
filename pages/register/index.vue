<template>
  <div class="grow flex flex-col">
    <Header hasBack>
      <p
        style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
        class="text-exd-gray-scorpion text-exd-1824.52"
      >
        会員情報
      </p>
    </Header>

    <div
      class="flex flex-col grow px-3 mt-32 pb-3 justify-between gap-6 w-full"
    >
      <h1
        class="text-center flex flex-col text-1416 text-exd-gray-scorpion pt-6 pb-10"
      >
        会員情報の変更は、内容を更新の上
        <span>「変更する」ボタンをタップしてください</span>
      </h1>
      <div
        class="inline-flex gap-4 border-b border-b-exd-light-grey pb-5 px-4 text-exd-gray-scorpion justify-between items-center text-1416"
      >
        <h1>会員<span class="font-bold">ID</span></h1>
        <p class="font-bold">00000000000</p>
      </div>
      <div class="flex flex-col grow">
        <div
          class="inline-flex gap-4 border-b border-b-exd-light-grey pb-5 px-4"
        >
          <InputText
            :model="form.surname"
            label="姓"
            required
            @update:model="updateModel('surname', $event)"
            @validate="validateInput('surname', $event)"
            :validate-on-submit="validateOnSubmit"
            error="この項目は必須です。"
            :class="{ 'input-error': !form.surname && validateOnSubmit }"
          />
          <InputText
            :model="form.givenName"
            label="名"
            required
            @update:model="updateModel('givenName', $event)"
            @validate="validateInput('givenName', $event)"
            :validate-on-submit="validateOnSubmit"
            error="この項目は必須です。"
            :class="{ 'input-error': !form.givenName && validateOnSubmit }"
          />
        </div>
        <div
          class="inline-flex flex-col border-b border-b-exd-light-grey py-5 px-4"
        >
          <label
            for="生年月日"
            class="text-exd-gray-scorpion text-exd-1424 flex items-center gap-2"
            :class="{
              'input-error':
                (!form.yearOfBirth && validateOnSubmit) ||
                (!form.monthOfBirth && validateOnSubmit) ||
                (!form.dateOfBirth && validateOnSubmit),
            }"
            >生年月日
            <span
              className="bg-exd-red-vermilion text-white text-exd-0910 px-1 py-[2px] rounded-sm"
              >必須</span
            ></label
          >
          <div class="inline-flex gap-4">
            <Dropdown
              :model="form.yearOfBirth"
              @update:model="updateModel('yearOfBirth', $event)"
              @validate="validateInput('yearOfBirth', $event)"
              :options="yearOptions"
              suffix="年"
              :validate-on-submit="validateOnSubmit"
              :class="{ 'input-error': !form.yearOfBirth && validateOnSubmit }"
            />
            <Dropdown
              :model="form.monthOfBirth"
              @update:model="updateModel('monthOfBirth', $event)"
              @validate="validateInput('monthOfBirth', $event)"
              :options="monthOptions"
              suffix="月"
              :validate-on-submit="validateOnSubmit"
              :class="{ 'input-error': !form.monthOfBirth && validateOnSubmit }"
            />
            <Dropdown
              :model="form.dateOfBirth"
              @update:model="updateModel('dateOfBirth', $event)"
              @validate="validateInput('dateOfBirth', $event)"
              :options="dayOptions"
              suffix="日"
              :validate-on-submit="validateOnSubmit"
              :class="{ 'input-error': !form.dateOfBirth && validateOnSubmit }"
            />
          </div>
          <small
            v-if="
              (!form.yearOfBirth && validateOnSubmit) ||
              (!form.monthOfBirth && validateOnSubmit) ||
              (!form.dateOfBirth && validateOnSubmit)
            "
            :class="['p-error']"
          >
            この項目は必須です。
          </small>
        </div>
        <div
          class="inline-flex flex-col border-b border-b-exd-light-grey py-5 px-4"
        >
          <label
            for="性別"
            class="text-exd-gray-scorpion text-exd-1424 flex items-center gap-2"
            >性別
            <span
              className="bg-exd-red-vermilion text-white text-exd-0910 px-1 py-[2px] rounded-sm"
              >必須</span
            ></label
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
              @click="updateModel('gender', 'Non-Binary')"
              label="無回答"
              :class="[
                'bg-exd-zinc-100 w-4/12 h-full border border-exd-stone-300 rounded-none !text-exd-gray-scorpion',
                form.gender === 'Non-Binary' && '!bg-exd-banana',
              ]"
            />
          </ButtonGroup>
        </div>
        <div
          class="inline-flex flex-col border-b border-b-exd-light-grey py-5 px-4"
        >
          <label
            for="性別"
            class="text-exd-gray-scorpion text-exd-1424 flex items-center gap-2"
            >居住地
            <span
              className="bg-exd-red-vermilion text-white text-exd-0910 px-1 py-[2px] rounded-sm"
              >必須</span
            ></label
          >
          <ButtonGroup
            class="w-full h-10 rounded-none"
            style="box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1608)"
          >
            <Button
              @click="updateModel('residenceType', '')"
              label="国内"
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
          class="inline-flex gap-4 border-b border-b-exd-light-grey py-5 px-4 flex-col"
        >
          <InputText
            :model="form.postCode"
            label="郵便番号（ハイフンなし)"
            required
            @update:model="
              ($event) => {
                updateModel('postCode', $event)
                checkPostalCode($event)
              }
            "
            @validate="validateInput('postCode', $event)"
            :validate-on-submit="validateOnSubmit"
            error="この項目は必須です。"
            :class="{ 'input-error': !form.postCode && validateOnSubmit }"
          />
          <p class="text-exd-gray-scorpion font-medium text-exd-1220">
            郵便番号を入力すると住所の一部が自動的に表示されます
          </p>
        </div>
        <div
          class="flex flex-col gap-4 border-b border-b-exd-light-grey py-5 px-4"
        >
          <InputText
            :model="form.prefecture"
            required
            label="都道府県"
            disabled
            @update:model="updateModel('prefecture', $event)"
            @validate="validateInput('prefecture', $event)"
            :validate-on-submit="validateOnSubmit"
            error="この項目は必須です。"
          />

          <InputText
            :model="form.cityArea"
            required
            label="市区町村"
            disabled
            @update:model="updateModel('cityArea', $event)"
            @validate="validateInput('cityArea', $event)"
            :validate-on-submit="validateOnSubmit"
            error="この項目は必須です。"
          />

          <InputText
            :model="form.address"
            required
            v-model="inputValue"
            label="番地・マンション名など"
            @update:model="updateModel('address', $event)"
            @validate="validateInput('address', $event)"
            :validate-on-submit="validateOnSubmit"
            error="この項目は必須です。"
            :class="{ 'input-error': !form.address && validateOnSubmit }"
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
            required
            :onlyNumeric="true"
            label="電話番号（ハイフンなし）"
            @update:model="updateModel('phoneNumber', $event)"
            @validate="validateInput('phoneNumber', $event)"
            :validate-on-submit="validateOnSubmit"
            error="この項目は必須です。"
            :class="{ 'input-error': !form.phoneNumber && validateOnSubmit }"
          />
        </div>
        <div
          class="inline-flex gap-4 border-b border-b-exd-light-grey py-5 px-4"
        >
          <InputText
            type="email"
            :model="form.email"
            required
            label="メールアドレス"
            @update:model="updateModel('email', $event)"
            @validate="validateInput('email', $event)"
            :validate-on-submit="validateOnSubmit"
            :is-email-error="true"
            :error="errorEmailMessage"
            :class="{
              'input-error': !form.email && validateOnSubmit,
              'input-error': errorEmailMessage !== '' && validateOnSubmit,
            }"
          />
        </div>
        <div
          class="flex flex-col gap-4 border-b border-b-exd-light-grey py-5 px-4"
        >
          <InputText
            type="password"
            :model="form.password"
            required
            :isPassword="true"
            :minLength="8"
            label="パスワード"
            @update:model="updateModel('password', $event)"
            @validate="validateInput('password', $event)"
            :validate-on-submit="validateOnSubmit"
            :class="{
              'input-error':
                (!form.password && validateOnSubmit) ||
                (form.password.length < 8 && validateOnSubmit) ||
                (!isAlphanumeric(form.password) && validateOnSubmit),
            }"
          />
          <InputText
            type="password"
            required
            :model="form.confPassword"
            :isPassword="true"
            :minLength="8"
            label="パスワード（再入力）"
            @update:model="updateModel('confPassword', $event)"
            @validate="validateInput('confPassword', $event)"
            :validate-on-submit="validateOnSubmit"
            :class="{
              'input-error':
                (!form.confPassword && validateOnSubmit) ||
                (form.confPassword.length < 8 && validateOnSubmit) ||
                (!isAlphanumeric(form.confPassword) && validateOnSubmit),
            }"
          />
        </div>

        <div
          class="flex flex-col gap-4 border-b border-b-exd-light-grey py-5 px-4"
        >
          <InputTextArea
            :model="form.questionnaire1"
            required
            label="アンケート"
            @update:model="updateModel('questionnaire1', $event)"
            @validate="validateInput('questionnaire1', $event)"
            error="この項目は必須です。"
            :validate-on-submit="validateOnSubmit"
            :class="{ 'input-error': !form.questionnaire1 && validateOnSubmit }"
          />
          <InputTextArea
            :model="form.questionnaire2"
            required
            label="アンケート"
            @update:model="updateModel('questionnaire2', $event)"
            @validate="validateInput('questionnaire2', $event)"
            error="この項目は必須です。"
            :validate-on-submit="validateOnSubmit"
            :class="{ 'input-error': !form.questionnaire2 && validateOnSubmit }"
          />
          <InputTextArea
            :model="form.questionnaire3"
            required
            label="アンケート"
            @update:model="updateModel('questionnaire3', $event)"
            @validate="validateInput('questionnaire3', $event)"
            error="この項目は必須です。"
            :validate-on-submit="validateOnSubmit"
            :class="{ 'input-error': !form.questionnaire3 && validateOnSubmit }"
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
            <p class="text-exd-1220 font-medium leading-relaxed h-[60px]">
              ダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミー
            </p>
          </div>
        </div>
      </div>
      <Button
        class="!bg-exd-gold !py-4 !w-exd-312 !uppercase !text-exd-1424 !rounded-full !text-white !flex !flex-row !justify-between !px-5 mx-auto"
        raised
        :disabled="!form.checked"
        :loading="isLoading"
        @click="handleSubmit"
      >
        <span class="grow text-center">登録する</span>
        <LoadingIcon v-if="isLoading" />
        <img v-else :src="arrow" alt="warning" width="10" height="10" preload />
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
            v-for="(item, index) in errorMessages"
            :key="index"
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
import arrow from '~/assets/images/arrow.svg'

import Dropdown from '~/components/Dropdown.vue'
import InputText from '~/components/InputText.vue'
import InputTextArea from '~/components/InputTextArea.vue'
import JapanPostalCode from 'japan-postal-code'

useHead({
  title: 'Register',
})

const validateOnSubmit = ref(false)

const inputValue = ref('')
const emailUpdated = ref(false)

const isLoading = ref(false)
const isErrorMessage = ref(false)
const form = ref({
  surname: '',
  givenName: '',
  yearOfBirth: '',
  monthOfBirth: '',
  dateOfBirth: '',
  gender: 'Non-Binary',
  residenceType: '',
  postCode: '',
  prefecture: '',
  cityArea: '',
  address: '',
  city: '',
  area: '',
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
const errorEmailMessage = ref('')

const handleCloseDialog = () => (isErrorMessage.value = false)

const updateModel = (field, value) => {
  form.value[field] = value

  if (field === 'email') {
    emailValidate()
  }
}

const validateInput = (field, value) => {
  //console.log(`Validated ${field}:`, value)
}

const emailValidate = () => {
  const email = form.value.email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    errorEmailMessage.value = 'Format email tidak valid.'
  }
}

const isAlphanumeric = (str) => {
  return /^[a-zA-Z0-9]+$/.test(str)
}

const yearOptions = computed(() => {
  const currentYear = new Date().getFullYear()
  return [...new Array(100)].map((item, index) =>
    // currentYear - index
    String(currentYear - index).padStart(4, '0')
  )
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

const fetchRegister = async (payload) => {
  errorMessages.value = []

  try {
    const { data } = await useFetchApi('POST', 'register', { body: payload })
    localStorage.setItem('USER_ID', data.user.id)
    navigateTo('/register/complete')
  } catch (error) {
    handleApiError(error)
  } finally {
    isLoading.value = false
  }
}

const handleApiError = (error) => {
  errorMessages.value = []

  const response = error._data.errors

  if (response.email) {
    errorEmailMessage.value = response.email[0]
    errorMessages.value.push(response.email[0])
  } else {
    errorEmailMessage.value = ''
  }
}

const handleSubmit = async () => {
  emailValidate()

  errorMessages.value = []

  isLoading.value = true

  validateOnSubmit.value = true

  let payload = {
    name: form.value.surname + ' ' + form.value.givenName,
    birthdate: `${form.value.yearOfBirth}-${form.value.monthOfBirth}-${form.value.dateOfBirth}`,
    gender: form.value.gender,
    postal_code: parseInt(form.value.postCode.replaceAll('-', '')),
    residence: [form.value.prefecture, form.value.city, form.value.area].join(
      ' '
    ),
    prefecture: form.value.prefecture,
    cityArea: [form.value.city, form.value.area].join(', '),
    city: form.value.city,
    area: form.value.area,
    email: form.value.email,
    address: form.value.address,
    phone_number: form.value.phoneNumber,
    password: form.value.password,
    password_confirmation: form.value.confPassword,
    questionnaire_1: form.value.questionnaire1,
    questionnaire_2: form.value.questionnaire2,
    questionnaire_3: form.value.questionnaire3,
  }

  await fetchRegister(payload)

  // Validasi setiap field
  if (!form.value.email)
    errorMessages.value.push('メールアドレス は必須項目です。')
  if (!form.value.password)
    errorMessages.value.push('パスワード は必須項目です。')
  if (form.value.password !== form.value.confPassword) {
    errorMessages.value.push('パスワード が一致しません。')
  }
  if (!form.value.questionnaire1)
    errorMessages.value.push('アンケート1 は必須項目です。')
  if (!form.value.questionnaire2)
    errorMessages.value.push('アンケート2 は必須項目です。')
  if (!form.value.questionnaire3)
    errorMessages.value.push('アンケート3 は必須項目です。')

  if (errorMessages.value.length > 0) {
    await nextTick()
    const firstErrorElement = document.querySelector('.input-error')
    if (firstErrorElement || errorMessages.value.length > 0) {
      firstErrorElement.scrollIntoView({ behavior: 'smooth' })
    }
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

    form.value.prefecture = address.prefecture
    form.value.cityArea = [address.city, address.area].join(', ')
    form.value.city = address.city
    form.value.area = address.area
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped>
::v-deep(.p-checkbox-box) {
  @apply !bg-white !size-5 !border !border-exd-gray-44 !rounded-none;
}

::v-deep(.p-checkbox-checked .p-checkbox-icon) {
  @apply !text-black;
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
