<template>

    <div class="content_home">
        <!-- contenedor de las historias -->
        <div class="histories__container">

        </div>
        <!-- contenedor de las publicaciones -->
        <div class="publications__container">

            <section class="information__section__home">


                <form action="" method="post" class="form_search_pipol">

                    <div class="searchbar">

                        <div class="shadow"></div>
                        <input @change="buscar()" type="text" v-model="param" placeholder="Search and find your friends..."
                            class="input__search" required>
                        <ion-icon name="search-outline" class="icon__find"></ion-icon>

                    </div>

                </form>

                 <!-- Lista de perfiles -->
                 <transition-group name="fade" tag="div" class="profiles-list" >
                        <div v-for="profile in filteredProfiles" :key="profile.id" class="profile-card">
                            <div class="profile-photo">
                                <img :src='`http://127.0.0.1:8000` + profile.foto_perfil' alt="Profile Photo" />
                            </div>
                            <div class="profile-info">
                                <h3>{{ profile.nombre_usuario }}</h3>
                                <h3>Nombre real: {{ profile.nombre }}</h3>
                                <button class="view-profile-btn" @click="irperfil(profile.id)">Ver Perfil</button>
                            </div>
                        </div>
                    </transition-group>

                    <div v-if="filteredProfiles.length == 0" class="no-results">
                        <p>No se encontraron perfiles.</p>
                    </div>
            </section>

            <div class="content_central_home">
                <div class="publications" v-for="post in publicaciones" :key="post.id">

                    <section class="header_publications">
                        <div class="profile_image_home">
                            <a @click="irperfil(post.fk_usuario_id)">
                                <img class="img_prf" :src="`http://127.0.0.1:8000` + post.usuario.foto_perfil" alt="foto">
                            </a>
                        </div>
                        <a @click="irperfil(post.fk_usuario_id)">
                            <p>{{ post.usuario.nombre_usuario }}</p>
                        </a>
                    </section>

                    <section class="image_publication__content">
                        <div class="image_publications">
                            <img class="img_pbl" :src='`http://127.0.0.1:8000` + post.url_publicacion'
                                alt="foto_publicacion">
                        </div>
                    </section>

                    <section class="message__publication">
                        <p>{{ post.contenido }}</p>
                    </section>

                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import UserInterface from '@/interfaces/UserInterface';
import UserService from '@/services/UserService';
const router = useRouter();


// Variable para almacenar las publicaciones
const publicaciones = ref([]);

// Función para obtener las publicaciones
const obtenerPublicaciones = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/publicacion/obtener', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error al obtener publicaciones: ${response.statusText}`);
        }

        const data = await response.json();
        publicaciones.value = data.data; // Asignar los datos obtenidos
        console.log(publicaciones.value);

    } catch (error) {
        console.error('Error al consumir la API:', error);
    }
};

// Llamar a la función al montar el componente
onMounted(() => {
    obtenerPublicaciones();
});

const services = new UserService();

//ir a perfil
const irperfil = (id: number) => {
    router.push({ name: 'AnotherProfile', params: { id } });
}

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
</script>

<style scoped>
@import url(../../css//home.css);

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