import type { AxiosInstance } from 'axios';
import axios from 'axios';

// 環境変数の読み込みは初回のみ行う
const baseURL = process.env['API_URL'] || '/';

let instance: AxiosInstance | null = null;
const createAxiosInstance = () => {
  if (instance) return instance;

  instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return instance;
};

export const apiClient = createAxiosInstance();
