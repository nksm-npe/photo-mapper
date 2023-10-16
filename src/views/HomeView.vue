<script setup lang="ts">
const imageLocations = useImageLocationsStore()
import { useImageLocationsStore } from '@/stores/imageLocationsStore'
import PhotoMapTable from '@/components/PhotoMapTable.vue'
import { loadFiles } from './loadFiles'

const loadImageFromInput = (ev: Event) => {
  const { files } = ev.target as HTMLInputElement
  console.log(files)
  if (files == null) return

  // loadFiles(Array.from(files))
  Array.from(files).forEach(async (file) => {
    const res = await loadFiles(file)
    if (res != null) {
      imageLocations.store = Object.assign(imageLocations.store, res)
    }
  })
}
</script>

<template>
  <main>
    <input type="file" multiple @change="(ev: Event) => loadImageFromInput(ev)" />

    <PhotoMapTable :img-and-locs="imageLocations.store"></PhotoMapTable>
  </main>
</template>
