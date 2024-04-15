<template>
  <div
    class="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5"
    tabindex="-1"
    role="dialog"
    id="modalSignin"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content rounded-4 shadow">
        <div class="modal-header p-5 pb-4 border-bottom-0">
          <h1 class="fw-bold mb-0 fs-2">免费注册</h1>
        </div>

        <div class="modal-body p-5 pt-0">
          <form >
            <div class="form-floating mb-3">
              <input
                type="email"
                v-model="userData.email"
                class="form-control rounded-3"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">电子邮箱</label>
            </div>

            <div class="form-floating mb-3">
              <input
                type="password"
                v-model="userData.password"
                class="form-control rounded-3"
                id="floatingPassword"
                placeholder="Password"
              />
              <label for="floatingPassword">密码</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                v-model="name"
                class="form-control rounded-3"
                id="floatingInput"
                placeholder="姓名"
              />
              <label for="floatingInput">姓名</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                v-model="userData.identity"
                class="form-control rounded-3"
                id="floatingInput"
                placeholder="身份证号"
              />
              <label for="floatingInput">身份证</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                v-model="userData.city"
                class="form-control rounded-3"
                id="floatingInput"
                placeholder="城市"
              />
              <label for="floatingInput">城市</label>
            </div>

        

            <div class="form-floating mb-3">
              <input
                type="num"
                v-model="userData.phoneNumber"
                class="form-control rounded-3"
                id="floatingInput"
                placeholder="手机号"
              />
              <label for="floatingInput">手机</label>
            </div>
            <div class="form-floating mb-3">
              <a-radio-group v-model="userData.sex">
      <a-radio value="男">男</a-radio>
      <a-radio value="女">女</a-radio>
    </a-radio-group>
            </div>

            <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary" @click="registerAsync">注 册</button>
            <small class="text-body-secondary">点击注册表示您同意使用条款。</small>
            <hr class="my-4" />
            <h2 class="fs-5 fw-normal mb-3">已经有一个帐户？</h2>

            <button
              class="w-100 py-2 mb-2 btn btn-outline-primary rounded-3"
              type="submit"
              @click="redirectToLogin"
            >
              <svg class="bi me-1" width="16" height="16"></svg>
              使用电子邮件登录
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { register } from '../utils/auth'
import { ref } from 'vue'



const userData = ref({
  email: '',
  name: '',
  identity: '',
  password: '',
  phoneNumber: '',
  city: '',
  sex: ''
})

const redirectToLogin = () => {
  // use router.push Navigate to the login page
  this.$router.push('/login')
}

const registerAsync = () => {

  register(userData.value)

}
</script>
