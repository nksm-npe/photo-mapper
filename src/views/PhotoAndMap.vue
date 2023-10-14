<script setup lang="ts">
import { ref } from 'vue'
import ExifReader from 'exifreader'
import heic2any from 'heic2any'
import LeafletArea from '@/components/LeafletArea.vue'
import { LMarker } from '@vue-leaflet/vue-leaflet'
const imgFile = ref<File | null>(null)
const imgFileUrl = ref<string>('')
const latLngs = ref<[number, number][]>([[35.681, 139.763]])

const mainbuffer: { [key: string]: { latLng: [number, number]; imgdata: string } } = {}

const dropHandler = async (ev: DragEvent) => {
  console.log('File(s) dropped')

  // 既定の動作で防ぐ（ファイルが開かれないようにする）
  ev.preventDefault()

  if (ev.dataTransfer?.items) {
    // DataTransferItemList インターフェイスを使用して、ファイルにアクセスする
    const newLocal = [...ev.dataTransfer.items]
    const files = newLocal.filter((x) => x.kind === 'file').map((x) => x.getAsFile() as File)
    if (files == null || files.length <= 0) return
    loadFiles(files)
  }
}

const loadImageFromInput = (ev: Event) => {
  const { files } = ev.target as HTMLInputElement
  console.log(files)
  if (files == null) return

  loadFiles(Array.from(files))
}
function loadFiles(files: File[]) {
  files.forEach(async (file, i) => {
    // ドロップしたものがファイルでない場合は拒否する

    const tags = await ExifReader.load(file)

    console.log('tags', tags)
    console.log(tags.GPSLatitude?.description)
    const latLng: [number, number] = [0, 0]
    if (!tags.GPSLatitude) return
    latLng[0] = parseFloat(tags.GPSLatitude?.description as string)
    latLng[1] = parseFloat(tags.GPSLongitude?.description as string)
    latLngs.value.push(latLng)

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
    mainbuffer[file.name + '_' + file.lastModified] = { imgdata: blobURL, latLng: latLng }
    console.log(mainbuffer)
  })
}
const dragOverHandler = (ev: DragEvent) => {
  console.log('File(s) in drop zone')

  // 既定の動作で防ぐ（ファイルが開かれないようにする）
  ev.preventDefault()
}
</script>

<template>
  <div id="right">
    <input type="file" multiple @change="(ev: Event) => loadImageFromInput(ev)" />

    <div
      id="drop_zone"
      @drop="(e: DragEvent) => dropHandler(e)"
      @dragover="(e: DragEvent) => dragOverHandler(e)"
    >
      <p>Drag one or more files to this <i>drop zone</i>.</p>
    </div>

    <img v-if="imgFile != null" :src="imgFileUrl" :alt="imgFile.name" :title="imgFile.name" />
    {{ latLngs }}
    <LeafletArea>
      <div v-for="(latLng, index) in latLngs" :key="index">
        <l-marker :lat-lng="[...latLng]"></l-marker>
      </div>
      <l-marker :lat-lng="[35.681, 139.763]"></l-marker>
    </LeafletArea>
  </div>
</template>

<style scoped>
#right {
  display: block;
  width: 100%;
}
#drop_zone {
  border: 5px solid blue;
  /* width: 400px; */
  height: 400px;
}
img {
  /* width: 180px; */
  height: 360px;

  object-position: left;

  background-color: #999;
  object-fit: contain;
}
</style>
