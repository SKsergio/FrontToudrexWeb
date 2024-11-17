<template>
    <div>
      <h1>Registro - Paso 1</h1>
      <form @submit.prevent="guardarDatos">
        <label>
          Nombre:
          <input v-model="nombre" type="text" placeholder="Ingresa tu nombre" />
        </label>
        <br />
        <label>
          Apellido:
          <input v-model="apellido" type="text" placeholder="Ingresa tu apellido" />
        </label>
        <br />
        <button type="submit">Guardar y Continuar</button>
      </form>
      <p>Datos guardados temporalmente: {{ datosGuardados }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const nombre = ref('');
  const apellido = ref('');
  const datosGuardados = ref(null);
  
  const guardarDatos = () => {
    // Guardar en sessionStorage
    sessionStorage.setItem('nombre', nombre.value);
    sessionStorage.setItem('apellido', apellido.value);
  
    // Leer datos para mostrarlos
    datosGuardados.value = {
      nombre: sessionStorage.getItem('nombre'),
      apellido: sessionStorage.getItem('apellido'),
    };
  
    alert('Datos guardados. Continúa con el siguiente paso.');
  };
  
  onMounted(() => {
    // Recuperar datos de sessionStorage si existen
    const nombreGuardado = sessionStorage.getItem('nombre');
    const apellidoGuardado = sessionStorage.getItem('apellido');
  
    if (nombreGuardado || apellidoGuardado) {
      nombre.value = nombreGuardado || '';
      apellido.value = apellidoGuardado || '';
      datosGuardados.value = { nombre: nombreGuardado, apellido: apellidoGuardado };
    }
  });
  </script>
  
  <style>
  form {
    margin: 20px 0;
  }
  input {
    margin-bottom: 10px;
    display: block;
  }
  button {
    margin-top: 10px;
  }
  </style>
  