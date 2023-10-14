<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LControlLayers, LMarker } from '@vue-leaflet/vue-leaflet'
import { ref } from 'vue'
const props = defineProps<{
  // latLng: [number, number]
  lat: number
  lng: number
}>()
const zoom = ref<number>(8)
// const center = ref<[number, number]>([35.681, 139.763])
// const marker = ref<[number, number]>([35.681, 139.763])
// const latLng2 = ref<[number, number]>([35.681, 139.763])
// latLng2.value = props.latLng
</script>

<template>
  <div style="height: 600px; width: 800px">
    <l-map ref="map" :use-global-leaflet="false" v-model:zoom="zoom" :center="[lat, lng]">
      <l-control-layers position="topright"></l-control-layers>
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-marker :lat-lng="[lat, lng]"></l-marker>
    </l-map>

    <!-- <l-marker :lat-lng="[47.41322, -1.219482]"></l-marker> -->
  </div>
</template>
<style></style>
