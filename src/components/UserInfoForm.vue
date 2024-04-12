<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div class="py-4" style="margin-left: 20%">
      <h1>信息</h1>
    </div>
    <div class="row g-3">
      <div class="col-md-7 col-lg-8">
        <form class="needs-validation" novalidate="">
          <div class="row g-3">
            <div class="col-12">
              <label for="email" class="form-label fs-5">电子邮件</label>
              <input type="email" class="form-control" id="email" v-model="user.email" required />
              <div class="invalid-feedback">Please enter a valid email address.</div>
            </div>

            <div class="col-sm-12">
              <label for="firstName" class="form-label fs-5">姓名</label>
              <input
                type="text"
                class="form-control"
                id="firstName"
                placeholder=""
                v-model="user.name"
                required
              />
              <div class="invalid-feedback"></div>
            </div>

            <div class="col-sm-12">
              <label for="lastName" class="form-label fs-5">身份证</label>
              <input
                type="text"
                class="form-control"
                id="lastName"
                placeholder=""
                v-model="user.identity"
                required
              />
              <div class="invalid-feedback">Valid last name is required.</div>
            </div>

            <div class="col-12">
              <label for="phoneNumber" class="form-label fs-5">手机</label>
              <div class="input-group has-validation">
                <input
                  type="text"
                  class="form-control"
                  id="phoneNumber"
                  placeholder=""
                  v-model="user.phoneNumber"
                  required
                />
              </div>
            </div>
            <div class="col-12">
              <label for="password" class="form-label fs-5">密码 </label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="user.password"
                required
              />
              <div class="invalid-feedback">请输入要修改的密码</div>
            </div>
            <div class="col-12">
              <label for="address" class="form-label fs-5">城市:&nbsp;</label>
              <span style="font-size: 18px;">   {{ user.city }}</span>
              
            </div>
          </div>
        </form>
      </div>
    </div>
    <button
      class="w-50 btn btn-primary btn-lg"
      @click="updateInformation"
      style="margin-top: 5%; margin-left: 7%"
    >
      更新信息
    </button>
    <div style="height: 10vh"></div>
  </main>
</template>

<script>
import { getToken, decodeToken } from '../utils/auth'
import { Api } from '@/Api'

const token = getToken()

const userEmail = token ? decodeToken(token).userEmail : 'logged_out'

export default {
  data() {
    return {
      user: {}
    }
  },
  mounted() {
    Api.get(`/users/${userEmail}`).then((response) => {
      this.user = response.data.data.user;
    })

    // Populate form fields with saved data when navigating back
    if (this.$store.state.userInfo) {
      this.userInfoData = { ...this.$store.state.userInfo }
    }
  },

  methods: {
    nextStep() {
      // Submit user info data to Vuex store
      this.$store.commit('setUserInfo', this.userInfoData)

      // Navigate to the next step
      this.$router.push('/booking/payment')
    },

    updateInformation() {
    //   const userDataWithoutPassword = { ...this.user }
    //   delete userDataWithoutPassword.password
      Api.patch(`/users/${userEmail}`, this.user)
        .then(() => {
        
        })
        .catch((error) => {
       
          console.error('Error:', error)
        })
    }
  }
}
</script>
