<template>

    <v-container :fluid=true>
        <v-card class="cardi bg-teal-darken-4">
            <v-card-title class="text-center">
                <h1>Crea una nueva Cuenta</h1>
            </v-card-title>
            <v-card-text>
                <form id="Form_photo" enctype="multipart/form-data" class="FormGeneral">
                    <!-- notaaaaaaa utiliza el autocomplete=off que es para que los dformularios no se completen automaticamante -->
                    <div class="form-group">
                        <h1 class="How_Name">Selecciona una foto de Perfil</h1>

                        <div class="input-group">
                            <inputFileComponent></inputFileComponent>
                        </div>
                        <span class="error-foto_perfil" id="error-foto_perfil"></span>
                    </div>
                    <div class="form-group">
                        <h1 class="How_Name">Selecciona una foto de Portada</h1>
                        <div class="input-group">
                            <inputFileComponent></inputFileComponent>
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

<script setup>
import inputFileComponent from '@/components/inputFileComponent.vue';
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