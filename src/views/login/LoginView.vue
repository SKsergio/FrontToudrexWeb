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
                                <input type="text" class="input_file" required id="user_gmail" v-model="authe.nombre_usuario"
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
import AuthInterface from '@/interfaces/AuthInterface';
//importando vuex
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const router = useRouter()

const store = useStore()

let authe = ref<AuthInterface>({
    nombre_usuario: '',
    password: '',
});

const Authentification= async()=>{
    const success = await store.dispatch('login', authe.value);

    if (success) {
        console.log('Login exitoso');
        router.push({name: 'profile'})
    } else {
        alert('error en las credenciales master')
    }

}

</script>

<style scoped>
</style>