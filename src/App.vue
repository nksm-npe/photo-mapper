<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <!-- <RouterLink to="/about">About</RouterLink> -->
      <RouterLink to="/photo-and-map">Photo and Map</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
