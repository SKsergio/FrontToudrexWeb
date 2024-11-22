import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// importaciones de componentes//
//componentes de login
import LoginView from '@/views/login/LoginView.vue'
import CreateAnccount1 from '@/views/login/CreateAnccount1.vue'
import CreateAnccount2 from '@/views/login/CreateAnccount2.vue'
import CreateAnccount3 from '@/views/login/CreateAnccount3.vue'
import CreateAnccount4 from '@/views/login/CreateAnccount4.vue'


//componentes de la app
import HomeView from '@/views/publications/HomeView.vue'
import FindUsers from '@/views/publications/FindUsers.vue'
import ProfileSelf from '@/views/profiles/ProfileSelf.vue'

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
  },
  {
    path: '/auth/create1',
    name:'anccount1',
    component:CreateAnccount1
  },
  {
    path: '/auth/create2',
    name:'anccount2',
    component:CreateAnccount2
  },
  {
    path: '/auth/create3',
    name:'anccount3',
    component:CreateAnccount3
  },
  {
    path: '/auth/create4',
    name:'anccount4',
    component:CreateAnccount4
  },
  {
    path: '/Toudrex/profile',
    name:'profile',
    component:ProfileSelf
  },
  {
    path: '/Toudrex/FindUser',
    name:'findUser',
    component:FindUsers
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
