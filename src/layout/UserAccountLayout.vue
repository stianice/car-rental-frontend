<template>
    <div style="display: flex">
    <a-layout-sider
      theme="dark"
      breakpoint="lg"
      :width="220"
      collapsible
      :collapsed="collapsed"
      @collapse="onCollapse"
      style="height: 100vh"
    >
      <div style="width: 220px">
        <a-typography>
          <a-typography-title
            :bold="true"
            style="text-align: center; font-size: 18px; color: white"
          >
            欢迎您：{{ getUser().name }}
          </a-typography-title></a-typography
        >
      </div>
      <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a href="/public" class="nav-link fs-5" aria-current="page"> 首页 </a>
      </li>
      <li class="nav-item">
        <a href="/UserBookings" class="nav-link fs-5" aria-current="page"> 我的订单 </a>
      </li>
      <li class="nav-item">
        <a href="/showCars" class="nav-link fs-5"> 开始预定 </a>
      </li>
      <li class="nav-item">
        <a href="/UserSetting" class="nav-link fs-5"> 个人中心 </a>
      </li>
      <li class="nav-item">
        <a href="#" @click="userLogout" class="nav-link fs-5"> 退出登录 </a>
      </li></ul>
    </a-layout-sider>
    
    <a-layout-content>
     <router-view/>
    </a-layout-content>
    
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { getUser,logout } from '../utils/auth'

const collapsed = ref(false)

const onCollapse = (val) => {
  collapsed.value = val
}

const userLogout = () => {
  logout()
}


</script>

<style scoped>

a {
  color: #ffffff;
}


</style>
