<script setup lang="ts">
import { computed } from 'vue'
import { AVAILABLE_CURRENCY_TYPES } from '@/constants'
import { type MinPrice } from '@/types'

import BaseLabel from '@/components/BaseLabel.vue'

import IconTick from '@/components/Icons/IconTick.vue'
import IconCross from '@/components/Icons/IconCross.vue'

const props = defineProps<{
  minPrice: MinPrice
  currency: string
}>()

const currencySymbol = computed(
  () =>
    AVAILABLE_CURRENCY_TYPES.find(
      (currency) => currency.isoCode === props.currency
    )?.symbol || AVAILABLE_CURRENCY_TYPES[0].symbol
)

const iconComponent = (value: Boolean) => {
  return value ? IconTick : IconCross
}
</script>

<template>
  <div class="px-4 py-2 space-y-3 border-b">
    <div class="space-y-3">
      <div class="max-sm:grid max-sm:grid-cols-2 sm:space-y-3">
        <div>
          <BaseLabel>{{ $t('labels.originalPrice') }}</BaseLabel>
          <p>
            {{ minPrice?.originalPrice || minPrice?.promoPrice
            }}{{ currencySymbol }}
          </p>
        </div>

        <div v-if="minPrice?.originalPrice">
          <BaseLabel>{{ $t('labels.promoPrice') }}</BaseLabel>
          <div class="flex gap-x-3">
            <p>{{ minPrice?.promoPrice }}{{ currencySymbol }}</p>

            <p
              v-if="minPrice.discountPercentage"
              class="flex items-center px-1.5 py-0.5 text-white rounded-md bg-green-400 text-xs font-medium"
            >
              -{{ minPrice?.discountPercentage }}%
            </p>
          </div>
        </div>
      </div>

      <div>
        <div class="flex gap-x-2">
          <BaseLabel>{{ $t('labels.breakfast') }}</BaseLabel>
          <component
            :aria-label="`Breakfast ${!minPrice?.extras?.breakfastIncluded && 'not'} included`"
            :is="iconComponent(minPrice?.extras?.breakfastIncluded)"
            :class="
              minPrice?.extras?.breakfastIncluded
                ? 'text-green-500'
                : 'text-red-500'
            "
          />
        </div>

        <div class="flex gap-x-2">
          <BaseLabel>{{ $t('labels.cancellation') }}</BaseLabel>
          <component
            :aria-label="`Free cancellation ${!minPrice?.extras?.freeCancellation && 'not'} included`"
            :is="iconComponent(minPrice?.extras?.freeCancellation)"
            :class="
              minPrice?.extras?.freeCancellation
                ? 'text-green-500'
                : 'text-red-500'
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
