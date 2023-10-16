import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ImageLocationRecord } from '@/views/ImageLocationRecord'
import { loadFiles } from '@/views/loadFiles'

export const useImageLocationsStore = defineStore('imageLocations', () => {
  const store = ref<ImageLocationRecord>({})
  function update(records: ImageLocationRecord) {
    store.value = records
  }
  function loadImages(files: File[]) {
    files.forEach(async (file) => {
      const res = await loadFiles(file)
      if (res != null) {
        store.value = Object.assign(store.value, res)
      }
    })
  }
  return { store, update, loadImages }
})
