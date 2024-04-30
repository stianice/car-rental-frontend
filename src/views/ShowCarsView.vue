<template>
      <NavBar />
    <main data-bs-spy="scroll" data-bs-target="#mainNav"></main>
    <CarouselComponent />
 <CarFleet />


</template>

<script setup>

import NavBar from '../components/navbar/CustomerNavBar.vue';
import CarouselComponent from '../components/CarouselComponent.vue';
import CarFleet from '../components/CarFleet.vue';
</script>