import { reactive } from 'vue';

export const authState = reactive({
  isLoggedIn: !!localStorage.getItem('accessToken'),
  userLogin: localStorage.getItem('login'),
  updateAuthState() {
    this.isLoggedIn = !!localStorage.getItem('accessToken');
    this.userLogin = localStorage.getItem('login');
  }
});