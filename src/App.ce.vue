<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAvailabilityPageData } from '@/getHotelData'
import { type HotelDataType } from '@/types'
import { useI18n } from 'vue-i18n'

import HotelData from '@/components/HotelData.vue'
import BaseAccordion from '@/components/BaseAccordion.vue'
import RefreshButton from '@/components/RefreshButton.vue'

const t = useI18n()

const switchLocale = (newLocale: string) => {
  t.locale.value = newLocale || 'en'
}

const hotelData = ref<HotelDataType>(getAvailabilityPageData())

const updateData = () => {
  hotelData.value = getAvailabilityPageData()
  switchLocale(hotelData.value.language)
}

onMounted(() => {
  if (hotelData.value.language) {
    switchLocale(hotelData.value.language)
  }
})
</script>

<template>
  <main>
    <BaseAccordion ariaTitle="best-price" :title="$t('title')">
      <RefreshButton @update-data="updateData" />
      <div v-if="hotelData?.message" class="py-10 border-b border-black/20">
        <p class="text-sm text-center max-w-[24ch] mx-auto">
          {{ hotelData?.message }}
        </p>
      </div>
      <HotelData v-else :hotel-data="hotelData" />
    </BaseAccordion>
  </main>
</template>

<style>
@import '@/assets/main.css';
</style>
