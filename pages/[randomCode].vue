<template>
  <div
    class="grow bg-[url('assets/images/bg-red.webp')] bg-cover bg-center justify-between items-center flex flex-col"
  >
    <div class="flex-1 items-center justify-center flex flex-col gap-11">
      <img :src="logo" alt="logo" width="190" height="71" preload />
      <div class="flex flex-col gap-8 mx-8 justify-start items-center">
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
            v-if="isLoading"
          ></Skeleton>
          <p style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)" v-else>
            {{ password }}
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

const route = useRoute()
const password = ref(null)
const isLoading = ref(false)

const codes = {
  tokyo: 'ad5dcd7f-7b67-4bca-bca8-f130ed0d8eae',
  osaka: '297e3bd2-ab11-4674-8764-5f4d32e31ec5',
}

const getPassword = async (id) => {
  try {
    isLoading.value = true
    const { password: value } = await useFetchApi(
      'GET',
      'https://mocki.io/v1/' + id
    )

    isLoading.value = false
    return value
  } catch (error) {
    console.log("Error: Can't get password")
  }
}

onMounted(async () => {
  const location = route.params.randomCode
  const id = codes[location]

  const passVal = await getPassword(id)
  password.value = passVal ?? Math.floor(1000 + Math.random() * 9000).toString()
})
</script>
