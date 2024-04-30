<template>
  <div class="container">
    <Breadcrumb :items="['基础管理', '客户管理']" />

    <a-card class="general-card" title="查询条件">
      <a-row>
        <a-col :flex="1">
          <a-form :model="searchForm"  
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item label="客户姓名">
                  <a-input v-model="searchForm.name" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="identity" label="身份证号">
                  <a-input v-model="searchForm.identity" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="客户邮箱">
                  <a-input v-model="searchForm.email" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="客户手机">
                  <a-input v-model="searchForm.phoneNumber" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item  label="客户地址">
                  <a-input v-model="searchForm.city" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="性别">
                  <a-radio-group dirction="horizon" v-model="searchForm.sex">
                    <a-radio value="男">男</a-radio>
                    <a-radio value="女">女</a-radio>
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
        <a-col :span="8" style="text-align: right">
          <a-button>
            <template #icon>
              <icon-export />
            </template>
            导出
          </a-button>
        </a-col>
      </a-row>
      <a-table
        :bordered="false"
        row-key="userId"
        :columns="columns"
        :data="data"
        :row-selection="rowSelection"
        v-model:selectedKeys="selectedKeys"
        :pagination="pagination"
        :table-layout-fixed="true"
        
      >
        <template #opt="{ record }">
          <a-space>
            <a-button type="primary" size="mini" @click="handleClick(record)">编辑</a-button>
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
      <a-form :model="form">
        <a-form-item field="name" label="姓名"> <a-input v-model="form.name" /> </a-form-item
        ><a-form-item field="identity" label="客户证号">
          <a-input v-model="form.identity" /> </a-form-item
        ><a-form-item field="city" label="地址"> <a-input v-model="form.city" /> </a-form-item
        ><a-form-item field="phoneNumber" label="手机号">
          <a-input v-model="form.phoneNumber" /> </a-form-item
        ><a-form-item field="sex" label="性别"> <a-input v-model="form.sex" /> </a-form-item>

        <a-form-item field="password" label="密码">
          <a-input v-model="form.password" type="password" />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="visibleAddUser"
      title="添加客户"
      @cancel="handleCancelUser"
      @ok="handleAddUserBeforeOk"
    >
      <a-form :model="AddUserForm">
        <a-form-item field="name" label="姓名">
          <a-input v-model="AddUserForm.name" />
        </a-form-item>
        <a-form-item field="identity" label="客户证号">
          <a-input v-model="AddUserForm.identity" /> </a-form-item
        ><a-form-item field="city" label="地址">
          <a-input v-model="AddUserForm.city" /> </a-form-item
        ><a-form-item field="phoneNumber" label="手机号">
          <a-input v-model="AddUserForm.phoneNumber" /> </a-form-item
        ><a-form-item field="sex" label="性别"> <a-input v-model="AddUserForm.sex" /> </a-form-item>
        <a-form-item field="email" label="邮箱">
          <a-input v-model="AddUserForm.email" type="text" /> </a-form-item
        ><a-form-item field="password" label="密码">
          <a-input v-model="AddUserForm.password" type="password" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { Api } from '@/Api'
import { Message } from '@arco-design/web-vue'
import Breadcrumb from '@/components/breadcrumb/index.vue'
const searchForm = ref({
  name: '',
  identity: '',
  city: '',
  phoneNumber: '',
  email: ''
})

const selectedKeys = ref([])

const rowSelection = ref({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false
})

const pagination = { pageSize: 4 }

const columns = [
  {
    title: '身份证号',
    dataIndex: 'identity'
  },
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '地址',
    dataIndex: 'city'
  },
  {
    title: '手机号',
    dataIndex: 'phoneNumber'
  },
  {
    title: '邮箱',
    dataIndex: 'email'
  },
  {
    title: '性别',
    dataIndex: 'sex'
  },
  {
    title: '注册时间',
    dataIndex: 'createDate'
  },
  {
    title: '操作',
    slotName: 'opt',
    fixed: 'right',
    width: 120
  }
]
const data = ref([])

const handleResetSerchForm = () => {
  searchForm.value.name = ''
  searchForm.value.identity = ''
  searchForm.value.city = ''
  searchForm.value.phoneNumber = ''
  searchForm.value.email = ''
  searchForm.value.sex = ''
}

const handleSearch = () => {
  Api.post('/users/seachbycondiction', searchForm.value)
    .then((res) => {
      data.value = res.data
      Message.success(res.message)
    })
    .catch((erro) => {
      Message.error(erro.response.data.message)
    })
}

const batchDelete = () => {
  Api.patch('/users/deleteUsers', selectedKeys.value)
    .then((res) => {
      getAllUsers()

      Message.success(res.message)
    })
    .catch((erro) => {
      Message.error(erro.response.data.message)
    })
}

const visible = ref(false)
// const visibleDelete = ref(false)
const form = ref({
  name: '',
  identity: '',
  city: '',
  phoneNumber: '',
  email: '',
  sex: '',
  password: ''
})

const handleClick = (record) => {
  visible.value = true
  form.value.name = record.name
  form.value.identity = record.identity
  form.value.city = record.city
  form.value.phoneNumber = record.phoneNumber
  form.value.email = record.email
  form.value.sex = record.sex
  form.value.password = record.password
}


const handleBeforeOk = () => {
  console.log(form.value)
  //编辑信息提交
  Api.patch('/users/' + form.value.email, form.value).then(() => {
    visible.value = false
    getAllUsers()
    Message.success('数据编辑成功')
  })
}

const handleDeleteBeforeOk = (record) => {
  if (record.userId != '' && record.userId != null && record.userId != undefined) {
    Api.delete(`/users/${record.email}`)
      .then((res) => {
        getAllUsers()
        Message.success(res.message)
      })
      .catch((erro) => {
        Message.error(erro.response.data.message)
      })
  }
}

const handleCancel = () => {
  visible.value = false
}

const getAllUsers = () => {
  Api.get('/users').then((res) => {
    data.value = res.data
  })
}

const AddUserForm = ref({
  name: '',
  identity: '',
  city: '',
  phoneNumber: '',
  email: '',
  sex: '',
  password: ''
})
const visibleAddUser = ref(false)

const handleCancelUser = () => {
  visibleAddUser.value = false
  AddUserForm.value.city = ''
  AddUserForm.value.email = ''
  AddUserForm.value.name = ''
  AddUserForm.value.phoneNumber = ''
  AddUserForm.value.identity = ''
  AddUserForm.value.sex = ''
  AddUserForm.value.password = ''
}

const addUserClick = () => {
  visibleAddUser.value = true
}

const handleAddUserBeforeOk = () => {
  Api.post('/users', AddUserForm.value)
    .then(() => {
      visibleAddUser.value = false
      Message.success('添加用户成功')
      getAllUsers()
    })
    .catch((erro) => {
      Message.error('添加失败，请稍后再试:' + erro.response.data.message)
    })
}

onMounted(() => {
  getAllUsers()
})
</script>
<style scoped lang="less">



:deep(.arco-table-th) {
  &:last-child {
    .arco-table-th-item-title {
      margin-left: 16px;
    }
  }
}
</style>
