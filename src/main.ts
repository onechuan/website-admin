import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from './App.vue';
import router from './router/index';

import './assets/css/reset.css';
import 'element-plus/dist/index.css';

createApp(App).use(router).use(ElementPlus).mount('#app');
