<template>
   <header v-if="route.meta.showMenu">
        <MenuComponent></MenuComponent>
    </header>

    <main>
        <router-view />
    </main>

    <footer>
    </footer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex'; // Si usas Vuex
import MenuComponent from './components/MenuComponent.vue';
import { useRoute } from 'vue-router';

const route = useRoute()
// Accede a la tienda de Vuex
const store = useStore();

onMounted(() => {
    if (!store.getters.getToken) {
        const token = localStorage.getItem('jwt');
        const user = localStorage.getItem('usuario');
        if (token && user) {
            store.commit('setJwt', token);
            store.commit('setUsuario', JSON.parse(user));
        }
    }
});
</script>
