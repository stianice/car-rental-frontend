<template>
    <NavBar />
    <div class='container'>
        <router-view name="BookingWizard"></router-view>
    </div>
</template>

<style scoped>
.container {
    margin-top: 100px;
}
</style>

<script setup>
    import NavBar from '@/components/NavBar.vue';
    import { RouterView } from 'vue-router'

   
</script>

