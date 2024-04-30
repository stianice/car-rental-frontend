<template>
  <div class="row flex-lg-row-reverse align-items-center g-5 py-5 mb-2">
    <div class="col-10 col-sm-8 col-lg-6">
      <img
        src="@/assets/pickup_stock.jpg"
        class="d-block mx-lg-auto img-fluid"
        alt="Volvo"
        width="700"
        height="500"
        loading="lazy"
      />
    </div>
    <div class="col-lg-6">
      <h1 class="display-5 fw-bold text-body-emphasis">日期选择</h1>
      <p class="lead">请花一点时间选择您喜欢的租车取车日期和还车日期，以确保顺利便捷的预订体验。</p>
    </div>
  </div>
  <form class="form" @submit.prevent="nextStep">
    <div class="row justify-content-md-center my-4">
      <div class="col-md-5 mb-3">
        <label for="start-date" class="form-label lead">提车日期</label>
        <input
          type="date"
          class="form-control"
          id="start-date"
          v-model="bookingData.startDate"
          required
        />
      </div>
      <div class="col-md-5 mb-3">
        <label for="end-date" class="form-label lead">归还日期</label>
        <input
          type="date"
          class="form-control"
          id="end-date"
          v-model="bookingData.endDate"
          required
        />
      </div>
    </div>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <a href="/showCars" class="btn btn-outline-secondary btn-lg px-4">选择其他的汽车</a>
      <button type="submit" class="btn btn-primary btn-lg px-4">下一步</button>
    </div>
  </form>
</template>

<style scoped>
.form {
  min-height: 50vh;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import { useConfirmStore } from '../store/index'
// import store from '../store/index'
import router from '../router/index'

const bookingData = ref({
  startDate: '',
  endDate: ''
})
const store = useConfirmStore()
onMounted(() => {
  const store = useConfirmStore()
  bookingData.value = store.bookingData.bookingDates
})

const nextStep = () => {
  // submit booking dates to the vuex store

  // store.commit('setBookingDate', bookingData.value)
  store.BookingDate = bookingData.value
  router.push('/booking/confirm-data')
}
</script>
