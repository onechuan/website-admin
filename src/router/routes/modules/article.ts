import { DEFAULT_LAYOUT } from '@/router/constants';

export default {
  path: '/article',
  name: 'article',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.article',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 3,
  },
  children: [
    {
      path: 'list',
      name: 'list',
      component: () => import('@/pages/article/list/index.vue'),
      meta: {
        locale: 'menu.article.list',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    /** simple */
    {
      path: 'add',
      name: 'addArticle',
      component: () => import('@/pages/article/add/index.vue'),
      meta: {
        locale: 'menu.article.add',
        requiresAuth: true,
        roles: ['0'],
      },
    },
  ],
};
