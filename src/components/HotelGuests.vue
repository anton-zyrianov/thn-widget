<script setup lang="ts">
import BaseLabel from '@/components/BaseLabel.vue'

import IconFamily from '@/components/Icons/IconFamily.vue'
import IconAdult from '@/components/Icons/IconAdult.vue'
import IconChildren from '@/components/Icons/IconChildren.vue'

defineProps<{
  guests: {
    adults: number
    children: number
    totalGuests: number
  }
}>()
</script>

<template>
  <div class="space-y-3">
    <div class="grid grid-cols-2 gap-x-5">
      <div>
        <BaseLabel>{{ $t('labels.adults') }}</BaseLabel>
        <div class="flex gap-x-2">
          <IconAdult aria-hidden="true" />
          <p>{{ guests?.adults }}</p>
        </div>
      </div>

      <div>
        <BaseLabel>{{ $t('labels.children') }}</BaseLabel>
        <div class="flex gap-x-2">
          <IconChildren aria-hidden="true" />
          <p>{{ guests?.children }}</p>
        </div>
      </div>
    </div>

    <div>
      <BaseLabel>{{ $t('labels.totalGuests') }}</BaseLabel>
      <div class="flex gap-x-2">
        <IconFamily aria-hidden="true" />
        <p>{{ guests?.totalGuests }}</p>
      </div>
    </div>
  </div>
</template>
