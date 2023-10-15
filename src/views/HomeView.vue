<script setup lang="ts">
const imageLocations = useImageLocationsStore()
import { useImageLocationsStore } from '@/stores/imageLocationsStore'
import PhotoMapTable from '@/components/PhotoMapTable.vue'
</script>

<template>
  <main>
    <PhotoMapTable :img-and-locs="imageLocations.store"></PhotoMapTable>
  </main>
</template>
