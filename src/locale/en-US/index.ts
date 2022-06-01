/** simple end */
import localeWorkplace from '@/pages/dashboard/workplace/locale/en-US';
import localeUser from '@/pages/user/locale/en-US';
import localeUserSetting from '@/pages/setting/locale/en-US';
import localeArticle from '@/pages/article/list/locale/en-US';
import localeArticleAdd from '@/pages/article/add/locale/en-US';

import localeSettings from './settings';

export default {
  'menu.dashboard': 'Dashboard',
  'menu.server.dashboard': 'Dashboard-Server',
  'menu.server.workplace': 'Workplace-Server',
  'menu.server.monitor': 'Monitor-Server',
  'menu.user': 'User Center',
  'menu.article': 'Article Center',
  ...localeSettings,
  ...localeWorkplace,
  ...localeUser,
  ...localeUserSetting,
  ...localeArticle,
  ...localeArticleAdd,
};
