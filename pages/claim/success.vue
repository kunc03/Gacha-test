<template>
  <HeaderBar withLogo />
  <div class="flex flex-col mt-20 grow justify-between px-8">
    <p
      class="text-exd-gray-scorpion text-exd-1424 text-center font-bold max-w-44 mt-8 mx-auto"
    >
      完了しました
    </p>
  </div>
  <div class="flex flex-col w-full relative gap-1">
    <SolidButton :on-click="() => goTo('external')" label="デジタルマップTOP" />
    <div class="h-5 w-full" />
    <SolidButton
      variant="red"
      :on-click="() => goTo('top')"
      :has-loading="isLoading"
      label="ガチャTOP"
      has-bottom
    />
  </div>
</template>

<script setup>
import duck from '~/assets/images/duck.svg'
import arrow from '~/assets/images/arrow.svg'
import { useRouter } from 'vue-router'

definePageMeta({
  middleware: 'auth',
  layout: 'default',
})

const router = useRouter()

const goTo = (type) => {
  switch (type) {
    case 'top':
      router.push('/dashboard')
      break
    case 'external':
      window.open('https://nospot.new-ordinary.co.jp/maps/nagoya')
      break

    default:
      break
  }
}

useHead({
  title: 'Redeem',
})
</script>
