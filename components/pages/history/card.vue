<template>
  <ImageTextCard
    :on-click="() => handleGoToDetailHistory()"
    :image-card="characterImage"
    :has-rounded="true"
  >
    <template v-slot:text>
      <div>
        <p class="text-exd-gold text-exd-1724 font-bold">
          {{ data.amount }}<span>pt</span>
        </p>
        <p lass="text-exd-gray-scorpion font-medium text-exd-1020">
          {{ data.created_at }}
        </p>
        <p class="text-exd-gray-scorpion font-semibold text-exd-1218">
          {{ data.location }}
        </p>
      </div>
    </template>
  </ImageTextCard>
</template>

<script setup>
import { useRouter } from 'vue-router'
import noImage from '~/assets/images/no-image.svg'

const props = defineProps(['data', 'id'])

const characterImage = props.data.character?.image || noImage

const router = useRouter()
const handleGoToDetailHistory = () => router.push(`/history/${props.data.id}`)
</script>
