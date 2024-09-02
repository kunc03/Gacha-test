<template>
  <div
    class="grow bg-[url('assets/images/bg-green.webp')] bg-cover bg-center relative flex flex-col justify-center items-center"
  >
    <img
      :src="gacha2"
      alt="gacha2"
      class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover z-0"
      preload
    />
    <img
      :src="sparkling"
      alt="sparkling"
      class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover z-10 animate-sparkling"
      preload
    />
    <div class="absolute inset-0 px-[1.5rem] flex justify-center z-20">
      <CircleSpinPoint
        class="relative top-1/2 -translate-y-[50%]"
        :imageSrc="pointImageUrl"
      />
    </div>
    <div class="absolute-10 top-1/2 translate-y-[80%]"></div>
    <div class="w-full absolute bottom-0">
      <SolidButton label="次へ" :on-click="handleGoToCharacter" has-bottom />
    </div>
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

const fetchImageFromApi = async () => {
  const token = localStorage.getItem('TOKEN')
  const user = localStorage.getItem('USER')

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

      localStorage.setItem('IS_ALREADY_SPIN', data.is_already_spin)
      localStorage.setItem('LOCATION_ID', data.userPoint.location.id)
      localStorage.setItem('POINT_ID', data.userPoint.point.id)
      localStorage.setItem('POINT_IMAGE', data.userPoint.point.image)
      localStorage.setItem(
        'CHARACTER_ID',
        data.userCollection.gacha_character.id
      )
      localStorage.setItem(
        'CHARACTER_IMAGE',
        data.userCollection.gacha_character.image
      )
      localStorage.setItem('POINT', data.userPoint.point.point.value)

      pointImageUrl.value = data.userPoint.point.image
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

      pointImageUrl.value = data.point.image
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

useHead({
  title: 'Spin Point',
})
</script>

<style scoped>
@keyframes sparkle {
  0%,
  100% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-sparkling {
  opacity: 0.4;
  transform-box: fill-box;
  transform-origin: center center;
  animation: sparkle 1s infinite cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
