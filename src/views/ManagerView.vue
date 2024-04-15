<template>
  <a-layout>
    <Menus />

    <a-layout>
      <a-layout style="padding: 5px 15px">
        <a-space size="medium">
          <a-typography-title heading="5" bold="true">欢迎您: 超级管理员</a-typography-title
          ><a-dropdown trigger="hover">
            <a-avatar :style="{ backgroundColor: '#3370ff' }">
              <IconUser />
            </a-avatar>
            <template #content>
              <a-doption>首页</a-doption>
              <a-doption>个人信息</a-doption>
              <a-doption>退出登录</a-doption>
            </template>
          </a-dropdown>
        </a-space>

        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup>
import { onMounted, reactive, ref, toRef } from 'vue'
import Menus from '../layout/Menus.vue'
import { IconUser } from '@arco-design/web-vue/es/icon'
</script>

<style scoped></style>
