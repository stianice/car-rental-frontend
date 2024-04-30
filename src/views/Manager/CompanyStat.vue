<template>
  <div class="container">
    <Breadcrumb :items="['统计分析', '公司年度月份销售额统计']" />
    <a-card class="general-card">
   
      <div id="myEcharts" style="height: 550px"></div>
    </a-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import Breadcrumb from '@/components/breadcrumb/index.vue'


var myChart = {}



var option = {
  title: {
    x: 'center',
    text: '公司年度月份销售额统计图',
    top: 20
  },

  grid: {
    left: '10%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月'
      ]
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [1210, 13112, 10221, 1314, 9201, 2380, 21090, 2310, 2104, 1210, 13112, 10221]
    }
  ]
}
onMounted(() => {
  myChart = echarts.init(document.getElementById('myEcharts'))
  // 在这里配置你的echarts图表

  myChart.setOption(option)
})

onUnmounted(() => {
  myChart.dispose()
})
</script>
