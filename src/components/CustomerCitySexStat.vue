<template>
  <div class="container">
    <Breadcrumb :items="['统计分析', '客户地区统计']" />

    <a-card class="general-card" title="客户地区性别统计查询">
      <row style="display: flex;">
        <a-col :span="8">
          <a-form-item label="选择城市查询">
            <a-select v-model="selectCity" @change="handleCitySelect">
              <a-option
                v-for="item in cityList"
                :label="item"
                :value="item"
              ></a-option>
            </a-select>
          </a-form-item>
        </a-col>
        
      </row>
      <div id="myEcharts" style="height: 450px"></div>
    </a-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import Breadcrumb from '@/components/breadcrumb/index.vue'
import { Api } from '../Api'
import { Message } from '@arco-design/web-vue';

const selectCity = ref('')
const cityList = ref(['北京', '上海', '广州', '深圳'])

var myChart = {}

var option = {
  title: {
    text: 'Car租车系统客户地区性别统计',
    subtext: '',
    left: 'center',
    top: 20,subtextStyle: {
      fontSize: 16
    }
  },
  legend: {
    top: 10,
    orient: 'vertical',
    left: 'left'
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  grid: {
    left: '10%'
  },
  tooltip: {
    trigger: 'item',
    formatter: '客户数量（占比）<br/>{b} : {c} ({d}%)'
  },
  series: [
    {
      type: 'pie',

      radius: '55%',

      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      data: [
        { value: 40, name: 'rose 1' },
        { value: 38, name: 'rose 2' },
        { value: 32, name: 'rose 3' },
        { value: 30, name: 'rose 4' },
        { value: 28, name: 'rose 5' },
        { value: 26, name: 'rose 6' },
        { value: 22, name: 'rose 7' },
        { value: 18, name: 'rose 8' }
      ]
    }
  ]
}
onMounted(async () => {
  const res = await Api.get('/users/citiesName')
  cityList.value = res.data
  myChart = echarts.init(document.getElementById('myEcharts'))
//   // 在这里配置你的echarts图表

//   myChart.setOption(option)
})


const handleCitySelect = () => {

    Api.get('/users/sexCity/'+selectCity.value).then(res => {
        option.series[0].data = res.data
        option.title.subtext = selectCity.value + '客户性别统计'
        myChart.setOption(option)

    }).catch(err => {
       Message.error('查询失败')
    })
}

onUnmounted(() => {
  myChart.dispose()
})
</script>
