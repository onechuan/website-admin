import { defineStore } from 'pinia';
import {
  fetchLogin,
  fetchLogout,
  fetchUserInfo,
  ILoginParams,
} from '@/api/user';
import { clearToken, setToken } from '@/utils/token';
import { IUserState } from './types';

const useUserStore = defineStore('user', {
  // 数据状态
  state: (): IUserState => ({
    name: undefined,
    avatar: undefined,
    email: undefined,
    role: 0,
  }),
  // 计算属性
  getters: {
    userInfo(state: IUserState): IUserState {
      return { ...state };
    },
  },
  // 行为
  actions: {
    // 设置用户信息 Partial作用是将interface中的所有属性变成可选参数
    setInfo(partial: Partial<IUserState>) {
      this.$patch(partial);
    },

    // 获取用户信息
    async info() {
      const res = await fetchUserInfo();
      this.setInfo(res.data);
    },
    // Reset user's information
    resetInfo() {
      this.$reset();
    },
    // Login
    async login(loginForm: ILoginParams) {
      try {
        const res = await fetchLogin(loginForm);
        setToken(res.data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    // Logout
    async logout() {
      await fetchLogout();
      this.resetInfo();
      clearToken();
    },
  },
});

export default useUserStore;
