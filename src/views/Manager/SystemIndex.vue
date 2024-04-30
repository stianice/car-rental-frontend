<template>
  <div class="container">
    <Breadcrumb :items="['系统首页']" />

    <div class="panel">
      <a-col :span="24" class="panel">
        <a-row>
          <a-col class="panel-col" :span="6">
            <a-space>
              <a-avatar :size="54" class="col-avatar">
                <img
                  alt="avatar"
                  src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/288b89194e657603ff40db39e8072640.svg~tplv-49unhts6dw-image.image"
                />
              </a-avatar>
              <a-statistic
                title="总营业额"
                :value="373.5"
                :precision="1"
                :value-from="0"
                animation
                show-group-separator
              >
                <template #suffix>
                 ￥
                  <span class="unit"></span>
                </template>
              </a-statistic>
            </a-space>
          </a-col>
          <a-col class="panel-col" :span="6">
            <a-space>
              <a-avatar :size="54" class="col-avatar">
                <img
                  alt="avatar"
                  src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/fdc66b07224cdf18843c6076c2587eb5.svg~tplv-49unhts6dw-image.image"
                />
              </a-avatar>
              <a-statistic
                title="昨日营业额"
                :value="368"
                :value-from="0"
                animation
                show-group-separator
              >
                <template #suffix>
                  <span class="unit"></span>
                </template>

             
              </a-statistic>
            </a-space>
          </a-col>
          <a-col class="panel-col" :span="6">
            <a-space>
              <a-avatar :size="54" class="col-avatar">
                <img
                  alt="avatar"
                  src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77d74c9a245adeae1ec7fb5d4539738d.svg~tplv-49unhts6dw-image.image"
                />
              </a-avatar>
              <a-statistic title="昨日订单量" :value="8874" :value-from="0" animation show-group-separator>
                <template #suffix>
                  <span class="unit"></span>
                </template>
              </a-statistic>
            </a-space>
          </a-col>
          <a-col class="panel-col" :span="6">
            <a-space>
              <a-avatar :size="54" class="col-avatar">
                <img
                  alt="avatar"
                  src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/c8b36e26d2b9bb5dbf9b74dd6d7345af.svg~tplv-49unhts6dw-image.image"
                />
              </a-avatar>
              <a-statistic
                title="涨幅"
                :value="2.8"
                :precision="1"
                :value-from="0"
                animation
              >
                <template #suffix>
                  %
                  <icon-caret-up class="up-icon" />
                </template>
              </a-statistic>
            </a-space>
          </a-col>
        </a-row>
        <a-divider class="panel-border" />
      </a-col>
    </div>
    <a-row style="margin-top: 8px">
      <a-col :flex="1" class="panel" style="margin-right: 16px">
        <a-spin style="width: 100%; height: 430px">
          <a-card
            class="general-card"
            :header-style="{ paddingBottom: 0 }"
            :body-style="{
              paddingTop: '20px'
            }"
            title="内容数据"
          >
            <template #extra>
              <a-link>更多内容</a-link>
            </template>
            <div id="myEcharts" style="height: 340px"></div>
          </a-card>
        </a-spin>
      </a-col>
      <a-col :span="9" class="panel">
        <a-spin style="height: 430px; width: 100%">
          <a-card
            class="general-card"
            :header-style="{ paddingBottom: '0' }"
            :body-style="{
              padding: '20px'
            }"
          >
            <template #title> 内容分类 </template>
            <div style="height: 310px; width: 100%" id="piechart" />
          </a-card>
        </a-spin>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import Breadcrumb from '@/components/breadcrumb/index.vue'
import {  onMounted, onUnmounted } from 'vue'
import { graphic } from 'echarts'
import dayjs from 'dayjs'

var myChart = {}
const xAxis = []
const chartsData = [2, 1, 23, 2, 3, 32, 114]
function graphicFactory(side) {
  return {
    type: 'text',
    bottom: '8',
    ...side,
    style: {
      text: '',
      textAlign: 'center',
      fill: '#4E5969',
      fontSize: 12
    }
  }
}

const presetData = [58, 81, 53, 90, 64, 88, 49, 79]
const getLineData = () => {
  const count = 8
  return new Array(count).fill(0).map((el, idx) => ({
    x: dayjs()
      .day(idx - 7)
      .format('MM-DD'),
    y: presetData[idx]
  }))
}

const graphicElements = [graphicFactory({ left: '2.6%' }), graphicFactory({ right: 0 })]
const option = {
  grid: {
    left: '2.6%',
    right: '0',
    top: '10',
    bottom: '30'
  },
  xAxis: {
    type: 'category',
    offset: 2,
    data: xAxis,
    boundaryGap: false,
    axisLabel: {
      color: '#4E5969',
      formatter(value, idx) {
        if (idx === 0) return ''
        if (idx === xAxis.length - 1) return ''
        return `${value}`
      }
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: true,
      interval: (idx) => {
        if (idx === 0) return false
        if (idx === xAxis.length - 1) return false
        return true
      },
      lineStyle: {
        color: '#E5E8EF'
      }
    },
    axisPointer: {
      show: true,
      lineStyle: {
        color: '#23ADFF',
        width: 2
      }
    }
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false
    },
    axisLabel: {
      formatter(value, idx) {
        if (idx === 0) return value
        return `${value}k`
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: '#E5E8EF'
      }
    }
  },
  tooltip: {
    trigger: 'axis',

    className: 'echarts-tooltip-diy'
  },
  graphic: {
    elements: graphicElements
  },
  series: [
    {
      data: chartsData,
      type: 'line',
      smooth: true,
      // symbol: 'circle',
      symbolSize: 12,
      emphasis: {
        focus: 'series',
        itemStyle: {
          borderWidth: 2
        }
      },
      lineStyle: {
        width: 3,
        color: new graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: 'rgba(30, 231, 255, 1)'
          },
          {
            offset: 0.5,
            color: 'rgba(36, 154, 255, 1)'
          },
          {
            offset: 1,
            color: 'rgba(111, 66, 251, 1)'
          }
        ])
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(17, 126, 255, 0.16)'
          },
          {
            offset: 1,
            color: 'rgba(17, 128, 255, 0)'
          }
        ])
      }
    }
  ]
}

const chartData = getLineData()
chartData.forEach((el, idx) => {
  xAxis.push(el.x)
  chartsData.push(el.y)

  if (idx == 0) {
    graphicElements[0].style.text = el.x
  }
  if (idx == chartData.length - 1) {
    graphicElements[1].style.text = el.x
  }
})

var pieoption = {
  legend: {
    left: 'center',
    data: ['纯文本', '图文类', '视频类'],
    bottom: 0,
    icon: 'circle',
    itemWidth: 8,
    textStyle: {
      color: '#4E5969'
    },
    itemStyle: {
      borderWidth: 0
    }
  },

  tooltip: {
    show: true,
    trigger: 'item'
  },
  graphic: {
    elements: [
      {
        type: 'text',
        left: 'center',
        top: '40%',
        style: {
          text: '内容量',
          textAlign: 'center',
          fill: '#4E5969',
          fontSize: 14
        }
      },
      {
        type: 'text',
        left: 'center',
        top: '50%',
        style: {
          text: '928,531',
          textAlign: 'center',
          fill: '#1D2129',
          fontSize: 16,
          fontWeight: 500
        }
      }
    ]
  },
  series: [
    {
      type: 'pie',
      radius: ['50%', '70%'],
      center: ['50%', '50%'],
      label: {
        formatter: '{d}%',
        fontSize: 14,
        color: '#4E5969'
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1
      },
      data: [
        {
          value: [148564],
          name: '纯文本',
          itemStyle: {
            color: '#249EFF'
          }
        },
        {
          value: [334271],
          name: '图文类',
          itemStyle: {
            color: '#313CA9'
          }
        },
        {
          value: [445694],
          name: '视频类',
          itemStyle: {
            color: '#21CCFF'
          }
        }
      ]
    }
  ]
}

var piechart

onMounted(() => {
  myChart = echarts.init(document.getElementById('myEcharts'))
  piechart = echarts.init(document.getElementById('piechart'))
  myChart.setOption(option)
  piechart.setOption(pieoption)
})

onUnmounted(() => {
  myChart.dispose()
  piechart.dispose()
})
</script>
<style lang="less" scoped>
.panel {
  background-color: var(--color-bg-2);
  border-radius: 4px;
  overflow: auto;
}

.arco-col.panel {
  margin-bottom: 0;
  padding: 16px 20px 0 20px;
}

.panel-col {
  padding-left: 43px;
  border-right: 1px solid rgb(var(--gray-2));

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    border-right: none;
  }
}

.col-avatar {
  margin-right: 12px;
  background-color: var(--color-fill-2);
}

.up-icon {
  color: rgb(var(--red-6));
}

.unit {
  margin-left: 8px;
  color: rgb(var(--gray-8));
  font-size: 12px;
}
</style>
