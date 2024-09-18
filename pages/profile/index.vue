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
            :model="form.nickName"
            :label="$t('nickName')"
            required
            :is-nick-name="true"
            @update:model="updateModel('nickName', $event)"
            @validate="validateInput('nickName', $event)"
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
              :options="getAgeOptions.map((item) => item.label)"
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
              />
              <InputText
                :model="form.prefecture"
                required
                disabled
                :label="$t('prefecture')"
                @update:model="
                  ($event) => {
                    updateModel('prefecture', $event)
                    checkPostalCode($event)
                  }
                "
                @validate="validateInput('prefecture', $event)"
              />
              <InputText
                :model="form.city"
                disabled
                required
                :label="$t('city')"
                @update:model="
                  ($event) => {
                    updateModel('city', $event)
                    checkPostalCode($event)
                  }
                "
                @validate="validateInput('city', $event)"
              />
              <InputText
                :model="form.area"
                disabled
                required
                :label="$t('area')"
                @update:model="
                  ($event) => {
                    updateModel('area', $event)
                    checkPostalCode($event)
                  }
                "
                @validate="validateInput('area', $event)"
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
              />
            </div>
          </div>
        </div>

        <div
          class="inline-flex gap-4 border-b border-b-exd-light-grey py-5 px-4"
        >
          <InputText
            :model="form.address"
            required
            :label="$t('address')"
            @update:model="updateModel('address', $event)"
            @validate="validateInput('address', $event)"
            :validate-on-submit="validateOnSubmit"
          />
        </div>

        <div
          class="inline-flex gap-4 border-b border-b-exd-light-grey py-5 px-4"
        >
          <InputText
            type="number"
            :model="form.phoneNumber"
            required
            :label="$t('phoneNumber')"
            @update:model="updateModel('phoneNumber', $event)"
            @validate="validateInput('phoneNumber', $event)"
            :minLength="11"
            :validate-on-submit="validateOnSubmit"
            :error="form.phoneNumber.length === 0 ? t('fieldRequired') : ''"
            :class="{
              'input-error':
                form.phoneNumber.length > 0 && form.phoneNumber.length < 10,
            }"
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
            :isPassword="true"
            required
            :minLength="8"
            :label="$t('password')"
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
                (!form.confPassword && validateOnSubmit) ||
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
import arrow from '~/assets/images/arrow.svg'
import logo from '~/assets/images/logo.png'
import Dropdown from '~/components/Dropdown.vue'
import InputText from '~/components/InputText.vue'
import InputTextArea from '~/components/InputTextArea.vue'
import JapanPostalCode from 'japan-postal-code'
import { useI18n } from 'vue-i18n'

useHead({
  title: 'Profile',
})

const { t } = useI18n()

const validateOnSubmit = ref(false)

const isLoading = ref(false)
const isErrorMessage = ref(false)
const isButtonEnabled = ref(false)

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
})

const countries = [
  { code: 'AF', name: 'Afghanistan' },
  { code: 'AL', name: 'Albania' },
  { code: 'DZ', name: 'Algeria' },
  { code: 'AS', name: 'American Samoa' },
  { code: 'AD', name: 'Andorra' },
  { code: 'AG', name: 'Angola' },
  { code: 'AI', name: 'Anguilla' },
  { code: 'AG', name: 'Antigua & Barbuda' },
  { code: 'AR', name: 'Argentina' },
  { code: 'AA', name: 'Armenia' },
  { code: 'AW', name: 'Aruba' },
  { code: 'AU', name: 'Australia' },
  { code: 'AT', name: 'Austria' },
  { code: 'AZ', name: 'Azerbaijan' },
  { code: 'BS', name: 'Bahamas' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'BB', name: 'Barbados' },
  { code: 'BY', name: 'Belarus' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BZ', name: 'Belize' },
  { code: 'BJ', name: 'Benin' },
  { code: 'BM', name: 'Bermuda' },
  { code: 'BT', name: 'Bhutan' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'BL', name: 'Bonaire' },
  { code: 'BA', name: 'Bosnia & Herzegovina' },
  { code: 'BW', name: 'Botswana' },
  { code: 'BR', name: 'Brazil' },
  { code: 'BC', name: 'British Indian Ocean Ter' },
  { code: 'BN', name: 'Brunei' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'BF', name: 'Burkina Faso' },
  { code: 'BI', name: 'Burundi' },
  { code: 'KH', name: 'Cambodia' },
  { code: 'CM', name: 'Cameroon' },
  { code: 'CA', name: 'Canada' },
  { code: 'IC', name: 'Canary Islands' },
  { code: 'CV', name: 'Cape Verde' },
  { code: 'KY', name: 'Cayman Islands' },
  { code: 'CF', name: 'Central African Republic' },
  { code: 'TD', name: 'Chad' },
  { code: 'CD', name: 'Channel Islands' },
  { code: 'CL', name: 'Chile' },
  { code: 'CN', name: 'China' },
  { code: 'CI', name: 'Christmas Island' },
  { code: 'CS', name: 'Cocos Island' },
  { code: 'CO', name: 'Colombia' },
  { code: 'CC', name: 'Comoros' },
  { code: 'CG', name: 'Congo' },
  { code: 'CK', name: 'Cook Islands' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'CT', name: "Cote D'Ivoire" },
  { code: 'HR', name: 'Croatia' },
  { code: 'CU', name: 'Cuba' },
  { code: 'CB', name: 'Curacao' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'DK', name: 'Denmark' },
  { code: 'DJ', name: 'Djibouti' },
  { code: 'DM', name: 'Dominica' },
  { code: 'DO', name: 'Dominican Republic' },
  { code: 'TM', name: 'East Timor' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'EG', name: 'Egypt' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'GQ', name: 'Equatorial Guinea' },
  { code: 'ER', name: 'Eritrea' },
  { code: 'EE', name: 'Estonia' },
  { code: 'ET', name: 'Ethiopia' },
  { code: 'FA', name: 'Falkland Islands' },
  { code: 'FO', name: 'Faroe Islands' },
  { code: 'FJ', name: 'Fiji' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'GF', name: 'French Guiana' },
  { code: 'PF', name: 'French Polynesia' },
  { code: 'FS', name: 'French Southern Ter' },
  { code: 'GA', name: 'Gabon' },
  { code: 'GM', name: 'Gambia' },
  { code: 'GE', name: 'Georgia' },
  { code: 'DE', name: 'Germany' },
  { code: 'GH', name: 'Ghana' },
  { code: 'GI', name: 'Gibraltar' },
  { code: 'GB', name: 'Great Britain' },
  { code: 'GR', name: 'Greece' },
  { code: 'GL', name: 'Greenland' },
  { code: 'GD', name: 'Grenada' },
  { code: 'GP', name: 'Guadeloupe' },
  { code: 'GU', name: 'Guam' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'GN', name: 'Guinea' },
  { code: 'GY', name: 'Guyana' },
  { code: 'HT', name: 'Haiti' },
  { code: 'HW', name: 'Hawaii' },
  { code: 'HN', name: 'Honduras' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IS', name: 'Iceland' },
  { code: 'IN', name: 'India' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'IA', name: 'Iran' },
  { code: 'IQ', name: 'Iraq' },
  { code: 'IR', name: 'Ireland' },
  { code: 'IM', name: 'Isle of Man' },
  { code: 'IL', name: 'Israel' },
  { code: 'IT', name: 'Italy' },
  { code: 'JM', name: 'Jamaica' },
  { code: 'JP', name: 'Japan' },
  { code: 'JO', name: 'Jordan' },
  { code: 'KZ', name: 'Kazakhstan' },
  { code: 'KE', name: 'Kenya' },
  { code: 'KI', name: 'Kiribati' },
  { code: 'NK', name: 'Korea North' },
  { code: 'KS', name: 'Korea South' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'KG', name: 'Kyrgyzstan' },
  { code: 'LA', name: 'Laos' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LB', name: 'Lebanon' },
  { code: 'LS', name: 'Lesotho' },
  { code: 'LR', name: 'Liberia' },
  { code: 'LY', name: 'Libya' },
  { code: 'LI', name: 'Liechtenstein' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MO', name: 'Macau' },
  { code: 'MK', name: 'Macedonia' },
  { code: 'MG', name: 'Madagascar' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'MW', name: 'Malawi' },
  { code: 'MV', name: 'Maldives' },
  { code: 'ML', name: 'Mali' },
  { code: 'MT', name: 'Malta' },
  { code: 'MH', name: 'Marshall Islands' },
  { code: 'MQ', name: 'Martinique' },
  { code: 'MR', name: 'Mauritania' },
  { code: 'MU', name: 'Mauritius' },
  { code: 'ME', name: 'Mayotte' },
  { code: 'MX', name: 'Mexico' },
  { code: 'MI', name: 'Midway Islands' },
  { code: 'MD', name: 'Moldova' },
  { code: 'MC', name: 'Monaco' },
  { code: 'MN', name: 'Mongolia' },
  { code: 'MS', name: 'Montserrat' },
  { code: 'MA', name: 'Morocco' },
  { code: 'MZ', name: 'Mozambique' },
  { code: 'MM', name: 'Myanmar' },
  { code: 'NA', name: 'Nambia' },
  { code: 'NU', name: 'Nauru' },
  { code: 'NP', name: 'Nepal' },
  { code: 'AN', name: 'Netherland Antilles' },
  { code: 'NL', name: 'Netherlands (Holland, Europe)' },
  { code: 'NV', name: 'Nevis' },
  { code: 'NC', name: 'New Caledonia' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'NI', name: 'Nicaragua' },
  { code: 'NE', name: 'Niger' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'NW', name: 'Niue' },
  { code: 'NF', name: 'Norfolk Island' },
  { code: 'NO', name: 'Norway' },
  { code: 'OM', name: 'Oman' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'PW', name: 'Palau Island' },
  { code: 'PS', name: 'Palestine' },
  { code: 'PA', name: 'Panama' },
  { code: 'PG', name: 'Papua New Guinea' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'PE', name: 'Peru' },
  { code: 'PH', name: 'Philippines' },
  { code: 'PO', name: 'Pitcairn Island' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'PR', name: 'Puerto Rico' },
  { code: 'QA', name: 'Qatar' },
  { code: 'ME', name: 'Republic of Montenegro' },
  { code: 'RS', name: 'Republic of Serbia' },
  { code: 'RE', name: 'Reunion' },
  { code: 'RO', name: 'Romania' },
  { code: 'RU', name: 'Russia' },
  { code: 'RW', name: 'Rwanda' },
  { code: 'NT', name: 'St Barthelemy' },
  { code: 'EU', name: 'St Eustatius' },
  { code: 'HE', name: 'St Helena' },
  { code: 'KN', name: 'St Kitts-Nevis' },
  { code: 'LC', name: 'St Lucia' },
  { code: 'MB', name: 'St Maarten' },
  { code: 'PM', name: 'St Pierre & Miquelon' },
  { code: 'VC', name: 'St Vincent & Grenadines' },
  { code: 'SP', name: 'Saipan' },
  { code: 'SO', name: 'Samoa' },
  { code: 'AS', name: 'Samoa American' },
  { code: 'SM', name: 'San Marino' },
  { code: 'ST', name: 'Sao Tome & Principe' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'SN', name: 'Senegal' },
  { code: 'RS', name: 'Serbia' },
  { code: 'SC', name: 'Seychelles' },
  { code: 'SL', name: 'Sierra Leone' },
  { code: 'SG', name: 'Singapore' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'SB', name: 'Solomon Islands' },
  { code: 'OI', name: 'Somalia' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'ES', name: 'Spain' },
  { code: 'LK', name: 'Sri Lanka' },
  { code: 'SD', name: 'Sudan' },
  { code: 'SR', name: 'Suriname' },
  { code: 'SZ', name: 'Swaziland' },
  { code: 'SE', name: 'Sweden' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'SY', name: 'Syria' },
  { code: 'TA', name: 'Tahiti' },
  { code: 'TW', name: 'Taiwan' },
  { code: 'TJ', name: 'Tajikistan' },
  { code: 'TZ', name: 'Tanzania' },
  { code: 'TH', name: 'Thailand' },
  { code: 'TG', name: 'Togo' },
  { code: 'TK', name: 'Tokelau' },
  { code: 'TO', name: 'Tonga' },
  { code: 'TT', name: 'Trinidad & Tobago' },
  { code: 'TN', name: 'Tunisia' },
  { code: 'TR', name: 'Turkey' },
  { code: 'TU', name: 'Turkmenistan' },
  { code: 'TC', name: 'Turks & Caicos Is' },
  { code: 'TV', name: 'Tuvalu' },
  { code: 'UG', name: 'Uganda' },
  { code: 'UA', name: 'Ukraine' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States of America' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'UZ', name: 'Uzbekistan' },
  { code: 'VU', name: 'Vanuatu' },
  { code: 'VS', name: 'Vatican City State' },
  { code: 'VE', name: 'Venezuela' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'VB', name: 'Virgin Islands (Brit)' },
  { code: 'VA', name: 'Virgin Islands (USA)' },
  { code: 'WK', name: 'Wake Island' },
  { code: 'WF', name: 'Wallis & Futana Is' },
  { code: 'YE', name: 'Yemen' },
  { code: 'ZR', name: 'Zaire' },
  { code: 'ZM', name: 'Zambia' },
  { code: 'ZW', name: 'Zimbabwe' },
]

const errorMessages = ref([])
const errorScroll = ref([])
const errorEmailMessage = ref('')
const errorPasswordMessage = ref('')

const handleCloseDialog = () => (isErrorMessage.value = false)

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

const getAgeOptions = [
  { value: 1, label: t('10') },
  { value: 2, label: t('20') },
  { value: 3, label: t('30') },
  { value: 4, label: t('40') },
  { value: 5, label: t('50') },
  { value: 6, label: t('60') },
  { value: 7, label: t('70') },
]

let initialForm = {}

const isFormChanged = () => {
  return JSON.stringify(form) !== JSON.stringify(initialForm)
}

const populateForm = (data) => {
  form.nickName = data.nickname || data.first_name || ''
  form.age = data.age || null
  form.gender = data.gender || ''
  form.phoneNumber = data.phone_number || ''
  form.address = data.address || ''
  form.email = data.email || ''
  form.residenceType = data.residence_type || 'overseas'
  form.password = ''
  form.confPassword = ''

  if (data.residence_type === 'domestic') {
    form.postCode = data.postal_code.name || ''
    form.prefecture = data.prefecture.name || ''
    form.city = data.city.name || ''
    form.area = data.area.name || ''
  } else {
    form.countryCode = data.country_code || ''
  }
}

const fetchGetUserData = async () => {
  errorMessages.value = []
  isLoading.value = true

  try {
    const { data } = await useFetchApi('GET', 'user')
    console.log(data)

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
    isErrorMessage.value = true
  }

  if (response.email) {
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

const buildPayload = () => {
  const payload = {
    nickname: form.nickName,
    first_name: form.nickName,
    age: form.age,
    gender: form.gender,
    email: form.email,
    address: form.address,
    phone_number: form.phoneNumber,
    password: form.password,
    password_confirmation: form.confPassword,
    residence: form.residenceType,
    residence_type: form.residenceType,
  }

  if (form.residenceType === 'overseas') {
    payload.country_code = form.countryCode
  } else {
    payload.postal_code = parseInt(form.postCode)
    payload.prefecture = form.prefecture
    payload.city = form.city
    payload.area = form.area
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
    if (firstErrorElement || errorScroll.value.length > 0) {
      firstErrorElement.scrollIntoView({ behavior: 'smooth' })
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

    form.value.prefecture = address.prefecture
    form.value.city = address.city
    form.value.area = address.area
  } catch (error) {
    console.log(error)
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
