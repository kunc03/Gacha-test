<template>
  <div class="flex flex-col w-full">
    <label
      :for="`label-${label}`"
      class="text-exd-gray-scorpion font-bold text-exd-1424"
      v-if="label !== ''"
      >{{ label }}</label
    >

    <Select
      :inputId="`id-${model}`"
      :modelValue="displayValue"
      @update:modelValue="($value) => updateValue($value)"
      @blur="validate"
      :options="options"
      :optionLabel="optionLabel"
      :optionValue="optionValue"
      :invalid="error !== '' ? true : false"
      :aria-describedby="`${model}-help`"
      :placeholder="placeholder"
      :editable="editable"
      :class="[
        'grow w-full bg-gray-100 !text-exd-gray-scorpion focus:!border-none focus:!outline-none selection:!rounded-none rounded-xl selection:!bg-gray-300',
        (validateOnSubmit && !isLengthValid && !modelValue) || error !== ''
          ? '!border-2 border-exd-red-vermilion'
          : '!border-none',
      ]"
      inputClass="!text-exd-gray-scorpion"
      overlayClass="bg-white"
      :ptOptions="{ mergeSections: true, mergeProps: true }"
      :pt="{
        option: '!text-gray-500 hover:text-white',
        dropdown: { class: locale === 'en' && '!text-xs px-2 !w-auto' },
      }"
    >
      <template v-if="suffix !== ''" #dropdownicon>
        {{ suffix }}
      </template>
    </Select>
    <small v-if="hasHelper" :id="`${model}-help`">{{ helperText }}</small>
    <small v-if="error !== ''" :id="`${model}-error`" :class="['p-error']">{{
      error
    }}</small>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import InputText from 'primevue/inputtext'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

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
    type: [Number, Object, String, null],
    default: null,
  },
  options: {
    type: Array,
    default: [],
  },
  optionLabel: {
    type: String,
    default: null,
  },
  optionValue: {
    type: String,
    default: null,
  },
  editable: {
    type: Boolean,
    default: false,
  },
  validateOnSubmit: Boolean,
})

const { t } = useI18n()

const emit = defineEmits(['update:model', 'validate'])

const isLengthValid = ref(true)

const modelValue = computed({
  get: () => props.model,
  set: (value) => emit('update:model', value),
})

const ageMap = {
  [t('10')]: 1,
  [t('20')]: 2,
  [t('30')]: 3,
  [t('40')]: 4,
  [t('50')]: 5,
  [t('60')]: 6,
  [t('70')]: 7,
}

const reverseAgeMap = {
  1: t('10'),
  2: t('20'),
  3: t('30'),
  4: t('40'),
  5: t('50'),
  6: t('60'),
  7: t('70'),
}

const displayValue = computed(() => {
  return reverseAgeMap[props.model] || props.model
})

const updateValue = (value) => {
  const intValue = ageMap[value] !== undefined ? ageMap[value] : value
  emit('update:model', intValue)
  validate()
  emit('validate', intValue)
}

const validate = () => {
  isLengthValid.value = modelValue.value && modelValue.value.length > 0
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

:deep(.p-select-dropdown) {
  color: hlsa(var(--gray-scorpion)) !important;
}

:global(.p-select-option.p-focus) {
  color: white !important;
  background: black;
}

:global(.p-select-option.p-select-option-selected.p-focus) {
  color: darkslategray !important;
}
</style>
