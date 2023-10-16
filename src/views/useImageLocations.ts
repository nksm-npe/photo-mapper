import { ref } from 'vue'
export function useImageLocations() {
  const imgFile = ref<File | null>(null)
  const imgFileUrl = ref<string>('')
  const latLngs = ref<[number, number][]>([[35.681, 139.763]])
  return { imgFile, imgFileUrl, latLngs }
}
