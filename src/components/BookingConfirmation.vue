<template>
    <div class="row flex-lg-row-reverse align-items-center py-5 mb-2">
        <div class="col-10 col-sm-8 col-lg-6">
            <img :src="carInfo.image" :alt="carInfo.description" class="d-block mx-lg-auto img-fluid">
        </div>
        <div class="col-10 col-sm-8 col-lg-6">
            <h1 class="display-5 fw-bold text-body-emphasis">我们已经收到您的订单!</h1>            
            <h2 class="fw-bold text-body-emphasis">订单详情</h2>        
            <p class="lead"><strong>电子邮件:</strong> {{ userInfo.email }}</p>
            <p class="lead"><strong>姓名：</strong>{{ userInfo.name }}</p>
            <p class="lead"><strong>身份证:</strong> {{ userInfo.identity }}</p>
            <p class="lead"><strong>手机号:</strong> {{ userInfo.phoneNumber }}</p>
            <h2 class="fw-bold text-body-emphasis">订购</h2>
            <p class="lead"><strong>起租时间:</strong> {{ bookingInfo.startDate }}</p>
            <p class="lead"><strong>归还时间:</strong> {{ bookingInfo.endDate }}</p>
            <h2 class="fw-bold text-body-emphasis">车辆数据</h2>
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
    margin-top: 100px;
}
</style>

<script>
    export default {
        data() {
            return {
                userInfo: {
                    email: '',
                    name: '',
                    identity: '',
                    phoneNumber: '',
                    carType:'',
                   
                },
                bookingInfo: {
                    car: '',
                    startDate: '',
                    endDate: ''
                },
                carInfo: {}
            }
        },
 
        mounted() {
            this.userInfo.email = this.$store.state.finalBooking.user.email;
            this.userInfo.name = this.$store.state.finalBooking.user.name;
            this.userInfo.identity = this.$store.state.finalBooking.user.identity;
            this.userInfo.phoneNumber = this.$store.state.finalBooking.user.phoneNumber;
            this.userInfo.carType = this.$store.state.finalBooking.car.carType;
            this.bookingInfo.startDate = this.$store.state.finalBooking.startDate.substring(0, 10);
            this.bookingInfo.endDate = this.$store.state.finalBooking.endDate.substring(0, 10);
            this.carInfo = this.$store.state.finalBooking.car;
            localStorage.clear();
        }
    };
</script>

