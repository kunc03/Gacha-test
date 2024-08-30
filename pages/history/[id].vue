<template>
  <Header hasBack>
    <p
      style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
      class="text-exd-gray-scorpion font-bold text-exd-1824.52"
    >
      コレクション
    </p>
  </Header>
  <div class="flex flex-col bg-center text-black mt-[30%] px-8 gap-3">
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <div
        class="w-full h-80 relative bg-[url('assets/images/bg-orange-image.png')] bg-cover bg-center"
      >
        <img
          :src="
            historyDetailData.character_image != null
              ? historyDetailData.character_image
              : duck
          "
          alt="duck"
          class="absolute left-1/2 top-[45%] md:top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 object-scale-down"
          preload
        />
      </div>
      <div class="p-5 flex flex-col gap-2">
        <div class="inline-flex justify-between w-full">
          <p class="font-bold text-exd-1424 text-exd-gray-scorpion">
            {{ historyDetailData.character_name }}
          </p>
          <p class="font-bold text-exd-1824.52 text-exd-gold">
            {{ historyDetailData.point_amount }}pt
          </p>
        </div>
        <p
          class="font-medium text-exd-1218 text-exd-gray-scorpion mb-4 text-word-wrap"
        >
          {{ historyDetailData.character_description }}
        </p>
        <!-- <div class="inline-flex gap-3 w-full justify-center">
          <img :src="download" alt="download" class="size-8" preload />
          <img :src="line" alt="line" class="size-8" preload />
          <img :src="x" alt="x" class="size-8" preload />
          <img :src="facebook" alt="facebook" class="size-8" preload />
        </div> -->
        <div class="flex flex-col gap-2 mb-2">
          <div class="w-full h-5 bg-exd-gray-44 pl-3">
            <p class="text-white text-exd-1220 font-bold">
              {{ historyDetailData.location_name }}
            </p>
          </div>
          <p
            class="text-exd-gray-scorpion font-medium text-exd-1218 text-word-wrap"
          >
            {{ historyDetailData.location_description }}
          </p>
        </div>
        <div class="w-full">
          <div ref="map" style="width: 100%; height: 300px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import duck from '~/assets/images/duck.svg'
import download from '~/assets/images/download.svg'
import facebook from '~/assets/images/facebook.svg'
import line from '~/assets/images/line.svg'
import x from '~/assets/images/x.svg'
import maps from '~/assets/images/maps.svg'
import { useRoute } from 'nuxt/app'

definePageMeta({
  layout: 'with-bottom-bar',
})

const historyDetailData = ref({})
const props = defineProps(['id'])

const title = ' Gacharary'
const description = 'なごやぐるっとガチャラリー」でキャラクターをGETしたよ！'
const image =
  'https://admin.per.talenavi.com/storage/01J6DX61TB29Z27K7ZXS0B9J7Y.png'
const url = 'https://www.pixiv.net/artworks/121122327'

useHead({
  title: computed(() => historyDetailData.value.character_name),

  meta: [
    { name: 'description', content: 'description' },
    // Facebook
    { name: 'og:title', content: 'Gacharary' },
    {
      name: 'og:description',
      content: 'なごやぐるっとガチャラリー」でキャラクターをGETしたよ！',
    },
    {
      name: 'og:image',
      content:
        'https://admin.per.talenavi.com/storage/01J6DX61TB29Z27K7ZXS0B9J7Y.png',
    },
    { name: 'og:url', content: 'https://www.pixiv.net/artworks/121122327' },
    { name: 'og:type', content: 'Website' },

    // twitter
    { name: 'fb:app_id', content: 'YOUR_FACEBOOK_APP_ID' },
    { name: 'twitter:title', content: 'Gacharary' },
    {
      name: 'twitter:description',
      content: 'なごやぐるっとガチャラリー」でキャラクターをGETしたよ！',
    },
    {
      name: 'twitter:image',
      content:
        'https://admin.per.talenavi.com/storage/01J6DX61TB29Z27K7ZXS0B9J7Y.png',
    },
    { name: 'twitter:card', content: 'summary_large_image' },

    // // LINE
    { name: 'line:card', content: 'summary_large_image' },
    { name: 'line:title', content: 'Gacharary' },
    {
      name: 'line:description',
      content: 'なごやぐるっとガチャラリー」でキャラクターをGETしたよ！',
    },
    {
      name: 'line:image',
      content:
        'https://admin.per.talenavi.com/storage/01J6DX61TB29Z27K7ZXS0B9J7Y.png',
    },
  ],
})

const marker = ref(null)
const mapContainer = ref(null)
const map = ref(null)
const route = useRoute()
const id = route.params.id
const config = useRuntimeConfig()

const loadGoogleMaps = () => {
  return new Promise((resolve, reject) => {
    if (window.google) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${config.public.GOOGLE_API}&libraries=places&language=ja&region=ja`
    script.async = true
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

const fetchingHistoryData = async () => {
  try {
    const { data } = await useFetchApi('GET', 'history/' + id)
    historyDetailData.value = data
    let lat = historyDetailData.value.lat
    let long = historyDetailData.value.long

    console.log(historyDetailData.value)
    if (lat != undefined && long != undefined) {
      initializeMap(lat, long)
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

onBeforeMount(async () => {
  await loadGoogleMaps()
  fetchingHistoryData()
})
</script>
