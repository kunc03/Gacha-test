<template>
  <Header hasBack>
    <p
      style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
      class="text-exd-gray-scorpion font-bold text-exd-1824.52"
    >
      景品一覧・交換
    </p>
  </Header>
  <div class="flex flex-col mt-[30%] grow">
    <p
      class="text-exd-gray-scorpion text-exd-1424 text-center font-bold max-w-44 mx-auto"
    >
      スタッフにこの画面を見せて スワイプしてください
    </p>
    <div
      class="bg-exd-banana grow mt-9 flex flex-col py-8 px-7 justify-between"
    >
      <div class="flex flex-col gap-5">
        <div class="h-64 bg-white w-80 rounded-lg relative mx-auto">
          <Skeleton v-if="isFetching" class="!w-full !h-full" />

          <CharacterCard
            v-else
            :image="prizeDetailData.image"
            variant="without-background"
          />
        </div>
        <div class="flex flex-col gap-4">
          <div class="inline-flex justify-between w-full">
            <Skeleton v-if="isFetching" class="!h-3" width="15rem"></Skeleton>
            <p
              v-else
              class="font-bold text-exd-1424 text-exd-gray-scorpion max-w-40"
            >
              {{ prizeDetailData.name }}
            </p>

            <Skeleton
              v-if="isFetching"
              class="!h-3 !bg-exd-orange-700 !rounded-full"
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
        </div>
      </div>
      <!-- <swipeButton text="スワイプ" @submit="handleSwipe" color="#d7a237" /> -->
      <button
        class="cssbuttons-io-button mt-8 mb-8"
        :class="{ 'is-clicked': isClicked }"
        :disabled="disableSwipe"
        @click="handleSwipe"
      >
        <div class="icon">
          <svg
            width="13"
            height="22"
            viewBox="0 0 13 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.50049 2.00153L10.5 11.0005L1.50049 19.9996"
              stroke="#D7A237"
              stroke-width="3"
            />
          </svg>
        </div>
        <p class="w-full">スワイプ</p>
      </button>
    </div>
  </div>

  <Dialog
    v-model:visible="isRedeemDialogVisible"
    modal
    class="!bg-white !w-exd-300 h-exd-200 !max-w-sm border border-exd-gray-44 rounded-xl"
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
        class="w-full h-full flex flex-col justify-end items-center gap-4 p-5"
      >
        <div class="w-full flex flex-col justify-center items-center gap-8">
          <p class="font-bold text-exd-1424 text-exd-gray-scorpion">
            {{ redeemMessage }}
          </p>

          <SolidButton
            :on-click="() => handleDialog"
            :has-loading="isLoading"
            label="GO!"
          />
        </div>
      </div>
    </template>
  </Dialog>

  <Dialog
    v-model:visible="insufficientDialogVisible"
    modal
    class="!bg-white !w-exd-300 h-exd-200 !max-w-sm border border-exd-gray-44 rounded-xl"
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
        class="w-full h-full flex flex-col justify-center items-center gap-4 p-5"
      >
        <div class="w-full flex flex-col justify-center items-center gap-8">
          <img :src="warning" alt="warning" width="40" height="40" preload />
          <p class="font-bold text-exd-1424 text-exd-gray-scorpion">
            {{ errorMessage }}
          </p>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import 'vue3-swipe-button/dist/swipeButton.css'
import { useRouter } from 'vue-router'
import warning from '~/assets/images/warning.svg'
import close from '~/assets/images/close.svg'

definePageMeta({
  middleware: 'auth',
  layout: 'default',
})

useHead({
  title: 'Redeem',
})

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchingPrizeData()
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

const isFetching = ref(true)
const route = useRoute()
const router = useRouter()

const isClicked = ref(false)
const isRedeemDialogVisible = ref(false)
const insufficientDialogVisible = ref(false)
const errorMessage = ref(null)
const redeemMessage = ref('')
const isLoading = ref(false)
const disableSwipe = ref(false)

const fetchRedeem = async () => {
  try {
    errorMessage.value = null
    disableSwipe.value = true
    const { message, status } = await useFetchApi('POST', 'prizes/redeem', {
      params: {
        prize_id: id,
      },
    })

    // Periksa apakah response memiliki properti _data
    if (status) {
      // Ekstrak pesan dari _data
      redeemMessage.value = message
      isRedeemDialogVisible.value = true
      setTimeout(() => {
        router.push('/claim/success') // Redirect ke halaman yang diinginkan
      }, 3000)
    } else {
      errorMessage.value = message
      insufficientDialogVisible.value = true
    }

    // Tampilkan dialog dengan pesan
  } catch (error) {
    console.error(error)
    errorMessage.value = error._data.message
    insufficientDialogVisible.value = true
  }
}

const handleSwipe = () => {
  isClicked.value = true
  if (isClicked.value) {
    fetchRedeem()
  }
}

const handleClose = () => {
  isRedeemDialogVisible.value = false
  insufficientDialogVisible.value = false
}

const prizeDetailData = ref({})
const id = route.params.id

const fetchingPrizeData = async () => {
  try {
    isFetching.value = true
    const { data } = await useFetchApi('GET', 'prizes/' + id)
    prizeDetailData.value = data

    console.log('prize:', prizeDetailData.value)
  } catch (error) {
    console.log(error)
  } finally {
    isFetching.value = false
  }
}

onMounted(() => {
  getLocation()
})
</script>

<style scoped>
.swipe-button {
  border-radius: 33px;
}
/* From Uiverse.io by adamgiebl */
.cssbuttons-io-button {
  background: #d7a237;
  color: white;
  font-family: inherit;
  padding: 0.35em;
  padding-left: 1.2em;
  font-size: 17px;
  font-weight: 500;
  border-radius: 9999999px;
  border: none;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  box-shadow: inset 0 0 1.6em -0.6em #d7a237;
  overflow: hidden;
  position: relative;
  height: 3.4em;
  padding-right: 3.3em;
  cursor: pointer;
}

.cssbuttons-io-button .icon {
  background: white;
  margin-right: 1em;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.8em;
  width: 2.8em;
  border-radius: 9999999px;
  box-shadow: 0.1em 0.1em 0.6em 0.2em #d7a237;
  left: 0.3em;
  transition: all 0.3s;
}

.cssbuttons-io-button.is-clicked .icon {
  /* width: calc(100% - 0.6em); */
  transform: translate(700%, 0);
}

.cssbuttons-io-button .icon svg {
  width: 1.1em;
  transition: transform 0.3s;
  color: #d7a237;
}

.cssbuttons-io-button.is-clicked .icon svg {
  transform: translateX(0.1em);
}

.cssbuttons-io-button:active .icon, /* Menyertakan :active untuk responsivitas tactile */
.cssbuttons-io-button.is-clicked .icon {
  /* transform: scale(0.95); */
}
</style>
