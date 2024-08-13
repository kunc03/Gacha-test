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
          :src="duck"
          alt="duck"
          class="absolute left-1/2 top-[45%] md:top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 object-scale-down"
          preload
        />
      </div>
      <div class="p-5 flex flex-col justify-between">
        <div class="flex flex-col gap-2">
          <div class="inline-flex justify-between w-full">
            <p class="font-bold text-exd-1424 text-exd-gray-scorpion max-w-40">
              名古屋観光特使ぴよりんの オリジナルステッカー
            </p>
            <p
              class="font-bold text-exd-1824.52 text-exd-orange-700 flex items-end"
            >
              20pt
            </p>
          </div>
          <div class="flex flex-col gap-2 mb-2">
            <div class="w-full h-5 bg-exd-gray-44 pl-3">
              <p class="text-white text-exd-1220 font-bold">景品獲得方法</p>
            </div>
            <p class="text-exd-gray-scorpion font-medium text-exd-1218">
              ダミーダミーダミーダミーダミーダミーダミー
              ダミーダミーダミーダミーダミーダミーダミー
            </p>
          </div>

          <div class="flex flex-col gap-2 mb-2">
            <div class="w-full h-5 bg-exd-gray-44 pl-3">
              <p class="text-white text-exd-1220 font-bold">利用条件</p>
            </div>
            <p class="text-exd-gray-scorpion font-medium text-exd-1218">
              ダミーダミーダミーダミーダミーダミーダミー
              ダミーダミーダミーダミーダミーダミーダミー
            </p>
          </div>
          <div class="w-full">
            <div id="map" ref="mapContainer" class="map-container"></div>
          </div>
        </div>

        <Button
          class="!bg-exd-gold !py-4 !w-full !h-12 !uppercase !font-bold !text-exd-1424 !rounded-full !text-white !flex !flex-row !justify-between !px-5 mx-auto"
          raised
          @click="handleToggleModal"
        >
          <span class="grow text-center">交換</span>
          <NuxtImg
            src="/arrow.svg"
            alt="arrow"
            width="10"
            height="10"
            preload
            class="shrink-0"
          />
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
          <NuxtImg
            src="/arrow.svg"
            alt="arrow"
            width="10"
            height="10"
            preload
            class="shrink-0"
          />
        </Button>
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import duck from '~/assets/images/duck.svg'
import close from '~/assets/images/close.svg'
import { useRouter } from 'vue-router'

definePageMeta({
  middleware: 'auth',
  layout: 'with-bottom-bar',
})

useHead({
  title: 'Redeem',
})

const initializeMap = async (lat, long) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiaXJmYW5zeWFoMDIiLCJhIjoiY2x6aTZheXp1MDliYTJqcHFmaWZlN2hraCJ9.vQeo8YYTIH94loWw0ONoJw'

  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/mapbox/streets-v11?language=ja',
    center: [long, lat],
    zoom: 12,
    attributionControl: false,
  })

  marker = new mapboxgl.Marker().setLngLat([long, lat]).addTo(map)

  // Change labels to Japanese
  map.on('style.load', () => {
    map.setLayoutProperty('country-label', 'text-field', ['get', 'name_ja'])
    map.setLayoutProperty('place-city-lg-n', 'text-field', ['get', 'name_ja'])
    map.setLayoutProperty('place-city-md-s', 'text-field', ['get', 'name_ja'])
    map.setLayoutProperty('place-city-sm', 'text-field', ['get', 'name_ja'])
  })
}

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        initializeMap(position.coords.latitude, position.coords.longitude)
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
const router = useRouter()
const handleToggleModal = () => (hasModal.value = !hasModal.value)
const handleGoToClaim = () => router.push('/claim')

onMounted(() => {
  getLocation()
})
</script>
