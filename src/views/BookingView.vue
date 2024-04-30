<template>
    <NavBar />
    <div class='container'>
        <router-view name="BookingWizard" />
    </div>
</template>

<style scoped>
.container {
    margin-top: 100px;
}
</style>

<script setup>
    import NavBar from '@/components/navbar/CustomerNavBar.vue';
    import { RouterView } from 'vue-router'

   
</script>

