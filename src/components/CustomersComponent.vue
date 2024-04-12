<template>
    <a-typography-title :heading="4">查询条件：</a-typography-title>
    <div>
        <a-form :model="searchForm">
            <a-row :gutter="18">
                <a-col :span="6">
                    <a-form-item field="name" label="客户姓名" label-col-flex="100px">
                        <a-input v-model="searchForm.name" placeholder="please enter..." />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item field="identity" label="身份证号" label-col-flex="80px">
                        <a-input v-model="searchForm.identity" placeholder="please enter..." />
                    </a-form-item>
                </a-col><a-col :span="6">
                    <a-form-item field="email" label="客户邮箱" label-col-flex="80px">
                        <a-input v-model="searchForm.email" placeholder="please enter..." />
                    </a-form-item>
                </a-col>


            </a-row>
            <a-row :gutter="18">
                <a-col :span="6">
                    <a-form-item field="phoneNumber" label="客户手机" label-col-flex="100px">
                        <a-input v-model="searchForm.phoneNumber" placeholder="please enter..." />
                    </a-form-item>
                </a-col>

                <a-col :span="6">
                    <a-form-item field="city" label="客户地址" label-col-flex="80px">
                        <a-input v-model="searchForm.city" placeholder="please enter..." />
                    </a-form-item>
                </a-col> <a-col :span="3">
                    <a-radio-group dirction="horizon" style="margin-top: 8px" v-model="searchForm.sex">
                        <a-radio value="男">男</a-radio>
                        <a-radio value="女">女</a-radio>
                    </a-radio-group>
                </a-col>
                <a-col :span="7" style="margin: 6px 40px">

                    <a-space>
                        <a-button type="primary" size="lager" style="margin-right: 5px" @click="handleSerch" ><icon-search />查询</a-button>
                   
                   <a-button type="primary" status="success" size="lager"  @click="handleResetSerchForm" ><icon-refresh />重置</a-button>
                   
                   <a-button type="primary" status="warning" size="lager"><icon-export />导出</a-button>
                    </a-space>
                    
                </a-col>
            </a-row>
        </a-form>
        <div style="margin-bottom: 5px">
            <a-button type="primary" status="success" size="mini" shape="round"><icon-plus-circle />添加</a-button>
           
            <a-button type="primary" status="danger" size="mini" shape="round"><icon-minus-circle />批量删除</a-button>
        </div>

        <a-space direction="vertical" fill>
            <a-table row-key="name" :columns="columns" :data="data.value" :row-selection="rowSelection"
                v-model:selectedKeys="selectedKeys" :pagination="pagination" stripe="true">
                <template #opt="{ record }">
                    
                    <a-space>
                        <a-button type="primary" size="mini" @click="handleClick(record)">编辑</a-button>
                   
                   <a-button type="primary" size="mini" status="danger"  @click="handleDelete(record)">删除</a-button>
                    </a-space>
                   
                </template>
            </a-table>
           
            <a-modal v-model:visible="visible" title="编辑信息" @cancel="handleCancel" @before-ok="handleBeforeOk">
                <a-form :model="form">
                    <a-form-item field="name" label="姓名">
                        <a-input v-model="form.name" />
                    </a-form-item><a-form-item field="identity" label="客户证号">
                        <a-input v-model="form.identity" />
                    </a-form-item><a-form-item field="city" label="地址">
                        <a-input v-model="form.city" />
                    </a-form-item><a-form-item field="phoneNumber" label="手机号">
                        <a-input v-model="form.name" />
                    </a-form-item><a-form-item field="sex" label="性别">
                        <a-input v-model="form.sex" />
                    </a-form-item><a-form-item field="password" label="密码">
                        <a-input v-model="form.password"  type="password"  />
                    </a-form-item>

                </a-form>
            </a-modal>

            
            <a-modal v-model:visible="visibleDelete" title="提醒" @cancel="handleDeleteCancel" @before-ok="handleDeleteBeforeOk">
            你确定要删除该记录吗？
            </a-modal>
        </a-space>
    </div>



</template>
<script setup>

import { onMounted, reactive, ref } from 'vue'
import {
    IconPlusCircle,
    IconMinusCircle,
    IconSearch,
    IconExport,
    IconRefresh
} from '@arco-design/web-vue/es/icon'
import { Api } from '../Api'

const searchForm = reactive({
    name: '',
    identity: '',
    city: '',
    phoneNumber: '',
    email: '',
    
})

const selectedKeys = ref([])

const rowSelection = reactive({
    type: 'checkbox',
    showCheckedAll: true,
    onlyCurrent: false
})

const pagination = { pageSize: 7 }

const columns = [
    {
        title: '身份证号',
        dataIndex: 'identity'
    },
    {
        title: '姓名',
        dataIndex: 'name'
    },
    {
        title: '地址',
        dataIndex: 'city'
    },
    {
        title: '手机号',
        dataIndex: 'phoneNumber'
    },
    {
        title: '邮箱',
        dataIndex: 'email'
    },
    {
        title: '性别',
        dataIndex: 'sex'
    },
    {
        title: '操作',
        slotName: 'opt',
        fixed: 'right',
        width: 120
    }
]
const data = reactive([])


const handleResetSerchForm=() =>{
    searchForm.name=''
    searchForm. identity=''
    searchForm.city=''
    searchForm.phoneNumber=''
    searchForm.email=''  
}

const handleSerch=()=>{
    // axious
}

const visible = ref(false);
const visibleDelete = ref(false);
const form = reactive({
    name: '',
    identity: '',
    city: '',
    phoneNumber: '',
    email: '',
    sex: '',
    password: '',
});

const handleClick = (record) => {
    visible.value = true;
    form.name = record.name;
    form.identity = record.identity;
    form.city = record.city;
    form.phoneNumber = record.phoneNumber;
    form.email = record.email;
    form.sex = record.sex;
    form.password = record.password;
};
const handleBeforeOk = (done) => {
    console.log(form)
    window.setTimeout(() => {
        done()
        // prevent close
        // done(false)
    }, 3000)
};


const handleDelete = (record) => {
    visibleDelete.value = true;
}
const handleDeleteBeforeOk = (record) => {

}
const handleDeleteCancel = () => {
visibleDelete.value = false;
}

const handleCancel = () => {
    visible.value = false;
}


onMounted(() => {
    Api.get('/users').then((res) => {

        data.value = res.data.data

    })
})</script>