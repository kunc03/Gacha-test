<template>
  <header
    class="pt-exd-42 bg-white pb-exd-15 flex justify-between items-center"
    style="box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1608)"
  >
    <div class="pl-5" v-if="hasBack">
      <NuxtImg
        src="/back-button.svg"
        alt="back"
        width="40"
        height="40"
        preload
        class="cursor-pointer"
      />
    </div>
    <div class="grow text-center">
      <slot />
    </div>
    <div class="pr-5">
      <NuxtImg
        src="/intl-icon.svg"
        alt="intl"
        width="40"
        height="40"
        preload
        class="cursor-pointer"
      />
    </div>
  </header>
</template>

<script setup>
defineProps({
  hasBack: {
    type: Boolean,
    default: false,
  },
})
</script>
