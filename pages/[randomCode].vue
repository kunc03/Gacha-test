<template>
  <div
    class="grow bg-[url('assets/images/bg-red.webp')] bg-cover bg-center justify-between items-center flex flex-col"
  >
    <div class="flex-1 items-center flex flex-col gap-11 mt-[15%] px-8">
      <img :src="logo" alt="logo" width="190" height="71" preload />
      <div class="flex flex-col gap-8 mx-8 justify-start items-center w-full">
        <h1
          class="text-center font-bold text-exd-1824.52 text-white"
          style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
        >
          Password
        </h1>
        <div
          class="bg-white h-exd-150 rounded-xl text-center grid place-items-center text-exd-6081.72 text-exd-red w-full font-bold"
        >
          <Skeleton
            class="bg-gray-100"
            width="10rem"
            height="4rem"
            borderRadius="16px"
            v-if="isLoading && responseData.password !== ''"
          ></Skeleton>
          <p style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)" v-else>
            {{ responseData.password }}
          </p>
        </div>
        <div class="text-white font-bold text-xs text-start">
          <p style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)">
            ※ガチャラリーのパスワードは本日限り有効です。
          </p>
          <p style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)">
            ※Gacharary password is valid only for today.
          </p>
        </div>
      </div>
      <div
        class="bg-white text-center py-2 px-4 w-full text-exd-red font-bold"
        v-if="responseData.description && responseData.image"
      >
        QR Code Spot
      </div>
      <div
        class="inline-flex justify-between bg w-full gap-3"
        v-if="responseData.description"
      >
        <p class="text-white text-justify">
          {{ responseData.description }}
        </p>
        <div class="size-5/12 shrink-0">
          <img
            :src="displayImage"
            alt="response-image"
            preload
            class="size-auto"
          />
        </div>
      </div>
    </div>
    <Button
      label="close"
      class="!mb-4 !bg-exd-gold !py-4 !w-exd-312 !uppercase !font-bold !text-exd-1424 !rounded-full"
      raised
    />
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import logo from '~/assets/images/logo.png'
import emptyImage from '~/assets/images/empty-image.jpg'

const route = useRoute()
const responseData = ref({
  password: '',
  image: '',
  description: '',
})
const isLoading = ref(false)

const getPassword = async (id) => {
  try {
    isLoading.value = true

    const { data } = await useFetchApi('GET', '/location/password/' + id)

    if (data) {
      responseData.value = {
        password:
          data.password ?? Math.floor(1000 + Math.random() * 9000).toString(),
        description: data.description,
        image: data.image,
      }
    }

    isLoading.value = false
  } catch (error) {
    console.log("Error: Can't get password")
  }
}

const displayImage = computed(() => {
  return responseData.value.image || emptyImage
})

onMounted(async () => {
  const location = route.params.randomCode

  await getPassword(location)
})

useHead({
  title: 'Password',
})
</script>
