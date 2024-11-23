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

//store
import { useStore } from 'vuex'; // Para acceder al store

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    meta: { requiresAuth: true, showMenu: true },
  },
  {
    path: '/auth',
    name:'auth',
    component:LoginView,
    meta: { showMenu: false }
  },
  {
    path: '/auth/create1',
    name:'anccount1',
    component:CreateAnccount1,
    meta: { showMenu: false }
  },
  {
    path: '/auth/create2',
    name:'anccount2',
    component:CreateAnccount2,
    meta: { showMenu: false }
  },
  {
    path: '/auth/create3',
    name:'anccount3',
    component:CreateAnccount3,
    meta: { showMenu: false }
  },
  {
    path: '/auth/create4',
    name:'anccount4',
    component:CreateAnccount4,
    meta: { showMenu: false }
  },
  {
    path: '/Toudrex/profile',
    name:'profile',
    component:ProfileSelf,
    meta: { requiresAuth: true, showMenu: true }
    
  },
  {
    path: '/Toudrex/FindUser',
    name:'findUser',
    component:FindUsers,
    meta: { requiresAuth: true, showMenu: true }
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Configuración de la protección de rutas
router.beforeEach((to, from, next) => {
  const store = useStore(); // Accede al store
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = !!store.getters.getToken;

  if (requiresAuth && !isAuthenticated) {
      next('/auth'); // Redirigir a la pantalla de inicio de sesión si no está autenticado
  } else {
      next(); // Continuar con la navegación
  }
});

export default router
