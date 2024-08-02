<template>
  <div class="flex flex-col w-full">
    <label
      :for="`label-${label}`"
      class="text-exd-gray-scorpion font-bold text-exd-1424"
      v-if="label !== ''"
      >{{ label }}</label
    >
    <div
      class="inline-flex rounded-lg bg-gray-100 text-exd-gray-scorpion px-4 h-10 items-center w-full"
    >
      <span v-if="prefix !== ''" class="mr-2 text-exd-1424 font-bold">{{
        prefix
      }}</span>
      <InputText
        :type="type"
        :id="`id-${model}`"
        :value="modelValue"
        @input="updateValue($event.target.value)"
        @blur="validate"
        :invalid="error !== '' ? true : false"
        :aria-describedby="`${model}-help`"
        class="grow w-full bg-gray-100 focus:!border-none focus:!outline-none selection:!rounded-none rounded-none selection:!bg-gray-300 !border-none"
      />
      <span v-if="suffix !== ''" class="ml-2 text-exd-1424 font-bold">{{
        suffix
      }}</span>
    </div>
    <small v-if="hasHelper" :id="`${model}-help`">{{ helperText }}</small>
    <small v-if="error !== ''" :id="`${model}-error`" :class="['p-error']">{{
      error
    }}</small>
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
  model: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:model', 'validate'])

const modelValue = computed({
  get: () => props.model,
  set: (value) => emit('update:model', value),
})

const updateValue = (value) => {
  modelValue.value = value
  emit('validate', value)
}

const validate = () => {
  emit('validate', modelValue.value)
}
</script>

<style scoped>
::v-deep(.p-inputtext) {
  box-shadow: none !important;
}
</style>
