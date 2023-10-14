<script setup lang="ts">
import { ref } from 'vue'
import EXIF from 'exif-js'
import loadImage from "blueimp-load-image";


const imgFile = ref<File | null>(null)
const imgFileUrl = ref<string>('')
const imgTags = ref<any>(null)
const dropHandler = (ev: DragEvent) => {
  console.log('File(s) dropped')

  // 既定の動作で防ぐ（ファイルが開かれないようにする）
  ev.preventDefault()

  if (ev.dataTransfer?.items) {
    // DataTransferItemList インターフェイスを使用して、ファイルにアクセスする
    ;[...ev.dataTransfer.items].forEach((item, i) => {
      // ドロップしたものがファイルでない場合は拒否する
      if (item.kind === 'file') {
        const file = item.getAsFile()
        console.log(`… file[${i}].name = ${file?.name}`)
        imgFile.value = file
        imgFileUrl.value = URL.createObjectURL(imgFile.value)
        console.log(imgFile)
        // EXIF.getData(imgFileUrl.value, function () {
        //   imgTags.value = EXIF.getAllTags(this)
        //   console.log('imgTags:' + imgTags.value)
        // })
        loadImage.parseMetaData(imgFile.value, function (data) {

          if (data.exif) {
            // options.orientation = data.exif.get('Orientation');
            console.log("exif:"+data.exif);
            // console.log("GPSLongitude"+ data.exif.get("GPSLatitude"))
            // console.log("GPSLatitude"+ data.exif.get("GPSLatitude"))
            console.log("gpsinfo:",data.exif.get('GPSInfo'))
            const gpsInfo = data.exif.get('GPSInfo')
            console.log("getAll",gpsInfo.getAll());
            console.log("GPSLatitude",gpsInfo.get('GPSLatitude'))
            const [laDegrees,laMinutes,laSeconds] = gpsInfo.get('GPSLatitude')
            console.log(typeof laDegrees,laMinutes,laSeconds)
            const laDecimal = laDegrees + laMinutes / 60 + laSeconds / 3600
            console.log(laDecimal)
            console.log("GPSLongitude",gpsInfo.get('GPSLongitude'))
            const [loDegrees,loMinutes,loSeconds] = gpsInfo.get('GPSLongitude')
            const loDecimal = loDegrees + loMinutes / 60 + loSeconds / 3600          
            console.log(loDecimal)
          }
          // this.displayImage(file, options);
          console.log("data", data)
          console.log("Exif data: ", data.exif);
          
        });
        
      }
    })
  } else {
    // DataTransfer インターフェイスを使用してファイルにアクセスする
    // ;[...ev.dataTransfer?.files].forEach((file, i) => {
    //   console.log(`… file[${i}].name = ${file.name}`)
    // })
  }
}
function getExifData() {
  return new Promise((resolve) => {
    EXIF.getAllTags
  })
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
  {{ imgTags }}
</template>
<style scoped>
#drop_zone {
  border: 5px solid blue;
  width: 200px;
  height: 100px;
}
img{
    width: 180px;
    height: 60px;

    /* // 左端に寄せてサイズを見やすくしたかったので、設定 */
    object-position: left;

    /* // imgのサイズを分かりやすくするため、background-colorを設定 */
    background-color: #999;
    object-fit: contain;
}
</style>
