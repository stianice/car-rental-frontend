<template>
    <div v-if="!isUpdateCar" class="container px-4 text-center">
        <div class="pricing-header pb-md-4 mx-auto">
            <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">管理车辆</h1>
        </div>
        <div id="cars" class="row row-cols-1 row-cols-md-3 mb-3 text-center">
            <div class="col mb-3" v-for="(car, index) in cars" :key="car._id">
                <div class="h-100">
                    <div class="card mb-4 rounded-3 shadow-sm h-100" :car="car" :isLastCard="index === car.length - 1">
                        <div class="card-header py-3">
                            <h4 class="my-0 fw-normal">{{ car.brand }}</h4>
                            <img :src="car.image" class="card-img-top" :alt="car.brand" />
                        </div>

                        <div class="card-body">
                            <h1 class="card-title pricing-card-title">
                                {{ car.price }} ¥<small class="text-body-secondary fw-light">/每日</small>
                            </h1>

                            <ul class="list-unstyled mt-3 mb-4">
                                <li>颜色: {{ car.color }}</li>
                                <li class="description-ellipsis">{{ car.description }}</li>
                            </ul>

                            <button type="button" @click="goUpdateCarPage(car)"
                                class="w-100 btn btn-lg btn-primary mb-2">
                                更新
                            </button>
                            <button type="button" @click="deleteCar(car.registration)"
                                class="w-100 btn btn-lg btn-outline-primary">
                                删除
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="showNoResultsMessage" class="alert alert-warning pricing-header pb-md-4 mx-auto" role="alert">
                {{reslultMessage}}
            </div>
        </div>
    </div>

    <main v-if="isUpdateCar" class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="py-4">
            <h1>更新车辆</h1>
        </div>
        <form>
            <div class="row g-3">
                <div class="col-md-7 col-lg-8">
                    <form class="needs-validation" novalidate="">
                        <div class="row g-3">
                            <div class="col-12">
                                <label for="registraction" class="form-label fs-5">注册</label>
                                <input type="text" class="form-control" id="registraction" placeholder=""
                                    v-model="updateCarData.registration" required />
                                <div class="invalid-feedback">需要有效的注册。</div>
                            </div>

                            <div class="col-12">
                                <div><label for="image" class="form-label fs-5">图片</label></div>
                                <img :src="updateCarData.image" class="max-image-size" />
                                <input type="file" class="form-control" id="image" @change="handleImageUpload"
                                    aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                            </div>

                            <div class="col-12">
                                <label for="brand" class="form-label fs-5">品牌</label>
                                <select class="form-select" id="state" v-model="updateCarData.brand" required>
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
                                    <select class="form-select" id="state" v-model="updateCarData.color" required>
                                        <option value="">选择...</option>
                                        <option>黑</option>
                                        <option>蓝</option>
                                        <option>灰</option>
                                        <option>绿</option>
                                        <option>红</option>
                                        <option>白</option>
                                        <option>黄</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-12">
                                <label for="price" class="form-label fs-5">价格 </label>
                                <input type="text" class="form-control" id="price" placeholder=""
                                    v-model="updateCarData.price" required />
                                <div class="invalid-feedback">请输入一个有效的价格。</div>
                            </div>

                            <div class="col-12">
                                <label for="address" class="form-label fs-5">描述</label>
                                <textarea type="text" class="form-control" id="description" rows="4"
                                    placeholder="Give a discription of the car..." v-model="updateCarData.description"
                                    required></textarea>
                                <div class="invalid-feedback">请输入一个有效的描述。</div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </form>
        <button class="w-50 btn btn-primary btn-lg" @click="updateCar" style="margin-top: 5%; margin-left: 7%">
            更新车辆
        </button>
        <button class="w-50 btn btn-outline-primary btn-lg" @click="cancelUpdate"
            style="margin-top: 5%; margin-left: 7%">
            取消修改
        </button>
    </main>
</template>

<script>
import { getToken, decodeToken } from '../utils/auth'
import { Api } from '@/Api'


export default {
    components: {},

    data() {
        return {
            cars: [],
            showNoResultsMessage: true,
            isUpdateCar: false,
            updateCarRegistration: '',
            updateCarData: {},
            reslultMessage:"未添加车辆",
        }
    },

    mounted() {
        this.displayCars()
    },

    methods: {
        displayCars() {
            const token = getToken()
            const manager = token ? decodeToken(token) : 'logged_out'
            Api.get(`/managers/${manager.managerEmail}/cars`).then((resp) => {

                this.cars = resp.data;
               
                if (this.cars.length > 0) {
                    this.showNoResultsMessage = false
                }


            }).catch((error) => {
                  
                    this.reslultMessage=error.response.data.message
                    console.error('Error:', error)
                })

        },

        goUpdateCarPage(carData) {
            this.isUpdateCar = true
            this.updateCarData = carData
            this.updateCarRegistration = carData.registration
        },

        updateCar() {
            Api.put(`/cars/${this.updateCarRegistration}`, this.updateCarData)
                .then(() => {
                  
                    this.isUpdateCar = false
                })
                .catch((error) => {
                  
                    console.error('Error:', error)
                })
        },

        cancelUpdate() {
            this.isUpdateCar = false
        },

        deleteCar(registration) {
            const deleteConfirm = window.confirm(`Are you sure you want to delete car ${registration}?`)
            if (deleteConfirm) {
                Api.delete(`/managers/${manager.managerEmail}/cars/${registration}`)
                    .then(() => {
                        this.displayCars()
                    })
                    .catch((error) => {
                     
                        console.error('Error:', error)
                    })
            }
        },
        handleImageUpload(event) {
            const uploadedFile = event.target.files[0]
            if (uploadedFile) {
                const reader = new FileReader()

                reader.onload = (e) => {
                    this.updateCarData.image = e.target.result
                }

                reader.readAsDataURL(uploadedFile)
            }
        }
    }
}
</script>

<style scoped>
#cars {
    background-color: #f0f0f0;
    padding: 20px;
    border: 1px solid #ccc;
}

.description-ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
}

.max-image-size {
    max-width: 100%;
    max-height: 100%;
}
</style>
