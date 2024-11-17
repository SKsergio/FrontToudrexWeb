<template>
    <v-container :fluid=true>
        <v-card class="cardi bg-teal-darken-4">
            <v-card-title class="text-center">
                <h1>Crea una nueva Cuenta</h1>
            </v-card-title>
            <v-card-text>
                <form id="FormGeneral" @submit.prevent="SaveData" class="FormGeneral">
                    <section class="form-group">
                        <label for="nombre">Ingresa tu nombre verdadero, un nombre y un apellido</label>
                        <div class="form-inline">

                            <div class="input-group">
                                <v-text-field label="Nombre" color="blue" type="text" :rules="rules" counter clearable
                                    maxlength="20" prepend-inner-icon="mdi-account" class="input_ct" v-model="nombre"></v-text-field>
                                <h3 ref="error_nombre"></h3>
                            </div>

                            <div class="input-group">
                                <v-text-field label="Apellido" color="blue" type="text" :rules="rules" counter clearable
                                    maxlength="20" prepend-inner-icon="mdi-account" class="input_ct" v-model="apellido"></v-text-field>
                                <h3 ref="error_apellido"></h3>
                            </div>

                        </div>
                    </section>
                    <section class="form-group">
                        <h1 class="How_Name">¿Cuándo naciste?</h1>
                        <label for="fecha">Ingresa tu fecha de nacimiento, se requiere que seas mayor de edad</label>

                        <div class="input-group">
                            <v-date-picker show-adjacent-months color="cyan-darken-4" v-model="fecha"></v-date-picker>


                            <label for="fecha">Fecha de nacimiento</label>
                            <span id="edad">{{ message }}</span>
                            <h3 ref="error_fecha"></h3>
                        </div>

                    </section>
                    <button type="submit" class="btn_logins">Siguiente</button>
                </form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router';

//declaracion de la ruta
const router = useRouter();

//almacenar nombre y apellido
let nombre = ref('');
let apellido = ref('');

//calcular edad
let message = ref('Sin edad ingresada');
let fecha = ref(null);

//datos de la fecha
let fechaActual = new Date();
let anioActual = fechaActual.getFullYear();
let MesActual = fechaActual.getMonth() + 1; 
let DiaActual = fechaActual.getDate();

let anio = computed(() => {
  return fecha.value ? new Date(fecha.value).getFullYear() : 'Sin fecha seleccionada';
});

let mes = computed(() => {
  return fecha.value ? new Date(fecha.value).getMonth() + 1 : 'Sin fecha seleccionada'; 
});

let dia = computed(() => {
  return fecha.value ? new Date(fecha.value).getDate() : 'Sin fecha seleccionada';
});

let calculo = 0;
let edad = 0;

const calcular = () => {
  calculo = anioActual - anio.value;

  if (MesActual < mes.value || (MesActual === mes.value && DiaActual < dia.value)) {
    edad = calculo - 1; 
  } else {
    edad = calculo; 
  }
  message.value = `su edad es de: ${edad}`
};

//llamando al afuncion para calcular edad
watch(dia, (newVal, oldVal)=>{
    calcular()
})

//funcion para guardar los datos en el sesionStorage
const SaveData = () =>{
    if (!validarCampos(nombre.value, apellido.value, edad)) {
        return;
    }

    sessionStorage.setItem('nombre', nombre.value);
    sessionStorage.setItem('apellido', apellido.value);
    sessionStorage.setItem('edad', edad) 

    // redireccionando al siguiente formulario
    router.push({name: 'anccount2'})
}

//validaciones
let error_nombre = ref(null)
let error_apellido = ref(null)
let error_fecha = ref(null)

const validarCampos =(nombre, apellido, edad)=>{
    if (nombre == '' || nombre == null) {
        error_nombre.value.textContent = 'El campo de nombre es requerido.'
        error_nombre.value.style.color = 'red';
        return false
    }else{
        error_nombre.value.textContent = ''
    }
    if (apellido == '' || apellido == null) {
        error_apellido.value.textContent = 'El campo de apellido es requerido.'
        error_apellido.value.style.color = 'red';
        return false
    }else{
        error_apellido.value.textContent = ''
    }
    if (edad < 18 ) {
        error_fecha.value.textContent = 'Debes ser mayor de edad'
        error_fecha.value.style.color = 'red';
        return false
    }else{
        error_fecha.value.textContent = ''
    }
    return true
}
</script>

<style scoped>
@import url(../../css/variables.css);
.FormGeneral {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
.form-group{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    margin: 0 auto;
}
.input_ct{
    width: 320px;
}
.cardi{
    color: var(--color-white);
    width: 60%;
    margin: 0 auto;
    border-radius: 30px;
    /* background-color: var(--color-fifth); */
}
.btn_container{
    display: flex;
    justify-content: center;
    align-items: center;
}
.input-group{
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
}
</style>