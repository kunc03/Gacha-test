<template>
  <div class="grow flex flex-col">
    <HeaderBar hasBack>
      <p
        style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
        class="text-exd-gray-scorpion font-bold text-exd-1824.52"
      >
        {{ $t('newMemberRegistration') }}
      </p>
    </HeaderBar>

    <div
      class="flex flex-col grow px-3 mt-32 pb-3 justify-between gap-6 w-full"
    >
      <div class="flex flex-col grow">
        <p
          class="text-exd-gray-scorpion font-normal text-exd-1416 text-center mt-8"
        >
          {{ $t('registrationComplete') }}
        </p>
        <div
          class="text-exd-gray-scorpion font-normal text-exd-1416 text-start mt-8 max-w-xs mx-auto flex flex-col leading-loose"
        >
          <p>{{ $t('registrationCompleteInformation1') }}</p>

          <p>{{ $t('registrationCompleteInformation2') }}</p>
        </div>
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
        point_id: localStorage.getItem('POINT_ID'),
        location_id: localStorage.getItem('LOCATION_ID'),
        temporary_user_id: localStorage.getItem('USER_ID'),
        character_id: localStorage.getItem('CHARACTER_ID'),
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
