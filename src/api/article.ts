import { IArticle } from '@/store/modules/article/types';
import http from '@/utils/http';

const { post, get } = http;

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

export function fetchAddArticle(
  params: IAddArticleParams
): Promise<IAddArticleRes> {
  return post('/api/v1/article/add', params);
}

export interface IArticleListParams {
  curPage: number;
  size: number;
}

export function fetchArticleList(params: IArticleListParams) {
  return post<{
    articleList: IArticle[];
    size: number;
    total: number;
    curPage: number;
  }>('/api/v1/article/list', params);
}

export function fetchArticlePreview(params: any) {
  return get<IArticle>('/article/preview', params);
}
