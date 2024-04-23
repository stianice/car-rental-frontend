

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import BootstrapVueNext from 'bootstrap-vue-next'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'bootstrap'
import ArcoVue from '@arco-design/web-vue'
import { createPinia } from 'pinia'
import '@arco-design/web-vue/dist/arco.css'
import '@/assets/style/global.less'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(BootstrapVueNext)
app.use(ArcoVue)

app.mount('#app')
