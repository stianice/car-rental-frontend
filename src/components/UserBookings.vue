<template>
  <div class="container text-center">
    <div class="pricing-header pb-md-4 mx-auto">
      <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">你的订单</h1>
    </div>
    <div id="bookings" class="row row-cols-1 row-cols-md-3 mb-3 text-center">
      <div class="col mb-3" v-for="booking in bookings" :key="booking._id">
        <div class="h-100">
          <h2>订购信息</h2>
          <ul>
            <li>预定订单号: {{ booking.bookingReference }}</li>
            <li>起始日期: {{ booking.startDate }}</li>
            <li>归还日期: {{ booking.endDate }}</li>
            <li>状态: {{ booking.content }}</li>
          </ul>
          <h3>车辆数据:</h3>
          <img :src="booking.car.image" :alt="booking.car.brand" class="car-image" />
          <ul>
            <li>品牌: {{ booking.car.brand }}</li>
            <li>车牌: {{ booking.car.registration }}</li>
            <li>描述: {{ booking.car.description }}</li>
          </ul>
        </div>
      </div>
      <div v-if="showNoResultsMessage" class="pricing-header pb-md-4 mx-auto">
        <div class="message .error message .error-warning">你还未有任何订单！</div>
        <div class="pricing-header pb-md-4 mx-auto">
          <a href="/#fleet">现在预定！</a>
        </div>
      </div>
    </div>
    <div v-if="showNoResultsMessage" style="height: 60vh"></div>
  </div>
</template>

<style scoped>
.car-image {
  width: 250px;
}

@media (max-width: 767.98px) {
  .car-image {
    width: 210px;
  }
}
</style>

<script setup>
import { getToken, decodeToken } from '../utils/auth'
import { Api } from '@/Api'
import { ref, onMounted } from 'vue'

const bookings = ref([])
const showNoResultsMessage = ref(false)

onMounted(async () => {
  try {
    const token = getToken()

    const user = token ? decodeToken(token) : 'logged_out'
    const response = await Api.get(`/users/${user.userEmail}/bookings`)
    console.log(response)
    bookings.value = response.data
    console.log(bookings.value)

    if (!bookings.value || bookings.value.length === 0) {
      showNoResultsMessage.value = true
    }
  } catch (err) {
    console.log('Error', err)
    //  window.location.reload();
  }
})
</script>

<style scoped>
#bookings {
  background-color: #f0f0f0;
  padding: 20px;
  border: 1px solid #ccc;
}

.car-image {
  max-width: 100%;
  max-height: 100%;
}
</style>
