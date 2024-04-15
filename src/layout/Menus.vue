<template>
  <a-layout-sider
    theme="dark"
    breakpoint="lg"
    :width="220"
    collapsible
    :collapsed="collapsed"
    @collapse="onCollapse"
    style="height: 100vh"
  >
    <div style=" width: 220px">
        
      <a-typography>
        
        <a-typography-title style="font-size: 18px; color: white">
            <a-avatar size="mini"
      imageUrl="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
    />  智慧租车后台系统
        </a-typography-title>
      </a-typography>
    </div>
    <a-menu
      :defaultOpenKeys="['index']"
      :defaultSelectedKeys="['index']"
      @menuItemClick="onClickMenuItem"
    >
      <a-menu-item key="index">
        <IconHome /><span style="font-size: 15px">系统首页{{  }}</span>
      </a-menu-item>

      <a-sub-menu :key="sub.menuId" v-for="sub in menus.value"> 
        <template #title>
          <span> <IconCalendar/>{{ sub.title }} </span>
        </template>
        <a-menu-item :key="item.path" v-for="item in sub.children" >
            {{ item.title }}        
        </a-menu-item>
            
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { IconHome, IconCalendar, IconMenuFold, IconMenuUnfold } from '@arco-design/web-vue/es/icon'
import { Api } from '../Api.js'
import router from '../router/index.js'


const collapsed = ref(false)

const onCollapse = (val, type) => {
  collapsed.value = val
}

const menus = reactive([]) 
function onClickMenuItem(path) {
    if (path != null) {
        router.push(path)
    }
//   路由
 
}


onMounted(() => {

  

  Api.get('/menus')
    .then((response) => {
     menus.value = response.data

      console.log()
    })
    .catch((error) => {
      console.error(error)
    })
})
</script>

<style scoped>
.arco-menu-inner {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.arco-icon {
  font-size: 20px !important;
  margin-right: 8px !important;
  margin-top: 10px !important;
}

.logo {
  color: #fff;
  float: left;
  line-height: 60px;
  font-size: 20px;
  padding: 0 25px;
  text-align: center;
  width: 135px;
}
</style>
