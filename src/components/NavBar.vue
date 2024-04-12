<template>
    <nav id="mainNav" class="sticky-top">
        <BNavbar toggleable="lg" variant="dark" v-b-color-mode="'dark'" placement="fixed">
        <BNavbarBrand href="/"><RouterLink class="navbar-brand" to='/'>CarGo</RouterLink></BNavbarBrand>

        <BNavbarToggle target="navbar-toggle-collapse">
        </BNavbarToggle>

        <BCollapse id="navbar-toggle-collapse" is-nav>
        <BNavbarNav class="ml-auto">
        <BNavItem href="/#home">首页</BNavItem>
        <BNavItem href="/#about">为什么选择我们?</BNavItem>
        <BNavItem href="/#fleet" >我们的车辆</BNavItem>
        </BNavbarNav>
        <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <BNavForm v-if="!isUserLoggedIn" class="d-flex">
        <button type="button" @click="redirectToLogin" class="btn btn-primary me-2">登录</button>
        <button type="button" @click="redirectToSignUp" class="btn btn-outline-primary me-2">注册</button>
        </BNavForm>
        <BNavForm v-else class="d-flex">
        <a href="/useraccount" class="btn btn-primary me-2">账户</a>
        <button @click="logout" class="btn btn-outline-primary">登出</button>
        </BNavForm>
        </BNavbarNav>
        </BCollapse>
        </BNavbar>
    </nav>
</template>

<script>
    import { getToken, logout } from '../utils/auth'
    import { RouterLink } from 'vue-router'




    export default {
        data() {
            return {
                isUserLoggedIn: false,
                navbarCollapsed: true
            }
        },
        mounted() {
            this.isUserLoggedIn = (getToken()) ? true : false;
            console.log(this.isUserLoggedIn)
        },
        methods: {
            logout() {
                logout();
            },
            redirectToLogin() {
                this.$router.push('/login');
            },
            redirectToSignUp() {
                this.$router.push('/register');
            },
            redirecToManager() {
                this.$router.push('/manager');
            },

        },
        components: {
            RouterLink
        }
    }
</script>

<style scoped>
.CarGo-navbar {
    padding: 10px 25px;
}

        /* Responsive adjustments */
        @media (max-width: 767.98px) {
            .CarGo-navbar {
                height: auto;
                /* Allow the navbar to expand vertically */
            }


        }
</style>


