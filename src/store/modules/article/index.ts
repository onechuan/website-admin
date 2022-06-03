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
  }),
  // 计算属性
  getters: {},
  // 行为
  actions: {
    // 获取文章列表数据
    async getArticleList(params: IArticleListParams) {
      const res = await fetchArticleList(params);
      this.articleList = res.data.articleList;
    },
    // 新增文章
    async postArticleAdd(params: IAddArticleParams) {
      const res = await fetchAddArticle(params);
      console.log('提交成功', res);
    },
  },
});


export default useArticleStore;