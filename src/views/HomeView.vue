<script setup lang="ts">
import { useImageLocationsStore } from '@/stores/imageLocationsStore'
const imageLocations = useImageLocationsStore()

import PhotoMapTable from '@/components/PhotoMapTable.vue'

const loadImageFromInput = (ev: Event) => {
  const { files } = ev.target as HTMLInputElement
  console.log(files)
  if (files == null) return

  imageLocations.loadImages(Array.from(files))
}
</script>

<template>
  <main>
    <input type="file" multiple @change="(ev: Event) => loadImageFromInput(ev)" />

    <PhotoMapTable :img-and-locs="imageLocations.store"></PhotoMapTable>
  </main>
</template>
