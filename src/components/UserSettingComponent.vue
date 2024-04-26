<template>
  <a-typography>
    <a-typography-title :bold="true" style="text-align: center">
      个人中心
    </a-typography-title></a-typography
  >
  <a-space direction="vertical" size="large" fill align="center">
    <a-descriptions
      :data="data"
      title="基本信息"
      layout="inline-horizontal"
      :size="large"
      :column="1"
      style="font-size: 20px"
    >
      <a-descriptions-item label="姓名"> {{ user.name }}</a-descriptions-item
      ><a-descriptions-item label="电子邮箱">{{ user.email }} </a-descriptions-item
      ><a-descriptions-item label="手机"> {{ user.phoneNumber }}</a-descriptions-item
      ><a-descriptions-item label="性别">{{ user.sex }} </a-descriptions-item
      ><a-descriptions-item label="身份证号"> {{ user.identity }}</a-descriptions-item
      ><a-descriptions-item label="城市"> {{ user.city }}</a-descriptions-item
      ><a-descriptions-item label="注册时间"> {{ user.createDate }}</a-descriptions-item>
    </a-descriptions>

    <a-space>
      <a-button type="primary" @click="openEdit">修改信息</a-button>
    </a-space>
  </a-space>

  <a-modal
    v-model:visible="visible"
    title="修改信息"
    @cancel="handleCancel"
    @ok="updateInformation"
  >
    <a-form :model="form">
      <a-form-item field="name" label="姓名">
        <a-input v-model="form.name" />
      </a-form-item>
      <a-form-item field="phoneNumber" label="手机">
        <a-input v-model="form.phoneNumber" /> </a-form-item
      ><a-form-item field="sex" label="性别"> <a-input v-model="form.sex" /> </a-form-item
      ><a-form-item field="identity" label="身份证号">
        <a-input v-model="form.identity" /> </a-form-item
      ><a-form-item field="city" label="城市"> <a-input v-model="form.city" /> </a-form-item
      ><a-form-item field="password" label="密码">
        <a-input type="password" v-model="form.password" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { getUser } from '../utils/auth'
import { ref, onMounted } from 'vue'
import { Api } from '../Api'
import { Message } from '@arco-design/web-vue'

const user = ref({})

const visible = ref(false)

const handleCancel = () => {
  visible.value = false
}
const openEdit = () => {
  visible.value = true

  form.value = user.value
}

const form = ref({})

const updateInformation = () => {
  Api.patch(`/users/${user.value.email}`, form.value)
    .then((res) => {
      user.value = res.value.user
      Message.success('信息更新成功')
      visible.value = false
    })
    .catch((err) => {
      Message.error(err.response.data.message)
    })
}

const getUserInformation = () => {
  Api.get(`/users/${getUser().userEmail}`)
    .then((res) => {
      console.log(res)
      user.value = res.data.user
    })
    .catch((erro) => {
      Message.error(erro.response.message)
    })
}
onMounted(() => {
  getUserInformation()
})
</script>
