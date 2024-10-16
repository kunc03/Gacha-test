<script setup>
const loading = ref(true)
let checkCachesInterval = null

// Fungsi untuk menyelesaikan loading
function completeLoading() {
  loading.value = false
}

// Fungsi untuk mengecek cache status
const checkCaches = async () => {
  const urlsToCache = [
    '/logo-icon.ico',
    '/video/spin-point.mp4',
    '/video/spin-character.mp4',
    '/images/gacha2.webp',
    '/images/bg-red2.webp',
    '/images/sparkling.webp',
    '/images/bg-green.webp',
    '/images/logo.png',
    '/images/warning.svg',
    '/images/close.svg',
    '/images/export.svg',
    '/images/intl-icon.svg',
    '/images/back-button.svg',
  ]

  try {
    const cache = await caches.open('gacharary-v2')
    const keys = await cache.keys()
    const cachesUrl = keys.map((i) => i.url)

    const isCacheAlready = urlsToCache.every((url) =>
      cachesUrl.some((cachedUrl) => cachedUrl.includes(url))
    )

    if (isCacheAlready) {
      clearInterval(checkCachesInterval)
      completeLoading()
    }
  } catch (error) {
    console.error('Error checking cache:', error)
  }
}

// Inisialisasi Service Worker
if (process.client && 'serviceWorker' in navigator) {
  navigator.serviceWorker
    .getRegistration()
    .then((registration) => {
      if (registration) {
        registration.update()
        console.log('ServiceWorker updated')
      } else {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            console.log(
              'ServiceWorker registration successful with scope: ',
              registration.scope
            )
          },
          (err) => {
            console.error('ServiceWorker registration failed: ', err)
          }
        )
      }
    })
    .catch((err) => {
      console.error('ServiceWorker error:', err)
    })
}

// Menjalankan pengecekan cache saat komponen dimuat
onMounted(() => {
  checkCachesInterval = setInterval(() => {
    checkCaches()
  }, 1500)
})

// Bersihkan interval saat komponen dihapus
onUnmounted(() => {
  if (checkCachesInterval) {
    clearInterval(checkCachesInterval)
  }
})
</script>

<template>
  <div
    v-if="loading"
    class="w-full max-w-md mx-auto h-screen overflow-hidden bg-[url('~/assets/images/bg-loading.webp')] bg-cover bg-center flex flex-col fixed z-[1000]"
  >
    <div
      class="h-full w-full flex flex-col justify-center items-center text-exd-red"
    >
      <!-- Animasi loading dengan gambar GIF -->
      <img
        src="~/assets/images/gacha-loading.gif"
        alt="Loading"
        class="w-[100px] h-[100px]"
      />
      <!-- Gambar indikator loading tambahan -->
      <img
        src="~/assets/images/loading.png"
        alt="Loading Text"
        class="mt-6 ml-5 w-[126px] h-[24px]"
      />
    </div>
  </div>
</template>
