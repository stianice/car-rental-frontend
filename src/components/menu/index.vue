<template>
  <a-menu
    @menuItemClick="onClickMenuItem"
    v-model:collapsed="collapsed"
    show-collapse-button
    :level-indent="34"
    style="height: 100%"
    :onCollapse="setCollapse"
  >
    <a-menu-item key="index"> <IconHome />系统首页
    
    
    </a-menu-item>

    <a-sub-menu :key="sub.menuId" v-for="sub in menus">
      <template #title>
        <component :is="Icons[sub.iconPath]" />
        {{ sub.title }}
      </template>

      <a-menu-item :key="item.path" v-for="item in sub.children">
        {{ item.title }}
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

import { Api } from '@/Api.js'
import router from '@/router/index.js'
import { useAppStore } from '@/store/index.js'

import * as Icons from '@arco-design/web-vue/es/icon'

const appStore = useAppStore()

const menus = ref([])



function onClickMenuItem(path) {
  if (path != null && path !== '' && path != undefined) {
    router.push(path)
  }
}

const setCollapse = (val) => {
  appStore.updateSettings({ menuCollapse: val })
}

onMounted(() => {
  Api.get('/menus')
    .then((response) => {
      menus.value = response.data
    })
    .catch((error) => {
      console.error(error)
    })
})
const collapsed = ref(false)
watch(
  () => appStore.menuCollapse,
  (newVal) => {
    collapsed.value = newVal
  },
  {
    immediate: true,
  }
)
</script>
<style lang="less" scoped>
:deep(.arco-menu-inner) {
  .arco-menu-inline-header {
    display: flex;
    align-items: center;
  }
  .arco-icon {
    &:not(.arco-icon-down) {
      font-size: 18px;
    }
  }
}
</style>
