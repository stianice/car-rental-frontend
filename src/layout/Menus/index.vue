<template>
    <a-menu
      :defaultOpenKeys="['index']"
      :defaultSelectedKeys="['index']"
      @menuItemClick="onClickMenuItem"
      v-model:collapsed="collapsed"
      show-collapse-button
      level-indent="34"
      style="height: 100%"
      :onCollapse="setCollapse"
    >
      <a-menu-item key="index">
        <IconHome /><span style="font-size: 15px">系统首页{{}}</span>
      </a-menu-item>
  
      <a-sub-menu :key="sub.menuId" v-for="sub in menus">
        <template #title>
          <span> <IconCalendar />{{ sub.title }} </span>
        </template>
        <a-menu-item :key="item.path" v-for="item in sub.children">
          {{ item.title }}
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </template>
  
  <script setup>
  import { reactive, ref, onMounted, watch } from 'vue'
  import { IconHome, IconCalendar, IconMenuFold, IconMenuUnfold } from '@arco-design/web-vue/es/icon'
  import { Api } from '../../Api.js'
  import router from '../../router/index.js'
  import { useAppStore } from '../../store/index.js'
  
  const appStore = useAppStore()
  const menus = ref([])
  // const emit = defineEmits(['collapse'])
  
  function onClickMenuItem(path) {
    if (path != null) {
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
  
        console.log(menus.value)
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
      immediate: true
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
  