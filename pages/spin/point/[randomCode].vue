<template>
  <div
    class="grow bg-[url('assets/images/bg-green.webp')] bg-cover bg-center relative flex flex-col justify-center items-center"
  >
    <img
      :src="gacha2"
      alt="gacha2"
      class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
      preload
    />
    <img
      :src="sparkling"
      alt="sparkling"
      class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover z-10"
      preload
    />
    <div class="absolute rounded-full bg-white bg-contain bg-center z-20">
      <div class="relative h-full w-full flex items-center justify-center">
        <div
          class="relative w-exd-400 h-exd-400 flex flex-col items-center justify-center"
        >
          <img
            :src="pointImageUrl || point"
            alt="10point"
            class="absolute top-10 z-10"
            preload
          />
          <img
            :src="hatchedEgg"
            alt="10point"
            preload
            class="absolute bottom-[40px]"
          />
        </div>
      </div>
    </div>

    <Button
      class="!inset-x-1/2 !z-50 !mb-3 !-translate-x-1/2 !-translate-y-1/4 !absolute !bottom-1 !bg-exd-gold !py-4 !w-exd-312 !uppercase !font-bold !text-exd-1424 !rounded-full !text-white !flex !flex-row !justify-between !px-5"
      raised
      @click="handleGoToCharacter"
    >
      <span class="grow text-center">次へ</span>
      <img
        :src="arrow"
        alt="arrow"
        width="10"
        height="10"
        preload
        class="shrink-0"
      />
    </Button>
  </div>
</template>

<script setup>
import gacha2 from '~/assets/images/gacha2.png'
import sparkling from '~/assets/images/sparkling.svg'
import hatchedEgg from '~/assets/images/hatched-egg.svg'
import arrow from '~/assets/images/arrow.svg'
import point from '~/assets/images/10point.svg'

const router = useRouter()
const route = useRoute()

const pointImageUrl = ref(null)
const apiPoint = ref(null)
const token = localStorage.getItem('TOKEN')
const user = localStorage.getItem('USER')

const fetchImageFromApi = async () => {
  try {
    const storedData = localStorage.getItem('VALID_PASSWORD')

    if (!storedData) {
      console.error('No verified data found in localStorage')
      return
    }

    let parsedData
    try {
      parsedData = JSON.parse(storedData)
    } catch (e) {
      console.error('Error parsing stored data:', e)
      return
    }

    if (token && user) {
      const payload = JSON.parse(localStorage.getItem('VALID_PASSWORD')) || {}

      const { data, status } = await useFetchApi('POST', 'gacha/spin', {
        body: { ...payload },
      })

      localStorage.setItem('IS_ALREADY_SPIN', data.is_already_spin);
      localStorage.setItem('LOCATION_ID', data.userPoint.location.id)
      localStorage.setItem('POINT_ID', data.userPoint.point.id)
      localStorage.setItem('POINT_IMAGE', data.userPoint.point.image)
      localStorage.setItem('CHARACTER_ID', data.userCollection.gacha_character.id)
      localStorage.setItem('CHARACTER_IMAGE', data.userCollection.gacha_character.image)
      localStorage.setItem('POINT', data.userPoint.point.point.value)

      
    } else {
      const { data, error } = await useFetchApi('GET', 'gacha/spin', {
        params: {
          slug: parsedData.slug,
          password: parsedData.password,
        },
      })

      localStorage.setItem('LOCATION_ID', data.location.id)
      localStorage.setItem('POINT_ID', data.point.id)
      localStorage.setItem('POINT_IMAGE', data.point.image)
      localStorage.setItem('CHARACTER_ID', data.character.id)
      localStorage.setItem('CHARACTER_IMAGE', data.character.image)
      localStorage.setItem('POINT', apiPoint.value)
    }

    

    if (error) {
      console.error('Error fetching image:', error)
      return
    }

    
  } catch (e) {
    console.error('Unexpected error:', e)
  }
}

const handleGoToCharacter = () => {
  router.push(`/spin/character`)
}

onMounted(() => {
  fetchImageFromApi()
})
</script>
