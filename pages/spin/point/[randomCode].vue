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
    <div
      class="left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 absolute bg-[url('assets/images/circle-white.svg')] bg-contain bg-center w-full h-full md:h-1/2 bg-no-repeat"
    >
      <div class="relative h-full w-full flex items-center justify-center">
        <div class="relative w-exd-400 h-exd-400">
          <img
            :src="apiImageUrl"
            alt="10point"
            class="absolute w-3/4 object-fill h-56 left-1/2 top-[40%] md:top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            preload
          />
          <img
            :src="hatchedEgg"
            alt="10point"
            preload
            class="absolute -bottom-8 small:-bottom-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[30%] object-scale-down"
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

const router = useRouter()
const route = useRoute()

const apiImageUrl = ref(null)

const fetchImageFromApi = async () => {
  const storedData = localStorage.getItem('VALID_PASSWORD')

  if (!storedData) {
    console.error('Tidak ada data yang diverifikasi ditemukan di localStorage')
    return
  }

  const parsedData = JSON.parse(storedData)

  const { data, error } = await useAsyncData('gachaData', () =>
    $fetch('https://admin.per.talenavi.com/api/gacha/spin', {
      params: {
        slug: parsedData.slug,
        password: parsedData.password,
      },
    })
  )

  if (error.value) {
    console.error('Error fetching image:', error.value)
    return
  }

  apiImageUrl.value = data.value.data.point.image
}

onMounted(fetchImageFromApi)

const handleGoToCharacter = () =>
  router.push(`/spin/character/${route.params.randomCode}`)
</script>
