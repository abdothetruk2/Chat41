import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './Home.vue'
import AboutView from './About.vue'
import NotFound from './NotFound.vue' // Ensure you have a NotFound component

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound } // Catch-all route
]

const router = createRouter({
  history: createWebHistory(), // Use createWebHistory for client-side applications
  routes,
})

export default router