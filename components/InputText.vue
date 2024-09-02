<template>
  <div class="flex flex-col w-full">
    <label
      :for="`label-${label}`"
      class="text-exd-gray-scorpion text-exd-1424 flex gap-2 items-center py-0"
      v-if="label !== ''"
      >{{ label }}
      <span
        v-if="required"
        className="bg-exd-red-vermilion text-white text-exd-0910 px-1 py-[2px] rounded-sm"
        >必須</span
      ></label
    >
    <div
      :class="[
        'inline-flex rounded-lg bg-gray-100 text-exd-gray-scorpion px-4 h-10 items-center w-full',
        (validateOnSubmit && !isValid && !modelValue) ||
        (isPassword &&
          modelValue.length > 0 &&
          (modelValue.length < minLength || !isAlphanumeric(modelValue))) ||
        (type === 'email' &&
          isEmailError &&
          validateOnSubmit &&
          !isValidEmail(modelValue)) ||
        (type === 'email' &&
          !isValid &&
          error === 'emailはすでに使用されています。')
          ? '!border-2 !border-exd-red-vermilion'
          : '!border-none',
      ]"
    >
      <span v-if="prefix !== ''" class="mr-2 text-exd-1424 font-bold">{{
        prefix
      }}</span>
      <InputText
        :type="type"
        :id="`id-${model}-${label}--${prefix}-${suffix}`"
        :value="modelValue"
        v-only-numeric="onlyNumeric"
        @input="updateValue($event.target.value)"
        @blur="validate"
        :invalid="error !== '' ? true : false || !isValid"
        :aria-describedby="`${model}-${label}--${prefix}-${suffix}-help`"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'grow w-full bg-gray-100 focus:!border-none focus:!outline-none selection:!rounded-none rounded-none selection:!bg-gray-300 !border-none',
          disabled && '!text-gray-400',
        ]"
      />
      <span v-if="suffix !== ''" class="ml-2 text-exd-1424 font-bold">{{
        suffix
      }}</span>
    </div>
    <small
      v-if="hasHelper"
      :id="`${model}-${label}--${prefix}-${suffix}-help`"
      >{{ helperText }}</small
    >
    <small
      v-if="
        (validateOnSubmit && !isValid && !modelValue) ||
        (isPassword &&
          modelValue.length > 0 &&
          (modelValue.length < minLength || !isAlphanumeric(modelValue))) ||
        (type === 'email' && !isValidEmail(modelValue)) ||
        (type === 'email' && error === 'emailはすでに使用されています。')
      "
      :id="`${model}-${label}--${prefix}-${suffix}-error`"
      :class="['p-error']"
    >
      {{ errorMessage }}
    </small>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import InputText from 'primevue/inputtext'

const props = defineProps({
  prefix: {
    type: String,
    default: '',
  },
  suffix: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  error: {
    type: String,
    default: '',
  },
  hasHelper: {
    type: Boolean,
    default: false,
  },
  helperText: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  model: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  onlyNumeric: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  isPassword: {
    type: Boolean,
    default: false,
  },
  minLength: {
    type: Number,
    default: 0,
  },
  isEmailError: {
    type: Boolean,
    default: false,
  },
  validateOnSubmit: Boolean,
})

const emit = defineEmits(['update:model', 'validate'])

const isValid = ref(true)
const errorMessage = ref('')

const modelValue = computed({
  get: () => props.model,
  set: (value) => emit('update:model', value),
})

const updateValue = (value) => {
  modelValue.value = value
  validate()
  emit('validate', value)
}

const isAlphanumeric = (str) => {
  return /^[a-zA-Z0-9]+$/.test(str)
}

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validate = () => {
  if (props.isPassword) {
    if (!isAlphanumeric(modelValue.value)) {
      isValid.value = false
      errorMessage.value = '半角英数字のみ使用できます。'
    } else if (modelValue.value.length < props.minLength) {
      isValid.value = false
      errorMessage.value = `${props.minLength}文字以上で作成してください。`
    } else {
      isValid.value = true
      errorMessage.value = ''
    }
  } else if (props.type === 'email' && props.isEmailError) {
    if (!isValidEmail(modelValue.value)) {
      isValid.value = false
      errorMessage.value = '正しい形式でメールアドレスを入力してください。'
    } else if (props.error === 'emailはすでに使用されています。') {
      isValid.value = false
      errorMessage.value =
        'このメールアドレスはすでに登録されていますが、まだ承認されていません。受信トレイをチェックしてください。'
    } else {
      isValid.value = true
      errorMessage.value = ''
    }
  } else if (props.error !== '') {
    isValid.value = modelValue.value.length > 0
    errorMessage.value = isValid.value ? '' : props.error
  }

  emit('validate', modelValue.value)
}

watch(
  () => props.validateOnSubmit,
  (newValue) => {
    if (newValue) {
      validate()
    }
  }
)
</script>

<style scoped>
::v-deep(.p-inputtext) {
  box-shadow: none !important;
}
</style>
