<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LControlLayers } from '@vue-leaflet/vue-leaflet'
import { ref } from 'vue'
const zoom = ref<number>(14)
const LAT_LNG_SUITA = [34.80000277777778, 135.5057972222222]
</script>

<template>
  <div class="absolute top-0 bottom-0 h-[80vh] w-full">
    <l-map ref="map" :use-global-leaflet="false" v-model:zoom="zoom" :center="LAT_LNG_SUITA">
      <l-control-layers position="topright"></l-control-layers>
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <slot />
    </l-map>
  </div>
</template>
<style></style>
