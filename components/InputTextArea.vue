<template>
  <div class="flex flex-col w-full">
    <label
      :for="`label-${label}`"
      class="text-exd-gray-scorpion font-bold text-exd-1424"
      v-if="label !== ''"
      >{{ label }}</label
    >
    <Textarea
      rows="2"
      :autoResize="false"
      :id="`id-${model}`"
      :value="modelValue"
      @input="updateValue($event.target.value)"
      @blur="validate"
      :invalid="error !== '' ? true : false"
      :aria-describedby="`${model}-help`"
      class="grow w-full bg-gray-100 text-exd-gray-scorpion px-4 py-2 resize-none focus:!outline-none focus:!ring-0 focus:!border-none !border-none !rounded-lg selection:!bg-gray-300 selection:!border-none"
    />
    <small v-if="hasHelper" :id="`${model}-help`">{{ helperText }}</small>
    <small v-if="error !== ''" :id="`${model}-error`" :class="['p-error']">{{
      error
    }}</small>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Textarea from 'primevue/textarea'

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
