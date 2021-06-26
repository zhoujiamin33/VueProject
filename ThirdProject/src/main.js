import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
// import store from "./store"
import router from './router'

// element-ui 引入文件
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

import * as echarts from 'echarts';




const vue = createApp(App).use(ElementPlus).use(VueAxios, axios).use(router).mount('#app')