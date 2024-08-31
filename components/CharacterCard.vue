<template>
  <div
    :class="[variantClass, 'h-full w-full flex justify-center items-center']"
  >
    <Skeleton v-if="isLoading" class="!w-full !h-full" />
    <img
      v-else
      :src="image"
      alt="character"
      class="relative object-scale-down w-full max-w-[200px]"
      preload
      @error="handleImageError"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'with-background',
    validator: (value) =>
      ['with-background', 'without-background'].includes(value),
  },
})

const variantClass = computed(() => {
  return props.variant === 'with-background' ? 'bg-[#FFEEE8]' : 'bg-transparent'
})
</script>
