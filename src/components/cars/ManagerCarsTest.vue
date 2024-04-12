<template>
    <a-typography-title :heading="4">查询条件：</a-typography-title>
    <div>
        <a-form :model="searchForm">
            <a-row :gutter="18">
                <a-col :span="6">
                    <a-form-item field="name" label="客户姓名" label-col-flex="100px">
                        <a-input v-model="searchForm.name" placeholder=" " />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item field="identity" label="身份证号" label-col-flex="80px">
                        <a-input v-model="searchForm.identity" placeholder=" " />
                    </a-form-item> </a-col><a-col :span="6">
                    <a-form-item field="email" label="客户邮箱" label-col-flex="80px">
                        <a-input v-model="searchForm.email" placeholder=" " />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="18">
                <a-col :span="6">
                    <a-form-item field="phoneNumber" label="客户手机" label-col-flex="100px">
                        <a-input v-model="searchForm.phoneNumber" placeholder=" " />
                    </a-form-item>
                </a-col>

                <a-col :span="6">
                    <a-form-item field="city" label="客户地址" label-col-flex="80px">
                        <a-input v-model="searchForm.city" placeholder=" " />
                    </a-form-item>
                </a-col>
                <a-col :span="3">
                    <a-radio-group dirction="horizon" style="margin-top: 8px" v-model="searchForm.sex">
                        <a-radio value="男">男</a-radio>
                        <a-radio value="女">女</a-radio>
                    </a-radio-group>
                </a-col>
                <a-col :span="7" style="margin: 6px 40px">
                    <a-space>
                        <a-button type="primary" size="lager" style="margin-right: 5px"
                            @click="handleSearch"><icon-search />查询</a-button>

                        <a-button type="primary" status="success" size="lager"
                            @click="handleResetSerchForm"><icon-refresh />重置</a-button>

                        <a-button type="primary" status="warning" size="lager"><icon-export />导出</a-button>
                    </a-space>
                </a-col>
            </a-row>
        </a-form>
        <div style="margin-bottom: 5px">
            <a-button type="primary" status="success" size="mini" shape="round" @click="addUserClick"><icon-plus-circle />添加</a-button>

            <a-button type="primary" status="danger" size="mini" shape="round"
                @click="batchDelete"><icon-minus-circle />批量删除</a-button>
        </div>

        <a-space direction="vertical" fill>
            <a-table :stripe="true" row-key="userId" :columns="columns" :data="data.value" :row-selection="rowSelection"
                v-model:selectedKeys="selectedKeys" :pagination="pagination">
                <template #opt="{ record }">
                    <a-space>
                        <a-button type="primary" size="mini" @click="handleClick(record)">编辑</a-button>

                        <a-button type="primary" size="mini" status="danger" @click="handleDelete(record)">删除</a-button>
                    </a-space>
                </template>
            </a-table>
        </a-space>

        <a-modal v-model:visible="visibleDelete" title="提醒" @cancel="handleDeleteCancel"
            @before-ok="handleDeleteBeforeOk()">
            你确定要删除该记录吗？
        </a-modal>
        <a-modal v-model:visible="visible" title="编辑信息" @cancel="handleCancel" @before-ok="handleBeforeOk">
            <a-form :model="form">
                <a-form-item field="name" label="姓名"> <a-input v-model="form.name" /> </a-form-item><a-form-item
                    field="identity" label="客户证号">
                    <a-input v-model="form.identity" /> </a-form-item><a-form-item field="city" label="地址"> <a-input
                        v-model="form.city" /> </a-form-item><a-form-item field="phoneNumber" label="手机号">
                    <a-input v-model="form.phoneNumber" /> </a-form-item><a-form-item field="sex" label="性别"> <a-input
                        v-model="form.sex" /> </a-form-item><a-form-item field="password" label="密码">
                    <a-input v-model="form.password" type="password" />
                </a-form-item>
            </a-form>
        </a-modal>

        <a-modal v-model:visible="visibleAddUser" title="添加客户" @cancel="handleCancelUser" @before-ok="handleAddUserBeforeOk">
            <a-form :model="AddUserForm">
                <a-form-item field="name" label="姓名"> <a-input v-model="AddUserForm.name" /> </a-form-item>
                    <a-form-item field="identity" label="客户证号">
                    <a-input v-model="AddUserForm.identity" /> </a-form-item><a-form-item field="city" label="地址">
                    <a-input v-model="AddUserForm.city" /> </a-form-item><a-form-item field="phoneNumber" label="手机号">
                    <a-input v-model="AddUserForm.phoneNumber" /> </a-form-item><a-form-item field="sex" label="性别">
                    <a-input v-model="AddUserForm.sex" /> </a-form-item>
                    <a-form-item field="email" label="邮箱">
                    <a-input v-model="AddUserForm.email" type="text" />
                </a-form-item><a-form-item field="password" label="密码">
                    <a-input v-model="AddUserForm.password" type="password" />
                </a-form-item>
            </a-form>
        </a-modal>
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
import { Message } from '@arco-design/web-vue'



const searchForm = ref({
    name: '',
    identity: '',
    city: '',
    phoneNumber: '',
    email: ''
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

const handleResetSerchForm = () => {

    searchForm.value.name = ''
    searchForm.value.identity = ''
    searchForm.value.city = ''
    searchForm.value.phoneNumber = ''
    searchForm.value.email = ''
    searchForm.value.sex = ''
}

const handleSearch = () => {


    Api.post('/users/seachbycondiction', searchForm.value).then(res => {

        data.value = res.data.data;
        Message.success(res.data.message);

    }).catch(erro => {

        Message.error(erro.response.data.message);

    });

}



const batchDelete = () => {



    Api.patch('/users/deleteUsers', selectedKeys.value).then(res => {

        getAllUsers();

        Message.success(res.data.message);


    }).catch(erro => {

        Message.error(erro.response.data.message);

    });
}

const visible = ref(false)
const visibleDelete = ref(false)
const form = reactive({
    name: '',
    identity: '',
    city: '',
    phoneNumber: '',
    email: '',
    sex: '',
    password: ''
})

const handleClick = (record) => {
    visible.value = true
    form.name = record.name
    form.identity = record.identity
    form.city = record.city
    form.phoneNumber = record.phoneNumber
    form.email = record.email
    form.sex = record.sex
    form.password = record.password
}

const deleteItem = ref({ userId: '', email: '' })
const handleBeforeOk = () => {

    console.log(form.value);
    //编辑信息提交
    Api.patch('/users/' + form.email, form).then(res => {
        visible.value = false
        getAllUsers()
        message.success("数据编辑成功")

    })

}

const handleDelete = (record) => {
    visibleDelete.value = true
    deleteItem.userId = record.userId
    deleteItem.email = record.email
}
const handleDeleteBeforeOk = () => {
    visibleDelete.value = false
    if (deleteItem.userId != '' && deleteItem.userId != null && deleteItem.userId != undefined) {
        Api.delete(`/users/${deleteItem.email}`)
            .then((res) => {
                getAllUsers()
                Message.success(res.data.message)
            })
            .catch(erro => {

                Message.error(erro.response.data.message);

            });
    }
}
const handleDeleteCancel = () => {
    visibleDelete.value = false
    deleteItem.userId = ''
}

const handleCancel = () => {
    visible.value = false
}

const getAllUsers = () => {
    Api.get('/users').then((res) => {
        data.value = res.data.data
    })
}

const AddUserForm = ref({
    name: '',
    identity: '',
    city: '',
    phoneNumber: '',
    email: '',
    sex: '',
    password: '',
})
const visibleAddUser=ref(false);

const handleCancelUser=() => {
    visibleAddUser.value=false;
    AddUserForm.value.city = ''
    AddUserForm.value.email = ''
    AddUserForm.value.name=''
    AddUserForm.value.phoneNumber=''
    AddUserForm.value.identity=''
    AddUserForm.value.sex=''
    AddUserForm.value.password=''

}

const addUserClick=()=>{
    visibleAddUser.value=true;
}

const handleAddUserBeforeOk = () => {

    Api.post('/users',AddUserForm.value).then(res=>{

        visibleAddUser.value = false;
        Message.success('添加用户成功')
        getAllUsers();
    }).catch(erro=>{
        Message.error('添加失败，请稍后再试:'+erro.response.message)
    })
   
}

onMounted(() => {
    getAllUsers()
})
</script>
