import localeWorkplace from '@/pages/dashboard/workplace/locale/zh-CN';
import localeUser from '@/pages/user/locale/zh-CN';
import localeUserSetting from '@/pages/setting/locale/zh-CN';
import localeArticle from '@/pages/article/list/locale/zh-CN';
import localeArticleAdd from '@/pages/article/add/locale/zh-CN';

import localeSettings from './settings';

export default {
  'menu.dashboard': '仪表盘',
  'menu.server.dashboard': '仪表盘-服务端',
  'menu.server.workplace': '工作台-服务端',
  'menu.server.monitor': '实时监控-服务端',
  'menu.user': '个人中心',
  'menu.article': '文章管理',
  ...localeSettings,
  ...localeWorkplace,
  ...localeUser,
  ...localeUserSetting,
  ...localeArticle,
  ...localeArticleAdd,
};
