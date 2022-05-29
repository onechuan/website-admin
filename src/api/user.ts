import http from '@/utils/http';

const { post } = http;

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

