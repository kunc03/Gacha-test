<template>
  <header
    class="pt-exd-42 bg-white pb-exd-15 flex justify-between items-center"
    style="box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1608)"
  >
    <div class="pl-5" v-if="hasBack">
      <img
        :src="backButton"
        alt="back"
        width="40"
        height="40"
        preload
        class="cursor-pointer"
      />
    </div>
    <div class="grow text-center" v-if="!withLogo">
      <slot />
    </div>
    <div
      class="grow text-center w-full justify-center items-center flex"
      v-else
    >
      <img :src="logo" alt="intl" width="130" height="48" preload />
    </div>
    <div class="pr-5 shrink-0">
      <img
        :src="intlIcon"
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
import intlIcon from '~/assets/images/intl-icon.svg'
import logo from '~/assets/images/logo.webp'
import backButton from '~/assets/images/back-button.svg'

defineProps({
  hasBack: {
    type: Boolean,
    default: false,
  },
  withLogo: {
    type: Boolean,
    default: false,
  },
})
</script>
