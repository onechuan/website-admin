import { defineStore } from 'pinia';

import {
  fetchAddArticle,
  fetchArticleList,
  IArticleListParams,
  IAddArticleParams,
} from '@/api/article';
import { IArticleState } from './types';

const useArticleStore = defineStore('article', {
  // 数据状态
  state: (): IArticleState => ({
    articleList: [],
    pageOptions: {
      size: 0,
      total: 0,
      curPage: 0,
    },
  }),
  // 计算属性
  getters: {},
  // 行为
  actions: {
    // 获取文章列表数据
    async getArticleList(params: IArticleListParams) {
      const res = await fetchArticleList(params);
      console.log('res', res);

      const { articleList, size, total, curPage } = res.data;

      this.articleList = articleList;
      this.size = size;
      this.total = total;
      this.curPage = curPage;
    },
    // 新增文章
    async postArticleAdd(params: IAddArticleParams) {
      const res = await fetchAddArticle(params);
      console.log('提交成功', res);
    },
  },
});

export default useArticleStore;
