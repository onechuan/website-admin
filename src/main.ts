import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from './App.vue';
import router from './router/index';
import pinia from './store';

import './assets/css/reset.css';
import 'element-plus/dist/index.css';

createApp(App).use(router).use(pinia).use(ElementPlus).mount('#app');
