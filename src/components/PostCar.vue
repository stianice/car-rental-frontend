<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div class="py-4">
      <h1>增添车辆</h1>
    </div>
    <form>
      <div class="row g-3">
        <div class="col-md-7 col-lg-8">
          <form class="needs-validation" novalidate="">
            <div class="row g-3">
              <div class="col-12">
                <label for="registraction" class="form-label fs-5">车牌号</label>
                <input
                  type="text"
                  class="form-control"
                  id="registraction"
                  placeholder=""
                  v-model="registrationData"
                  required
                />
                <div class="invalid-feedback">车牌号是必须的</div>
              </div>

              <div class="col-12">
                <div><label for="image" class="form-label fs-5">图像</label></div>
                <img :src="imageData" class="max-image-size" />
                <input
                  type="file"
                  class="form-control"
                  id="image"
                  @change="handleImageUpload"
                  aria-describedby="inputGroupFileAddon04"
                  aria-label="Upload"
                />
              </div>

              <div class="col-12">
                <label for="brand" class="form-label fs-5">品牌</label>
                <select class="form-select" id="state" v-model="brandData" required>
                  <option value="">选择...</option>
                  <option>奥迪</option>
                  <option>宝马</option>
                  <option>比亚迪</option>
                  <option>梅赛德斯</option>
                  <option>特斯拉</option>
                  <option>丰田</option>
                  <option>沃尔沃</option>
                </select>
              </div>

              <div class="col-12">
                <label for="color" class="form-label fs-5">颜色</label>
                <div class="input-group has-validation">
                  <select class="form-select" id="state" v-model="colorData" required>
                    <option value="">Choose...</option>
                    <option>黑色</option>
                    <option>蓝色</option>
                    <option>灰色</option>
                    <option>绿色</option>
                    <option>红色</option>
                    <option>白色</option>
                    <option>黄色</option>
                  </select>
                </div>
              </div>
              <div class="col-12">
                <label for="carType" class="form-label fs-5">车型</label>
                <div class="input-group has-validation">
                  <select class="form-select" id="state" v-model="carTypeData" required>
                    <option value="">Choose...</option>

                    <option>轿车</option>
                    <option>新能源</option>
                    <option>SUV</option>
                  </select>
                </div>
              </div>
              <div class="col-12">
                <label for="price" class="form-label fs-5">价格 </label>
                <input
                  type="text"
                  class="form-control"
                  id="price"
                  placeholder=""
                  v-model="priceData"
                  required
                />
                <div class="invalid-feedback">请输入一个有效的价格。</div>
              </div>

              <div class="col-12">
                <label for="address" class="form-label fs-5">描述</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="description"
                  rows="4"
                  placeholder="Give a discription of the car..."
                  v-model="descriptionData"
                  required
                ></textarea>
                <div class="invalid-feedback">请输入一个有效的描述。</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </form>
    <button
      class="w-50 btn btn-primary btn-lg"
      @click="postCar"
      style="margin-top: 5%; margin-left: 7%"
    >
      添加
    </button>
  </main>
</template>

<script>
import { Api } from '@/Api'

import { decodeToken, getToken } from '../utils/auth'

export default {
  data() {
    return {
      managerEmail: '',
      registrationData: '',
      imageData: '',
      brandData: '',
      colorData: '',
      priceData: '',
      descriptionData: '',
      carTypeData: ''
    }
  },
  methods: {
    handleImageUpload(event) {
      const uploadedFile = event.target.files[0]
      if (uploadedFile) {
        const reader = new FileReader()

        reader.onload = (e) => {
          this.imageData = e.target.result
        }

        reader.readAsDataURL(uploadedFile)
      }
    },
    postCar() {
      const car = {
        registration: this.registrationData,
        image: this.imageData,
        brand: this.brandData,
        color: this.colorData,
        price: this.priceData,
        description: this.descriptionData,
        carType: this.carTypeData
      }
      const url = `/managers/${this.managerEmail}/cars`
      Api.post(url, car)
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  },
  mounted() {
    const token = getToken()
    const manager = token ? decodeToken(token) : 'logged_out'
    this.managerEmail = manager.managerEmail
  }
}
</script>

<style scoped>
.max-image-size {
  max-width: 100%;
  max-height: 100%;
}
</style>
