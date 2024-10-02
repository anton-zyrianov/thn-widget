<script setup lang="ts">
import HotelDates from '@/components/HotelDates.vue'
import HotelGuests from '@/components/HotelGuests.vue'
import HotelPrices from '@/components/HotelPrices.vue'

defineProps<{
  hotelData: any
}>()
</script>

<template>
  <section>
    <div class="px-4 py-2 space-y-3 border-b border-black/20">
      <HotelDates
        :check-in-date="hotelData.checkInDate"
        :check-out-date="hotelData.checkOutDate"
        :rooms="hotelData.rooms"
      />

      <HotelGuests :guests="hotelData.guests" />
    </div>

    <HotelPrices
      :min-price="hotelData.minPrice"
      :currency="hotelData.currency"
    />
  </section>
</template>
