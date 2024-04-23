<template>
  <div class="row flex-lg-row-reverse align-items-center py-5 mb-2">
    <div class="col-10 col-sm-8 col-lg-6">
      <img :src="carInfo.image" :alt="carInfo.description" class="d-block mx-lg-auto img-fluid" />
    </div>
    <div class="col-10 col-sm-8 col-lg-6"><a-typography-title :heading="1" :bold="true">
      我们已经收到您的订单!
    </a-typography-title>
    
      
      <p class="lead"><strong>电子邮件:</strong> {{userInfo.email }}</p>
      <p class="lead"><strong>姓名：</strong>{{userInfo.name }}</p>
      <p class="lead"><strong>身份证:</strong> {{ userInfo.identity }}</p>
      <p class="lead"><strong>手机号:</strong> {{ userInfo.phoneNumber }}</p>
      <p class="lead"><strong>起租时间:</strong> {{ bookingInfo.startDate }}</p>
      <p class="lead"><strong>归还时间:</strong> {{ bookingInfo.endDate }}</p>
      <p class="lead"><strong>品牌:</strong> {{ carInfo.brand }}</p>
      <p class="lead"><strong>颜色:</strong> {{ carInfo.color }}</p>
      <p class="lead"><strong>类型:</strong> {{ carInfo.carType }}</p>
      <p class="lead"><strong>描述:</strong> {{ carInfo.description }}</p>
    </div>
  </div>

  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
    <a href="/" class="btn btn-outline-secondary">回到首页</a>
    <a href="/useraccount" class="btn btn-primary">浏览订单</a>
  </div>
</template>

<style scoped>
.container {
  margin-top: 50px;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import {useConfirmStore}from '../store/index'

const store = useConfirmStore()

const userInfo = ref({ email: '', name: '', identity: '', phoneNumber: '', carType: '' })

const bookingInfo = ref({ car: '', startDate: '', endDate: '' })

const carInfo = ref({})

onMounted(() => {
  userInfo.value.email = store.finalBooking.user.email
  userInfo.value.name = store.finalBooking.user.name
  userInfo.value.identity = store.finalBooking.user.identity
  userInfo.value.phoneNumber = store.finalBooking.user.phoneNumber
  userInfo.value.carType = store.finalBooking.car.carType
  bookingInfo.value.startDate = store.finalBooking.startDate.substring(0, 10)
  bookingInfo.value.endDate = store.finalBooking.endDate.substring(0, 10)
  carInfo.value = store.finalBooking.car
  localStorage.clear()
})
</script>
