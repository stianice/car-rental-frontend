import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import BootstrapVueNext from 'bootstrap-vue-next'
import 'bootstrap'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'


import ArcoVue from '@arco-design/web-vue';

import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App)


app.use(router)
app.use(store)
app.use(BootstrapVueNext)
app.use(ArcoVue);


app.mount('#app')

