<template>
  <div class="grow flex flex-col">
    <HeaderBar hasBack>
      <p
        style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
        class="text-exd-gray-scorpion text-exd-1824.52"
      >
        {{ $t('membershipInformation') }}
      </p>
    </HeaderBar>

    <div
      class="flex flex-col grow px-3 mt-32 pb-3 justify-between gap-6 w-full"
    >
      <h1
        class="text-center flex flex-col text-1416 text-exd-gray-scorpion pt-6 pb-10 w-full max-w-[360px] mx-auto"
      >
        {{ $t('memberInformation1') }}
        <span> {{ $t('memberInformation2') }}</span>
      </h1>
      <div
        class="inline-flex gap-4 border-b border-b-exd-light-grey pb-5 px-4 text-exd-gray-scorpion justify-between items-center text-1416"
      >
        <h1>{{ $t('member') }} <span class="font-bold">ID</span></h1>
        <p class="font-bold">00000000000</p>
      </div>
      <div class="flex flex-col grow">
        <div
          class="inline-flex gap-4 border-b border-b-exd-light-grey pb-5 px-4"
        >
          <InputText
            :model="form.surname"
            :label="$t('surname')"
            required
            @update:model="updateModel('surname', $event)"
            @validate="validateInput('surname', $event)"
            :validate-on-submit="validateOnSubmit"
            :error="
              !form.surname && validateOnSubmit ? $t('fieldRequired') : ''
            "
            :class="{ 'input-error': !form.surname && validateOnSubmit }"
          />
          <InputText
            :model="form.givenName"
            :label="$t('givenName')"
            required
            @update:model="updateModel('givenName', $event)"
            @validate="validateInput('givenName', $event)"
            :validate-on-submit="validateOnSubmit"
            :error="
              !form.givenName && validateOnSubmit ? $t('fieldRequired') : ''
            "
            :class="{ 'input-error': !form.givenName && validateOnSubmit }"
          />
        </div>
        <div
          class="inline-flex flex-col border-b border-b-exd-light-grey py-5 px-4"
        >
          <label
            :for="$t('dateOfBirth')"
            class="text-exd-gray-scorpion text-exd-1424 flex items-center gap-2"
            :class="{
              'input-error':
                (!form.yearOfBirth && validateOnSubmit) ||
                (!form.monthOfBirth && validateOnSubmit) ||
                (!form.dateOfBirth && validateOnSubmit),
            }"
          >
            {{ $t('dateOfBirth') }}
            <span
              class="bg-exd-red-vermilion text-white text-exd-0910 px-1 py-[2px] rounded-sm"
              >{{ $t('required') }}</span
            ></label
          >
          <div class="inline-flex gap-4">
            <Dropdown
              :model="form.yearOfBirth"
              @update:model="updateModel('yearOfBirth', $event)"
              @validate="validateInput('yearOfBirth', $event)"
              :options="yearOptions"
              :suffix="$t('year')"
              :validate-on-submit="validateOnSubmit"
              :class="{ 'input-error': !form.yearOfBirth && validateOnSubmit }"
            />
            <Dropdown
              :model="form.monthOfBirth"
              @update:model="updateModel('monthOfBirth', $event)"
              @validate="validateInput('monthOfBirth', $event)"
              :options="monthOptions"
              :suffix="$t('month')"
              :validate-on-submit="validateOnSubmit"
              :class="{ 'input-error': !form.monthOfBirth && validateOnSubmit }"
            />
            <Dropdown
              :model="form.dateOfBirth"
              @update:model="updateModel('dateOfBirth', $event)"
              @validate="validateInput('dateOfBirth', $event)"
              :options="dayOptions"
              :suffix="$t('day')"
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
            {{ $t('fieldRequired') }}
          </small>
        </div>
        <div
          class="inline-flex flex-col border-b border-b-exd-light-grey py-5 px-4"
        >
          <label
            :for="$t('sex')"
            class="text-exd-gray-scorpion text-exd-1424 flex items-center gap-2"
            >{{ $t('sex') }}
            <span
              class="bg-exd-red-vermilion text-white text-exd-0910 px-1 py-[2px] rounded-sm"
              >{{ $t('required') }}</span
            ></label
          >
          <ButtonGroup
            class="text-exd-gray-scorpion w-full h-10 rounded-none"
            style="box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1608)"
          >
            <Button
              @click="updateModel('gender', 'Male')"
              :label="$t('male')"
              :class="[
                'bg-exd-zinc-100 w-4/12 h-full border border-exd-stone-300 rounded-none !text-exd-gray-scorpion',
                form.gender === 'Male' && '!bg-exd-banana',
              ]"
            />
            <Button
              @click="updateModel('gender', 'Female')"
              :label="$t('female')"
              :class="[
                'bg-white w-4/12 h-full border-t border-b border-t-exd-stone-300 border-b-exd-stone-300 rounded-none !text-exd-gray-scorpion',
                form.gender === 'Female' && '!bg-exd-banana',
              ]"
            />
            <Button
              @click="updateModel('gender', 'Non-Binary')"
              :label="$t('noAnswer')"
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
            :for="$t('residence')"
            class="text-exd-gray-scorpion text-exd-1424 flex items-center gap-2"
            >{{ $t('residence') }}
            <span
              class="bg-exd-red-vermilion text-white text-exd-0910 px-1 py-[2px] rounded-sm"
              >{{ $t('required') }}</span
            ></label
          >
          <ButtonGroup
            class="w-full h-10 rounded-none"
            style="box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1608)"
          >
            <Button
              @click="updateModel('residenceType', 'domestic')"
              :label="$t('domestic')"
              :class="[
                'bg-white w-1/2 h-full border border-exd-stone-300 rounded-none !text-exd-gray-scorpion',
                form.residenceType === 'domestic' && '!bg-exd-banana',
              ]"
            />
            <Button
              @click="updateModel('residenceType', 'non_domestic')"
              :label="$t('abroad')"
              :class="[
                'bg-white w-1/2 h-full border-t border-b border-r border-t-exd-stone-300 border-b-exd-stone-300 border-r-exd-stone-300 rounded-none !text-exd-gray-scorpion',
                form.residenceType === 'non_domestic' && '!bg-exd-banana',
              ]"
            />
          </ButtonGroup>
        </div>
        <div
          class="inline-flex gap-4 border-b border-b-exd-light-grey py-5 px-4 flex-col"
        >
          <InputText
            :model="form.postCode"
            :label="$t('postalCodeNoHyphens')"
            required
            @update:model="
              ($event) => {
                updateModel('postCode', $event)
                checkPostalCode($event)
              }
            "
            @validate="validateInput('postCode', $event)"
            :validate-on-submit="validateOnSubmit"
            :error="
              !form.postCode && validateOnSubmit ? $t('fieldRequired') : ''
            "
            :class="{ 'input-error': !form.postCode && validateOnSubmit }"
          />
          <p class="text-exd-gray-scorpion font-medium text-exd-1220">
            {{ $t('postalCodeInformation') }}
          </p>
        </div>
        <div
          class="flex flex-col gap-4 border-b border-b-exd-light-grey py-5 px-4"
        >
          <InputText
            :model="form.prefecture"
            required
            :label="$t('prefectures')"
            disabled
            @update:model="updateModel('prefecture', $event)"
            @validate="validateInput('prefecture', $event)"
            :validate-on-submit="validateOnSubmit"
            :error="
              !form.prefecture && validateOnSubmit ? $t('fieldRequired') : ''
            "
          />

          <InputText
            :model="form.cityArea"
            required
            :label="$t('municipalities')"
            disabled
            @update:model="updateModel('cityArea', $event)"
            @validate="validateInput('cityArea', $event)"
            :validate-on-submit="validateOnSubmit"
            :error="
              !form.cityArea && validateOnSubmit ? $t('fieldRequired') : ''
            "
          />

          <InputText
            :model="form.address"
            required
            v-model="inputValue"
            :label="$t('streetAddressEtc')"
            @update:model="updateModel('address', $event)"
            @validate="validateInput('address', $event)"
            :validate-on-submit="validateOnSubmit"
            :error="
              !form.address && validateOnSubmit ? $t('fieldRequired') : ''
            "
            :class="{ 'input-error': !form.address && validateOnSubmit }"
          />

          <p class="text-exd-gray-scorpion font-medium text-exd-1220">
            {{ $t('streetAddressInformation') }}
          </p>
        </div>
        <div
          class="inline-flex gap-4 border-b border-b-exd-light-grey py-5 px-4"
        >
          <InputText
            :model="form.phoneNumber"
            required
            :onlyNumeric="true"
            :label="$t('phoneNumberNoHyphens')"
            @update:model="updateModel('phoneNumber', $event)"
            @validate="validateInput('phoneNumber', $event)"
            :validate-on-submit="validateOnSubmit"
            :error="
              !form.phoneNumber && validateOnSubmit ? $t('fieldRequired') : ''
            "
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
            :label="$t('emailAddress')"
            @update:model="updateModel('email', $event)"
            @validate="validateInput('email', $event)"
            :validate-on-submit="validateOnSubmit"
            :is-email-error="true"
            :error="
              (!form.email && validateOnSubmit && $t('fieldRequired')) ||
              errorEmailMessage
            "
            :class="{
              'input-error': form.email !== '' && validateOnSubmit,
              'input-error':
                (errorEmailMessage && validateOnSubmit) ||
                (form.email.length < 3 && validateOnSubmit),
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
            :label="$t('password')"
            @update:model="updateModel('password', $event)"
            @validate="validateInput('password', $event)"
            :validate-on-submit="validateOnSubmit"
            :error="
              (!form.password && validateOnSubmit && $t('fieldRequired')) ||
              (!isAlphanumeric(form.password) &&
                form.password.length > 0 &&
                $t('validPassword')) ||
              errorPasswordMessage
            "
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
            :isConfPassword="true"
            :minLength="8"
            :label="$t('reenterPassword')"
            :error="
              (!form.confPassword && validateOnSubmit && $t('fieldRequired')) ||
              (form.confPassword !== form.password && validateOnSubmit
                ? $t('passwordNotMatch')
                : '')
            "
            @update:model="updateModel('confPassword', $event)"
            @validate="validateInput('confPassword', $event)"
            :validate-on-submit="validateOnSubmit"
            :class="{
              'input-error':
                (!form.confPassword && validateOnSubmit) ||
                (form.password !== form.confPassword &&
                  form.confPassword >= 8 &&
                  validateOnSubmit) ||
                (!isAlphanumeric(form.confPassword) && validateOnSubmit) ||
                (form.confPassword.length < 8 && validateOnSubmit),
            }"
          />
        </div>

        <div
          class="flex flex-col gap-4 border-b border-b-exd-light-grey py-5 px-4"
        >
          <InputTextArea
            :model="form.questionnaire1"
            required
            :label="$t('questionnaire')"
            @update:model="updateModel('questionnaire1', $event)"
            @validate="validateInput('questionnaire1', $event)"
            :error="$t('fieldRequired')"
            :validate-on-submit="validateOnSubmit"
            :class="{ 'input-error': !form.questionnaire1 && validateOnSubmit }"
          />
          <InputTextArea
            :model="form.questionnaire2"
            required
            :label="$t('questionnaire')"
            @update:model="updateModel('questionnaire2', $event)"
            @validate="validateInput('questionnaire2', $event)"
            :error="$t('fieldRequired')"
            :validate-on-submit="validateOnSubmit"
            :class="{ 'input-error': !form.questionnaire2 && validateOnSubmit }"
          />
          <InputTextArea
            :model="form.questionnaire3"
            required
            :label="$t('questionnaire')"
            @update:model="updateModel('questionnaire3', $event)"
            @validate="validateInput('questionnaire3', $event)"
            :error="$t('fieldRequired')"
            :validate-on-submit="validateOnSubmit"
            :class="{ 'input-error': !form.questionnaire3 && validateOnSubmit }"
          />
        </div>

        <div class="w-full inline-flex gap-2 items-center justify-center mt-7">
          <Checkbox v-model="form.checked" :binary="true" />
          <p class="text-exd-gray-scorpion font-bold text-exd-1424">
            {{ $t('acceptTerm') }}
          </p>
        </div>
        <div
          class="w-full mt-5 border border-exd-gray-44 rounded-xl bg-white h-28 max-w-xs mx-auto text-exd-gray-scorpion pr-2"
          style="box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1608)"
        >
          <div class="max-h-28 scrollable-content overflow-y-auto px-4">
            <p class="text-exd-1424 font-bold text-center pt-2">
              {{ $t('termOfService') }}
            </p>
            <p class="text-exd-1220 font-medium leading-relaxed h-[60px]">
              {{ $t('dummyDummy') }}
            </p>
          </div>
        </div>
      </div>
      <div class="mt-1" />
      <SolidButton
        :label="$t('register')"
        :has-loading="isLoading"
        :disabled="!form.checked"
        :on-click="handleSubmit"
        has-bottom
      />
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
            v-for="(item, index) in errorScroll"
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

import Dropdown from '~/components/Dropdown.vue'
import InputText from '~/components/InputText.vue'
import InputTextArea from '~/components/InputTextArea.vue'
import JapanPostalCode from 'japan-postal-code'
import { useI18n } from 'vue-i18n'

useHead({
  title: 'Register',
})

const { t } = useI18n()

const validateOnSubmit = ref(false)

const inputValue = ref('')

const isLoading = ref(false)
const isErrorMessage = ref(false)
const form = ref({
  surname: '',
  givenName: '',
  yearOfBirth: '',
  monthOfBirth: '',
  dateOfBirth: '',
  gender: 'Non-Binary',
  residenceType: 'domestic',
  residence: '',
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
const errorScroll = ref([])
const errorEmailMessage = ref('')
const errorPasswordMessage = ref('')

const handleCloseDialog = () => (isErrorMessage.value = false)

const updateModel = (field, value) => {
  form.value[field] = value
}

const validateInput = (field, value) => {
  //console.log(`Validated ${field}:`, value)
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
  errorScroll.value = []

  console.log(t)

  const response = error._data.errors

  if (response) {
    const message = Object.keys(response).map((item) => response[item][0])
    errorScroll.value = message
    errorMessages.value.push(response)
    console.log('errorMessages', errorMessages.value)
    // isErrorMessage.value = true
  }
  if (response.password) {
    if (form.value.password.length >= 8) {
      // if (!isAlphanumeric(form.value.password)) {
      //   errorPasswordMessage.value = '半角英数字のみ使用できます。'
      // }
    }
  } else {
    errorPasswordMessage.value = ''
  }

  if (response.email) {
    if (response.email[0] === 'emailはすでに使用されています。') {
      errorEmailMessage.value = t('emailIsAlreadyRegistered')
    }
    if (
      response.email[0] === 'emailは有効なメールアドレスでなければなりません。'
    ) {
      errorEmailMessage.value = t('validEmail')
    }
  } else {
    if (!form.value.email) {
      errorEmailMessage.value = t('fieldRequired')
    } else {
      errorEmailMessage.value = ''
    }
  }
}

const handleSubmit = async () => {
  errorScroll.value = []

  isLoading.value = true

  validateOnSubmit.value = true

  let payload = {
    first_name: form.value.surname,
    last_name: form.value.givenName,
    birthdate: `${form.value.yearOfBirth}-${form.value.monthOfBirth}-${form.value.dateOfBirth}`,
    gender: form.value.gender,
    postal_code: parseInt(form.value.postCode.replaceAll('-', '')),
    residence_type: form.value.residenceType,
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
  if (errorScroll.value.length > 0) {
    await nextTick()
    const firstErrorElement = document.querySelector('.input-error')
    if (firstErrorElement || errorScroll.value.length > 0) {
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
