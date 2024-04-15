<template>
    <div class="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5" tabindex="-1" role="dialog"
        id="modalSignin"  >
    <div class="modal-dialog" role="document">
      <div class="modal-content rounded-4 shadow">
        <div class="modal-header p-5 pb-4 border-bottom-0">
          <h1 class="h3 mb-3 fw-bold custom-margin">请登录</h1>
        </div>

        <div class="modal-body p-5 pt-0">
          <form @submit.prevent="login(loginer)" >
            <div class="form-floating mb-3" >
              <input
                type="email"
                class="form-control rounded-3"
                v-model="loginer.email"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">电子邮件</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="password"
                class="form-control rounded-3"
                v-model="loginer.password"
                id="floatingPassword"
                placeholder="Password"
                @input="validatePassword"
              />
              <label for="floatingPassword">密码</label>
            </div>

            <div style="margin-top: 20px; margin-bottom: 20px">
             
                <a-radio-group v-model="loginer.userType">
                  <a-radio value="User">用户</a-radio>
                  <a-radio value="Manager">管理员</a-radio>
                </a-radio-group>
              
            </div>

            <button
              class="btn btn-primary w-100 py-2 custom-margin"
              :disabled="!loginer.isPasswordValid"
             
            >   登录
            </button>

            <hr class="my-4" />
            <h2 class="fs-5 fw-normal mb-3">还没有账户？</h2>

            <button
              class="w-100 py-2 mb-2 btn btn-outline-primary rounded-3"
              type="submit"
              @click="redirectToLogin"
            >
              <svg class="bi me-1" width="16" height="16"></svg>
              通过电子邮件登录注册
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { login } from '../utils/auth'
import { ref } from 'vue'
import router from '../router/index';

const loginer = ref({
  email: '',
  password: '',
  isPasswordValid: false,
  userType: 'User',
})

const validatePassword = () => {
  if (loginer.value.password.length >= 6) {
    loginer.value.isPasswordValid = true
  } else {
    loginer.value.isPasswordValid = false
  }
}

const redirectToLogin = () => {
router.push('/register')
}


</script>

<style>
.custom-margin {
  margin-bottom: 10px;
}

.small-text {
  font-size: 6px;
}
</style>
