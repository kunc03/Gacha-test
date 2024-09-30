<template>
  <div tabindex="0">
    <video
      autoplay
      playsinline
      class="absolute z-[999] inset-0 w-full h-full object-cover"
      @ended="$emit('ended')"
    >
      <source :src="props.src" type="video/mp4" />
    </video>
  </div>
</template>

<script setup>
const props = defineProps(['src'])
const emit = defineEmits('ended')

definePageMeta({
  layout: 'gacha-machine',
})
</script>
