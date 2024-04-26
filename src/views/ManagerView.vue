<template>
  <a-layout class="layout">
    <a-layout>
      <a-layout-sider
        theme="dark"
        breakpoint="xl"
        :style="{ paddingTop: '60px' }"
        :hide-trigger="true"
        :collapsible="true"
        :width="menuWidth"
        :collapsed="collapse"
        @collapse="setCollapsed"
        class="layout-sider"
      >
        <div class="menu-wrapper">
          <div class="left-side">
            <a-space>
              <img
                alt="logo"
                src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"
              />
              <a-typography-title>CarGo租车后台系统</a-typography-title>
            </a-space>
          </div>

          <Menus />
        </div>
      </a-layout-sider>

      <a-layout class="layout-content" :style="paddingStyle">
        <div class="layout-navbar">
          <NavBar></NavBar>
        </div>
        <a-layout-content>
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup>
import NavBar from '../layout/Navbar/index.vue';
import { computed } from 'vue'
import { useAppStore } from '../store/index.js'
import Menus from '../layout/Menus/index.vue'

const appStore = useAppStore()

const setCollapsed = (val) => {
  appStore.updateSettings({ menuCollapse: val })
}

const collapse = computed(() => {
  return appStore.menuCollapse
})

const menuWidth = computed(() => {
  return appStore.menuCollapse ? 48 : appStore.menuWidth
})
const paddingStyle = computed(() => {
  const paddingLeft = { paddingLeft: `${menuWidth.value}px` }
  const paddingTop = { paddingTop: '60px' }
  return { ...paddingLeft, ...paddingTop }
})


</script>

<style scoped lang="less">
.layout {
  width: 100%;
  height: 100%;

  .layout-sider {
    background: var(--color-menu-dark-bg);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    height: 100%;
    padding-top: 0 !important;

    .left-side {
      display: flex;
      align-items: center;
      padding-left: 8px;
      background: var(--color-menu-dark-bg);
      height: 60px;

      .arco-typography {
        color: #fff;
        font-size: 18px;
        width: 200px;
      }
    }

    &::after {
      position: absolute;
      top: 0;
      right: -1px;
      display: block;
      width: 1px;
      height: 100%;
      background-color: var(--color-border);
      content: '';
    }

    > :deep(.arco-layout-sider-children) {
      overflow-y: hidden;
      top: 0;
    }

    .menu-wrapper {
      height: 100%;
      overflow: auto;
      overflow-x: hidden;

      :deep(.arco-menu) {
        height: calc(100% - 60px) !important;

        ::-webkit-scrollbar {
          width: 12px;
          height: 4px;
        }

        ::-webkit-scrollbar-thumb {
          border: 4px solid transparent;
          background-clip: padding-box;
          border-radius: 7px;
          background-color: var(--color-text-4);
        }

        ::-webkit-scrollbar-thumb:hover {
          background-color: var(--color-text-3);
        }
      }
    }
  }

  .layout-content {
    min-width: 1100px;
    min-height: 100vh;
    overflow-y: hidden;
    background-color: var(--color-fill-2);
    transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);

    .layout-navbar {
      transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
      position: fixed;
      top: 0;
      left: 250px;
      z-index: 100;
      width: 100%;
      min-width: 1100px;
      height: 60px;
    
    }
  }

  .arco-layout-sider-collapsed {
    .left-side {
      width: 50px;

      .arco-typography {
        color: transparent;
      }
    }

    + .layout-content {
      .layout-navbar {
        left: 50px !important;

        .navbar {
          width: calc(100% - 50px) !important;
        }
      }
    }
  }
}
</style>
