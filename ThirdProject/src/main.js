import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
// import store from "./store"
import router from './router'

const vue = createApp(App).use(ElementPlus).use(VueAxios, axios).use(router).mount('#app')