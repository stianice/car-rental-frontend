<template>
    <NavBar />
    <div class='container'>
        <Register />
    </div>
   
</template>

<style scoped>
.container {
    margin-top: 100px;
}
</style>

<script setup>

    import NavBar from '@/components/navbar/CustomerNavBar.vue';
    import Register from '@/components/Register.vue';
    
   
</script>

