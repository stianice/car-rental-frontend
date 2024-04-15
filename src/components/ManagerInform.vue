<template>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="py-4" style="margin-left: 20%;">
            <h1>信息</h1>
        </div>
        <div class="row g-3">
            <div class="col-md-7 col-lg-8">
                <form class="needs-validation" novalidate="">
                    <div class="row g-3">
                        <div class="col-sm-6">
                            <label for="firstName" class="form-label fs-5">First name</label>
                            <input type="text" class="form-control" id="firstName" placeholder="" v-model="manager.fname"
                                required>
                            <div class="invalid-feedback">
                                Valid first name is required.
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <label for="lastName" class="form-label fs-5">Last name</label>
                            <input type="text" class="form-control" id="lastName" placeholder="" v-model="manager.lname"
                                required>
                            <div class="invalid-feedback">
                                Valid last name is required.
                            </div>
                        </div>

                        <div class="col-12">
                            <label for="username" class="form-label fs-5">用户名</label>
                            <div class="input-group has-validation">
                                <input type="text" class="form-control" id="username" placeholder="" v-model="manager.email"
                                    required>
                                <div class="invalid-feedback">
                                    用户名是必须的。
                                </div>
                            </div>
                        </div>

                        <div class="col-12">
                            <label for="email" class="form-label fs-5">电子邮件 </label>
                            <input type="email" class="form-control" id="email" v-model="manager.email" required>
                            <div class="invalid-feedback">
                                请输入一个有效电子邮箱。
                            </div>
                        </div>

                        <div class="col-12">
                            <label for="blance" class="form-label fs-5">余额:&nbsp;</label>
                            <span> {{ manager.balance }}</span>
                            <span> 元</span>
                        </div>

                        <div class="col-12">
                            <label for="address" class="form-label fs-5">地址</label>
                            <input type="text" class="form-control" id="address" v-model="manager.address" required>
                            <div class="invalid-feedback">
                                请输入一个有效的地址。
                            </div>
                        </div>

                    </div>

                </form>
            </div>
        </div>
        <button class="w-50 btn btn-primary btn-lg" @click="updateInformation"
            style="margin-top: 5%; margin-left: 7%;">更新信息</button>
        <div style="height: 10vh;"></div>
    </main>
</template>

<script>
import { Api } from '@/Api'
import { getToken, decodeToken } from '../utils/auth'

const token = getToken();

const managerEmail = (token) ? decodeToken(token).managerEmail : 'logged_out';

export default {
    data() {
        return {
            manager: {},
        };
    },
    mounted() {

        Api.get(`/managers/${managerEmail}`).then((response) => {
            this.manager = response.data;
        });
    },

    methods: {
        updateInformation() {
            const managerDataWithoutPassword = { ...this.manager };
            delete managerDataWithoutPassword.password;
            Api.patch(`/managers/${managerEmail}`, managerDataWithoutPassword).then(() => {
             
            }).catch(error => {
          
                console.error('Error:', error);
            });
        },
    },

}

</script>

<style></style>