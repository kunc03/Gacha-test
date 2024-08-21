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
          :src="historyDetailData.character_image != null ? historyDetailData.character_image : duck"
          alt="duck"
          class="absolute left-1/2 top-[45%] md:top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 object-scale-down"
          preload
        />
      </div>
      <div class="p-5 flex flex-col gap-2">
        <div class="inline-flex justify-between w-full">
          <p class="font-bold text-exd-1424 text-exd-gray-scorpion">
            {{ historyDetailData.location_name }}
          </p>
          <p class="font-bold text-exd-1824.52 text-exd-gold">{{ historyDetailData.point_amount }}pt</p>
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
            <p class="text-white text-exd-1220 font-bold">{{ historyDetailData.location_name }}</p>
          </div>
          <p class="text-exd-gray-scorpion font-medium text-exd-1218">
            {{ historyDetailData.location_description }}
          </p>
        </div>
        <div class="w-full">
          <div id="map" ref="mapContainer" class="map-container"></div>
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
import { useRoute } from 'nuxt/app';
import mapboxgl from 'mapbox-gl';

definePageMeta({
  layout: 'with-bottom-bar',
})

useHead({
  title: 'History',
})

const props = defineProps(["id"])

const historyDetailData = ref({});
const map = ref(null);
const marker = ref(null);
const mapContainer = ref(null);

const route = useRoute();
const id = route.params.id

const fetchingHistoryData = async () => {
  try {
    const { data } = await useFetchApi('GET', 'history/'+id)
    historyDetailData.value = data
    console.log(historyDetailData.value)
    let lat = historyDetailData.value.latitude;
    let long = historyDetailData.value.longitude;
  
    initializeMap(lat, long);

  } catch (error) {
    console.log(error)
  }
}

const initializeMap = async (lat, long) => {
      mapboxgl.accessToken = 'pk.eyJ1IjoiaXJmYW5zeWFoMDIiLCJhIjoiY2x6aTZheXp1MDliYTJqcHFmaWZlN2hraCJ9.vQeo8YYTIH94loWw0ONoJw';

      map = new mapboxgl.Map({
        container: mapContainer.value,
        style: 'mapbox://styles/mapbox/streets-v11?language=ja',
        center: [long, lat],
        zoom: 12,
        attributionControl: false
      });

      marker = new mapboxgl.Marker()
        .setLngLat([long, lat])
        .addTo(map);

      // Change labels to Japanese
      map.on('style.load', () => {
        map.setLayoutProperty('country-label', 'text-field', ['get', 'name_ja']);
        map.setLayoutProperty('place-city-lg-n', 'text-field', ['get', 'name_ja']);
        map.setLayoutProperty('place-city-md-s', 'text-field', ['get', 'name_ja']);
        map.setLayoutProperty('place-city-sm', 'text-field', ['get', 'name_ja']);
      });
    };

onMounted(() => {
  fetchingHistoryData()
})

</script>
