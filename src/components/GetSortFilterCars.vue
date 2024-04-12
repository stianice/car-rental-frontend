<template>
    <nav class="navbar navbar-expand-md bg-dark sticky-top border-bottom" data-bs-theme="dark">
        <div class="container">
            <a class="navbar-brand" href="#fleet"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarContent">
                <ul class="navbar-nav flex-grow-1 justify-content-between">
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                        </a>
                    </li>
                    <li class="nav-item dropdown ms-2">
                        <button class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">根据价格排序</button>
                        <ul class="dropdown-menu dropdown-menu-dark">
                            <li><a @click="sortByPrice('asc')" class="dropdown-item" href="#fleet">正序</a></li>
                            <li><a @click="sortByPrice('desc')" class="dropdown-item" href="#fleet">逆序</a></li>
                            <li><a @click="sortByPrice('Recommend')" class="dropdown-item" href="#fleet">推荐</a>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown ms-2">
                        <button class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown"
                            aria-expanded="false">品牌</button>
                        <ul class="dropdown-menu dropdown-menu-dark">
                            <li><a @click="filterByBrand('All')" class="dropdown-item" href="#fleet">全部</a></li>
                            <li><a @click="filterByBrand('Audi')" class="dropdown-item" href="#fleet">奥迪</a></li>
                            <li><a @click="filterByBrand('BMW')" class="dropdown-item" href="#fleet">宝马</a></li>
                            <li><a @click="filterByBrand('BYD')" class="dropdown-item" href="#fleet">比亚迪</a></li>
                            <li><a @click="filterByBrand('BYD')" class="dropdown-item" href="#fleet">梅赛德斯</a>
                            </li>
                            <li><a @click="filterByBrand('Tesla')" class="dropdown-item" href="#fleet">特斯拉</a>
                            </li>
                            <li><a @click="filterByBrand('Toyota')" class="dropdown-item" href="#fleet">丰田</a>
                            </li>
                            <li><a @click="filterByBrand('Volvo')" class="dropdown-item" href="#fleet">沃尔沃</a>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown ms-2">
                        <button class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown"
                            aria-expanded="false">颜色</button>
                        <ul class="dropdown-menu dropdown-menu-dark">
                            <li><a @click="filterByColor('All')" class="dropdown-item" href="#fleet">全部</a></li>
                            <li><a @click="filterByColor('Black')" class="dropdown-item" href="#fleet">黑</a>
                            </li>
                            <li><a @click="filterByColor('Blue')" class="dropdown-item" href="#fleet">蓝</a></li>
                            <li><a @click="filterByColor('Grayness')" class="dropdown-item" href="#fleet">灰</a>
                            </li>
                            <li><a @click="filterByColor('Green')" class="dropdown-item" href="#fleet">绿</a>
                            </li>
                            <li><a @click="filterByColor('Red')" class="dropdown-item" href="#fleet">红</a></li>
                            <li><a @click="filterByColor('White')" class="dropdown-item" href="#fleet">白</a>
                            </li>
                            <li><a @click="filterByColor('Yellow')" class="dropdown-item" href="#fleet">黄</a>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="#"></a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
        <div class="col mb-3" v-for="(car, index) in cars" :key="car._id">
            <div class="h-100">
                <CarCard :car="car" :isLastCard="index === car.length - 1" />
            </div>
        </div>
        <div v-if="showNoResultsMessage" class="message .error message .error-warning" role="message .error">
            未找到结果。
        </div>
    </div>
</template>

<script>
import CarCard from './CarCard.vue';
import { Api } from '@/Api'
import { message } from 'ant-design-vue';
export default {
    components: {
        CarCard,
    },
    data() {
        return {
            cars: [],
            showNoResultsMessage: false,
        };
    },

    mounted() {
        Api.get("/cars").then((response) => {
            this.cars = response.data.data;
        });
    },

    methods: {
        sortByPrice(order) {
            let url = null;
            if (order === "Recommend") {
                url = `/cars`;
            } else {
                url = `/cars/price/${order}`;
            }
            Api.get(url).then((response) => {
                this.cars = response.data.data;
            });
            this.showNoResultsMessage = false;
        },
        filterByBrand(brand) {
            let url = null;
            if (brand === "All") {
                url = `/cars`;
            } else {
                url = `/cars/brand/${brand}`;
            }
            Api.get(url).then((response) => {
                if (response.data.data.length === 0) {
                    this.showNoResultsMessage = true;
                    this.cars = [];
                } else {
                    this.showNoResultsMessage = false;
                    this.cars = response.data.data;
                }
            })
        },
        filterByColor(color) {
            let url = null;
            if (color === "All") {
                url = `/cars`;
            } else {
                url = `/cars/color/${color}`;
            }
            Api.get(url).then((response) => {
                if (response.data.length === 0) {
                    this.showNoResultsMessage = true;
                    this.cars = [];
                } else {
                    this.showNoResultsMessage = false;
                    this.cars = response.data;
                }
            })
        }
    },
};
</script>

<style scoped>
.container {
    scroll-margin-top: 100px;
}

.message .error {
    width: 100%;
    text-align: center;
}
</style>

