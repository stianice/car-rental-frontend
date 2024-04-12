<template>
    <div class="row flex-lg-row-reverse align-items-center py-5 mb-2">
        <div class="col-10 col-sm-8 col-lg-6">
            <img :src="carInfo.image" :alt="carInfo.description" class="d-block mx-lg-auto img-fluid">
        </div>
        <div class="col-10 col-sm-8 col-lg-6">
            <h1 class="display-5 fw-bold text-body-emphasis">你的订单</h1>
            <p class="lead">请确认如下信息是否正确。</p>
            <h2 class="fw-bold text-body-emphasis">用户详情</h2>
            <p class="lead"><strong>电子邮件: </strong> {{ userInfo.email }}</p>
            <p class="lead"><strong>姓名：</strong>{{ userInfo.name }}</p>
            <p class="lead"><strong>身份证号:</strong> {{ userInfo.identity }}</p>
            <p class="lead"><strong>手机号:</strong> {{ userInfo.phoneNumber }}</p>
            <h2 class="fw-bold text-body-emphasis">订购信息</h2>
            <p class="lead"><strong>起租时间:</strong> {{ bookingInfo.startDate }}</p>
            <p class="lead"><strong>归还时间:</strong> {{ bookingInfo.endDate }}</p>
            <h2 class="fw-bold text-body-emphasis">车辆</h2>
            <p class="lead"><strong>品牌:</strong> {{ carInfo.brand }}</p>
            <p class="lead"><strong>颜色:</strong> {{ carInfo.color }}</p>
            <p class="lead"><strong>车型:</strong> {{ carInfo.carType }}</p>
            <p class="lead"><strong>描述:</strong> {{ carInfo.description }}</p>
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

<script>
import { decodeToken, getToken } from '../utils/auth'
import { Api } from '@/Api';
import { message } from 'ant-design-vue';
const token = getToken();
const userEmail = (token) ? decodeToken(token).userEmail : 'logged_out';


export default {
    data() {
        return {
            userInfo: {
                email: '',
                identity: '',
                name: '',
                phoneNumber: ''
            },
            bookingInfo: {

                car: '',
                startDate: '',
                endDate: ''
            },
            carInfo: {},
            carsHref: ''
        }
    },
    async mounted() {

        try {

            const response = await Api.get(`/users/${userEmail}`)
            const user = response.data.data.user;
            this.userInfo = {
                email: user.email,
                name: user.name,
                identity: user.identity,
                phoneNumber: user.phoneNumber,
            }

            this.bookingInfo = {
                car: this.$store.state.bookingData.car,
                startDate: this.$store.state.bookingData.bookingDates.startDate,
                endDate: this.$store.state.bookingData.bookingDates.endDate,
            }

            const carRes = await Api.get(`/cars/${this.bookingInfo.car}`);

            this.carInfo = carRes.data.data.car;
            this.carsHref = carRes.data.data.links.cars.href;
            console.log(this.carsHref);


        } catch (err) {
            console.log(err);
            message.error('信息加载失败，请重试。');
        }

    },
    methods: {
        async nextStep() {
            // First save the booking with 'unpaid' status
            const bookingData = {
                userEmail: this.$store.state.userInfo.email,
                startDate: this.$store.state.bookingData.bookingDates.startDate,
                endDate: this.$store.state.bookingData.bookingDates.endDate,
                status: '未确认',
                content: '预订已保存，等待审核',
                carRegistration: this.$store.state.bookingData.car
            };

            try {

                // Make a POST request to create a booking
                const response = await Api.post(`/users/${userEmail}/bookings`, bookingData);
                this.$store.commit('setFinalBooking', response.data.data);
                

                console.log(this.$store.state.bookingData.bookingDates)
                console.log(this.$store.state.finalBooking)

                this.$router.push('/booking/confirmation')
                

            } catch (error) {
                console.error('创建订单失败:', error);
                message.error('创建订单失败, 请重试.');
                // this.$router.push('/');
            }



            // Handle payment with Stripe
            // try {
            //     console.log(this.$store.state.finalBooking)
            //     const response = await Api
            //         .post('/create-checkout-session', { 
            //             "bookingRef": this.$store.state.finalBooking.bookingReference,
            //             "bookingInfo": this.bookingInfo,
            //             "car": this.carInfo 
            //         });
            //     window.location.href = response.data.url;
            // } catch (err) {
            //     console.error(err);
            //     message.error('创建订单失败, 请重试');
            // }
        },
    }
}
</script>

<style scoped>
a:hover {
    color: blue;
}
</style>