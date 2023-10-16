<script setup lang="ts">
import LeafletArea from '@/components/LeafletArea.vue'
import { LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import { useImageLocationsStore } from '@/stores/imageLocationsStore'
const imageLocations = useImageLocationsStore()

const dropHandler = async (ev: DragEvent) => {
  console.log('File(s) dropped')

  // 既定の動作で防ぐ（ファイルが開かれないようにする）
  ev.preventDefault()

  if (ev.dataTransfer?.items) {
    // DataTransferItemList インターフェイスを使用して、ファイルにアクセスする
    const newLocal = [...ev.dataTransfer.items]
    const files = newLocal.filter((x) => x.kind === 'file').map((x) => x.getAsFile() as File)
    if (files == null || files.length <= 0) return
    imageLocations.loadImages(files)
  }
}

const dragOverHandler = (ev: DragEvent) => {
  console.log('File(s) in drop zone')

  // 既定の動作で防ぐ（ファイルが開かれないようにする）
  ev.preventDefault()
}
</script>

<template>
  <div class="w-full h-full" id="right">
    <div
      class="relative h-20 border-4"
      @drop="(e: DragEvent) => dropHandler(e)"
      @dragover="(e: DragEvent) => dragOverHandler(e)"
    >
      <LeafletArea>
        <div v-for="[key, { latLng, imgdata }] in Object.entries(imageLocations.store)" :key="key">
          <l-marker :lat-lng="[...latLng]">
            <l-popup>
              <div><img :src="imgdata" class="object-contain" /></div>
              <div class="w-96"></div>
            </l-popup>
          </l-marker>
        </div>
        <l-marker :lat-lng="[35.681, 139.763]"></l-marker>
      </LeafletArea>
    </div>
  </div>
</template>
