import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
import { getToken } from './token';

export interface HttpResponse<T = unknown> {
  status: number;
  msg: string;
  code: number;
  data: T;
}

const instance = axios.create({
  baseURL:
    'https://www.fastmock.site/mock/529b7481979b1b6705e49a40a9d65be5/blog',
  timeout: 5000,
});

// Add a request interceptor
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Do something before request is sent
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    ElMessage.error('bed request');
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const res = response.data;
    if (res.code !== 20000) {
      ElMessage.error(res.msg || 'Error');
    }
    return res;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    ElMessage.error(error.msg || 'Error');
    return Promise.reject(error);
  }
);

export default instance;
