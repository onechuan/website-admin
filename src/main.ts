import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from './App.vue';
import router from './router/index';
import pinia from './store';
import i18n from './locale';

import './assets/css/reset.css';
import 'element-plus/dist/index.css';
import './assets/css/global.scss';

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(ElementPlus);
app.use(i18n);

app.mount('#app');
