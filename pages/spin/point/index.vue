<template>
  <div class="grow flex flex-col">
    <div class="flex flex-col grow bg-white bg-cover bg-center">
      <video
        v-if="showGif"
        autoplay
        muted
        playsinline
        class="absolute z-20 inset-0 w-full h-full object-cover"
        @ended="goToCharacter"
      >
        <source src="/video/spin-point.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()

const showGif = ref(false)
const router = useRouter()
const { decryptData } = useEncryption()

definePageMeta({
  layout: 'gacha-machine',
})

const goToCharacter = async () => {
  const data = useCookie('VALID_PASSWORD')
  const value = decryptData(data.value)
  const slug = value?.slug
  router.push(`/spin/point/${slug}`)
}

onMounted(() => {
  setTimeout(() => {
    showGif.value = true
  }) // Video muncul setelah 500ms
})
</script>
