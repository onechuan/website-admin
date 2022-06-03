import { createPinia } from 'pinia';
import useUserStore from './modules/user';
import useAppStore from './modules/app';
import useTabBarStore from './modules/tab-bar';
import useArticleStore from './modules/article';

const pinia = createPinia();

export { useUserStore, useAppStore, useTabBarStore, useArticleStore };

export default pinia;
