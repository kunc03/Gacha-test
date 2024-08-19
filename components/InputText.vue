<template>
  <div class="flex flex-col w-full">
    <label
      :for="`label-${label}`"
      class="text-exd-gray-scorpion font-bold text-exd-1424 flex gap-2 items-center py-0"
      v-if="label !== ''"
      >{{ label }}
      <span
        v-if="required"
        className="bg-exd-red-vermilion text-white text-exd-0910 p-1 rounded-sm"
        >必須</span
      ></label
    >
    <div
      :class="[
        'inline-flex rounded-lg bg-gray-100 text-exd-gray-scorpion px-4 h-10 items-center w-full',
        validateOnSubmit && !isLengthValid && !modelValue
          ? '!ring-2 !ring-exd-red-vermilion'
          : '!ring-none',
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
        :invalid="error !== '' ? true : false || !isLengthValid"
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
      v-if="error !== ''"
      :id="`${model}-${label}--${prefix}-${suffix}-error`"
      :class="['p-error']"
      >{{ error }}</small
    >
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
  validateOnSubmit: Boolean,
})

const emit = defineEmits(['update:model', 'validate'])

const isLengthValid = ref(true)

const modelValue = computed({
  get: () => props.model,
  set: (value) => emit('update:model', value),
})

const updateValue = (value) => {
  modelValue.value = value
  validate()
  emit('validate', value)
}

const validate = () => {
  isLengthValid.value = modelValue.value.length > 0
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
