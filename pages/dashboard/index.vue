<template>
  <Header hasBack>
    <p
      style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
      class="text-exd-gray-scorpion font-bold text-exd-1824.52"
    >
      マイページ
    </p>
  </Header>
  <div class="flex flex-col bg-center">
    <div class="flex flex-col mt-[40%] items-center">
      <p class="text-white text-exd-2856 font-bold">現在のポイント</p>
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
        <p class="text-exd-gray-scorpion text-exd-1424 font-bold">
          景品一覧・交換
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
        <p class="text-exd-gray-scorpion text-exd-1424 font-bold">
          コレクション
        </p>
      </div>
    </div>
    <div
      class="mt-5 bg-white w-exd-312 h-exd-50 mx-auto rounded-tl-xl rounded-tr-xl px-5 inline-flex justify-between items-center"
      style="box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1608)"
    >
      <p class="text-exd-gray-scorpion grow">会員情報</p>
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
        ヘルプ・お問い合わせ
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
      class="bg-white w-exd-312 h-exd-50 mx-auto rounded-bl-xl rounded-br-xl px-5 inline-flex justify-between items-center"
      style="box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1608)"
    >
      <p class="text-exd-gray-scorpion grow inline-flex items-center gap-1">
        デジタルマップへ
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
    <p
      class="underline text-white text-exd-1218 font-semibold text-center mt-5"
    >
      ホーム画面に追加
    </p>
    <div
      class="bg-exd-neutral-400 w-exd-312 h-exd-50 mx-auto px-5 inline-flex justify-between items-center mt-7 cursor-pointer"
      @click="logout"
    >
      <p
        class="text-white grow inline-flex items-center justify-center font-bold text-exd-1424"
      >
        <!-- バナーリンク -->
        ログアウト
      </p>
    </div>
  </div>
</template>

<script setup>
import iconStar from '~/assets/images/icon-star.svg'
import iconGift from '~/assets/images/icon-gift.svg'
import arrow from '~/assets/images/arrow.svg'
import exportIcon from '~/assets/images/export.svg'
import { useRouter } from 'vue-router'
import { store } from '~/stores/dashboard.js'

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

const logout = async () => {
  try {
    const { data, status } = await useFetchApi('POST', 'logout');
    
    if (status) {
      localStorage.clear();
      navigateTo('/');
    }
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  store.fetchingDashboardData()
})
</script>
