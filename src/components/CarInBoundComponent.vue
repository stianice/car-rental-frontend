<template>
  <div class="container">
    <Breadcrumb :items="['业务管理', '汽车入库']" />
    <a-card class="general-card" title="查询条件">
      <a-row>
        <a-col :flex="1">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item  label="出租单号">
                <a-input
                  v-model="bookingReference"
                  placeholder="请输入出租单号进行入库"
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
      <a-row>
        <a-col :flex="1">
        
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item field="checkReference" label="检查单号">
                <a-input v-model="form.checkReference" placeholder=" " />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="bookingReference" label="出租单号">
                <a-input v-model="form.bookingReference" placeholder=" " />
              </a-form-item> </a-col
            ><a-col :span="8">
              <a-form-item field="customerName" label="客户姓名">
                <a-input v-model="form.customerName" placeholder=" " />
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item field="problem" label="存在问题">
                <a-input v-model="form.problem" placeholder=" " />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="payMoney" label="赔付金额">
                <a-input v-model="form.payMoney" placeholder=" " />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="checkDate" label="检查时间">
                <a-date-picker v-model:model-value="form.checkDate" />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter="16">
            <a-col :span="16">
              <a-form-item label="检查描述">
                <a-textarea
                  v-model:model-value="form.CheckDesc"
                  :auto-size="{
                    minRows: 2,
                    maxRows: 5
                  }"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8" style="text-align: center">
              <a-popconfirm
                content="确定提交检查单?"
                okText="确定"
                cancelText="取消"
                @ok="addCheck"
                type="error"
                position="right"
              >
                <a-button type="primary" style="margin-top: 10px"
                  ><icon-search />提交检查单</a-button
                ></a-popconfirm
              >
            </a-col>
          </a-row>
        </a-col>
      </a-row>

      <div style="display: flex; justify-content: space-between">
        <a-card :style="{ width: '360px' }">
          <a-descriptions style="margin-top: 20px" size="small" title="车辆信息" :column="1">
            <a-descriptions-item label="车牌号"> {{ car.registration }}</a-descriptions-item
            ><a-descriptions-item label="车辆类型">{{ car.carType }} </a-descriptions-item
            ><a-descriptions-item label="出租价格"> {{ car.price }}</a-descriptions-item
            ><a-descriptions-item label="品牌">{{ car.brand }} </a-descriptions-item
            ><a-descriptions-item label="车辆描述">{{ car.description }} </a-descriptions-item
            ><a-descriptions-item label="车辆图片">
              <a-image :src="car.image" width="100px"></a-image
            ></a-descriptions-item>
          </a-descriptions>
        </a-card>
        <a-card :style="{ width: '360px' }">
          <a-descriptions style="margin-top: 20px" size="small" title="用户信息" :column="1">
            <a-descriptions-item label="姓名"> {{ user.name }}</a-descriptions-item
            ><a-descriptions-item label="电子邮箱">{{ user.email }} </a-descriptions-item
            ><a-descriptions-item label="手机"> {{ user.phoneNumber }}</a-descriptions-item
            ><a-descriptions-item label="性别">{{ user.sex }} </a-descriptions-item
            ><a-descriptions-item label="身份证号"> {{ user.identity }}</a-descriptions-item
            ><a-descriptions-item label="城市"> {{ user.city }}</a-descriptions-item>
          </a-descriptions></a-card
        >
        <a-card :style="{ width: '360px' }">
          <a-descriptions style="margin-top: 20px" size="small" title="订单信息" :column="1">
            <a-descriptions-item label="出租单号">
              {{ booking.bookingReference }}</a-descriptions-item
            ><a-descriptions-item label="订单金额">{{ booking.price }} </a-descriptions-item
            ><a-descriptions-item label="起租时间"> {{ booking.startDate }}</a-descriptions-item
            ><a-descriptions-item label="归还时间">{{ booking.endDate }} </a-descriptions-item
            ><a-descriptions-item label="创建时间"> {{ booking.createDate }}</a-descriptions-item>
          </a-descriptions></a-card
        >
      </div>
    </a-card>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { createordernum } from '../utils/generator.js'
import { Api } from '../Api'
import { Message } from '@arco-design/web-vue'
import Breadcrumb from '@/components/breadcrumb/index.vue'

const bookingReference = ref('')
const form = ref({})

//重置搜索
const handleResetSerchForm = () => {
  bookingReference.value = ''
}

const car = ref({})
const booking = ref({})
const user = ref({})

const addCheck = () => {
  form.value.registration = car.value.registration
  console.log(form.value)
  Api.post('/checks', form.value)
    .then((res) => {
      Message.success(res.message)
    })
    .catch((err) => {
      Message.error(err.message)
    })
}

// 发送搜索请求
const handleSearch = () => {
  Api.get('/bookings/' + bookingReference.value)
    .then((res) => {
      form.value.bookingReference = res.data.bookingReference
      form.value.customerName = res.data.user.name
      form.value.checkReference = createordernum()
      form.value.checkDate = new Date()

      car.value = res.data.car
      user.value = res.data.user
      booking.value = res.data
      Message.success(res.message)
    })
    .catch((erro) => {
      Message.error(erro.response.data.message)
    })
}

// const getAllBookings = () => {
//   Api.get('/bookings').then((res) => {
//     data.value = res.data
//   })
// }

// onMounted(() => {
//   getAllBookings()
// })
</script>
