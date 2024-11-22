<template>
  <header>
    <MenuComponent></MenuComponent>
  </header>

  <main>
    <router-view/>
  </main>

  <footer>
  </footer>
</template>

<script setup lang="ts">
    import MenuComponent from './components/MenuComponent.vue';
</script>
