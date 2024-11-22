<template>
   <div class="main">
        <div class="content__main">

            <secction class="sc1">
                <img :src="require('@/assets/file.png')" alt="logo papaaa" id="logo">
                <section>
                    <p>Always stay connected with yours :)</p>
                </section>
            </secction>

            <secction class="sc2">

                <div class="wrapper">

                    <h1>Toudrex</h1>

                    <form class="form__login"  @submit.prevent="Authentification">

                        <div class="container_inputs">
                            <div class="input__box">
                                <input type="text" class="input_file" required id="user_gmail" v-model="authe.email"
                                    autocomplete="new-username">
                                <span>User</span>
                                <i></i>
                            </div>

                            <div class="input__box">
                                <input type="password" class="input_file" required id="password" v-model="authe.password"
                                    autocomplete="new-password">
                                <span>Password</span>
                                <i></i>
                            </div>
                        </div>

                        <div class="butons">

                            <input type="submit" id="loginBtn" value="Login" class="LOGBTN">

                            <div class="forg">
                                <a id="forgotPassword" href="#">Forgotten password?</a>
                            </div>

                            <router-link :to="{name:'anccount1'}" class="create" id="createAccountBtn">
                                Create new account
                            </router-link>
                            

                        </div>

                    </form>
                </div>

            </secction>
        </div>
    </div>
</template>

<script setup lang="ts">
//importando css
import '@/css/login.css'

//importando componentes de vue
import { ref } from 'vue';

//importando servicio e interfaz
import AuthService from '@/services/AuthService';
import AuthInterface from '@/interfaces/AuthInterface';

let authe = ref<AuthInterface>({
    email: '',
    password: '',
});

//instancia de la clase
let AuthServ = new AuthService

const Authentification= async()=>{
    try {
        const response = await AuthServ.login(authe.value)
        console.log('Login exitoso:', response);
    } catch (error) {
        console.error('Error al autenticar:', error);
    }
}

</script>

<style scoped>
</style>