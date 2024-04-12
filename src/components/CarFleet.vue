<template>
    <div id="fleet" class="container col-xxl-8 px-4 py-5">
        <div class="pricing-header pb-md-4 mx-auto ">
            <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">我们的车辆</h1>
            <p class="fs-5 lead">发现各种可靠的车辆，量身定制，以满足您的每一个需求。</p>
        </div>
        <GetSortFilterCars />
    </div>
</template>

<script>
import GetSortFilterCars from './GetSortFilterCars.vue'

export default {
    components: {
        GetSortFilterCars,
    }
}

</script>
