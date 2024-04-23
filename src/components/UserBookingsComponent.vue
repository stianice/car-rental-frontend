<template>
  <div class="container">
    <a-typography>
      <a-typography-title :bold="true" style="text-align: center">
        你的订单
      </a-typography-title></a-typography
    >
    <a-divider />

    <a-space direction="vertical" style="margin: 50px 50px" fill>
      <a-table :stripe="true" row-key="bookingId" :columns="columns" :data="data" :pagination="7">
        <template #img="{ record }">
          <a-image :src="record.image" width="100" hight="60" />
        </template>

        <template #sts="{ record }">
          <span style="color: red" v-if="record.status == '审核中'">审核中</span>
          <span style="color: blue" v-else>审核通过</span>
        </template>

        <template #opt="{ record }">
          <a-button type="primary" @click="openDetail(record)"> 查看订单详情 </a-button>
        </template>
      </a-table>
    </a-space>

    <a-modal width="auto" v-model:visible="visible" title="订单详情">
      <a-space direction="vertical" align="start" fill>
        <a-descriptions layout="inline-horizontal" title="我的订单" :size="large" :column="1">
          <descriptions-item label="订单编号"> {{ bookingInfo.bookingReference }}</descriptions-item
          ><descriptions-item label="车辆品牌">{{ bookingInfo.brand }} </descriptions-item
          ><descriptions-item label="车辆颜色">{{ bookingInfo.color }} </descriptions-item
          ><descriptions-item label="车辆类型"> {{ bookingInfo.carType }}</descriptions-item
          ><descriptions-item label="订单状态"> {{ bookingInfo.status }}</descriptions-item>
          ><descriptions-item label="订单金额"> {{ bookingInfo.price }}</descriptions-item>
          ><descriptions-item label="起租时间"> {{ bookingInfo.startDate }}</descriptions-item>
          ><descriptions-item label="归还时间"> {{ bookingInfo.endDate }}</descriptions-item>
          ><descriptions-item label="订单创建时间"> {{ bookingInfo.createDate }}</descriptions-item>
        </a-descriptions>
        <a-image :src="bookingInfo.image" width="500" hight="60"> </a-image>
      </a-space>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Api } from '../Api'
import { getUser } from '../utils/auth'
import { Message } from '@arco-design/web-vue'
const selectedKeys = ref([])
const data = ref([])
const visible = ref(false)

const bookingInfo = ref({})

const openDetail = (record) => {
  visible.value = true
  bookingInfo.value = record
}

const columns = ref([
  {
    title: '订单编号',
    dataIndex: 'bookingReference'
  },
  {
    title: '车牌号',
    dataIndex: 'registration'
  },
  {
    title: '车辆品牌',
    dataIndex: 'brand'
  },
  {
    title: '车辆颜色',
    dataIndex: 'color'
  },
  {
    title: '车辆类型',
    dataIndex: 'carType'
  },
  {
    title: '图片',
    dataIndex: 'image',
    slotName: 'img'
  },
  {
    title: '订单金额',
    dataIndex: 'price'
  },
  {
    title: '订单状态',
    dataIndex: 'status',
    slotName: 'sts'
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
    title: '订单创建时间',
    dataIndex: 'createDate'
  },
  {
    title: '操作',
    slotName: 'opt',
    width: '100'
  }
])

const getUserInformation = () => {
  Api.get(`users/${getUser().userEmail}/bookings`)
    .then((res) => {
      console.log(res)

      res.data.forEach((item) => {
        data.value.push({
          bookingId: item.bookingId,
          bookingReference: item.bookingReference,
          book: item.bookingId,
          price: item.price,
          status: item.status,
          startDate: item.startDate,
          endDate: item.endDate,
          createDate: item.createDate,
          brand: item.car.brand,
          color: item.car.color,
          image: item.car.image,
          carType: item.car.carType,
          registration: item.car.registration
        })
      })
    })
    .catch((erro) => {
      Message.error(erro.message)
    })
}
onMounted(() => {
  getUserInformation()
})
</script>
