<template>
  <div class="container">
    <Breadcrumb :items="['系统管理', '用户管理']" />

    <a-card class="general-card" title="查询条件">
      <a-row>
        <a-col :flex="1">
          <a-form>
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item label="名称">
                  <a-input v-model="searchForm.name" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="邮箱">
                  <a-input v-model="searchForm.email" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="职位">
                  <a-input v-model="searchForm.position" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="是否可用">
                  <a-radio-group dirction="horizon" v-model="searchForm.available">
                    <a-radio value="0">不可用</a-radio>
                    <a-radio value="1">可用</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
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
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 10px">
        <a-col :span="16">
          <a-space>
            <a-button type="primary" @click="addUserClick" size="small">
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
        row-key="userId"
        :columns="columns"
        :data="data"
        :row-selection="rowSelection"
        v-model:selectedKeys="selectedKeys"
        :pagination="pagination"
        table-layout-fixed="true"
      >
        <template #opt="{ record }">
          <a-space>
            <a-button type="primary" size="mini" @click="handleEdit(record)">编辑</a-button>

            <a-button type="primary" status="warning" size="mini" @click="alignRole(record)"
              >分配角色</a-button
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

    <a-modal
      title="分配角色"
      v-model:visible="visibleRole"
      width="50%"
      :ok-text="确定分配"
      :cancel-text="取消"
      @ok="handleAssignRole"
    >
      <a-table
        :bordered="false"
        :columns="roleColumns"
        :data="roleData"
        row-key="roleId"
        :row-selection="roleRowSelection"
        v-model:selectedKeys="selectedRoleKeys"
        table-layout-fixed="true"
      >
      </a-table>
    </a-modal>
  </div>
</template>

<script setup>
import { Api } from '../Api'
import Breadcrumb from './breadcrumb/index.vue'
import { ref, onMounted } from 'vue'

const searchForm = ref({})
const visibleRole = ref(false)
const selectedKeys = ref([])
const selectedRoleKeys = ref([])
const roleColumns = ref([
  {
    title: '角色Id',
    dataIndex: 'roleId'
  },
  {
    title: '角色名称',
    dataIndex: 'roleName'
  },
  {
    title: '角色描述',
    dataIndex: 'roleDesc'
  }
])

const roleData = ref([])
const roleRowSelection = {
  type: 'checkbox',
  showCheckAll: true,
  onlyCurrent: false
}
const alignRole = (record) => {
  visibleRole.value = true
}

const handleEdit = (record) => {}

const handleDeleteBeforeOk = (record) => {}

const batchDelete = () => {}

const handleSearch = () => {}

const handleResetSerchForm = () => {
  searchForm.value = {}
}

const handleAssignRole = () => {}
const columns = [
  {
    title: '管理Id',
    dataIndex: 'managerId'
  },
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '邮箱',
    dataIndex: 'email'
  },
  {
    title: '职位',
    dataIndex: 'position'
  },
  {
    title: '注册时间',
    dataIndex: 'createDate'
  },
  {
    title: '操作',
    slotName: 'opt',
    fixed: 'right',
    width: 220
  }
]
const data = ref([])

onMounted(() => {
  Api.get('/managers')
    .then((res) => {
      data.value = res.data
    })
    .catch((err) => {
      Message.error(err.message)
    })

  Api.get('/roles')
    .then((res) => {
      roleData.value = res.data
    })
    .catch((err) => {
      Message.error(err.message)
    })
})
</script>
