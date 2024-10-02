<script setup lang="ts">
import { computed } from 'vue'
import BaseLabel from '@/components/BaseLabel.vue'

const props = defineProps<{
  checkInDate: string
  checkOutDate: string
  rooms: number
}>()

const differenceInDays = computed(() => {
  const checkIn = new Date(props.checkInDate)
  const checkOut = new Date(props.checkOutDate)
  const differenceInTime = checkOut?.getTime() - checkIn?.getTime()
  return differenceInTime / (1000 * 60 * 60 * 24)
})
</script>

<template>
  <div class="grid grid-cols-2 gap-x-5 gap-y-3">
    <div>
      <BaseLabel>{{ $t('labels.checkIn') }}</BaseLabel>
      <time :datetime="checkInDate" aria-label="Check-in date">{{ checkInDate }}</time>
    </div>

    <div>
      <BaseLabel>{{ $t('labels.checkOut') }}</BaseLabel>
      <time :datetime="checkOutDate" aria-label="Check-out date">{{ checkOutDate }}</time>
    </div>

    <div>
      <BaseLabel>{{ $t('labels.nights') }}</BaseLabel>
      <p>{{ differenceInDays }}</p>
    </div>

    <div>
      <BaseLabel>{{ $t('labels.rooms') }}</BaseLabel>
      <p>{{ rooms }}</p>
    </div>
  </div>
</template>
