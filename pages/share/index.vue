<template>
  <div
    v-if="isValidPath"
    class="w-full max-w-md mx-auto min-h-dvh max-h-full overflow-hidden bg-white flex flex-col relative bg-[url('/images/bg-red2.webp')] bg-cover bg-center"
  >
    <HeaderBar>
      <p
        style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
        class="text-exd-gray-scorpion font-bold text-exd-1824.52"
      >
        {{ t('shareCharacter') }}
      </p>
    </HeaderBar>

    <section class="min-h-dvh max-h-[calc(100dvh-30px)] overflow-y-auto pb-6">
      <div class="flex flex-col bg-center text-black mt-[105px] px-8 gap-3">
        <div class="max-w-sm bg-white rounded-lg shadow">
          <div class="h-72 w-full overflow-hidden rounded-t-lg">
            <CharacterCard :image="image" />
          </div>
          <div class="p-5 flex flex-col gap-2">
            <div class="inline-flex justify-between w-full gap-2">
              <p
                class="font-bold text-exd-1424 text-exd-gray-scorpion max-w-40"
              >
                {{ title }}
              </p>
              <p class="font-bold text-exd-1824.52 text-exd-gold">
                <!-- {{ historyDetailData.point_amount }} -->
                10pt
              </p>
            </div>

            <p
              class="font-medium text-exd-1218 text-exd-gray-scorpion mb-4 text-word-wrap"
            >
              {{ quote }}
            </p>

            <HeadingSection
              :is-fetching="!isFetching"
              :title="title"
              :body="description"
            />

            <div class="w-full">
              <div
                class="relative"
                id="parentMap"
                style="width: 100%; height: 300px"
              >
                <div
                  class="absolute inset-0 z-10 flex items-center justify-center bg-red-100 rounded-lg"
                >
                  <img
                    :src="image"
                    alt=""
                    class="w-full"
                    tabindex="-1"
                    style="width: 100%; height: 100%"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import duck from '~/assets/images/duck.svg'
import download from '~/assets/images/download.svg'
import facebook from '~/assets/images/facebook.svg'
import check from '~/assets/images/check.svg'
import line from '~/assets/images/line.svg'
import x from '~/assets/images/x.svg'
import { useI18n } from 'vue-i18n'

// definePageMeta({
//   layout: 'with-bottom-bar',
//   //   middleware: 'auth',
// })

useHead({
  title: 'Share',
})

const { t } = useI18n()
const config = useRuntimeConfig()
const route = useRoute()
const id = route.params.id
const title = config.public.META_TITLE
const description = config.public.META_DESCRIPTION
const image = config.public.META_IMAGE
const url = config.public.META_URL
const quote = config.public.META_QUOTE
const props = defineProps(['id'])
const isFetching = ref(true)

console.log(route.query)

const isValidPath = computed(() => {
  return route.path.startsWith('/share') && route.query.char && route.query.spot
})

const showSuccessPopup = ref(false)
</script>

<style scoped></style>
