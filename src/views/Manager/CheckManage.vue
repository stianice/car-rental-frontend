<template>
  <div class="container">
    <Breadcrumb :items="['业务管理', '检查单管理']" />
    <a-card class="general-card" title="查询条件" >
      <a-row>
        <a-col :flex="1">
          <a-form :model="searchForm">
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="bookingReference" label="检查单号" >
                  <a-input v-model="searchForm.checkReferene" placeholder=" " />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="checkDesc" label="问题描述" >
                  <a-input v-model="searchForm.checkDesc" placeholder=" " />
                </a-form-item> </a-col
              ><a-col :span="8">
                <a-form-item field="bookingReference" label="订单编号" >
                  <a-input v-model="searchForm.bookingReference" placeholder=" " />
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item field="problem" label="存在问题" >
                  <a-input v-model="searchForm.problem" placeholder=" " />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="startDate" label="开始时间" >
                  <a-date-picker v-model:model-value="searchForm.startDate" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="endDate" label="结束时间" >
                  <a-date-picker  v-model:model-value="searchForm.endDate" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space  direction="vertical" :size="18">
            <a-button type="primary" @click="handleSearch"><icon-search />查询</a-button>

            <a-button   @click="handleResetSerchForm"
              ><icon-refresh />重置</a-button
            >
          </a-space>
        </a-col>
      </a-row>

      <a-divider style="margin-top: 0" />

      <a-row style="margin-bottom: 10px">
        <a-col :span="16">
          <a-space>
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

        row-key="bookingId"
        :columns="columns"
        :data="data"
        :row-selection="rowSelection"
        v-model:selectedKeys="selectedKeys"
        :pagination="pagination"
      >
        <template #opt="{ record }">
          <a-space>
            <a-button type="primary" size="mini" @click="handleClick(record)">编辑</a-button>
            <a-popconfirm
              content="你确定要删除这条记录吗?"
              okText="确定删除"
              cancelText="取消"
              @ok="handleDeleteOk(record)"
              type="warning"
              position="tr"
            >
              <a-button type="primary" size="mini" status="danger">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table>
      <a-modal v-model:visible="visible" title="编辑信息" @cancel="handleCancel" @ok="handleBeforeOk">
      <a-form :model="form">
        <a-form-item field="checkReferene" label="检查单号">
          <a-input v-model="form.checkReference" />
        </a-form-item>
        <a-form-item field="bookingReference" label="出租单号">
          <a-input v-model="form.bookingReference" /> </a-form-item
        ><a-form-item field="checkTime" label="检查时间">
          <a-input v-model="form.checkTime" /> </a-form-item
        ><a-form-item field="problem" label="存在问题">
          <a-input v-model="form.problem" /> </a-form-item
        ><a-form-item field="checkDesc" label="问题描述">
          <a-input v-model="form.checkDesc" /> </a-form-item
        ><a-form-item field="customerName" label="客户名称">
          <a-input v-model="form.customerName" /> </a-form-item
        ><a-form-item field="payMoney" label="赔付金额">
          <a-input v-model="form.payMoney" />
        </a-form-item>
      </a-form>
    </a-modal>
    </a-card>
  </div>

 
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { IconMinusCircle, IconSearch, IconRefresh } from '@arco-design/web-vue/es/icon'
import { Api } from '@/Api'
import { Message } from '@arco-design/web-vue'
import Breadcrumb from '@/components/breadcrumb/index.vue'
const searchForm = ref({})

const selectedKeys = ref([])

const rowSelection = ref({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false
})

const pagination = { pageSize: 6 }

// 列表行
const columns = [
  {
    title: '检查单号',
    dataIndex: 'checkReference'
  },
  {
    title: '出租单号',
    dataIndex: 'bookingReference'
  },
  {
    title: '存在问题',
    dataIndex: 'problem'
  },
  {
    title: '问题描述',
    dataIndex: 'checkDesc'
  },
  {
    title: '赔付金额',
    dataIndex: 'payMoney'
  },
  {
    title: '客户名称',
    dataIndex: 'customerName'
  },
  {
    title: '检查时间',
    dataIndex: 'checkTime'
  },
  {
    title: '录入时间',
    dataIndex: 'createDate'
  },
  {
    title: '操作',
    slotName: 'opt',
    fixed: 'right',
    width: 120
  }
]

//上传

// 列表数据
const data = ref([])

//重置搜索
const handleResetSerchForm = () => {
  searchForm.value.startDate = ''
  searchForm.value.endDate = ''
  searchForm.value.bookingReference = ''
  searchForm.value.checkReferene = ''
  searchForm.value.problem = ''
  searchForm.value.checkDesc = ''
}

// 发送搜索请求
const handleSearch = () => {
  Api.post('/checks/search', searchForm.value)
    .then((res) => {
      data.value = res.data
      Message.success(res.data.message)
    })
    .catch((erro) => {
      Message.error(erro.response.data.message)
    })
}

const handleDeleteOk = (record) => {
  selectedKeys.value.push(record.bookingId)

  batchDelete()
}

// 批量删除请求
const batchDelete = () => {
  Api.patch('/checks/deletebyids', selectedKeys.value)
    .then((res) => {
      getAllChecks()

      Message.success(res.data.message)
    })
    .catch((erro) => {
      Message.error(erro.response.data.message)
    })
}

const visible = ref(false)
// 删除条目弹窗

// 列表项数据
const form = ref({})

// 编辑数据弹窗
const handleClick = (record) => {
  visible.value = true

  form.value.checkReference = record.checkReference
  form.value.payMoney = record.payMoney
  form.value.bookingReference = record.bookingReference
  form.value.problem = record.problem
  form.value.checkDesc = record.checkDesc
  form.value.checkTime = record.checkTime
  form.value.customerName = record.customerName
  form.value.oldCheckReferene = record.checkReference
}

// 更新信息请求
const handleBeforeOk = () => {
  console.log(form.value)
  //编辑信息提交
  Api.put('/checks/' + form.value.checkReference, form.value).then(() => {
    visible.value = false
    getAllChecks()
    Message.success('数据编辑成功')
  })
}

const handleCancel = () => {
  visible.value = false
}

const getAllChecks = () => {
  Api.get('/checks').then((res) => {
    data.value = res.data
  })
}

onMounted(() => {
  getAllChecks()
})
</script>
