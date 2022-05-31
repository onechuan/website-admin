import type { RouteRecordRaw } from 'vue-router';

// globEager 导入,匹配到的文件默认是懒加载的，通过动态导入实现，并会在构建时分离为独立的 chunk。
const modules = import.meta.globEager('./modules/*.ts');
// 会被vite进行转义成
// import * as __glob__0_0 from './dir/foo.js'
// import * as __glob__0_1 from './dir/bar.js'
// const modules = {
//   './dir/foo.js': __glob__0_0,
//   './dir/bar.js': __glob__0_1
// }

const appRoutes: RouteRecordRaw[] = [];
Object.keys(modules).forEach((key) => {
  const defaultModule = modules[key].default;
  // 判断模块是否存在
  if (!defaultModule) return;
  const moduleList = Array.isArray(defaultModule)
    ? [...defaultModule]
    : [defaultModule];
  appRoutes.push(...moduleList);
});

// for (const path in modules) {
//     modules[path]().then((mod) => {
//       console.log(path, mod)
//     })
//   }

export default appRoutes;
