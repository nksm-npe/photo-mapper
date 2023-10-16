import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ImageLocationRecord } from '@/interfaces/ImageLocationRecord'
import ExifReader from 'exifreader'
import heic2any from 'heic2any'

export const useImageLocationsStore = defineStore('imageLocations', () => {
  const store = ref<ImageLocationRecord>({})
  function update(records: ImageLocationRecord) {
    store.value = records
  }
  function loadImages(files: File[]) {
    files.forEach(async (file) => {
      const res = await loadFiles(file)
      if (res != null) {
        store.value = Object.assign(store.value, res)
      }
    })
  }
  return { store, update, loadImages }
})

async function loadFiles(file: File): Promise<ImageLocationRecord | null> {
  const tags = await ExifReader.load(file)

  const latLng: [number, number] = [0, 0]
  if (!tags.GPSLatitude) return null
  latLng[0] = parseFloat(tags.GPSLatitude?.description as string)
  latLng[1] = parseFloat(tags.GPSLongitude?.description as string)

  let blobURL = URL.createObjectURL(file)
  const extension = file.name.toLocaleLowerCase().split('.').pop()

  switch (extension) {
    case 'heic': {
      // convert "fetch" the new blob url
      const blobRes = await fetch(blobURL)
      // convert response to blob
      const blob = await blobRes.blob()
      // convert to PNG - response is blob
      const conversionResult = await heic2any({ blob })
      blobURL = URL.createObjectURL(conversionResult as Blob)
      break
    }

    default:
      break
  }
  return { [file.name + '_' + file.lastModified]: { imgdata: blobURL, latLng: latLng } }
}
