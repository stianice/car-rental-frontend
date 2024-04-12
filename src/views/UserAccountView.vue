<template>
    <div class="container  col-xxl-8 px-4 py-5">

        <div class="sidebar">
            <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark account-sidebar">
                <span class="fs-3 right-align">User</span>
                <hr>
                <ul class="nav nav-pills flex-column mb-auto">

                 
                    <li class="nav-item">
                        <a href="/" class="nav-link fs-5" aria-current="page">
                            主页
                        </a>
                    </li>
                    <li class="nav-item">
                        <a @click="showContent('myBookings')" href="#" class="nav-link fs-5" aria-current="page">
                            我的订单
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="/#fleet" class="nav-link fs-5">
                            开始预定
                        </a>
                    </li>
                    <li class="nav-item">
                        <a @click="showContent('setting')" href="#" class="nav-link fs-5">
                            用户设置
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" @click="logout" class="nav-link fs-5">
                            登出
                        </a>
                    </li>
                    <li class="nav-item">
                        <a @click="accountCancellation" href="#" class="nav-link fs-5">
                            删除账户
                        </a>
                    </li>
                </ul>
                <hr>
            </div>
        </div>


        <div class="content">
            <div class="child" v-if="currentContent === 'myBookings'">
                <UserBookings />
            </div>

            <div class="child" v-if="currentContent === 'setting'">
                <UserInfoForm />
            </div>
        </div>

    </div>
</template>

<script>
import { ref } from 'vue'
import UserBookings from '../components/UserBookings.vue'
import UserInfoForm from '../components/UserInfoForm.vue'
import { logout } from '@/utils/auth'
import { getToken, decodeToken } from '../utils/auth'
import { Api } from '@/Api'
import UserAccount from '../components/UserAccount.vue'


export default {
    components: {
        UserBookings,
        UserInfoForm,
        UserAccount,
    },

    setup() {
        const currentContent = ref('myBookings');
        const showContent = (contentName) => {
            currentContent.value = contentName;
        };



        return {
            currentContent,
            showContent,
        };
    },
    mounted() {



    },

    methods: {

        accountCancellation() {
            const deleteConfirm = window.confirm(`你确定要删除该账户吗,该操作不可撤销?`);
            if (deleteConfirm) {
                this.logout();

                Api.delete(`/users/${decodeToken(getToken()).userEmail}`).then((response) => {
                    console.log(response.data);
                })
            }

        },

        logout() {
            logout();
        }
    }



}

</script>

<style scoped>
.account-sidebar {
    height: 100vh;
    width: 25%;
    position: fixed;
    top: 0;
    left: 0;
}

@media (max-width: 767.98px) {

    .account-sidebar .fs-3 {
        font-size: 1.0rem !important;
    }

    .account-sidebar .fs-5 {
        font-size: 0.8rem !important;
    }
}

a {
    color: #ffffff;
}

.sidebar {
    flex: 1;
}


.content {
    margin-left: 20%;
    margin-right: 6%;
}

.child {
    position: relative;
    left: 8%;
}
</style>