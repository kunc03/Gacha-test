<template>
  <div class="grow flex flex-col">
    <HeaderBar>
      <p
        style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
        class="absolute top-0 bottom-0 w-full flex items-end justify-center text-black font-bold text-exd-1824.52 pb-exd-22 pr-46 -z-10"
      >
        {{ $t('passwordInput') }}
      </p>
    </HeaderBar>

    <div class="flex flex-col grow items-center justify-center mt-20">
      <div
        class="flex flex-col gap-4 pt-exd-81 pb-exd-60 justify-center items-center"
      >
        <p class="text-exd-gray-scorpion">{{ $t('pleaseEnterPassword') }}</p>
        <InputOtp v-model="value" integerOnly class="!flex !flex-row !gap-3" />
      </div>
      <div class="grow w-full flex flex-col gap-5">
        <div
          class="bg-exd-banana mx-3 font-bold text-exd-gray-scorpion text-exd-1424 p-5"
        >
          {{ $t('passwordInputInformation') }}
        </div>
        <div class="w-full grow bg-gray-100 relative flex flex-col">
          <div class="grow p-5">
            <p class="font-bold text-exd-1424 text-exd-gray-scorpion mb-1">
              {{ $t('notes') }}
            </p>
            <p
              class="overflow-y-auto text-exd-1220 text-exd-gray-scorpion font-medium max-h-[calc(100dvh-35.625rem)]"
            >
              {{ description }}
            </p>
          </div>
          <SolidButton
            label="GO!"
            :has-loading="isLoading"
            :on-click="goToScan"
            :has-bottom="true"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- 
  <Modal
    :is-open="isNotAllowed"
    :on-close="() => handleCloseDialog()"
    :is-hidden-close="checkRadiusMessage"
  >
    <template v-slot:body>
      <div class="w-full flex flex-col justify-center items-center gap-4 py-6">
        <img :src="warning" alt="warning" width="40" height="40" preload />
        <div v-if="errorLink" class="text-center w-10/12">
          <p class="font-bold text-exd-1424 text-exd-gray-scorpion">
            {{ errorMessages }}
          </p>
        </div>
        <div v-else class="text-center w-10/12">
          <p class="font-bold text-exd-1424 text-exd-gray-scorpion">
            {{ $t('errorHasOccurred') }}
          </p>
          <p class="font-bold text-exd-1424 text-exd-gray-scorpion">
            {{ $t('pleaseTryAgain') }}
          </p>
        </div>
      </div>
    </template>
  </Modal>
  <div class="overlay" v-if="isRequestingLocation" /> -->
</template>

<script setup>
import warning from '~/assets/images/warning.svg'
import close from '~/assets/images/close.svg'

import InputOtp from 'primevue/inputotp'
import HeaderBar from '~/components/HeaderBar.vue'
import Dialog from 'primevue/dialog'
import { useRouter } from 'vue-router'

const value = ref('')
const route = useRoute()
const router = useRouter()
const isNotAllowed = ref(false)
const isRequestingLocation = ref(false)
const isLoading = ref(false)
const description = ref(null)
const errorLink = ref(false)
const errorMessages = ref('')
const handleCloseDialog = () => (isNotAllowed.value = false)

const radiusCheckResult = ref(null)
const checkRadiusMessage = ref(false)
const longitude = ref('')
const latitude = ref('')

const checkPassword = async (params) => {
  isLoading.value = true

  try {
    const { data, status } = await useFetchApi('GET', 'gacha/check', {
      params,
    })

    localStorage.setItem('VALID_PASSWORD', JSON.stringify(params))

    isLoading.value = false
    return status
  } catch (error) {
    console.log("Error: Can't check password")

    isLoading.value = false
  }
}

const goToScan = async () => {
  const location = route.params.randomCode
  const passwordValue = value.value

  const isTrue = await checkPassword({
    slug: location,
    password: passwordValue,
  })

  if (isTrue) router.push(`/spin/${location}`)
  else isNotAllowed.value = true
}

const getPassword = async (id) => {
  try {
    isLoading.value = true

    const { data } = await useFetchApi('GET', '/location/password/' + id)

    if (data) {
      description.value = data.description
    }

    isLoading.value = false
  } catch (error) {
    errorLink.value = true
    console.log("Error: Can't get password")
    errorMessages.value = error._data.message
    isNotAllowed.value = true
  }
}

const radiusCheck = async () => {
  const location = route.params.randomCode
  isLoading.value = true
  try {
    const { data, status } = await useFetchApi('POST', 'radius-check', {
      body: {
        lat: latitude.value,
        long: longitude.value,
        slug: location,
      },
    })

    radiusCheckResult.value = data
    console.log('Radius check response:', data)
    console.log('Radius check status:', status)
    radiusCheckResult.value = data

    isLoading.value = false
  } catch (error) {
    console.error("Error: Can't check radius", error)
    checkRadiusMessage.value = true
    isLoading.value = false
    isNotAllowed.value = true

    document.body.style.pointerEvents = 'none'
  }
}

onMounted(async () => {
  if ('permissions' in navigator) {
    navigator.permissions
      .query({ name: 'geolocation' })
      .then((permissionStatus) => {
        if (permissionStatus.state === 'granted') {
          isRequestingLocation.value = false
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log(position)
              latitude.value = position.coords.latitude
              longitude.value = position.coords.longitude
              radiusCheck()
            },
            (error) => {
              console.error(error)
            }
          )
        } else if (permissionStatus.state === 'prompt') {
          if ('geolocation' in navigator) {
            isRequestingLocation.value = true
            navigator.geolocation.getCurrentPosition(
              (position) => {
                console.log(position)
                latitude.value = position.coords.latitude
                longitude.value = position.coords.longitude
                radiusCheck()
                isRequestingLocation.value = false
              },
              () => {
                isRequestingLocation.value = false
              }
            )
          } else {
            isRequestingLocation.value = false
          }
        } else if (permissionStatus.state === 'denied') {
          isRequestingLocation.value = true
        }

        // Listen for changes to the permission status
        permissionStatus.onchange = () => {
          if (permissionStatus.state === 'granted') {
            isRequestingLocation.value = false
          } else if (permissionStatus.state === 'denied') {
            isRequestingLocation.value = false
          }
        }
      })
  } else {
    if ('geolocation' in navigator) {
      isRequestingLocation.value = true
      navigator.geolocation.getCurrentPosition(
        () => {
          isRequestingLocation.value = false
        },
        () => {
          isRequestingLocation.value = false
        }
      )
    } else {
      // Geolocation is not available, show a dialog or handle accordingly
      isNotAllowed.value = true
    }
  }

  const location = route.params.randomCode
  await getPassword(location)
})

watch(isNotAllowed, (newValue) => {
  if (newValue) {
    document.body.classList.add('modal-open')
  } else {
    document.body.classList.remove('modal-open')
  }
})

useHead({
  title: 'Scan',
})
</script>

<style scoped>
::v-deep(.p-inputtext) {
  @apply border border-exd-gray-44 bg-white w-exd-40 h-exd-50 text-exd-gray-scorpion;
}

::v-deep(.p-dialog-header) {
  @apply hidden;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

:global(body.modal-open) {
  pointer-events: none;
}

:global(body.modal-open .p-dialog) {
  pointer-events: auto;
}
</style>
