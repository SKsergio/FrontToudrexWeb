import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

//importando estilos
import '../src/css/layaout.css'
import '../src/css/normalice.css'
import '../src/css/variables.css'

createApp(App)
  .use(router)
  .use(vuetify)
  .use(store)
  .mount('#app')
