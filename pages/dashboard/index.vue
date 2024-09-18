<template>
  <HeaderBar hasBack>
    <p
      style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
      class="text-exd-gray-scorpion font-bold text-exd-1824.52"
    >
      {{ $t('myPage') }}
    </p>
  </HeaderBar>
  <div class="flex flex-col bg-center">
    <div class="flex flex-col mt-[40%] items-center">
      <p class="text-white text-exd-2856 font-bold">
        {{ $t('currentPoints') }}
      </p>
      <p class="text-white text-exd-56112 font-bold relative -top-7">
        {{ store.point }}<span class="text-exd-1020">pt</span>
      </p>
    </div>

    <div class="inline-flex gap-4 items-center justify-center">
      <div
        class="bg-white rounded-xl p-6 w-exd-148 h-exd-130 flex flex-col justify-center items-center cursor-pointer"
        style="box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1608)"
        @click="handleGoToRedeem"
      >
        <img
          :src="iconStar"
          alt="icon-star"
          width="60"
          height="60"
          preload
          class="text-center cursor-pointer"
        />
        <p class="text-exd-gray-scorpion text-exd-1424 font-bold text-center">
          {{ $t('listOfPrizesAndExchanges') }}
        </p>
      </div>
      <div
        class="bg-white rounded-xl p-6 w-exd-148 h-exd-130 flex flex-col justify-center items-center"
        style="box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1608)"
        @click="handleGoToHistory"
      >
        <img
          :src="iconGift"
          alt="icon-gift"
          width="60"
          height="60"
          preload
          class="text-center cursor-pointer"
        />
        <p class="text-exd-gray-scorpion text-exd-1424 font-bold text-center">
          {{ $t('collection') }}
        </p>
      </div>
    </div>
    <div
      class="mt-5 bg-white w-exd-312 h-exd-50 mx-auto rounded-tl-xl rounded-tr-xl px-5 inline-flex justify-between items-center cursor-pointer"
      style="box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1608)"
      @click="profile"
    >
      <p class="text-exd-gray-scorpion grow">
        {{ $t('membershipInformation') }}
      </p>
      <img
        :src="arrow"
        alt="arrow"
        width="12"
        height="12"
        preload
        class="invert"
      />
    </div>
    <div
      class="bg-white w-exd-312 h-exd-50 mx-auto px-5 inline-flex justify-between items-center"
      style="box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1608)"
    >
      <p class="text-exd-gray-scorpion grow inline-flex items-center gap-1">
        {{ $t('helpAndInquiries') }}
        <span>
          <img :src="exportIcon" alt="export" width="20" height="20" preload
        /></span>
      </p>
      <img
        :src="arrow"
        alt="arrow"
        width="12"
        height="12"
        preload
        class="invert"
      />
    </div>
    <div
      class="bg-white w-exd-312 h-exd-50 mx-auto px-5 inline-flex justify-between items-center"
      style="box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1608)"
    >
      <p class="text-exd-gray-scorpion grow inline-flex items-center gap-1">
        {{ $t('toTheDigitalMap') }}
        <span>
          <img :src="exportIcon" alt="export" width="20" height="20" preload
        /></span>
      </p>
      <img
        :src="arrow"
        alt="arrow"
        width="12"
        height="12"
        preload
        class="invert"
      />
    </div>
    <div
      class="bg-white w-exd-312 h-exd-50 mx-auto rounded-bl-xl rounded-br-xl px-5 inline-flex justify-between items-center cursor-pointer"
      style="box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1608)"
      @click="logout"
    >
      <p class="text-exd-gray-scorpion grow inline-flex items-center gap-1">
        {{ $t('logout') }}
      </p>
      <img
        :src="arrow"
        alt="arrow"
        width="12"
        height="12"
        preload
        class="invert"
      />
    </div>
    <p
      class="underline text-white text-exd-1218 font-semibold text-center mt-5"
    >
      {{ $t('addToHomeScreen') }}
    </p>
    <div
      class="w-exd-312 h-exd-50 mx-auto inline-flex justify-between items-center mt-7"
    >
      <!-- <p
        class="text-white grow inline-flex items-center justify-center font-bold text-exd-1424"
      >
        {{ $t('bannerLink') }}
      </p> -->

      <Swiper
        :spaceBetween="30"
        :centeredSlides="true"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
        :pagination="{
          clickable: true,
        }"
        :navigation="false"
        :modules="[Autoplay, Pagination, Navigation]"
        class="mySwiper"
      >
        <SwiperSlide v-for="item in bannerList">
          <a :href="item.link" target="_blank">
            <img :src="item.image" />
          </a>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>

  <Dialog
    v-model:visible="isNotAllowed"
    modal
    class="!bg-white !w-11/12 !max-w-sm border border-exd-gray-44"
  >
    <template #container>
      <img
        :src="close"
        alt="close"
        width="30"
        height="30"
        preload
        class="absolute right-1 top-1 cursor-pointer z-50"
        @click="handleClose"
      />
      <div
        class="w-full flex flex-col justify-center items-center gap-4 py-6 px-6"
      >
        <img :src="warning" alt="warning" width="40" height="40" preload />
        <div class="text-center w-10/12">
          <p class="font-bold text-exd-1424 text-exd-gray-scorpion">
            {{ errorMessages }}
          </p>
        </div>
        <!-- <SolidButton label="ガチャTOP" :on-click="() => goTo('/dashboard')" /> -->
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import iconStar from '~/assets/images/icon-star.svg'
import iconGift from '~/assets/images/icon-gift.svg'
import arrow from '~/assets/images/arrow.svg'
import exportIcon from '~/assets/images/export.svg'
import { useRouter } from 'vue-router'
import { store } from '~/stores/dashboard.js'
import close from '~/assets/images/close.svg'
import warning from '~/assets/images/warning.svg'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const router = useRouter()

definePageMeta({
  middleware: 'auth',
  layout: 'with-bottom-bar',
})

useHead({
  title: 'Dashboard',
})

const handleGoToHistory = () => router.push('/history')
const handleGoToRedeem = () => router.push('/redeem')
const profile = () => router.push('/profile')

const TOKEN = useCookie('TOKEN')
const USER = useCookie('USER')

const isNotAllowed = ref(false)
const errorMessages = ref('')
const bannerList = ref([
  { image: '/images/banner_01.jpg', link: 'https://www.yabaton.com/' },
  { image: '/images/banner_02.jpg', link: 'https://www.koushoji.or.jp/' },
  { image: '/images/banner_03.jpg', link: 'https://www.maruya-honten.com/' },
  {
    image: '/images/banner_04.jpg',
    link: 'https://www.nagoya-tv-tower.co.jp/',
  },
  {
    image: '/images/banner_05.jpg',
    link: 'https://www.tokyuhotels.co.jp/nagoya-h/index.html',
  },
  { image: '/images/banner_06.jpg', link: 'https://www.kani-honke.co.jp/' },
  { image: '/images/banner_07.jpg', link: 'https://nagoya.nikkostyle.jp/' },
  {
    image: '/images/banner_08.jpg',
    link: 'https://www.nagoya-info.jp/accommodation/detail/115/',
  },
])

const handleClose = () => {
  isNotAllowed.value = false
  localStorage.removeItem('login_after_spin')
}

const logout = async () => {
  try {
    const { data, status } = await useFetchApi('POST', 'logout')

    localStorage.clear()
    TOKEN.value = null
    USER.value = null
    await navigateTo('/')
  } catch (error) {
    localStorage.clear()
    TOKEN.value = null
    USER.value = null
    await navigateTo('/')
    console.log(error)
  }
}

const getLocalStorageItem = (key) => {
  try {
    return localStorage.getItem(key)
  } catch (error) {
    console.error(`Error accessing localStorage for key "${key}":`, error)
    return null
  }
}

const checkSpinEligibility = async () => {
  await new Promise((resolve) => setTimeout(resolve, 0))

  const isAlreadySpin = getLocalStorageItem('IS_ALREADY_SPIN')
  const loginAfterSpin = getLocalStorageItem('login_after_spin')
  const message =
    '1日に2回以上ガチャがプレイされました。同じスポットでは1日に1回しかポイントが貯まりません。'

  if (isAlreadySpin == 'true' && loginAfterSpin == 'true') {
    errorMessages.value = message
    isNotAllowed.value = true
  }
}

onMounted(() => {
  checkSpinEligibility()
})
</script>

<style>
.swiper {
  width: 100%;
  height: 100px;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  object-fit: cover;
}

.swiper-pagination-bullet.swiper-pagination-bullet-active {
  background: white;
}

.swiper-pagination {
  top: 78px !important;
}
</style>
