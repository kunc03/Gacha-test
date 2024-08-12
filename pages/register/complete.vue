<template>
  <div class="grow flex flex-col">
    <Header hasBack>
      <p
        style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
        class="text-exd-gray-scorpion font-bold text-exd-1824.52"
      >
        新規会員登録
      </p>
    </Header>

    <div
      class="flex flex-col grow px-3 mt-32 pb-3 justify-between gap-6 w-full"
    >
      <div class="flex flex-col grow">
        <p
          class="text-exd-gray-scorpion font-semibold text-exd-1420 text-center mt-8"
        >
          会員登録が完了しました
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import useRegister from '~/composables/useRegister'
const { isSpin } = useRegister()
const saveSpin = async () => {
  if (!isSpin) return

  try {
    const response = await useFetchApi('POST', 'gacha/save/temp', {
      body: {
        point_id: sessionStorage.getItem('POINT_ID'),
        location_id: sessionStorage.getItem('LOCATION_ID'),
        temporary_user_id: sessionStorage.getItem('USER_ID'),
      },
    })

    console.log(response)
  } catch (error) {
    console.log("Error: Can't save spin result")
  }
}

onMounted(() => {
  saveSpin()
})
</script>
