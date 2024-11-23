<template>
    <v-container :fluid=true>
        <v-card class="cardi bg-teal-darken-4">
            <v-card-title class="text-center">
                <h1>Crea una nueva Cuenta</h1>
            </v-card-title>
            <v-card-text>
                <form class="FormGeneral" @submit.prevent="SaveData">
                    <h1 class="How_Name text-center">Datos para inicio de sesión</h1>

                    <div class="form-group">
                        <label for="usuario">Crea un nombre de Usuario</label>

                        <div class="input-group">
                            <v-text-field label="Nombre de Usuario" color="blue" type="text" :rules="rules" counter
                                clearable maxlength="20" prepend-inner-icon="mdi-account" class="input_ct"
                                v-model="user"></v-text-field>
                            <h3 ref="error_usuario"></h3>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="correo">Ingresa un correo electrónico</label>
                        <div class="input-grou">
                            <v-text-field hide-details="auto" class="input_ct" color="blue" label="correo electrónico"
                                placeholder="johndoe@gmail.com" type="email" v-model="correo"></v-text-field>
                            <h3 ref="error_gmail"></h3>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="password">Crea una contraseña</label>
                        <p>Debe ser mayor a 8 caracteres, al momento de darle siguiente, ten en cuenta que con estos
                            datos
                            tendrás que ingresar al momento de iniciar sesión en Toudrex</p>

                        <div class="input-group">
                            <section class="password-group">
                                <v-text-field hint="Enter your password to access this website" label="Password"
                                    type="password" class="input_ct" v-model="password">
                                </v-text-field>
                                <span class="toggle-password">👁️</span>
                            </section>

                            <h3 class="error_message" ref="error_password"></h3>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="confirm-password">Confirma tu contraseña</label>
                        <p>La contraseña debe ser igual a la descrita en el ítem anterior</p>
                        <section class="password-group">
                            <v-text-field hint="Enter your password to access this website" label="Password"
                                type="password" class="input_ct" v-model="password_validate">
                            </v-text-field>
                            <span class="toggle-password">👁️</span>
                        </section>

                        <h3 class="error_message" ref="error_passwordValidate"></h3>
                    </div>

                    <div class="button-group">
                        <button type="submit" class="btn_logins">Siguiente</button>
                    </div>
                </form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

//ruta
let router = useRouter()

//datos a almacenar en sesion storage
let user = ref('');
let correo = ref('');
let password = ref('');
let password_validate = ref('');

//funcion para guardar los datos en el sesionStorage
const SaveData = () =>{
    if (!validarCampos(user.value, correo.value, password.value, password_validate.value)) {
        return;
    }

    sessionStorage.setItem('usuario', user.value);
    sessionStorage.setItem('correo', correo.value);
    sessionStorage.setItem('contrasenia', password_validate.value);

    // redireccionando al siguiente formulario
    router.push({name: 'anccount4'})
}

//validaciones
let error_usuario = ref(null)
let error_password = ref(null)
let error_passwordValidate = ref(null)
let error_gmail = ref(null)


const validarCampos =(user, mail, password, passwordVal)=>{
    if (user == '' || user == null) {
        error_usuario.value.textContent = 'El campo de usuario es requerido.'
        error_usuario.value.style.color = 'red';
        return false
    }else{
        error_usuario.value.textContent = ''
    }
    if (mail == '' || mail == null) {
        error_gmail.value.textContent = 'El campo de correo es requerido.'
        error_gmail.value.style.color = 'red';

        //aca falta validar el regex del email
        return false
    }else{
        error_gmail.value.textContent = ''
    }
    if (password == '' || password == null) {
        error_password.value.textContent = 'El campo de contraseña es requerido.'
        error_password.value.style.color = 'red';
        return false
    }else{
        error_password.value.textContent = ''
    }
    if (password != passwordVal) {
        error_passwordValidate.value.textContent = 'Las contraseñas deben coincidir'
        error_passwordValidate.value.style.color = 'red';
        return false
    }else{
        error_passwordValidate.value.textContent = ''
    }
    return true
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