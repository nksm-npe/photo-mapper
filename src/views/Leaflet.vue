<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LControlLayers, LMarker } from '@vue-leaflet/vue-leaflet'
import { ref } from 'vue'
defineProps<{
  latLng: [number, number]
}>()
const zoom = ref<number>(8)
</script>

<template>
  <div style="height: 600px; width: 800px">
    <l-map ref="map" :use-global-leaflet="false" v-model:zoom="zoom" :center="[...latLng]">
      <l-control-layers position="topright"></l-control-layers>
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-marker :lat-lng="[...latLng]"></l-marker>
      <l-marker :lat-lng="[35.681, 139.763]"></l-marker>
    </l-map>
  </div>
</template>
<style></style>
