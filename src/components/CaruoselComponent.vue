<template>
   <div style="margin-top: 30px;">
    <a-carousel
      :autoPlay="true"
      animation-name="card"
      show-arrow="never"
      indicator-position="outer"
      :style="{
        width: '100%',
        height: '380px',
      }"
    >
      <a-carousel-item v-for="image in images" :style="{ width: '60%' }">
        <img
          :src="image"
          :style="{
            width: '100%',
          }"
        />
      </a-carousel-item>
    </a-carousel>
   </div>
    
  </template>
  <script setup>

import { onMounted, ref } from 'vue'

const images=ref([

'http://localhost:3000/staticfiles/wf3awrmw.chv.png',
'http://localhost:3000/staticfiles/5crgdmjw.00e.png',
'http://localhost:3000/staticfiles/5crgdmjw.00e.png'

])

</script>