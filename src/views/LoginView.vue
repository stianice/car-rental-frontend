<template>
    <NavBar />
    <div class='container'>
        <LogIn />
    </div>
</template>

<style scoped>
.container {
    margin-top: 10px;
  
}
</style>

<script setup>
import NavBar from '@/components/navbar/CustomerNavBar.vue';
import LogIn from '@/components/LogIn.vue';


</script>
