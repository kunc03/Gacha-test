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
        <p class="font-bold w-48 text-right overflow-hidden whitespace-nowrap">
          {{ userId }}
        </p>
      </div>
      <div class="flex flex-col grow">
        <div
          class="inline-flex gap-4 border-b border-b-exd-light-grey pb-5 px-4"
        >
          <InputText
            :model="form.nickName"
            :label="$t('nickName')"
            required
            :is-nick-name="true"
            @update:model="updateModel('nickName', $event)"
            @validate="validateInput('nickName', $event)"
            :validate-on-submit="validateOnSubmit"
            :error="
              !form.nickName && validateOnSubmit ? $t('fieldRequired') : ''
            "
            :class="{
              'input-error': !form.nickName && validateOnSubmit,
            }"
          />
        </div>
        <div
          class="inline-flex flex-col border-b border-b-exd-light-grey py-5 px-4"
        >
          <label
            :for="$t('age')"
            class="text-exd-gray-scorpion text-exd-1424 flex items-center gap-2"
          >
            {{ $t('age') }}
            <span
              class="bg-exd-red-vermilion text-white text-exd-0910 px-1 py-[2px] rounded-sm"
              >{{ $t('required') }}</span
            >
          </label>

          <div class="inline-flex gap-4 w-7/12">
            <Dropdown
              :model="form.age"
              @update:model="updateModel('age', $event)"
              @validate="validateInput('age', $event)"
              :options="getAgeOptions()"
              optionValue="value"
              optionLabel="label"
              :placeholder="t('choice')"
              :hasHelper="true"
            />
          </div>
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
            >
          </label>
          <ButtonGroup
            class="text-exd-gray-scorpion w-full h-10 rounded-none"
            style="box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1608)"
          >
            <Button
              @click="updateModel('gender', 'Male')"
              :label="$t('male')"
              :class="[
                'bg-white w-4/12 h-full border border-exd-stone-300 rounded-none !text-exd-gray-scorpion',
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
                'bg-white w-4/12 h-full border border-exd-stone-300 rounded-none !text-exd-gray-scorpion',
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
            >
          </label>
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
              @click="updateModel('residenceType', 'overseas')"
              :label="$t('overseas')"
              :class="[
                'bg-white w-1/2 h-full border-t border-b border-r border-t-exd-stone-300 border-b-exd-stone-300 border-r-exd-stone-300 rounded-none !text-exd-gray-scorpion',
                form.residenceType === 'overseas' && '!bg-exd-banana',
              ]"
            />
          </ButtonGroup>
        </div>
        <div
          class="inline-flex gap-4 border-b border-b-exd-light-grey py-5 px-4 flex-col"
        >
          <div class="flex flex-col gap-4">
            <div
              class="flex flex-col gap-4"
              v-if="form.residenceType === 'domestic'"
            >
              <InputText
                :model="form.postCode"
                required
                :label="$t('postalCodeNoHyphens')"
                @update:model="
                  ($event) => {
                    updateModel('postCode', $event)
                    checkPostalCode($event)
                  }
                "
                @validate="validateInput('postCode', $event)"
                :validate-on-submit="validateOnSubmit"
                :error="
                  !form.postCode && validateOnSubmit
                    ? $t('fieldRequired')
                    : '' ||
                      (form.postCode.length > 0 && form.postCode.length < 7)
                    ? $t('minLengthPostalCode')
                    : '' || errorPostCodeMessage
                "
                :class="{
                  'input-error':
                    (!form.postCode && validateOnSubmit) ||
                    (form.postCode.length > 0 && form.postCode.length < 7) ||
                    errorPostCodeMessage,
                }"
              />
            </div>

            <div v-if="form.residenceType === 'overseas'">
              <label
                :for="$t('country')"
                class="text-exd-gray-scorpion text-exd-1424 flex items-center gap-2"
                :class="{
                  'input-error': !form.countryCode && validateOnSubmit,
                }"
              >
                {{ $t('country') }}
                <span
                  class="bg-exd-red-vermilion text-white text-exd-0910 px-1 py-[2px] rounded-sm"
                  >{{ $t('required') }}</span
                >
              </label>
              <Dropdown
                :model="form.countryCode"
                @update:model="updateModel('countryCode', $event)"
                @validate="validateInput('countryCode', $event)"
                :options="countries"
                optionValue="code"
                optionLabel="name"
                :placeholder="t('choice')"
                :hasHelper="true"
                :validate-on-submit="validateOnSubmit"
                :error="
                  !form.countryCode && validateOnSubmit
                    ? $t('fieldRequired')
                    : ''
                "
                :class="{
                  'input-error': !form.countryCode && validateOnSubmit,
                }"
              />
            </div>
          </div>
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
            :isPassword="true"
            required
            :minLength="8"
            :label="$t('loginPassword')"
            inform="passwordMin"
            @update:model="updateModel('password', $event)"
            @validate="validateInput('password', $event)"
            :validate-on-submit="validateOnSubmit"
            :error="
              (!isAlphanumeric(form.password) &&
                form.password.length > 0 &&
                $t('validPassword')) ||
              errorPasswordMessage
            "
            :class="{
              'input-error':
                (form.password.length < 8 && validateOnSubmit) ||
                (!isAlphanumeric(form.password) && validateOnSubmit),
            }"
          />
          <InputText
            type="password"
            :model="form.confPassword"
            :isPassword="true"
            required
            :isConfPassword="true"
            :minLength="8"
            :label="$t('reenterPassword')"
            :error="
              form.confPassword !== form.password && validateOnSubmit
                ? $t('passwordNotMatch')
                : ''
            "
            @update:model="updateModel('confPassword', $event)"
            @validate="validateInput('confPassword', $event)"
            :validate-on-submit="validateOnSubmit"
            :class="{
              'input-error':
                (form.password !== form.confPassword &&
                  form.confPassword >= 8 &&
                  validateOnSubmit) ||
                (!isAlphanumeric(form.confPassword) && validateOnSubmit) ||
                (form.confPassword.length < 8 && validateOnSubmit),
            }"
          />
        </div>
      </div>
      <div class="mt-1" />
      <SolidButton
        :label="$t('register')"
        :has-loading="isLoading"
        :disabled="!isButtonEnabled"
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
import { countries } from '~/data/countries'

const { t } = useI18n()

const validateOnSubmit = ref(false)

const userId = ref(null)
const isLoading = ref(false)
const isErrorMessage = ref(false)
const isButtonEnabled = ref(false)
const errorPostCodeMessage = ref('')

const form = reactive({
  nickName: '',
  age: null,
  gender: '',
  phoneNumber: '',
  address: '',
  email: '',
  postCode: '',
  prefecture: '',
  city: '',
  area: '',
  residenceType: '',
  countryCode: '',
  password: '',
  confPassword: '',
  questionnaire1: '',
  questionnaire2: '',
})

const errorMessages = ref([])
const errorScroll = ref([])
const errorEmailMessage = ref('')
const errorNicknameMessage = ref('')
const errorPasswordMessage = ref('')

const handleCloseDialog = () => (isErrorMessage.value = false)

const getAgeOptions = () => [
  { value: 1, label: t('10') },
  { value: 2, label: t('20') },
  { value: 3, label: t('30') },
  { value: 4, label: t('40') },
  { value: 5, label: t('50') },
  { value: 6, label: t('60') },
  { value: 7, label: t('70') },
]

const updateModel = (field, value) => {
  if (field in form) {
    form[field] = value
  } else {
    console.error(`Field ${field} tidak ditemukan dalam form`)
  }
}

const validateInput = (field, value) => {
  //console.log(`Validated ${field}:`, value)
}

const isAlphanumeric = (str) => {
  return /^[a-zA-Z0-9]+$/.test(str)
}

let initialForm = {}

const isFormChanged = () => {
  return JSON.stringify(form) !== JSON.stringify(initialForm)
}

const populateForm = (data) => {
  form.nickName = data.nickname || data.first_name || ''
  form.age = data.age || null
  form.gender = data.gender || ''
  form.email = data.email || ''
  form.residenceType = data.residence_type || 'overseas'
  form.password = ''
  form.confPassword = ''
  form.questionnaire1 = data.questionnaire_1 || ''
  form.questionnaire2 = data.questionnaire_2 || ''

  if (data.residence_type === 'domestic') {
    form.postCode = data.postal_code.name || ''
    form.prefecture = data.prefecture.name || ''
    form.city = data.city.name || ''
    form.area = data.area.name || ''
    form.address = data.area.name || ''
  } else {
    form.countryCode = data.country_code || ''
  }
}

const fetchGetUserData = async () => {
  errorMessages.value = []
  isLoading.value = true

  try {
    const { data } = await useFetchApi('GET', 'user')

    userId.value = data.user_id

    populateForm(data)

    initialForm = JSON.parse(JSON.stringify(form))
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const fetchPostUserData = async (payload) => {
  errorMessages.value = []
  isLoading.value = true

  try {
    const { data } = await useFetchApi('POST', 'user', { body: payload })
    navigateTo('/profile/complete')
  } catch (error) {
    handleApiError(error)
  } finally {
    isLoading.value = false
  }
}

const handleApiError = (error) => {
  errorScroll.value = []

  const response = error._data?.errors

  if (response) {
    const message = Object.keys(response).map((item) => response[item][0])
    errorScroll.value = message
    errorMessages.value.push(response)
    console.log('errorMessages', errorMessages.value)
    // isErrorMessage.value = true
  }

  if (response.email) {
    if (
      response.email[0] === 'emailは有効なメールアドレスでなければなりません。'
    ) {
      errorEmailMessage.value = t('validEmail')
    }
  } else {
    if (!form.email) {
      errorEmailMessage.value = t('fieldRequired')
    } else {
      errorEmailMessage.value = ''
    }
  }
}

const buildPayload = () => {
  const payload = {
    nickname: form.nickName,
    first_name: form.nickName,
    age: form.age,
    gender: form.gender,
    email: form.email,
    password: form.password,
    password_confirmation: form.confPassword,
    residence: form.residenceType,
    residence_type: form.residenceType,
    questionnaire_1: form.questionnaire1,
    questionnaire_2: form.questionnaire2,
  }

  if (form.residenceType === 'overseas') {
    payload.country_code = form.countryCode
  } else {
    payload.postal_code = parseInt(form.postCode)
    payload.prefecture = form.prefecture
    payload.city = form.city
    payload.area = form.area
    payload.address = form.address
  }

  return payload
}

const handleSubmit = async () => {
  errorScroll.value = []

  isLoading.value = true

  validateOnSubmit.value = true

  const payload = buildPayload()

  await fetchPostUserData(payload)

  if (errorScroll.value.length > 0) {
    await nextTick()
    const firstErrorElement = document.querySelector('.input-error')
    if (firstErrorElement) {
      firstErrorElement.style.paddingTop = '80px'
      firstErrorElement.style.marginTop = '-80px'

      firstErrorElement.scrollIntoView({ behavior: 'smooth' })

      setTimeout(() => {
        firstErrorElement.style.paddingTop = ''
        firstErrorElement.style.marginTop = ''
      }, 3000)
    }
  }
  isLoading.value = false
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

    form.prefecture = address.prefecture
    form.city = address.city
    form.area = address.area

    errorPostCodeMessage.value = ''
  } catch (error) {
    console.log('ada error', error)
    errorPostCodeMessage.value = t('postalCodeNotFound')
  }
}

watch(
  () => form,
  (newValue, oldValue) => {
    isButtonEnabled.value = isFormChanged()
  },
  { deep: true }
)

onMounted(async () => {
  await fetchGetUserData()
})
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
