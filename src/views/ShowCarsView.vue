<template>
      <NavBar />
    <main data-bs-spy="scroll" data-bs-target="#mainNav"></main>
    <CaruoselComponent />
 <CarFleet />


</template>

<script setup>

import NavBar from '../components/NavBar.vue';
import CaruoselComponent from '../components/CaruoselComponent.vue';
import CarFleet from '../components/CarFleet.vue';
</script>