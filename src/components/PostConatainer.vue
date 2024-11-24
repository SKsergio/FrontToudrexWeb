<template>
    <!-- contenedor de las publicaciones -->
    <div class="publication__profile" id="pub_container">
        <section class="posts" v-for="post in posts" >
            <!--recuperar el id de publicacion-->
            <div class="posters_img">
                <img class="img_post_ct" src=""
                    alt="foto">
                <p>
                    <h1>{{mensaje }}</h1>
                </p>
                <input type="submit" value="Eliminar">
            </div>
        </section>

    </div>
</template>

<script setup>

</script>

<style scoped>
.publication__profile{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    max-width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    padding-top: 30px;
    background: #192d4788;
}
.posters_img {
    width: 300px;
    height: 450px;
    border-radius: 10px;
    margin: 0 auto;
}
.img_post_ct{
    width: 80%;
    height: 80%;
    margin: 0 auto;
    border-radius: 20px;
}
</style>