<script setup lang="ts">
import { ref, onMounted } from 'vue'
import IconChevron from '@/components/Icons/IconChevron.vue'
import IconSmile from '@/components/Icons/IconSmile.vue'
import IconSmileBlink from '@/components/Icons/IconSmileBlink.vue'

defineProps<{
  title: string
  ariaTitle: string
}>()

const showPanel = ref<Boolean>(false)

const togglePanel = () => {
  showPanel.value = !showPanel.value
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' || event.key === 'Esc') {
    showPanel.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div
    class="z-50 border border-black/20 rounded-lg shadow-sm bg-slate-50 max-sm:max-w-xs max-sm:w-full sm:min-w-64 overflow-hidden flex flex-col-reverse fixed bottom-5 max-sm:left-1/2 max-sm:-translate-x-1/2 sm:right-5"
  >
    <div
      @click.prevent="togglePanel"
      class="group p-4 w-full relative font-semibold font-title flex flex-row items-center justify-between bg-slate-50 hover:bg-slate-100"
    >
      <div class="flex gap-x-2 items-center">
        <h2>{{ title }}</h2>
        <IconSmile aria-hidden="true" class="group-hover:hidden w-4 h-4" />
        <IconSmileBlink
          aria-hidden="true"
          class="hidden group-hover:block w-4 h-4"
        />
      </div>

      <button
        :aria-controls="'accordion-content-' + ariaTitle"
        :aria-expanded="showPanel ? true : false"
        class="expand-link"
      >
        <IconChevron
          class="transition-transform duration-300"
          :class="showPanel && 'rotate-180'"
        />
      </button>
    </div>

    <Transition name="slide" :duration="350">
      <div
        :aria-hidden="!showPanel"
        class="font-base"
        :id="'content-' + ariaTitle"
        v-if="showPanel"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>
