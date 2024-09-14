<template>
  <div class="flex flex-col grow">
    <div class="inline-flex gap-4 border-b border-b-exd-light-grey pb-5 px-4">
      <InputText
        :model="form.surname"
        :label="$t('surname')"
        required
        @update:model="updateModel('surname', $event)"
        @validate="validateInput('surname', $event)"
        :validate-on-submit="validateOnSubmit"
        :error="!form.surname && validateOnSubmit ? $t('fieldRequired') : ''"
        :class="{ 'input-error': !form.surname && validateOnSubmit }"
      />
      <InputText
        :model="form.givenName"
        :label="$t('givenName')"
        required
        @update:model="updateModel('givenName', $event)"
        @validate="validateInput('givenName', $event)"
        :validate-on-submit="validateOnSubmit"
        :error="!form.givenName && validateOnSubmit ? $t('fieldRequired') : ''"
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
        :error="!form.postCode && validateOnSubmit ? $t('fieldRequired') : ''"
        :class="{ 'input-error': !form.postCode && validateOnSubmit }"
      />
      <p class="text-exd-gray-scorpion font-medium text-exd-1220">
        {{ $t('postalCodeInformation') }}
      </p>
    </div>
    <div class="flex flex-col gap-4 border-b border-b-exd-light-grey py-5 px-4">
      <InputText
        :model="form.prefecture"
        required
        :label="$t('prefectures')"
        disabled
        @update:model="updateModel('prefecture', $event)"
        @validate="validateInput('prefecture', $event)"
        :validate-on-submit="validateOnSubmit"
        :error="!form.prefecture && validateOnSubmit ? $t('fieldRequired') : ''"
      />

      <InputText
        :model="form.cityArea"
        required
        :label="$t('municipalities')"
        disabled
        @update:model="updateModel('cityArea', $event)"
        @validate="validateInput('cityArea', $event)"
        :validate-on-submit="validateOnSubmit"
        :error="!form.cityArea && validateOnSubmit ? $t('fieldRequired') : ''"
      />

      <InputText
        :model="form.address"
        required
        v-model="inputValue"
        :label="$t('streetAddressEtc')"
        @update:model="updateModel('address', $event)"
        @validate="validateInput('address', $event)"
        :validate-on-submit="validateOnSubmit"
        :error="!form.address && validateOnSubmit ? $t('fieldRequired') : ''"
        :class="{ 'input-error': !form.address && validateOnSubmit }"
      />

      <p class="text-exd-gray-scorpion font-medium text-exd-1220">
        {{ $t('streetAddressInformation') }}
      </p>
    </div>
    <div class="inline-flex gap-4 border-b border-b-exd-light-grey py-5 px-4">
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
    <div class="inline-flex gap-4 border-b border-b-exd-light-grey py-5 px-4">
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
    <div class="flex flex-col gap-4 border-b border-b-exd-light-grey py-5 px-4">
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

    <div class="flex flex-col gap-4 border-b border-b-exd-light-grey py-5 px-4">
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
</template>

<script setup>
import { ref } from 'vue'
</script>
