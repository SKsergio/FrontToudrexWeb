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

                    <form class="form__login" method="POST" action="">

                        <div class="container_inputs">
                            <div class="input__box">
                                <input type="text" class="input_file" required id="user_gmail" v-model="user_gmail"
                                    autocomplete="new-username">
                                <span>User</span>
                                <i></i>
                            </div>

                            <div class="input__box">
                                <input type="password" class="input_file" required id="password" v-model="password"
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

                            <a class="create" id="createAccountBtn" href="#">Create new account</a>


                        </div>

                    </form>
                </div>

            </secction>
        </div>
    </div>
</template>

<script setup>
//importando css
import '@/css/login.css'

//importando componentes de vue
import { ref, Ref } from 'vue';

let user_gmail = ref('');
let password = ref('');


</script>

<style scoped>
</style>