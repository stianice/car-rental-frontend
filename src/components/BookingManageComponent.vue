<template>
  <div class="container">
    <Breadcrumb :items="['业务管理', '出租单管理']" />
    <a-card class="general-card" title="查询条件">
      <a-row>
        <a-col :flex="1">
          <a-form :model="searchForm">
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="bookingReference" label="出租单号" label-col-flex="100px">
                  <a-input v-model="searchForm.registration" placeholder=" " />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="identity" label="身份证号" label-col-flex="80px">
                  <a-input v-model="searchForm.identity" placeholder=" " />
                </a-form-item> </a-col
              ><a-col :span="8">
                <a-form-item field="registration" label="车牌号" label-col-flex="80px">
                  <a-input v-model="searchForm.registration" placeholder=" " />
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item field="startDate" label="开始时间" label-col-flex="100px">
                  <a-date-picker style="width: 200px" v-model:model-value="searchForm.startDate" />
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item field="endDate" label="归还时间" label-col-flex="80px">
                  <a-date-picker style="width: 200px" v-model:model-value="searchForm.endDate" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-radio-group
                  dirction="horizon"
                  style="margin-top: 8px"
                  v-model="searchForm.status"
                >
                  <a-radio value="0">已归还</a-radio>
                  <a-radio value="1">未归还</a-radio>
                  <a-radio value="2">审核中</a-radio>
                </a-radio-group>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :span="8" :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="handleSearch"><icon-search />查询</a-button>

            <a-button status="success" @click="handleResetSerchForm"><icon-refresh />重置</a-button>
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
        :stripe="true"
        row-key="bookingId"
        :columns="columns"
        :data="data"
        :row-selection="rowSelection"
        v-model:selectedKeys="selectedKeys"
        :pagination="pagination"
      >
        <template #stu="{ record }">
         <span v-if="record.status==0"><a-tag color="red">未归还</a-tag></span>
         <span v-else-if="record.status==1"><a-tag color="green">已归还</a-tag></span>
         <span v-else><a-tag color="blue">审核中</a-tag></span>
        </template>

        <template #opt="{ record }">
          <a-space>
            <a-button type="primary" size="mini" @click="handleClick(record)">编辑</a-button>
            <a-popconfirm
              v-if="record.status == '审核中'"
              content="确定通过审核吗?"
              okText="确定"
              cancelText="取消"
              @ok="handleUpdateStatusOk(record)"
              type="warning"
              position="tr"
            >
              <a-button type="primary" size="mini" status="warning">确定出租</a-button>
            </a-popconfirm>
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
      <a-modal
        v-model:visible="visible"
        title="编辑信息"
        @cancel="handleCancel"
        @ok="handleBeforeOk"
      >
        <a-form :model="form">
          <a-form-item field="brand" label="出租单号">
            <a-input v-model="form.bookingReference" />
          </a-form-item>
          <a-form-item field="registration" label="车牌号">
            <a-input v-model="form.registration" /> </a-form-item
          ><a-form-item field="identity" label="身份证号">
            <a-input v-model="form.identity" /> </a-form-item
          ><a-form-item field="startDate" label="起租时间">
            <a-input v-model="form.startDate" /> </a-form-item
          ><a-form-item field="endDate" label="归还时间">
            <a-input v-model="form.endDate" /> </a-form-item
          ><a-form-item field="price" label="订单金额">
            <a-input v-model="form.price" /> </a-form-item
          ><a-form-item field="status" label="状态">
            <a-select
              :style="{ width: '320px' }"
              placeholder="Please select ..."
              :model-value="form.status"
            >
              <a-option value='2'>审核中</a-option>
              <a-option value='1'>已归还</a-option>
              <a-option value='0'>未归还</a-option>
            </a-select>
          </a-form-item>
          <a-form-item field="content" label="备注">
            <a-textarea
              v-model:model-value="form.content"
              :auto-size="{
                minRows: 2,
                maxRows: 5
              }"
            />
          </a-form-item>
        </a-form>
      </a-modal>
    </a-card>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { Api } from '../Api'
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
    title: '出租单号',
    dataIndex: 'bookingReference'
  },
  {
    title: '身份证号',
    dataIndex: 'identity'
  },
  {
    title: '车牌号',
    dataIndex: 'registration'
  },
  {
    title: '订单金额',
    dataIndex: 'price'
  },
  {
    title: '备注',
    dataIndex: 'content'
  },
  {
    title: '出租状态',
    dataIndex: 'status',
    slotName: 'stu'
  },
  {
    title: '客户姓名',
    dataIndex: 'customerName'
  },
  {
    title: '起租时间',
    dataIndex: 'startDate'
  },
  {
    title: '归还时间',
    dataIndex: 'endDate'
  },
  {
    title: '创建时间',
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
  searchForm.value.registration = ''
  searchForm.value.identity = ''
  searchForm.value.bookingReference = ''
  searchForm.value.status = ''
  searchForm.value.startDate = ''
  searchForm.value.endDate = ''
}

// 发送搜索请求
const handleSearch = () => {
  Api.post('/bookings/search', searchForm.value)
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

const handleUpdateStatusOk = (record) => {
  let form = {}

  form.registration = record.registration
  form.bookingStatus = '未归还'
  form.bookingReference = record.bookingReference
  form.carStatus = '已出租'
  Api.patch('/bookings/up_status', form)
    .then((resp) => {
      getAllBookings()
      Message.success(res.message)
    })
    .catch((erro) => {
      Message.error(erro.response.data.message)
    })
}

// 批量删除请求
const batchDelete = () => {
  Api.patch('/bookings/deletebyids', selectedKeys.value)
    .then((res) => {
      getAllBookings()

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
  form.value.registration = record.registration
  form.value.status = record.status
  form.value.price = record.price
  form.value.bookingReference = record.bookingReference
  form.value.endDate = record.endDate
  form.value.startDate = record.startDate
  form.value.content = record.content
  form.value.identity = record.identity
}

const deleteItem = ref({ userId: '', email: '' })
// 更新信息请求
const handleBeforeOk = () => {
  console.log(form.value)
  //编辑信息提交
  Api.put('/bookings/' + form.value.registration, form.value).then((res) => {
    visible.value = false
    getAllBookings()
    message.success('数据编辑成功')
  })
}

const handleCancel = () => {
  visible.value = false
}

const getAllBookings = () => {
  Api.get('/bookings').then((res) => {
    data.value = res.data
  })
}

onMounted(() => {
  getAllBookings()
})
</script>
