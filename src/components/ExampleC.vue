<template>
    <div>
      <div class="input-div">
        <input class="input" name="file" type="file" @change="onImageSelected">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" stroke-linejoin="round" stroke-linecap="round"
            viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor" class="icon">
            <polyline points="16 16 12 12 8 16"></polyline>
            <line y2="21" x2="12" y1="12" x1="12"></line>
            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
            <polyline points="16 16 12 12 8 16"></polyline>
        </svg>
      </div>
      <div v-if="previewImage" class="image-preview">
        <img :src="previewImage" alt="Vista previa de la imagen" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from 'vue';
  
  const previewImage = ref(null); // Para almacenar la URL de la vista previa
  const foto = ref(null); // Variable para almacenar el archivo seleccionado
  
  // Definir el evento que el componente emitirá
  const emit = defineEmits(['imageSelected']);
  
  const onImageSelected = (event) => {
    const file = event.target.files[0]; // Obtener el archivo seleccionado
    if (file) {
      previewImage.value = URL.createObjectURL(file); // Crear una URL para la vista previa
      emit('imageSelected', file); // Emitir el archivo al componente padre
    } else {
      previewImage.value = null; // Si no hay archivo seleccionado, limpiar la vista previa
    }
  };
  </script>
  