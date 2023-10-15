import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ImageLocationRecord } from '@/views/ImageLocationRecord'

export const useImageLocationsStore = defineStore('imageLocations', () => {
  const store = ref<ImageLocationRecord>({})
  function update(records: ImageLocationRecord) {
    store.value = records
  }

  return { store, update }
})
