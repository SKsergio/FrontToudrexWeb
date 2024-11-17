<template>
    <v-container :fluid=true>
        <v-card class="cardi bg-teal-darken-4">
            <v-card-title class="text-center">
                <h1>Crea una nueva Cuenta</h1>
            </v-card-title>
            <v-card-text>
                <form id="Form_Sex" class="FormSex">
                    <div class="form-group">
                        <h1 class="How_Name">¿Con qué género te identificas?</h1>

                        <v-radio-group v-model="genere">
                            <v-radio label="Masculino" value="Masculino"></v-radio>
                            <v-radio label="Femenino" value="Femenino"></v-radio>
                        </v-radio-group>

                        <span id="error_genero"></span>
                    </div>
                    <div class="form-group">
                        <label for="telefono">¿Cuál es tu número de celular?</label>
                        <p>Ingresa un número de celular de contacto. Nadie más lo verá.</p>

                        <v-text-field label="Numero de telefono" color="sean" type="number" :rules="rules" counter
                            clearable maxlength="12" prepend-inner-icon="mdi-phone-dial" class="input_ct"
                            v-model="nombre"></v-text-field>

                        <h3 ref="error_numero"></h3>

                        <span class="error-message" id="error-telefono"></span>
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
</script>

<style scoped>
@import url(../../css/botones.css);
.FormGeneral {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

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