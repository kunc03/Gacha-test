<template>
  <div class="w-full px-8">
    <Button
      :disabled="disabled"
      :loading="hasLoading"
      :class="[
        variantClass,
        bottomClass,
        disabled ? '!cursor-not-allowed' : '!cursor-pointer',
        '!py-4 !w-full !uppercase !font-bold !text-exd-1424 !rounded-full !text-white !px-8 !relative',
      ]"
      raised
      @click="handleClick"
    >
      <span class="!text-center !w-full">{{ label }}</span>
      <div class="!absolute !right-8 !top-1/2 !transform !-translate-y-1/2">
        <LoadingIcon v-if="hasLoading" />
        <img
          v-if="hasIcon && !hasLoading"
          :src="arrow"
          alt="arrow"
          width="10"
          height="10"
        />
      </div>
    </Button>
  </div>
</template>

<script setup>
import LoadingIcon from './LoadingIcon.vue'
import arrow from '~/assets/images/arrow.svg'

const props = defineProps({
  hasIcon: {
    type: Boolean,
    default: true,
  },
  hasBottom: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  hasLoading: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'gold',
    validator: (value) => ['gold', 'red'].includes(value),
  },
  onClick: {
    type: Function,
    default: null,
  },
})

const variantClass = computed(() => {
  return props.variant === 'gold' ? '!bg-exd-gold' : '!bg-exd-red-vermilion'
})

const bottomClass = computed(() => {
  return props.hasBottom
    ? 'inset-x-1/2 z-50 -translate-x-1/2 -translate-y-1/4 !absolute !bottom-1'
    : ''
})

const handleClick = (event) => {
  props.onClick && props.onClick(event)
}
</script>
