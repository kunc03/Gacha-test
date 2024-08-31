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
    <div
      class="max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden"
    >
      <div class="h-72 w-full overflow-hidden">
        <Skeleton v-if="isFetching" class="!w-full !h-full"></Skeleton>
        <CharacterCard v-else :image="prizeDetailData.image" />
      </div>
      <div class="p-5 flex flex-col justify-between w-full">
        <div class="flex flex-col gap-4">
          <div class="inline-flex justify-between w-full gap-3">
            <Skeleton v-if="isFetching" class="!h-3" width="15rem"></Skeleton>
            <p
              v-else
              class="font-bold text-exd-1424 text-exd-gray-scorpion max-w-40"
            >
              {{ prizeDetailData.name }}
            </p>
            <Skeleton
              v-if="isFetching"
              class="!h-3 !rounded-full !bg-exd-orange-700"
              width="2rem"
            ></Skeleton>
            <p
              v-else
              class="font-bold text-exd-1824.52 text-exd-orange-700 flex items-end"
            >
              {{ prizeDetailData.point }}pt
            </p>
          </div>

          <HeadingSection
            :is-fetching="isFetching"
            title="景品獲得方法"
            :body="prizeDetailData.how_to_win"
          />

          <HeadingSection
            :is-fetching="isFetching"
            title="利用条件"
            :body="prizeDetailData.terms_of_use"
          />

          <div class="w-full mb-5">
            <Skeleton v-if="isFetching" class="!w-full !h-72" />
            <div
              v-show="!isFetching"
              ref="map"
              style="width: 100%; height: 300px"
            />
          </div>
        </div>
      </div>
      <SolidButton
        :disabled="disableRedeem || isFetching"
        :label="disableRedeem ? '交換できません' : '交換'"
        :on-click="handleToggleModal"
        has-bottom
      />
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
        class="w-full flex flex-col justify-center items-center gap-4 px-6 py-8 mt-2"
      >
        <p
          class="text-exd-gray-scorpion font-bold text-center text-exd-1424 max-w-36"
          style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
        >
          この景品は観光案内所で 交換となります
        </p>
      </div>
      <SolidButton
        label="到着しました"
        :on-click="handleGoToClaim"
        has-bottom
      />
    </template>
  </Dialog>
</template>

<script setup>
import close from '~/assets/images/close.svg'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { store } from '~/stores/dashboard.js'

definePageMeta({
  middleware: 'auth',
  layout: 'with-bottom-bar',
})

useHead({
  title: 'Redeem',
})

const hasModal = ref(false)
const route = useRoute()
const router = useRouter()
const handleToggleModal = () => (hasModal.value = !hasModal.value)
const handleGoToClaim = () => router.push(`/claim/${route.params.id}`)
const prizeDetailData = ref({})
const id = route.params.id
const map = ref(null)
const isFetching = ref(true)
const disableRedeem = ref(false)
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

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
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

const fetchingPrizeData = async () => {
  try {
    isFetching.value = true
    const { data } = await useFetchApi('GET', 'prizes/' + id)
    prizeDetailData.value = data
    checkPoint(data.point)
    if (data.lat !== null && data.long !== null) {
      initializeMap(data.lat, data.long)
    }
  } catch (error) {
    console.log(error)
  } finally {
    isFetching.value = false
  }
}

const checkPoint = (point) => {
  try {
    const currentPoint = store.point
    if (currentPoint < point) {
      disableRedeem.value = true
    }
  } catch (error) {}
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

onMounted(async () => {
  getLocation()
  await loadGoogleMaps()
  fetchingPrizeData()
})
</script>
