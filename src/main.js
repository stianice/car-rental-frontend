import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'bootstrap'
import '@arco-design/web-vue/dist/arco.css'
import '@/assets/style/global.less'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVueNext from 'bootstrap-vue-next'
import ArcoVue from '@arco-design/web-vue'
import { createPinia } from 'pinia'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(BootstrapVueNext)
app.use(ArcoVue)
app.use(ArcoVueIcon)

app.mount('#app')
