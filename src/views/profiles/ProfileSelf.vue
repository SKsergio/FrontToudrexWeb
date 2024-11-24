<template>
    <div class="profile-container">
        <!-- Foto de portada -->
        <div class="cover-photo">
            <img :src="urlportada" alt="Cover Photo" />
            <button @click="changeCover" class="cover-btn">Cambiar portada</button>
            <input type="file" @change="handleCoverChange" class="file-input" ref="coverInput" />
        </div>

        <!-- Foto de perfil -->
        <div class="profile-info">
            <div class="profile-photo">
                <img :src='urlperfil' alt="Profile Photo" />
                <button class="profile-btn">
                    Cambiar perfil
                </button>
                <input type="file" class="file-input" ref="profileInput" />
            </div>

            <h2 class="username">{{ Usuario.nombre_usuario }}</h2>

            <div class="actions">
                <button @click="editProfile" class="btn_logins">Editar perfil</button>
                <button @click="addPost" class="btn_logins">
                    + Agregar publicación
                </button>
                <v-btn @click="logout">Cerrar Sesión</v-btn>

                <v-dialog v-model="dialog" max-width="500px">
                    <v-card class="bg-teal-darken-4">
                        <v-card-title>
                            <span class="text-h6">Agregar publicación</span>
                        </v-card-title>

                        <v-card-text>
                            <!-- Formulario dentro del modal -->
                            <v-form ref="form">
                                <v-text-field v-model="postContent" label="Escribe un comentario :)"
                                    required></v-text-field>

                                <h3>Seleccina una imagen</h3>
                                <div class="form-group">
                                    <inputFileComponent @imageSelected="handleImageBlank"></inputFileComponent>
                                    <span class="error-foto_portada" id="error-foto_portada"></span>
                                </div>

                            </v-form>
                        </v-card-text>

                        <v-card-actions>
                            <!-- Botones del modal -->
                            <v-btn @click="submitPost">Agregar</v-btn>
                            <v-btn @click="closeDialog">Cancelar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import UserInterface from '@/interfaces/UserInterface';
import { useRouter } from 'vue-router';
import inputFileComponent from '@/components/inputFileComponent.vue';
import PostInterface from '@/interfaces/PostInterface';
import Postservice from '@/services/PostService';


const router = useRouter()

const store = useStore();
const baseUrl = "http://127.0.0.1:8000";

const Usuario = computed<UserInterface>(() => store.getters.getUser);
let fotoperfil = Usuario.value.foto_perfil
let fotoportada = Usuario.value.foto_portada
let idUser = Usuario.value.id;

let urlperfil = `${baseUrl}${fotoperfil}`;
let urlportada = `${baseUrl}${fotoportada}`;

// Estado del modal
const dialog = ref(false);

// Datos del formulario
const postContent = ref("");

// Función para abrir el modal
const addPost = () => {
    dialog.value = true;
};

// Función para cerrar el modal
const closeDialog = () => {
    dialog.value = false;
};

// Acción al enviar el formulario
const submitPost = () => {
    if (postContent.value.trim() === "") {
        alert("El campo no puede estar vacío.");
        return;
    }

    if (fotopublicacion) {
        savePhotos(idUser, 2, fotopublicacion, postContent.value)
    }
    // Aquí puedes realizar alguna acción con los datos, como enviarlos a una API.
    closeDialog();
};

let fotopublicacion = <File | null>(null); // Archivo seleccionado
//foto de portada
const handleImageBlank = (file: File) => {
    fotopublicacion = file; // Guardar el archivo seleccionado
};


const logout = () => {
    store.dispatch('logout');
    router.push('/auth'); // Redirigir al login
};

const savePhotos = async (id_user: number, id_tipo: number, photoFile: File, content: string) => {

    const fotoData = {
        fk_usuario_id: id_user,
        fk_tipoFoto_id: id_tipo,
        photo: photoFile,
        contenido: content
    };
    console.log('datos antes de ser enviados:' + fotoData);

    const Postserv = new Postservice()


    try {
        const response = await Postserv.registrarPosts(fotoData);
        const data = await response.json();
        console.log("Foto registrada con éxito:", data);
    } catch (error) {
        console.error("Error al enviar la foto:", error);
    };
}


//funciones para rditar perfil y agregar post
const editProfile = () => {

}
const handleCoverChange = () => {

}
const changeCover = () => {

}
</script>

<style scoped>
@import url(../../css/variables.css);

.profile-container {
    width: 90%;
    margin: 0 auto;
    background-color: var(--color-profile);
    color: black;
    font-family: var(--font--title);
    border-radius: 20pxx;
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

.btn-save-post {
    background-color: #ff4081;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
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

.btn-delete-post {
    background-color: #f44336;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-size: 12px;
}
</style>