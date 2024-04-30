<template>
  <div class="container">
    <Breadcrumb :items="['系统管理', '角色管理']" />

    <a-card class="general-card" title="查询条件">
      <a-row>
        <a-col :flex="1">
          <a-form :model="searchForm">
            <a-row :gutter="16">
              <a-col :span="9">
                <a-form-item label="角色名称">
                  <a-input v-model="searchForm.roleName" />
                </a-form-item>
              </a-col>
              <a-col :span="9">
                <a-form-item label="备注名称">
                  <a-input v-model="searchForm.remarks" />
                </a-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="16">
              <a-col :span="10">
                <a-form-item label="是否可用">
                  <a-radio-group dirction="horizon" v-model="searchForm.available">
                    <a-radio value="1">可用</a-radio>
                    <a-radio value="0">不可用</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>

              <a-col :span="6" style="text-align: right">
                <a-divider style="height: 40px" direction="vertical" />
                <a-space :size="16">
                  <a-button type="primary" @click="handleSearch">
                    <template #icon>
                      <icon-search />
                    </template>
                    查询
                  </a-button>
                  <a-button @click="handleResetSerchForm">
                    <template #icon>
                      <icon-refresh />
                    </template>
                    重置
                  </a-button>
                </a-space>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 10px">
        <a-col :span="16">
          <a-space>
            <a-button type="primary" @click="addClick" size="small">
              <template #icon>
                <icon-plus />
              </template>
              添加
            </a-button>

            <a-popconfirm
              content="你确定要这些记录吗？?"
              okText="确定删除"
              cancelText="取消"
              @ok="batchDelete"
              type="error"
              position="right"
            >
              <a-button type="primary" status="danger" size="small">
                <template #icon>
                  <icon-minus-circle />
                </template>
                批量删除
              </a-button></a-popconfirm
            >
          </a-space>
        </a-col>
        <a-col :span="8" style="text-align: right"> </a-col>
      </a-row>
      <a-table
        :bordered="false"
        row-key="roleId"
        :columns="columns"
        :data="data"
        :row-selection="rowSelection"
        v-model:selectedKeys="selectedKeys"
        :pagination="{ pageSize: 6 }"
        table-layout-fixed="true"
      >
        <template #ab="{ record }">
          <span v-if="record.available === 1">
            <a-tag color="green">可用</a-tag>
          </span>
          <span v-else> <a-tag color="red">不可用</a-tag></span>
        </template>

        <template #opt="{ record }">
          <a-space>
            <a-button type="primary" size="mini" @click="handleEdit(record)">编辑</a-button>

            <a-button type="primary" status="warning" size="mini" @click="alignMenu(record)"
              >分配菜单</a-button
            >
            <a-popconfirm
              content="你确定要删除该记录吗？?"
              okText="确定删除"
              cancelText="取消"
              @ok="handleDeleteBeforeOk(record)"
              type="warning"
              position="tr"
            >
              <a-button type="primary" size="mini" status="danger">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table>
    </a-card>

    <a-modal v-model:visible="visible" title="编辑信息" @cancel="handleCancel" @ok="handleBeforeOk">
      <a-tree-select
        :multiple="true"
        :data="treeData"
        v-model="form.menuId"
        :tree-check-strictly="true"
        placeholder="请选择分配菜单"
      ></a-tree-select>
    </a-modal>
  </div>
</template>

<script setup>
import Breadcrumb from '@/components/breadcrumb/index.vue'
import { ref, onMounted } from 'vue'
import { Api } from '@/Api.js'
import { Message } from '@arco-design/web-vue'
const searchForm = ref({})
const treeData = ref([])
const selectedKeys = ref([])

const addClick = () => {}

const batchDelete = () => {}

const handleEdit = () => {}

const alignMenu = (record) => {
  visible.value = true
  form.value.roleId = record.roleId
}
const handleBeforeOk = () => {
  Api.post(`/roles/${form.value.roleId}/assignMenus`,form.value.menuId)
    .then(() => {
      Message.success('分配菜单成功')

      initData()
    })
    .catch((err) => {
      Message.error(err.message)
    })
}
const form = ref({})
const visible = ref(false)
const rowSelection = ref({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false
})
const columns = [
  {
    title: '角色ID',
    dataIndex: 'roleId'
  },
  {
    title: '角色名称',
    dataIndex: 'roleName'
  },
  {
    title: '备注',
    dataIndex: 'remarks'
  },
  {
    title: '是否可用',
    dataIndex: 'avaiable',
    slotName: 'ab'
  },
  {
    title: '操作',
    slotName: 'opt',
    fixed: 'right',
    width: 220
  }
]
const handleSearch = () => {}
const handleResetSerchForm = () => {}
const handleDeleteBeforeOk = () => {}

const data = ref([])

onMounted(() => {
  Api.get('/menus')
    .then((res) => {
      // treeData.value = JSON.parse(JSON.stringify(res.data).replaceAll('menuId', 'key'))
      treeData.value = JSON.parse(JSON.stringify(res.data).replaceAll('menuId', 'key'))
      console.log(treeData.value)
    })
    .catch((err) => {
      Message.error(err.message)
    })
  initData()
})

const initData = () => {
  Api.get('/roles')
    .then((rsp) => {
      data.value = rsp.data
    })
    .catch((err) => {
      Message.error(err)
    })
}
</script>
