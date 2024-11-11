import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// importaciones de componentes//
//componentes de login
import LoginView from '@/views/login/LoginView.vue'

//componentes de la app
import HomeView from '@/views/publications/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/auth',
    name:'auth',
    component:LoginView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
