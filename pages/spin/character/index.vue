<template>
  <div class="grow flex flex-col">
    <div class="flex flex-col grow bg-white bg-cover bg-center">
      <video
        v-if="showGif"
        src="/video/spin-character.mp4"
        autoplay
        class="absolute z-20 inset-0 w-full h-full object-cover"
        @ended="goToCharacter"
      >
        <source src="/video/spin-character.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const showGif = ref(false)
const router = useRouter()

const goToCharacter = async () => {
  const data = localStorage.getItem('VALID_PASSWORD')
  const value = JSON.parse(data)
  const slug = value?.slug
  router.push(`/spin/character/${slug}`)
}

onMounted(() => {
  setTimeout(() => {
    showGif.value = true
  }) // Video muncul setelah 500ms
})
</script>
