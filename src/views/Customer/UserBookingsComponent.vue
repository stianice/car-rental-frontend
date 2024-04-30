<template>
  <div class="container">
    <a-typography>
      <a-typography-title :bold="true" style="text-align: center">
        你的订单
      </a-typography-title></a-typography
    >
    <a-divider />

    <a-space direction="vertical" style="margin: 50px 50px" fill>
      <a-table :stripe="true" row-key="bookingId" :columns="columns" :data="data" :pagination="{pieceSize: 7}">
        <template #img="{ record }">
          <a-image :src="record.image" width="100" hight="60" />
        </template>

        <template #sts="{ record }">
          <span v-if="record.status == 2"><a-tag color="red">
            审核中
          </a-tag></span> <span v-else-if="record.status == 0"><a-tag color="green">审核通过,租赁成功</a-tag></span>
          
          <span v-else-if="record.status == 1"><a-tag color="blue">已归还，订单完成</a-tag></span>
      
        </template>

        <template #opt="{ record }">
          <a-button type="primary" @click="openDetail(record)"> 查看订单详情 </a-button>
        </template>
      </a-table>
    </a-space>

    <a-modal width="auto" v-model:visible="visible" title="订单详情">
      <a-space direction="vertical" align="start" fill>
        <a-descriptions layout="inline-horizontal" title="我的订单" size="large" :column="1">
          <a-descriptions-item label="订单编号"> {{ bookingInfo.bookingReference }}</a-descriptions-item
          ><a-descriptions-item label="车辆品牌">{{ bookingInfo.brand }} </a-descriptions-item
          ><a-descriptions-item label="车辆颜色">{{ bookingInfo.color }} </a-descriptions-item
          ><a-descriptions-item label="车辆类型"> {{ bookingInfo.carType }}</a-descriptions-item
          ><a-descriptions-item label="订单状态"><span v-if="bookingInfo.status == 2"><a-tag color="red">
            审核中
          </a-tag></span> <span v-else-if="bookingInfo.status == 0"><a-tag color="green">审核通过,租赁成功</a-tag></span>
          
          <span v-else-if="bookingInfo.status == 1"><a-tag color="blue">已归还，订单完成</a-tag></span>
      
        </a-descriptions-item>
          <a-descriptions-item label="订单金额"> {{ bookingInfo.price }}</a-descriptions-item>
          <a-descriptions-item label="起租时间"> {{ bookingInfo.startDate }}</a-descriptions-item>
          <a-descriptions-item label="归还时间"> {{ bookingInfo.endDate }}</a-descriptions-item>
          <a-descriptions-item label="订单创建时间"> {{ bookingInfo.createDate }}</a-descriptions-item>
        </a-descriptions>
        <a-image :src="bookingInfo.image" width="500" hight="60"> </a-image>
      </a-space>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Api } from '@/Api'
import { getUser } from '@/utils/auth'
import { Message } from '@arco-design/web-vue'

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
