<template>
    <v-container :fluid=true>
        <v-card class="cardi bg-teal-darken-4">
            <v-card-title class="text-center">
                <h1>Crea una nueva Cuenta</h1>
            </v-card-title>
            <v-card-text>
                <form id="Form_photo" enctype="multipart/form-data" @submit.prevent="saveDataUser" class="FormGeneral">
                    <!-- notaaaaaaa utiliza el autocomplete=off que es para que los dformularios no se completen automaticamante -->
                    <div class="form-group">
                        <h1 class="How_Name">Selecciona una foto de Perfil</h1>

                        <div class="input-group">
                            <inputFileComponent @imageSelected="handleImageProfile"></inputFileComponent>
                        </div>
                        <span class="error-foto_perfil" id="error-foto_perfil"></span>
                    </div>
                    <div class="form-group">
                        <h1 class="How_Name">Selecciona una foto de Portada</h1>
                        <div class="input-group">
                            <inputFileComponent @imageSelected="handleImageBlank"></inputFileComponent>
                        </div>
                        <span class="error-foto_portada" id="error-foto_portada"></span>
                    </div>
                    <div class="button-group">
                        <button type="submit" class="btn_logins">Siguiente</button>

                    </div>
                </form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import inputFileComponent from '@/components/inputFileComponent.vue';
// Importando servicio e interfaz
import PhotoInterface from '@/interfaces/PhotoInterface';
import UserInterface from '@/interfaces/UserInterface';
import PhotoService from '@/services/PhotoService';
//importando vuex
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { toRaw } from 'vue';

const router = useRouter()
const store = useStore()

let fotoperfil = <File | null>(null); // Archivo seleccionado
let fotoportada = <File | null>(null); // Archivo seleccionado

//usuario 
let usuarioNew = ref<UserInterface>({
    id: 0,
    nombre_usuario: '',
    email: '',
    password: '',
    fecha_nacimiento: '',
    genero: '',
    telefono: '',
    nombre: '',
    apellido: '',
    direccion: 'prueba',
    foto_perfil: '120',
    foto_portada: '154'
})

//imagen de perfil
const handleImageProfile = (file: File) => {
    fotoperfil = file; // Guardar el archivo seleccionado
    console.log('Archivo recibido en el padre:', fotoperfil);
};

//foto de portada
const handleImageBlank = (file: File) => {
    fotoportada = file; // Guardar el archivo seleccionado
    console.log('Archivo recibido en el padre:', fotoportada);
};

//obtener datos del sesionStorage
const getDatas = () => {
    const usuario = sessionStorage.getItem('usuario') || ''; // Asigna un string vacío si es null
    const telefono = sessionStorage.getItem('telefono') || '';
    const nombre = sessionStorage.getItem('nombre') || '';
    const correo = sessionStorage.getItem('correo') || '';
    const genero = sessionStorage.getItem('genero') || '';
    const fecha_nacimiento = sessionStorage.getItem('fecha_nacimiento') || '';
    const contrasenia = sessionStorage.getItem('contrasenia') || '';
    const apellido = sessionStorage.getItem('apellido') || '';

    usuarioNew.value.nombre_usuario = usuario;
    usuarioNew.value.telefono = telefono;
    usuarioNew.value.nombre = nombre;
    usuarioNew.value.email = correo;
    usuarioNew.value.genero = genero;
    usuarioNew.value.fecha_nacimiento = fecha_nacimiento;
    usuarioNew.value.apellido = apellido;
    usuarioNew.value.password = contrasenia

}

const saveDataUser = async () => {
    //ontenemos la data
    getDatas()
    console.log(usuarioNew.value);
    const userData = toRaw(usuarioNew.value);
    console.log('Datos enviados al servidor:', userData);

    const success = await store.dispatch('registerUser', userData);
    if (success) {
        //obtenidno el id del usuario que ha sido registrado
        const Usuario = computed<UserInterface>(() => store.getters.getUser);
        const idUser = Usuario.value.id

        //almacenar foto de perfil
        if (fotoperfil) {
            savePhotos(idUser, 1, fotoperfil);
        } else {
            console.error("No se ha seleccionado una foto de perfil.");
        }

        if (fotoportada) {
            savePhotos(idUser, 3, fotoportada);
        } else {
            console.error("No se ha seleccionado una foto de portada.");
        }

        router.push({ name: 'profile' })
    } else {
        console.log('Error en crear:', store.state.error);
    }
}

const photoService = new PhotoService()

const savePhotos = async (id_user: number, id_tipo: number, photoFile: File) => {

    const fotoData = {
        fk_usuario_id: id_user,
        fk_tipoFoto_id: id_tipo,
        photo: photoFile,
    };
    console.log('datos antes de ser enviados:' + fotoData);
    

    try {
        const response = await photoService.registerFoto(fotoData);
        const data = await response.json();
        console.log("Foto registrada con éxito:", data);
    } catch (error) {
        console.error("Error al enviar la foto:", error);
    };
}

</script>

<style scoped>
@import url(../../css/botones.css);

.FormGeneral {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    margin: 0 auto;
    gap: 11px;
}

.password-group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 9px;
}

.input_ct {
    width: 320px;
}

.cardi {
    color: var(--color-white);
    width: 60%;
    margin: 0 auto;
    border-radius: 30px;
}

.btn_container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
}

.button-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>