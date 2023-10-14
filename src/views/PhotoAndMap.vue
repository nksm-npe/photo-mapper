<script setup lang="ts">
import { ref } from 'vue'
import ExifReader from 'exifreader'
import heic2any from 'heic2any'
import Leaflet from './Leaflet.vue'
const imgFile = ref<File | null>(null)
const imgFileUrl = ref<string>('')
// const laDecimal2 = ref<number>(0)
// const loDecimal2 = ref<number>(0)
const latLng = ref<[number, number]>([35.681, 139.763])
const dropHandler = async (ev: DragEvent) => {
  console.log('File(s) dropped')

  // 既定の動作で防ぐ（ファイルが開かれないようにする）
  ev.preventDefault()

  if (ev.dataTransfer?.items) {
    // DataTransferItemList インターフェイスを使用して、ファイルにアクセスする
    ;[...ev.dataTransfer.items].forEach(async (item, i) => {
      // ドロップしたものがファイルでない場合は拒否する
      if (item.kind === 'file') {
        const file = item.getAsFile()
        if (!file) return
        const tags = await ExifReader.load(file)

        console.log('tags', tags)
        console.log(tags.GPSLatitude?.description)
        // laDecimal2.value = parseFloat(tags.GPSLatitude?.description as string)
        latLng.value[0] = parseFloat(tags.GPSLatitude?.description as string)
        // loDecimal2.value = parseFloat(tags.GPSLongitude?.description as string)
        latLng.value[1] = parseFloat(tags.GPSLongitude?.description as string)

        imgFile.value = file

        let blobURL = URL.createObjectURL(imgFile.value)
        const extension = file.name.toLocaleLowerCase().split('.').pop()

        switch (extension) {
          case 'heic': {
            // convert "fetch" the new blob url
            let blobRes = await fetch(blobURL)
            // convert response to blob
            let blob = await blobRes.blob()
            // convert to PNG - response is blob
            let conversionResult = await heic2any({ blob })
            blobURL = URL.createObjectURL(conversionResult as Blob)
            break
          }

          default:
            break
        }
        imgFileUrl.value = blobURL
      }
    })
  }
}

const dragOverHandler = (ev: DragEvent) => {
  console.log('File(s) in drop zone')

  // 既定の動作で防ぐ（ファイルが開かれないようにする）
  ev.preventDefault()
}
</script>

<template>
  <div
    id="drop_zone"
    @drop="(e: DragEvent) => dropHandler(e)"
    @dragover="(e: DragEvent) => dragOverHandler(e)"
  >
    <p>Drag one or more files to this <i>drop zone</i>.</p>
  </div>

  <img v-if="imgFile != null" :src="imgFileUrl" :alt="imgFile.name" :title="imgFile.name" />
  <!-- {{ laDecimal2 }}, {{ loDecimal2 }} -->
  {{ latLng }}
  <!-- <Leaflet :lat-lng="latLng"></Leaflet> -->
  <Leaflet :lat="latLng[0]" :lng="latLng[1]"></Leaflet>
</template>
<style scoped>
#drop_zone {
  border: 5px solid blue;
  width: 400px;
  height: 400px;
}
img {
  width: 180px;
  height: 360px;

  /* // 左端に寄せてサイズを見やすくしたかったので、設定 */
  object-position: left;

  /* // imgのサイズを分かりやすくするため、background-colorを設定 */
  background-color: #999;
  object-fit: contain;
}
</style>
