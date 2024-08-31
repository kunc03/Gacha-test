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
        <div class="inline-flex gap-3 w-full justify-center my-2">
          <img :src="download" alt="download" class="size-8 cursor-pointer" @click="share('image')" preload />
          <img :src="line" alt="line" class="size-8 cursor-pointer" @click="share('line')" preload />
          <img :src="x" alt="x" class="size-8 cursor-pointer" @click="share('x')" preload />
          <img :src="facebook" alt="facebook" class="size-8 cursor-pointer" @click="share('facebook')" preload />
        </div>
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


const config = useRuntimeConfig();
const marker = ref(null)
const mapContainer = ref(null)
const map = ref(null)
const route = useRoute()
const id = route.params.id
const title = config.public.META_TITLE
const description = config.public.META_DESCRIPTION
const image = config.public.META_IMAGE
const url = config.public.META_URL
const historyDetailData = ref({})
const props = defineProps(['id'])

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

const updateMetaHead = () => {
  useHead({
    title: computed(() => config.public.APP_NAME),

    meta: [
      { name: 'description', content: description },
      // Facebook
      { name: 'og:title', content: title },
      { name: 'og:description', content: description},
      { name: 'og:image', content: image},
      { name: 'og:url', content: url},
      { name: 'og:type', content: 'Website' },

      // twitter
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description},
      { name: 'twitter:image', content: image},
      { name: 'twitter:card', content: 'summary_large_image' },

      // // LINE
      { name: 'line:title', content: title },
      { name: 'line:description', content: description},
      { name: 'line:image', content: image},
      { name: 'line:card', content: 'summary_large_image' },
    ],
  });
}

const share = (type) => {
  switch (type) {
    case "image":
      window.open(historyDetailData.value.character_image) 
      break;
    case "facebook":
      shareToFacebook()
      break;
    case "x":
      shareToX()
      break;
    case "line":
      shareToLine();
      break;
  
    default:
      break;
  }
}

const shareToFacebook = () => {
  try {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(description)}`
    );
  } catch (error) {
    console.log(error);
  }
}

const shareToX = () => {
  try {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(url)}`);
  } catch (error) {
    console.log(error);
  }
}

const shareToLine = () => {
  try {
    window.open(`https://line.me/R/msg/text/?${encodeURIComponent(url)}`);
  } catch (error) {
    console.log(error);
  }
}

onBeforeMount(async () => {
  await loadGoogleMaps()
  fetchingHistoryData()
  updateMetaHead();
})
</script>
