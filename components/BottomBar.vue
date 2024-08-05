<template>
  <div class="bg-white bottom-0 left-0 right-0 absolute h-16 z-10">
    <div class="inline-flex gap-3 w-full pt-3">
      <img
        :src="pointNavbar"
        alt="point-navbar"
        width="104"
        height="104"
        preload
        class="absolute -top-10"
      />
      <div class="inline-flex flex-row gap-7 ml-28 justify-evenly w-full">
        <div class="flex flex-col items-center justify-center">
          <img
            :src="iconPin"
            alt="icon-pin"
            width="30"
            height="30"
            preload
            class="text-center cursor-pointer"
          />
          <p class="text-exd-gray-scorpion text-exd-1020">デジタルマップ</p>
        </div>
        <div class="flex flex-col items-center justify-center">
          <img
            :src="iconStar"
            alt="icon-star"
            width="30"
            height="30"
            preload
            class="text-center cursor-pointer"
          />
          <p class="text-exd-gray-scorpion text-exd-1020">景品一覧・交換</p>
        </div>
        <div class="flex flex-col items-center justify-center">
          <img
            :src="iconPerson"
            alt="icon-person"
            width="30"
            height="30"
            preload
            class="text-center cursor-pointer"
          />
          <p class="text-exd-gray-scorpion text-exd-1020">マイページ</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import pointNavbar from '~/assets/images/point_navbar.svg'
import iconPin from '~/assets/images/icon-pin.svg'
import iconStar from '~/assets/images/icon-star.svg'
import iconPerson from '~/assets/images/icon-person.svg'
</script>
