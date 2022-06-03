import { IArticle } from '@/store/modules/article/types';
import http from '@/utils/http';

const { post } = http;

export interface IAddArticleParams {
  title: string;
  content: string;
  author: string;
  cover: string;
  desc: string;
  tags: string[];
  category: string;
}

export interface IAddArticleRes {
  msg: string;
}

export function fetchAddArticle(params: IAddArticleParams) {
  return post<IAddArticleRes>('/api/v1/article/add', params);
}

export interface IArticleListParams {
  curPage: number;
  total: number;
}

export function fetchArticleList(params: IArticleListParams) {
  return post<{
    articleList: IArticle[];
  }>('/api/v1/article/list', params);
}
