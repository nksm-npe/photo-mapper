import ExifReader from 'exifreader'
import heic2any from 'heic2any'
import { useImageLocations } from './useImageLocations'
import type { ImageLocationRecord } from './ImageLocationRecord'

export async function loadFiles(file: File): Promise<ImageLocationRecord | null> {
  // ドロップしたものがファイルでない場合は拒否する
  const { latLngs, imgFile, imgFileUrl } = useImageLocations()
  const tags = await ExifReader.load(file)

  console.log('tags', tags)
  console.log(tags.GPSLatitude?.description)
  const latLng: [number, number] = [0, 0]
  if (!tags.GPSLatitude) return null
  latLng[0] = parseFloat(tags.GPSLatitude?.description as string)
  latLng[1] = parseFloat(tags.GPSLongitude?.description as string)
  latLngs.value.push(latLng)

  imgFile.value = file

  let blobURL = URL.createObjectURL(imgFile.value)
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
  imgFileUrl.value = blobURL
  console.log('latLng', latLng)
  console.log('returnval', {
    [file.name + '_' + file.lastModified]: { imgdata: blobURL, latLng: latLng }
  })
  return { [file.name + '_' + file.lastModified]: { imgdata: blobURL, latLng: latLng } }
  // imageLocations.store[file.name + '_' + file.lastModified] = { imgdata: blobURL, latLng: latLng }
  // console.log(imageLocations.store)
}
