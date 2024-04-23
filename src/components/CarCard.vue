<template>
  <div class="card mb-4 rounded-3 shadow-sm h-100">
    <div class="card-header py-3">
      <h4 class="my-0 fw-normal">{{ car.brand }}</h4>

      <a-image width="230" heigth="200" :src="car.image" :alt="car.brand" />
    </div>

    <div class="card-body">
      <h1 class="card-title pricing-card-title" style="font-size: 35px">
        {{ car.price }} ¥<small class="text-body-secondary fw-light">/日</small>
      </h1>

      <ul class="list-unstyled mt-3 mb-4" style="font-size: 21px">
        <li>车牌号: {{ car.registration }}</li>
        <li>颜色: {{ car.color }}</li>
        <li id="description-ellipsis">车型: {{ car.carType }}</li>
        <li id="description-ellipsis">描述：{{ car.description }}</li>
      </ul>

      <button type="button" class="w-100 btn btn-lg btn-primary" @click="bookCar">即刻预定</button>
    </div>
  </div>
</template>

<script setup>
// import store from '../store/index'
import { useConfirmStore } from '../store/index'
import router from '../router/index'
const prop = defineProps({
  car: {
    type: Object,
    required: true
  },
  isLastCard: { type: Boolean, required: true }
})
const store = useConfirmStore()
const bookCar = () => {
  
  console.log(prop.car.registration)
  console.log(store)
  store.bookingData.car = prop.car.registration


  // store.commit('setCar', prop.car.registration)

  router.push('/booking')
}
</script>

<style scoped>
#description-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
</style>
