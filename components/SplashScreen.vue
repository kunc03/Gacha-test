<script setup>
const loading = ref(true)
const progress = ref(0)
let loadingInterval
let checkCachesInterval
const config = useRuntimeConfig()

// Init service worker
if (process.client && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(
    (registration) => {
      console.log(
        'ServiceWorker registration successful with scope: ',
        registration.scope
      )
    },
    (err) => {
      console.log('ServiceWorker registration failed: ', err)
    }
  )
}

onMounted(() => {
  let loadingProgress = 0
  loadingInterval = setInterval(() => {
    loadingProgress += 2
    updateProgress(loadingProgress)

    if (loadingProgress >= 90) {
      clearInterval(loadingInterval)
    }
  }, 500)

  checkCachesInterval = setInterval(() => {
    checkCaches()
  }, 1000)
})

function updateProgress(value) {
  progress.value = value
  if (value >= 100) {
    completeLoading()
  }
}

function completeLoading() {
  clearInterval(loadingInterval)
  progress.value = 100
  setTimeout(() => {
    loading.value = false
    progress.value = 0
  }, 1000)
}

const checkCaches = () => {
  caches
    .open('gacharary-v1')
    .then(function (cache) {
      return cache.keys()
    })
    .then(function (keys) {
      if (keys.length === 13) {
        clearInterval(checkCachesInterval)
        setTimeout(() => {
          completeLoading()
        }, 1000)
      }
    })
}
</script>

<template>
  <div
    v-if="loading"
    class="w-full max-w-md mx-auto h-screen overflow-hidden bg-white flex flex-col fixed z-[1000]"
  >
    <div
      class="h-full w-full flex flex-col justify-center items-center text-exd-red"
    >
      <div class="text-xl font-semibold">{{ $t('loadingAllAssets') }}</div>
      <div class="text-lg">{{ $t('pleaseWaitMoment') }}</div>
      <div class="w-full px-12 mt-10">
        <ProgressBar
          :value="progress"
          :showValue="false"
          :pt-options="{ mergeProps: true }"
          :pt="{
            root: { class: '!bg-exd-light-grey' },
            value: {
              class: '!bg-gradient-to-r from-exd-gold to-exd-red-vermilion',
            },
          }"
        ></ProgressBar>
      </div>
    </div>
  </div>
</template>
