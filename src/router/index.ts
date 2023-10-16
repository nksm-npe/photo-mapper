import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PhotoAndMap from '../views/PhotoAndMap.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/photo-and-map',
      name: 'photo-and-map',
      component: PhotoAndMap
    }
  ]
})

export default router
