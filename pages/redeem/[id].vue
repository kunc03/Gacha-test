<template>
  <Header hasBack>
    <p
      style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
      class="text-exd-gray-scorpion font-bold text-exd-1824.52"
    >
      景品一覧・交換
    </p>
  </Header>
  <div class="flex flex-col bg-center text-black mt-[30%] px-8">
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <div
        class="w-full h-80 relative bg-[url('assets/images/bg-orange-image.png')] bg-cover bg-center"
      >
        <img
          :src="prizeDetailData.image"
          alt="duck"
          class="absolute left-1/2 top-[45%] md:top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 object-scale-down"
          preload
        />
      </div>
      <div class="mt-5 p-5 flex flex-col justify-between">
        <div class="flex flex-col gap-2">
          <div class="inline-flex justify-between w-full">
            <p class="font-bold text-exd-1424 text-exd-gray-scorpion max-w-40">
              {{ prizeDetailData.name }}
            </p>
            <p
              class="font-bold text-exd-1824.52 text-exd-orange-700 flex items-end"
            >
              {{ prizeDetailData.point }}pt
            </p>
          </div>
          <div class="flex flex-col gap-2 mb-2">
            <div class="w-full h-5 bg-exd-gray-44 pl-3">
              <p class="text-white text-exd-1220 font-bold">景品獲得方法</p>
            </div>
            <p class="text-exd-gray-scorpion font-medium text-exd-1218">
              {{ prizeDetailData.how_to_win }}
            </p>
          </div>

          <div class="flex flex-col gap-2 mb-2">
            <div class="w-full h-5 bg-exd-gray-44 pl-3">
              <p class="text-white text-exd-1220 font-bold">利用条件</p>
            </div>
            <p class="text-exd-gray-scorpion font-medium text-exd-1218">
              {{ prizeDetailData.terms_of_use }}
            </p>
          </div>
          <div class="w-full mb-5">
            <div ref="map" style="width: 100%; height: 300px"></div>
          </div>
        </div>

        <Button
          class="!bg-exd-gold !py-4 !w-full !h-12 !uppercase !font-bold !text-exd-1424 !rounded-full !text-white !flex !flex-row !justify-between !px-5 mx-auto"
          raised
          @click="handleToggleModal"
        >
          <span class="grow text-center">交換</span>
          <img :src="arrow" alt="warning" width="10" height="10" preload />
          
        </Button>
      </div>
    </div>
  </div>

  <Dialog
    v-model:visible="hasModal"
    modal
    class="!bg-white w-11/12 md:!w-4/12 !max-w-sm border border-exd-gray-44"
  >
    <template #container>
      <img
        :src="close"
        alt="close"
        width="30"
        height="30"
        preload
        class="absolute right-1 top-1 cursor-pointer z-50"
        @click="handleToggleModal"
      />

      <div
        class="w-full flex flex-col justify-center items-center gap-4 p-6 mt-2"
      >
        <p
          class="text-exd-gray-scorpion font-bold text-center text-exd-1424 max-w-36"
          style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
        >
          この景品は観光案内所で 交換となります
        </p>
        <Button
          class="!bg-exd-gold !py-4 !w-full !h-12 !uppercase !font-bold !text-exd-1424 !rounded-full !text-white !flex !flex-row !justify-between !px-5 mx-auto"
          raised
          @click="handleGoToClaim"
        >
          <span class="grow text-center">到着しました</span>
          <img :src="arrow" alt="warning" width="10" height="10" preload />
        </Button>
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import duck from '~/assets/images/duck.svg'
import close from '~/assets/images/close.svg'
import arrow from '~/assets/images/arrow.svg'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

definePageMeta({
  middleware: 'auth',
  layout: 'with-bottom-bar',
})

useHead({
  title: 'Redeem',
})

const loadGoogleMaps = () => {
  return new Promise((resolve, reject) => {
    if (window.google) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCr-_CN0BNZ53YPzV5TwP8KBpR1td2foCg&libraries=places&language=ja&region=ja`
    script.async = true
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        loadGoogleMaps();
        fetchingPrizeData();
        // initializeMap(position.coords.latitude, position.coords.longitude)
      },
      (error) => {
        console.error('Error Code = ' + error.code + ' - ' + error.message)
      }
    )
  } else {
    console.error('Geolocation is not supported by this browser.')
  }
}

const hasModal = ref(false)
const route = useRoute()
const router = useRouter()
const handleToggleModal = () => (hasModal.value = !hasModal.value)
const handleGoToClaim = () => router.push(`/claim/${route.params.id}`)
const prizeDetailData = ref({})
const id = route.params.id
const map = ref(null)

const fetchingPrizeData = async () => {
  try {
    const { data } = await useFetchApi('GET', 'prizes/' + id)
    prizeDetailData.value = data
    if (data.lat != null && data.lng != null) {
      initializeMap(data.lat, data.lng);
    }
  } catch (error) {
    console.log(error)
  }
}

const initializeMap = async (lat, long) => {
  const mapOptions = {
    center: { lat: lat, lng: long },
    zoom: 15,
    disableDefaultUI: true, // Disables all default controls like zoom and map type
    draggable: false, // Disables dragging of the map
    scrollwheel: false, // Disables zooming with the mouse scroll
    disableDoubleClickZoom: true, // Disables zooming by double-clicking
    zoomControl: false, // Disables zoom control buttons
    mapTypeControl: false, // Disables map type control (e.g., satellite vs. roadmap)
    streetViewControl: false, // Disables street view control
    fullscreenControl: false, // Disables fullscreen control
  }
  map.value = new google.maps.Map(map.value, mapOptions)

  new google.maps.Marker({
    position: { lat: lat, lng: long },
    map: map.value,
  })
}

onMounted(() => {
  getLocation();
})
</script>
