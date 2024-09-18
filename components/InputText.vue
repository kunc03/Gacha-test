<template>
  <div class="flex flex-col w-full">
    <div class="flex items-center justify-between">
      <label
        :for="`label-${label}`"
        class="text-exd-gray-scorpion text-exd-1424 flex gap-2 items-center py-0"
        v-if="label !== ''"
        >{{ label }}
        <span
          v-if="required"
          class="!bg-exd-red-vermilion text-white text-exd-0910 px-1 py-[2px] rounded-sm"
          >{{ $t('required') }}</span
        >
      </label>
      <span
        v-if="inform !== ''"
        class="truncate max-w-56 text-exd-1220 text-exd-gray-scorpion"
        >{{ $t(inform) }}</span
      >
    </div>
    <div
      :class="[
        'inline-flex rounded-xl bg-gray-100 text-exd-gray-scorpion px-4 h-10 items-center w-full',
        (props.error !== '' && props.validateOnSubmit) ||
        modelValue === 0 ||
        (props.isPassword &&
          modelValue?.length > 0 &&
          modelValue?.length < props.minLength) ||
        (props.isPassword &&
          !isAlphanumeric(modelValue) &&
          props.error !== '') ||
        (modelValue?.length > 0 && isNickName && !isNicknameValid(modelValue))
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
        (error !== '' && validateOnSubmit) ||
        modelValue === 0 ||
        (isPassword &&
          modelValue?.length > 0 &&
          modelValue?.length < minLength) ||
        (isPassword && !isAlphanumeric(modelValue) && error !== '') ||
        (modelValue?.length > 0 && isNickName && !isNicknameValid(modelValue))
      "
      :id="`${model}-${label}--${prefix}-${suffix}-error`"
      :class="['p-error']"
    >
      {{
        error ||
        (isPassword &&
          modelValue?.length > 0 &&
          modelValue?.length < minLength &&
          $t('minLength', { number: minLength })) ||
        (modelValue?.length > 0 &&
          isNickName &&
          !isNicknameValid(modelValue) &&
          t('invalidNickname'))
      }}
    </small>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import InputText from 'primevue/inputtext'
import { useI18n } from 'vue-i18n'

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
  isConfPassword: {
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
  isNickName: {
    type: Boolean,
    default: false,
  },
  inform: {
    type: String,
    default: '',
  },
  validateOnSubmit: Boolean,
})

const { t } = useI18n()

const emit = defineEmits(['update:model', 'validate'])

const isValid = ref(true)

const modelValue = computed({
  get: () => props.model,
  set: (value) => emit('update:model', value),
})

const isAlphanumeric = (str) => {
  return /^[a-zA-Z0-9]+$/.test(str)
}

const isNicknameValid = (str) => {
  return /^[a-zA-Z0-9\u3040-\u30FF\u4E00-\u9FFF]+$/.test(str)
}

const updateValue = (value) => {
  modelValue.value = value
  validate()
  emit('validate', value)
}

const validate = () => {
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
