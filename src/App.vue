<template>
  <header>
    <nav>
        <router-link to="/">Home</router-link>|
        <router-link to="/auth">Login/register</router-link>|
    </nav>
  </header>

  <main>
    <router-view/>
  </main>

  <footer>
  </footer>
</template>

<script setup lang="ts">
</script>
