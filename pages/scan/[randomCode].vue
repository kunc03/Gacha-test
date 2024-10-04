<template>
  <div class="grow flex flex-col overflow-hidden" @touchmove="onTouchmove">
    <HeaderBar>
      <p
        style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
        class="header text-black font-bold text-exd-1824.52"
      >
        {{ $t('passwordInput') }}
      </p>
    </HeaderBar>
    <div
      class="scan-content flex flex-col grow items-center justify-center mt-20 small:mt-14"
    >
      <div
        class="scan-otp flex flex-col gap-4 pt-exd-81 pb-exd-60 justify-center items-center"
      >
        <p class="text-exd-gray-scorpion">{{ $t('pleaseEnterPassword') }}</p>
        <OtpInput v-model="value" :length="4" :wrongPassword="wrongPassword" />
      </div>
      <div class="grow w-full flex flex-col gap-5 small:gap-2">
        <div
          class="password-inform bg-exd-banana mx-3 font-bold text-exd-gray-scorpion text-exd-1424 p-5"
        >
          <span>{{ $t('passwordInputInformationIntro') }}</span>
          {{ ' ' }}
          <span>
            <a
              href="https://nospot.new-ordinary.co.jp/maps/nagoya"
              target="_blank"
              class="cursor-pointer items-center relative after:content-[''] after:absolute after:inset-x-0 after:ml-3 after:bottom-1 after:border-b after:border-b-gray-500"
              style="display: inline-flex"
            >
              <span class="">{{ $t('passwordInputInformation') }}</span>
              <span class="">
                <img
                  :src="exportIcon"
                  alt="export"
                  width="20"
                  height="20"
                  preload
              /></span>
            </a>
          </span>
          <span>{{ $t('passwordInputInformationOutro') }}</span>
        </div>
        <div class="w-full grow bg-gray-100 relative flex flex-col">
          <div class="grow p-5 small:p-[15px]">
            <ul
              ref="refsNotes"
              class="uiHeight list-disc list-inside overflow-y-auto"
            >
              <p
                class="scan-title font-bold text-exd-1424 text-exd-gray-scorpion mb-1"
              >
                {{ $t('scanNotesTitle') }}
              </p>
              <li
                v-for="i in 16"
                :key="i"
                class="text-exd-1220 text-exd-gray-scorpion font-medium text-justify"
              >
                {{ $t(`scanNotesDescription.note${i}`) }}
              </li>
            </ul>
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

  <Modal
    :is-open="isNotAllowed"
    :on-close="() => handleCloseDialog()"
    :is-hidden-close="checkRadiusFailed"
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
            {{ checkRadiusMessage }}
          </p>
        </div>
      </div>
    </template>
  </Modal>
  <div class="overlay" v-if="isRequestingLocation" />
</template>

<script setup>
import warning from '~/assets/images/warning.svg'
import close from '~/assets/images/close.svg'

import InputOtp from 'primevue/inputotp'
import HeaderBar from '~/components/HeaderBar.vue'
import Dialog from 'primevue/dialog'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import exportIcon from '~/assets/images/export.svg'

const value = ref('')
const route = useRoute()
const router = useRouter()
const isNotAllowed = ref(false)
const isRequestingLocation = ref(false)
const isLoading = ref(false)
const description = ref(null)
const errorLink = ref(false)
const errorMessages = ref('')
const refsNotes = ref(null)

const handleCloseDialog = () => (isNotAllowed.value = false)

const { t } = useI18n()
const wrongPassword = ref(false)

const radiusCheckResult = ref(null)
const checkRadiusFailed = ref(false)
const checkRadiusMessage = ref(null)
const longitude = ref('')
const latitude = ref('')

const { encryptData } = useEncryption()

const checkPassword = async (params) => {
  isLoading.value = true

  try {
    const { data, status } = await useFetchApi('GET', 'gacha/check', {
      params,
    })

    const validPassword = useCookie('VALID_PASSWORD')
    validPassword.value = encryptData(params)

    isLoading.value = false
    return status
  } catch (error) {
    console.log("Error: Can't check password")

    errorLink.value = true
    errorMessages.value = t('wrongPassword')

    wrongPassword.value = true

    setTimeout(() => {
      wrongPassword.value = false
    }, 3000)

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
      await checkingLocation()
    }

    isLoading.value = false
  } catch (error) {
    errorLink.value = true
    errorMessages.value = error._data.message

    isNotAllowed.value = true
  }
}

const onTouchmove = (event) => {
  if (!refsNotes.value.contains(event.target)) {
    event.preventDefault()
  }
}

const radiusCheck = async () => {
  const location = route.params.randomCode
  isLoading.value = true
  try {
    const { data } = await useFetchApi('POST', 'radius-check', {
      body: {
        lat: latitude.value,
        long: longitude.value,
        slug: location,
      },
    })
    radiusCheckResult.value = data
  } catch (error) {
    checkRadiusMessage.value = error?._data.message
    checkRadiusFailed.value = true
    isNotAllowed.value = true
    document.body.style.pointerEvents = 'none'
  } finally {
    isLoading.value = false
  }
}

const checkingLocation = async () => {
  if ('permissions' in navigator) {
    navigator.permissions
      .query({ name: 'geolocation' })
      .then((permissionStatus) => {
        if (permissionStatus.state === 'granted') {
          isRequestingLocation.value = false
          navigator.geolocation.getCurrentPosition(
            (position) => {
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
}

onMounted(async () => {
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

/* @media screen and (max-width: 460px) { */
@media screen and (max-height: 600px) {
  .header {
    font-size: 15px;
  }

  .scan-content {
    font-size: 12px;
  }

  .scan-otp {
    padding-top: 50px;
    padding-bottom: 30px;
  }

  .password-inform {
    padding: 10px;
    font-size: 8.5px;
  }

  .scan-title {
    font-size: 13px;
  }

  .uiHeight {
    max-height: 170px;
  }

  .uiHeight li {
    font-size: 10px;
  }
}

@media screen and (min-height: 630px) {
  .uiHeight {
    max-height: 150px;
  }
}

@media screen and (min-height: 700px) {
  .uiHeight {
    max-height: 190px;
  }
}

@media screen and (min-height: 740px) {
  .uiHeight {
    max-height: 190px;
  }
}

@media screen and (min-height: 800px) {
  .uiHeight {
    max-height: 270px;
  }
}

@media screen and (min-height: 860px) {
  .uiHeight {
    max-height: 330px;
  }
}

@media screen and (min-height: 900px) {
  .uiHeight {
    max-height: 370px;
  }
}

@media screen and (min-height: 960px) {
  .uiHeight {
    max-height: 390px;
  }
}

@media screen and (min-height: 1000px) {
  .uiHeight {
    max-height: 430px;
  }
}

@media screen and (min-height: 1050px) {
  .uiHeight {
    max-height: 450px;
  }
}

@media screen and (min-height: 1100px) {
  .uiHeight {
    max-height: 480px;
  }
}

@media screen and (min-height: 1150px) {
  .uiHeight {
    max-height: 570px;
  }
}

@media screen and (min-height: 1200px) {
  .uiHeight {
    max-height: 670px;
  }
}
/* } */
</style>
