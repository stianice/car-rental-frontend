<template>
  <div class="row flex-lg-row-reverse align-items-center py-5 mb-2">
    <div class="col-10 col-sm-8 col-lg-6">
      <img :src="carInfo.image" :alt="carInfo.description" class="d-block mx-lg-auto img-fluid" />
    </div>
    <div class="col-10 col-sm-8 col-lg-6">
      <h1 class="display-5 fw-bold text-body-emphasis">请确认如下信息。</h1>

      <p class="lead"><strong>电子邮件: </strong>{{ userInfo.email }}</p>
      <p class="lead"><strong>姓名: </strong>{{ userInfo.name }}</p>
      <p class="lead"><strong>身份证号: </strong>{{ userInfo.identity }}</p>
      <p class="lead"><strong>手机号: </strong>{{ userInfo.phoneNumber }}</p>
      <p class="lead"><strong>城市: </strong>{{ userInfo.city }}</p>
      <p class="lead"><strong>起租时间: </strong>{{ bookingInfo.startDate }}</p>
      <p class="lead"><strong>归还时间: </strong> {{ bookingInfo.endDate }}</p>

      <p class="lead"><strong>品牌: </strong>{{ carInfo.brand }}</p>
      <p class="lead"><strong>颜色: </strong>{{ carInfo.color }}</p>
      <p class="lead"><strong>车型: </strong>{{ carInfo.carType }}</p>
      <p class="lead"><strong>描述: </strong>{{ carInfo.description }}</p>
      <p class="lead">
        <strong>你可能喜欢: </strong>
        <a :href="carsHref">看看其他车辆</a>
      </p>
    </div>
  </div>

  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
    <button @click="prevStep" class="btn btn-outline-secondary">上一步</button>
    <button @click="nextStep" class="btn btn-primary">确认并继续付款</button>
  </div>
</template>
<script setup>
import { decodeToken, getToken } from '../utils/auth'
import { Api } from '@/Api'
import { onMounted, ref } from 'vue'
import store from '../store/index'
import router from '../router/index'

const token = getToken()
const userEmail = token ? decodeToken(token).userEmail : 'logged_out'

const userInfo = ref({})
const bookingInfo = ref({ car: '', startDate: '', endDate: '' })

const carInfo = ref({})
const carsHref = ref('')

onMounted(() => {
  Api.get(`/users/${userEmail}`)
    .then((response) => {
      const user = response.data.user

      userInfo.value = {
        email: user.email,
        name: user.name,
        identity: user.identity,
        phoneNumber: user.phoneNumber,
        city: user.city
      }
    })
    .catch((error) => {
      console.log(error)
    })

  bookingInfo.value = {
    car: store.state.bookingData.car,
    startDate: store.state.bookingData.bookingDates.startDate,
    endDate: store.state.bookingData.bookingDates.endDate
  }

  Api.get(`/cars/${bookingInfo.value.car}`)
    .then((response) => {
      const carRes = response.data
      carInfo.value = carRes.car
      carsHref.value = carRes.links.cars.href
      console.log(carsHref.value)
    })
    .catch((error) => {
      console.log(error)
    })
})

const nextStep = async () => {
  // First save the booking with 'unpaid' status
  const bookingData = {
    userEmail: store.state.userInfo.email,
    startDate: store.state.bookingData.bookingDates.startDate,
    endDate: store.state.bookingData.bookingDates.endDate,
    status: '待审核',
    content: '预订已保存，等待审核',
    carRegistration: store.state.bookingData.car
  }

  try {
    // Make a POST request to create a booking
    const response = await Api.post(`/users/${userEmail}/bookings`, bookingData)
    store.commit('setFinalBooking', response.data)

    console.log(store.state.bookingData.bookingDates)
    console.log(store.state.finalBooking)

    router.push('/booking/confirmation')
  } catch (error) {
    console.error('创建订单失败:', error)

    // this.$router.push('/');
  }
}
</script>

<style scoped>
.container {
  width: max-content;
  height: max-content;
}
*.row flex-lg-row-reverse align-items-center py-5 mb-2 {
  padding: 0%;
}

a:hover {
  color: blue;
}
</style>
