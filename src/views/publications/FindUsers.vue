<template>
    <div class="app">
        <!-- Barra de búsqueda -->
        <div class="search-bar">
            <input type="text" @change="buscar()" v-model="param" placeholder="Buscar perfiles por nombre..."
                class="search-input" />
        </div>

        <!-- Lista de perfiles -->
        <transition-group name="fade" tag="div" class="profiles-list">
            <div v-for="profile in filteredProfiles" :key="profile.id" class="profile-card">
                <div class="profile-photo">
                    <img :src='`http://127.0.0.1:8000`+profile.foto_perfil' alt="Profile Photo" />
                </div>
                <div class="profile-info">
                    <h3>{{ profile.nombre_usuario }}</h3>
                    <h3>Nombre real: {{ profile.nombre }}</h3>
                    <button class="view-profile-btn" @click="irperfil(profile.id)">Ver Perfil</button>
                </div>
            </div>
        </transition-group>

        <div v-if="filteredProfiles.length == 0" class="no-results">
            <p >No se encontraron perfiles.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed } from 'vue';
import UserService from '@/services/UserService';
import UserInterface from '@/interfaces/UserInterface';
import { useRouter } from 'vue-router';

const router = useRouter();

const services = new UserService();
let filteredProfiles = ref<UserInterface[]>([]);
let param = ref<string>('');

// Llamar a la función buscar y actualizar filteredProfiles directamente
const buscar = async () => {

    await findUsers(param.value); // Asegurarse de esperar a que findUsers termine

    // Una vez que los datos hayan sido actualizados, actualiza filteredProfiles
    filteredProfiles.value = services.getUsers().value;
};

const findUsers = async (param: string) => {
    await services.findUser(param); // Aquí estamos esperando que findUser termine
};

//ir a perfil
const irperfil = (id: number)=>{
    router.push({ name: 'AnotherProfile', params: { id } });
}
</script>

<style scoped>
.search-bar {
    margin: 10px 0;
    display: flex;
    justify-content: center;
}

.search-input {
    padding: 8px;
    width: 80%;
    border-radius: 8px;
    border: 1px solid #ddd;
    font-size: 16px;
    box-sizing: border-box;
}

.profiles-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

.profile-card {
    background: #1e86a0;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin: 10px 0;
    padding: 15px;
    width: 80%;
    max-width: 400px;
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
}

.profile-card:hover {
    transform: translateY(-5px);
}

.profile-photo img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 20px;
}

.profile-info h3 {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
}

.profile-info p {
    margin: 5px 0;
    font-size: 14px;
    color: #555;
}

.view-profile-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.view-profile-btn:hover {
    background-color: #0056b3;
}

.perfil-detalle {
    margin-top: 20px;
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
}

.cerrar-btn {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}

.no-results {
    text-align: center;
    margin-top: 20px;
}

.profile-card {
    opacity: 0;
    animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>