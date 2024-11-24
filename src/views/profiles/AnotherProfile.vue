<template>
    <div class="profile-container">
        <!-- Foto de portada -->
        <div class="cover-photo">
            <img :src="urlportada" alt="Cover Photo" />
            <input type="file" class="file-input" ref="coverInput" />
        </div>

        <!-- Foto de perfil -->
        <div class="profile-info">
            <div class="profile-photo">
                <img :src='urlperfil' alt="Profile Photo" />
               
                <input type="file" class="file-input" ref="profileInput" />
            </div>

            <h2 class="username">{{Profile?.nombre_usuario}}</h2>
        </div>

        <!-- contenedor de las publicaciones -->
        <div class="publication__profile" id="pub_container">
            <section class="posts" v-for="post in Posts" :key="post.id">
                <!--recuperar el id de publicacion-->
                <div class="posters_img">
                    <img class="img_post_ct" :src='`http://127.0.0.1:8000`+post.url_publicacion' alt="foto">
                    <p>
                    <h4>{{ post.contenido }}</h4>
                    </p>
                </div>
            </section>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, Ref } from 'vue';
import UserInterface from '@/interfaces/UserInterface';
import UserService from '@/services/UserService';
import { useRoute } from 'vue-router';
import GetPostInterface from '@/interfaces/GetPostInterface';
import Postservice from '@/services/PostService';


let Posts = ref<GetPostInterface[]>([]);
const Postserv = new Postservice();

const findPosts = async (id: number) => {
    await Postserv.postfetch(id);
};

const route = useRoute();

const service = new UserService();
const Profile = ref<UserInterface | null>(null); // Inicializa el perfil como `null` inicialmente.

const baseUrl = "http://127.0.0.1:8000";

let urlperfil = '';
let urlportada = '';
let id = ref<number | null>(null);

onMounted(async () => {
    id.value = Number(route.params.id);
    try {
        // Llama al servicio para obtener el usuario
        await service.findOne(id.value);

        // Asigna el perfil obtenido al `Profile`
        Profile.value = service.getUser().value;
        
        await Postserv.postfetch(id.value);

        Posts.value = Postserv.getPosts();
        

        // Asegúrate de que los datos existan antes de usarlos
        if (Profile.value) {
            urlperfil = `${baseUrl}${Profile.value.foto_perfil}`;
            urlportada = `${baseUrl}${Profile.value.foto_portada}`;
        }
    } catch (error) {
        console.error('Error al obtener el perfil:', error);
    }
});

</script>

<style scoped>
@import url(../../css/variables.css);

.profile-container {
    width: 90%;
    margin: 0 auto;
    background-color: var(--color-profile);
    color: black;
    font-family: var(--font--title);
    border-radius: 20px;
}

.cover-photo {
    position: relative;
    width: 100%;
    height: 200px;
    background-color: var(--black-varian);
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 20px;
}

.cover-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.cover-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #5c6bc0;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.file-input {
    display: none;
}

.profile-info {
    text-align: center;
    margin-top: -60px;
}

.profile-photo {
    position: relative;
    display: inline-block;
    margin-bottom: 10px;
}

.profile-photo img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 4px solid white;
}

.profile-btn {
    position: absolute;
    bottom: -14px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--color-cero);
    color: white;
    border: none;
    border-radius: 50%;
    padding: 8px;
    cursor: pointer;
}

.username {
    font-size: 24px;
    margin-top: 10px;
    font-weight: bold;
}

.actions {
    padding-top: 50px;
    display: flex;
    flex-direction: row;
    gap: 60px;
    width: 90%;
    margin: 0 auto;
}

.post-section {
    margin-top: 20px;
    text-align: center;
}

.post-textarea {
    width: 80%;
    height: 100px;
    border-radius: 5px;
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
}
.posts-list {
    margin-top: 20px;
}

.post-card {
    background-color: #333;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 8px;
}
.publication__profile{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 14px;
    max-width: 90%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    background: #192d4788;
    border-radius: 20px;
}
.posters_img {
    width: 300px;
    height: 450px;
    border-radius: 10px;
    margin: 0 auto;
}
.img_post_ct{
    width: 80%;
    height: 80%;
    margin: 0 auto;
    border-radius: 20px;
}
</style>