import { IUserState } from '@/store/modules/user/types';
import http from '@/utils/http';
import { RouteRecordNormalized } from 'vue-router';

const { post, get } = http;

export interface ILoginParams {
  email: string;
  password: string;
}

export interface ILoginRes {
  token: string;
}

export function fetchLogin(params: ILoginParams) {
  return post<ILoginRes>('/api/v2/user/login', params);
}

export function fetchLogout() {
  return post<ILoginRes>('/api/v1/user/logout');
}

export function fetchUserInfo(){
  return post<IUserState>('/api/v1/user/info');
}

export function fetchMenuList(){
  return post<RouteRecordNormalized[]>('/api/v1/user/menu');
}