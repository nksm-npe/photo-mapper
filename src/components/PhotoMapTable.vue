<script setup lang="ts">
import type { ImageLocationRecord } from '@/views/ImageLocationRecord'

const props = defineProps<{
  imgAndLocs: ImageLocationRecord
}>()
</script>
<template>
  <div class="overflow-x-auto">
    <table class="border-collapse border border-slate-400">
      <!-- head -->
      <thead>
        <tr>
          <th class="border border-slate-300">filename</th>
          <th class="border border-slate-300">image</th>
          <th class="border border-slate-300">location</th>
        </tr>
      </thead>

      <tbody
        v-for="[key, { latLng, imgdata }] in Object.entries(imgAndLocs)"
        :key="key"
        class="border-2"
      >
        <tr>
          <td class="border border-slate-300">
            <div>
              <div class="font-bold">{{ key }}</div>
            </div>
          </td>
          <td class="border border-slate-300">
            <img :src="imgdata" class="h-20" />
          </td>
          <td class="border border-slate-300">
            {{ latLng }}
          </td>
        </tr>
      </tbody>
      <!-- <tfoot>
        <tr>
          <th>filename</th>
          <th>image</th>
        </tr>
      </tfoot> -->
    </table>
  </div>
</template>
