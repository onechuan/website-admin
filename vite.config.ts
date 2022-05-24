import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
    },
  },
  base: './', //设置打包路径
  server: {
    port: 8001, //设置服务启动端口号
    open: true, //自动打开浏览器
    cors: true, //允许跨域

    // 配置代理
    proxy: {
      '/api': {
        target:
          'https://www.fastmock.site/mock/529b7481979b1b6705e49a40a9d65be5/blog',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
