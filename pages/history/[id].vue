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
        <p class="font-medium text-exd-1218 text-exd-gray-scorpion mb-4">
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

const props = defineProps(['id'])

const updateMeta = (title, description, image, url) => {
  // useHead({
  //   title: title || 'title',
  //   meta: [
  //     { property: 'og:type', content: 'website' },
  //     { property: 'og:site_name', content: 'Gacha' },
  //     { property: 'og:description', content: description || 'Description' },
  //     { property: 'og:title', content: title || 'History' },
  //     { property: 'og:image', content: image || 'Character image' },
  //     { property: 'og:site', content: url }
  //   ],
  // })
  useSeoMeta({
    title: title || 'title',
    ogTitle: title || 'title',
    description: description || 'Description',
    ogDescription: description || 'Description',
    ogImage: image,
    twitterCard: image,
  })
}

const marker = ref(null)
const mapContainer = ref(null)
const historyDetailData = ref({})
const map = ref(null)
const route = useRoute()
const id = route.params.id

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

const fetchingHistoryData = async () => {
  try {
    const { data } = await useFetchApi('GET', 'history/' + id)
    historyDetailData.value = data
    let lat = historyDetailData.value.latitude
    let long = historyDetailData.value.longitude

    if (lat != undefined && long != undefined) {
      initializeMap(lat, long)      
    }
    let title = historyDetailData.value.character_name;
    let description = historyDetailData.value.character_description;
    let image = historyDetailData.value.character_image;
    let website = window.location.href;

    updateMeta(title, description, image, website)

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
