

<template>
  <div class="container">
    <Breadcrumb :items="['基础管理', '车辆管理']" />

    <a-card class="general-card" title="查询条件">
      <a-row>
        <a-col :flex="1">
          <a-form :model="searchForm">
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="registration" label="车牌">
                  <a-input v-model="searchForm.registration" placeholder=" " />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="brand" label="品牌">
                  <a-input v-model="searchForm.brand" placeholder=" " />
                </a-form-item> </a-col
              ><a-col :span="8">
                <a-form-item field="color" label="颜色">
                  <a-input v-model="searchForm.color" placeholder=" " />
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item field="description" label="车辆描述">
                  <a-input v-model="searchForm.description" placeholder=" " />
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item field="carType" label="车辆类型">
                  <a-input v-model="searchForm.carType" placeholder=" " />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="status" label="车辆状态">
                  <a-radio-group v-model="searchForm.status">
                    <a-radio value="1">已出租</a-radio>
                    <a-radio value="0">未出租</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />

        <!-- 查询 重置键位 -->
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="handleSearch">
              <template #icon>
                <icon-search />
              </template>
              查询
            </a-button>

            <a-button @click="handleResetSerchForm"
              ><template #icon><icon-refresh /></template>重置</a-button
            >
          </a-space>
        </a-col>
      </a-row>

      <a-divider style="margin-top: 0" />

      <a-row style="margin-bottom: 10px">
        <a-space direction="vertical" :size="18">
          <a-col :span="16">
            <a-space>
              <a-button type="primary" @click="addCarClick" size="small">
                <template #icon>
                  <icon-plus />
                </template>
                添加
              </a-button>

              <a-popconfirm
                content="你确定要这些记录吗？?"
                okText="确定删除"
                cancelText="取消"
                @ok="batchDelete"
                type="error"
                position="right"
              >
                <a-button type="primary" status="danger" size="small">
                  <template #icon>
                    <icon-minus-circle />
                  </template>
                  批量删除
                </a-button></a-popconfirm
              >
            </a-space>
          </a-col>
          <a-col :span="8" style="text-align: right"> </a-col>
        </a-space>
      </a-row>

      <a-table
        :stripe="true"
        row-key="carId"
        :columns="columns"
        :data="data"
        :row-selection="rowSelection"
        v-model:selectedKeys="selectedKeys"
        :pagination="pagination"
        :scroll="{ y: 260 }"
      >
        <template #stu="{ record }">
          <span v-if="record.status == '0'"> <a-tag color="red"> 未出租</a-tag> </span>
          <span v-else><a-tag color="blue">已出租</a-tag></span>
        </template>
        <template #img="{ record }">
          <a-image width="100" hight="60" :src="record.image" />
        </template>

        <template #opt="{ record }">
          <a-space>
            <a-button type="primary" size="mini" @click="handleClick(record)">编辑</a-button>
            <a-popconfirm
              content="你确定要删除这条记录吗?"
              okText="确定删除"
              cancelText="取消"
              @ok="handleDeleteBeforeOk(record)"
              type="warning"
              position="tr"
            >
              <a-button type="primary" size="mini" status="danger">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table>
    </a-card>

    <a-modal v-model:visible="visible" title="编辑信息" @cancel="handleCancel" @ok="handleBeforeOk">
      <a-form :model="form">
        <a-form-item field="brand" label="品牌"> <a-input v-model="form.brand" /> </a-form-item>
        <a-form-item field="registration" label="车牌号">
          <a-input v-model="form.registration" /> </a-form-item
        ><a-form-item field="color" label="颜色"> <a-input v-model="form.color" /> </a-form-item
        ><a-form-item field="carType" label="车型"> <a-input v-model="form.carType" /> </a-form-item
        ><a-form-item field="price" label="租赁价格"> <a-input v-model="form.price" /> </a-form-item
        ><a-form-item field="status" label="出租状态">
          <a-radio-group v-model="form.status">
                    <a-radio value="1">已出租</a-radio>
                    <a-radio value="0">未出租</a-radio>
                  </a-radio-group>
        </a-form-item>

        <a-form-item field="description" label="描述">
          <a-textarea
            v-model:model-value="form.description"
            :auto-size="{
              minRows: 3,
              maxRows: 5
            }"
          />
        </a-form-item>

        <a-form-item field="image" label="图片">
          <a-upload
            list-type="picture-card"
            image-preview
            :limit="1"
            :custom-request="customRequestUpdate"
            :file-list="[{ url: form.image }]"
          >
          </a-upload>
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="visibleAddCar"
      title="添加车辆"
      @cancel="handleCancelCar"
      @ok="handleAddCarBeforeOk"
    >
      <a-form :model="AddCarForm">
        <a-form-item  label="品牌">
          <a-input v-model="AddCarForm.brand" />
        </a-form-item>
        <a-form-item  label="车牌号">
          <a-input v-model="AddCarForm.registration" /> </a-form-item
        ><a-form-item label="颜色">
          <a-input v-model="AddCarForm.color" /> </a-form-item
        ><a-form-item label="车型">
          <a-input v-model="AddCarForm.carType" /> </a-form-item
        ><a-form-item flabel="出租价格">
          <a-input v-model="AddCarForm.price" />
        </a-form-item>
        <a-form-item  label="出租状态">
          <a-radio-group v-model="searchForm.status">
                    <a-radio value="1">已出租</a-radio>
                    <a-radio value="0">未出租</a-radio>
                  </a-radio-group>
        </a-form-item>

        <a-form-item field="description" label="描述">
          <a-textarea
            v-model:model-value="AddCarForm.description"
            :auto-size="{
              minRows: 3,
              maxRows: 5
            }"
          />
        </a-form-item>

        <a-form-item field="image" label="图片">
          <a-upload
            list-type="picture-card"
            image-preview
            :limit="1"
            :custom-request="customRequestAdd"
            :file-list="[{ url: AddCarForm.image }]"
          >
          </a-upload>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'

import { Api } from '@/Api'
import { Message } from '@arco-design/web-vue'
import axios from 'axios'
import Breadcrumb from '@/components/breadcrumb/index.vue'

const searchForm = ref({
  registration: '',
  carType: '',
  brand: '',
  status: '',
  description: ''
})

const customRequestUpdate = (option) => {
  const { onProgress, onError, onSuccess, fileItem, name } = option

  const formData = new FormData()
  formData.append(name || 'file', fileItem.file)

  const CancelToken = axios.CancelToken
  const source = CancelToken.source()
  Api.post('/uploadimage', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.lengthComputable) {
        var percent = ((progressEvent.loaded / progressEvent.total) * 100) | 0
        onProgress(percent, progressEvent)
      }
    },

    cancelToken: source.token
  })
    .then((res) => {
      onSuccess(res.data)
      console.log(fileItem.response)
      form.value.image = res.data

      Message.success(res.message)
    })
    .catch((erro) => {
      Message.error(erro.response.message)
      onError(erro.response.message)
    })
  return {
    abort() {
      source.cancel('停止上传')
    }
  }
}
const customRequestAdd = (option) => {
  const { onProgress, onError, onSuccess, fileItem, name } = option

  const formData = new FormData()
  formData.append(name || 'file', fileItem.file)

  const CancelToken = axios.CancelToken
  const source = CancelToken.source()
  Api.post('/uploadimage', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.lengthComputable) {
        var percent = ((progressEvent.loaded / progressEvent.total) * 100) | 0
        onProgress(percent, progressEvent)
      }
    },

    cancelToken: source.token
  })
    .then((res) => {
      onSuccess(res.data)
      console.log(fileItem.response)
      AddCarForm.value.image = res.data

      Message.success(res.message)
    })
    .catch((erro) => {
      Message.error(erro.response.message)
      onError(erro.response.message)
    })
  return {
    abort() {
      source.cancel('停止上传')
    }
  }
}

const selectedKeys = ref([])

const rowSelection = ref({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false
})

const pagination = { pageSize: 6 }

// 列表行
const columns = [
  {
    title: '车牌号',
    dataIndex: 'registration'
  },
  {
    title: '品牌',
    dataIndex: 'brand'
  },
  {
    title: '车辆类型',
    dataIndex: 'carType'
  },
  {
    title: '颜色',
    dataIndex: 'color'
  },
  {
    title: '描述',
    dataIndex: 'description'
  },
  {
    title: '出租价格',
    dataIndex: 'price'
  },
  {
    title: '出租状态',
    dataIndex: 'status',
    slotName: 'stu'
  },
  {
    title: '缩略图',
    dataIndex: 'image',
    slotName: 'img'
  },
  {
    title: '创建时间',
    dataIndex: 'createDate'
  },
  {
    title: '操作',
    slotName: 'opt',
    fixed: 'right',
    width: 120
  }
]

//上传

// 列表数据
const data = ref([])

//重置搜索
const handleResetSerchForm = () => {
  searchForm.value.registration = ''
  searchForm.value.carType = ''
  searchForm.value.brand = ''
  searchForm.value.description = ''
  searchForm.value.color = ''
  searchForm.value.status = ''
}

// 发送搜索请求
const handleSearch = () => {
  Api.post('/cars/getCarsByCondiction', searchForm.value)
    .then((res) => {
      data.value = res.data
      Message.success(res.data.message)
    })
    .catch((erro) => {
      Message.error(erro.response.data.message)
    })
}

// 批量删除请求
const batchDelete = () => {
  Api.patch('/cars/deleteCars', selectedKeys.value)
    .then((res) => {
      getAllCars()

      Message.success(res.data.message)
    })
    .catch((erro) => {
      Message.error(erro.response.data.message)
    })
}

const visible = ref(false)
// 删除条目弹窗

// 列表项数据
const form = ref({
  registration: '',
  brand: '',
  color: '',
  status: '',
  price: '',
  image: '',
  description: '',
  carType: ''
})

// 编辑数据弹窗
const handleClick = (record) => {
  visible.value = true
  form.value.registration = record.registration
  form.value.brand = record.brand
  form.value.color = record.color
  form.value.status = record.status
  form.value.price = record.price
  form.value.image = record.image
  form.value.description = record.description
  form.value.carType = record.carType
  form.value.oldRegistration = record.registration
}

const deleteItem = ref({ userId: '', email: '' })
// 更新信息请求
const handleBeforeOk = () => {
  console.log(form.value)
  //编辑信息提交
  Api.put('/cars/' + form.value.oldRegistration, form.value).then(() => {
    visible.value = false
    getAllCars()
    Message.success('数据编辑成功')
  })
}

const handleDeleteBeforeOk = () => {
  if (deleteItem.value.userId != '' && deleteItem.value.userId != null && deleteItem.value.userId != undefined) {
    Api.delete(`/users/${deleteItem.value.email}`)
      .then((res) => {
        getAllCars()
        Message.success(res.data.message)
      })
      .catch((erro) => {
        Message.error(erro.response.data.message)
      })
  }
}

const handleCancel = () => {
  visible.value = false
}

const getAllCars = () => {
  Api.get('/cars').then((res) => {
    data.value = res.data
  })
}

const AddCarForm = ref({
  registration: '',
  brand: '',
  color: '',
  status: '',
  price: '',
  image: '',
  description: '',
  carType: ''
})
const visibleAddCar = ref(false)

const handleCancelCar = () => {
  visibleAddCar.value = false
}

const addCarClick = () => {
  visibleAddCar.value = true
}

const handleAddCarBeforeOk = () => {
  Api.post('managers/yuyuni@hotmail.com/cars', AddCarForm.value)
    .then(() => {
      visibleAddCar.value = false
      Message.success('添加车辆成功')
      getAllCars()
    })
    .catch((erro) => {
      Message.error('添加失败，请稍后再试:' + erro.response.message)
    })
}

onMounted(() => {
  getAllCars()
})
</script>
