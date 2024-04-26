<template>
  <div class="container">
    <Breadcrumb :items="['系统管理', '菜单管理']" />

    <a-card>
      <div style="display: flex">
        <a-card style="width: 220px; height: 80vh">
          <a-tree :data="treeData" :blockNode="true" @select="handleSelect">
            <template #icon="{ node }">
              <component :is="Icons[node.iconPath]"></component>
            </template>
          </a-tree>
        </a-card>
        <a-card class="general-card" title="查询条件" style="flex: 1">
          <a-row>
            <a-col>
              <a-row :gutter="16">
                <a-col :span="12">
                  <a-form-item label="菜单名称">
                    <a-input
                      v-model="bookingReference"
                      placeholder="请输入菜单查询"
                    /> </a-form-item
                ></a-col>
                <a-divider style="height: 40px" direction="vertical" />
                <a-col :span="8" :flex="'86px'" style="text-align: right">
                  <a-space :size="18">
                    <a-button type="primary" @click="handleSearch"><icon-search />查询</a-button>

                    <a-button status="success" @click="handleResetSerchForm"
                      ><icon-refresh />重置</a-button
                    >
                  </a-space>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-divider style="margin-top: 0" />
          <a-row style="margin-bottom: 10px">
            <a-button type="primary" size="mini" @click="">
              <template #icon>
                <IconPlus />
              </template>
              新增
            </a-button>
          </a-row>

          <a-table
            row-key="menuId"
            :columns="columns"
            :data="data"
            :row-selection="rowSelection"
            v-model:selectedKeys="selectedKeys"
            :pagination="pagination"
          >
            <template #ab="{ record }">
              <a-tag v-if="record.available == 1" color="green">可用</a-tag>
              <a-tag v-else color="red">不可用</a-tag>
            </template>
            <template #opt="{ record }">
              <a-button size="mini" type="primary" @click="handleEdit(record)"> 编辑 </a-button>
            </template>
          </a-table>
        </a-card>

        <a-modal
          v-model:visible="visible"
          title="编辑信息"
          @cancel="handleCancel"
          @ok="handleBeforeOk"
        >
          <a-form :model="form">
            <a-form-item label="父级菜单">
              <a-tree-select
                :data="treeData"
                v-model="form.parentId"
                placeholder="请选择父菜单节点"
              ></a-tree-select
            ></a-form-item>

            <a-form-item label="菜单名称">
              <a-input v-model="form.title" placeholder="请输入菜单名称"></a-input>
            </a-form-item>
            <a-form-item label="菜单地址">
              <a-input v-model="form.path" placeholder="请输入菜单地址"></a-input>
            </a-form-item>
            <a-form-item label="是否可用">
              <a-radio-group dirction="horizon" v-model="form.available" >
                <a-radio  v-model="form.available" value="1">可用</a-radio>
                <a-radio  v-model="form.available" value="0">不可用</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
    </a-card>
  </div>
</template>

<script setup>
import Breadcrumb from '@/components/breadcrumb/index.vue'
import { ref, onMounted } from 'vue'
import { Api } from '../Api'
import { Message } from '@arco-design/web-vue'
import * as Icons from '@arco-design/web-vue/es/icon'
const treeData = ref([])
const bookingReference = ref('')
const pagination = { pageSize: 7 }
const data = ref([])
const columns = ref([
  {
    title: '菜单ID',
    dataIndex: 'menuId'
  },
  {
    title: '父菜单ID',
    dataIndex: 'parentId'
  },
  {
    title: '菜单名',
    dataIndex: 'title'
  },
  {
    title: '菜单地址',
    dataIndex: 'path'
  },
  {
    title: '是否可用',
    dataIndex: 'available',
    slotName: 'ab'
  },
  {
    title: '操作',
    slotName: 'opt',
    width: 100,
    fixed: 'right'
  }
])

const rowSelection = ref({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false
})

const handleSelect = (key) => {
  Api.get('/menus/' + key)
    .then((res) => {
      let { children, ...parent } = res.data
      parent.children = []

      children.push(parent)
      data.value = children
    })
    .catch((err) => {
      Message.error(err.message)
    })
}
const form = ref({})

const visible = ref(false)

const handleEdit = (record) => {
  visible.value = true
  form.value.parentId = record.parentId
  form.value.title = record.title
  form.value.path = record.path
  form.value.available = record.available
  form.value.menuId = record.menuId
  
}
const handleCancel = () => {}
const handleBeforeOk = () => {
  Api.put('/menus/' + form.value.menuId, form.value)
    .then((res) => {
      Message.success('修改成功')

     init()
    })
    .catch((err) => {
      Message.error(err.message)
    })
}
const handleSearch = () => {

  init()
}
const handleResetSerchForm = () => {}
const selectedKeys = ref()


onMounted(() => {
 init()
})


const init=()=>{
  Api.get('/menus')
    .then((res) => {
      // treeData.value = JSON.parse(JSON.stringify(res.data).replaceAll('menuId', 'key'))
      treeData.value = JSON.parse(JSON.stringify(res.data).replaceAll('menuId', 'key'))
      console.log(treeData.value)
    })
    .catch((err) => {
      Message.error(err.message)
    })

  Api.get('/menus/list')
    .then((res) => {
      data.value = res.data
    })
    .catch((err) => {
      Message.error(err.message)
    })
}

</script>
<style scoped lang="less">
:deep(.arco-table .arco-table-expand-btn) {
  visibility: hidden !important;
}
</style>
