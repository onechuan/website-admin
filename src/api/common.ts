import http from '@/utils/http';

const { post } = http;

export function fetchUploadFile(params) {
  return post<{
    file: string;
  }>('/api/v1/upload/image', params);
}

export default null;
