<script setup lang="ts">
import IconRefresh from '@/components/Icons/IconRefresh.vue'

defineEmits(['updateData'])
</script>

<template>
  <div class="relative">
    <p class="sr-only">{{ $t('sr-title') }}</p>
    <button
      @click="$emit('updateData')"
      aria-label="Refresh data"
      class="absolute top-0 right-0 p-2"
    >
      <IconRefresh
        class="text-blue-500 hover:text-blue-700 transition-colors w-4 h-4"
      />
    </button>
  </div>
</template>
