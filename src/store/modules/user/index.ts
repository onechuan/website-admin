import { defineStore } from 'pinia';
import { fetchLogin, fetchLogout, ILoginParams } from '@/api/user';
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
    // Reset user's information
    resetInfo() {
      this.$reset();
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
