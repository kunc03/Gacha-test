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
      class="left-1/2 top-[30%] transform -translate-x-1/2 -translate-y-1/2 z-20 absolute bg-[url('assets/images/circle-white.svg')] bg-contain bg-center w-full h-full bg-no-repeat"
    >
      <div class="relative h-full w-full">
        <img
          :src="duck"
          alt="duck"
          class="absolute w-3/4 object-fill h-full left-1/2 top-[45%] md:top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          preload
        />
        <img
          :src="jackpot"
          alt="jackpot"
          preload
          class="absolute -bottom-2 md:-bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1/4 object-scale-down small:h-3/4"
        />
      </div>
    </div>

    <Button
      class="!inset-x-1/2 !z-50 !mb-3 !-translate-x-1/2 !-translate-y-1/4 !absolute !bottom-1 !bg-exd-gold !py-4 !w-exd-312 !uppercase !font-bold !text-exd-1424 !rounded-full !text-white !flex !flex-row !justify-between !px-5"
      raised
      @click="handleShowDialog"
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

  <Dialog
    v-model:visible="hasModal"
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
        @click="handleCloseDialog"
      />
      <div
        class="w-full flex flex-col justify-center items-center gap-4 py-6 relative"
      >
        <div class="font-bold text-exd-1424 text-center text-exd-gray-scorpion">
          <p style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)">景品獲得には</p>
          <p style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)">
            会員登録が必要です
          </p>
        </div>
        <Button
          class="!bg-exd-gold !py-4 !w-exd-312 !uppercase !font-bold !text-exd-1424 !rounded-full !text-white !flex !flex-row !justify-between !px-5 h-exd-50"
          raised
          @click="handleToRegister"
        >
          <span class="grow text-center">新規会員登録</span>
          <img
            :src="arrow"
            alt="arrow"
            width="10"
            height="10"
            preload
            class="shrink-0"
          />
        </Button>
        <Button
          class="!bg-exd-red-vermilion !py-4 !w-exd-312 !uppercase !font-bold !text-exd-1424 !rounded-full !text-white !flex !flex-row !justify-between !px-5 h-exd-50"
          raised
          @click="
            () => {
              hasModal = false
              modalLogin = true
            }
          "
        >
          <span class="grow text-center">マイページから引き換え</span>
          <img
            :src="arrow"
            alt="arrow"
            width="10"
            height="10"
            preload
            class="shrink-0"
          />
        </Button>
        <div
          class="font-medium text-exd-1218 text-center text-exd-gray-scorpion"
        >
          <p style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)">
            ポイントと景品の交換方法は
          </p>
          <p style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)">
            こちら
            <img
              :src="exportImg"
              alt="export"
              width="15"
              height="15"
              class="inline"
              preload
            />をご覧ください。
          </p>
        </div>
      </div>
    </template>
  </Dialog>

  <ModalLogin v-model="modalLogin" />
</template>

<script setup>
import gacha2 from '~/assets/images/gacha2.png'
import sparkling from '~/assets/images/sparkling.svg'
import duck from '~/assets/images/duck.svg'
import jackpot from '~/assets/images/jackpot.svg'
import arrow from '~/assets/images/arrow.svg'
import close from '~/assets/images/close.svg'
import exportImg from '~/assets/images/export.svg'
import useRegister from '~/composables/useRegister'

const { setSourceFrom } = useRegister()
const router = useRouter()
const hasModal = ref(false)
const modalLogin = ref(false)
const handleShowDialog = () => (hasModal.value = true)
const handleCloseDialog = () => (hasModal.value = false)

const handleToRegister = () => {
  setSourceFrom('spin')
  navigateTo('/register')
}
</script>

<style scoped>
::v-deep(.p-dialog-header) {
  @apply hidden;
}
</style>
