<template>
    <v-container :fluid=true>
        <v-card class="cardi bg-teal-darken-4">
            <v-card-title class="text-center">
                <h1>Crea una nueva Cuenta</h1>
            </v-card-title>
            <v-card-text>
                <form id="Form_Sex"  @submit.prevent="SaveData" class="FormSex">
                    <div class="form-group">
                        <h1 class="How_Name">¿Con qué género te identificas?</h1>

                        <v-radio-group v-model="genere">
                            <v-radio label="Masculino" value="Masculino"></v-radio>
                            <v-radio label="Femenino" value="Femenino"></v-radio>
                        </v-radio-group>

                        <h3 ref="error_genero"></h3>
                    </div>
                    <div class="form-group">
                        <label for="telefono">¿Cuál es tu número de celular?</label>
                        <p>Ingresa un número de celular de contacto. Nadie más lo verá.</p>

                        <v-text-field label="Numero de telefono" color="blue" type="number" :rules="rules" counter
                            clearable maxlength="12" prepend-inner-icon="mdi-phone-dial" class="input_ct"
                            v-model="phoneNumber"></v-text-field>

                        <h3 ref="error_numero"></h3>
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
import { ref} from 'vue';
import { useRouter } from 'vue-router';

let router = useRouter();

//variables para almacenar los valores
let genere = ref('');
let phoneNumber = ref('');

//funcion para guardar los datos en el sesionStorage
const SaveData = () =>{
    if (!validarCampos(genere.value, phoneNumber.value)) {
        return;
    }

    sessionStorage.setItem('genero', genere.value);
    sessionStorage.setItem('telefono', phoneNumber.value);

    // redireccionando al siguiente formulario
    router.push({name: 'anccount3'})
}

//validaciones
let error_genero = ref(null)
let error_numero = ref(null)

const validarCampos =(genero, numero)=>{
    if (genero == '' || genero == null) {
        error_genero.value.textContent = 'El campo de genero es requerido.'
        error_genero.value.style.color = 'red';
        return false
    }else{
        error_genero.value.textContent = ''
    }
    if (numero == '' || numero == null) {
        error_numero.value.textContent = 'El campo de apellido es requerido.'
        error_numero.value.style.color = 'red';
        return false
    }else{
        error_numero.value.textContent = ''
    }
    return true
}


</script>

<style scoped>
@import url(../../css/botones.css);
.form-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    margin: 0 auto;
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
.button-group{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>