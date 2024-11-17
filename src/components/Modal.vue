<template>
  <div v-if="isVisible" class="modal-overlay">
      <div class="modal">

        <button @click="closeModal" class="close-modal-btn">
          <img src="/src/assets/img/icons/cross.svg" alt="close modal">
        </button>

        <h2 class="form-header">{{ isLogin ? "Вход в ваш аккаунт" : "Регистрация" }}</h2>

        <form class="form"id="authForm" @submit.prevent="handleSubmit">

          <div class="input-container">
            <label for="email">Email</label>
            <input v-model="email" type="email" id="email" placeholder="Введите значение" required />
          </div>

          <div class="input-container">
            <label for="password">Пароль</label>
            <input v-model="password" type="password" id="password" placeholder="Введите пароль" required />
          </div>

          <div class="input-container" v-if="!isLogin">
            <label for="repeatPassword">Пароль ещё раз</label>
            <input v-model="repeatPassword" type="password" id="repeatPassword" placeholder="Повторите пароль" required />
          </div>

        </form>
        
        <div class="auth-controls-container">
          <div class="auth-type-change-container">
            <p class="auth-type-change" @click="toggleMode">
            {{ isLogin ? "У вас нет аккаунта?" : "У вас есть аккаунт?" }}
            </p>
            <p class="auth-type-change-btn" @click="toggleMode">
              {{ isLogin ? "Зарегистрируйтесь" : "Войдите" }}
            </p>
          </div>
          <button class="auth-send-btn" form="authForm" type="submit">{{ isLogin ? "Войти" : "Зарегистрироваться" }}</button>
        </div>
        
        <div class="message" id="message">{{ message }}</div>
        
      </div>
  </div>
</template>

<script>
import { authState } from '../store/authState';

export default {
  props: {
    isVisible: Boolean,
  },
  data() {
    return {
      isLogin: true,
      email: "",
      password: "",
      repeatPassword: "",
      message: ""
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    toggleMode() {
      this.isLogin = !this.isLogin;
      this.clearForm();
    },
    clearForm() {
      this.email = "";
      this.password = "";
      this.repeatPassword = "";
      this.message = "";
      const messageBlock = document.querySelector('#message');
      messageBlock.style.display = "none";
    },
    handleSubmit() {
      const messageBlock = document.querySelector('#message');
      if (this.isLogin) {
        fetch('https://dist.nd.ru/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password })
        })
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 400) {
            messageBlock.style.display = "flex";
            this.message = "Ошибка запроса";
          } else if (response.status === 404) {
            messageBlock.style.display = "flex";
            this.message = "Неправильный логин или пароль";
          }
        })
        .then(data => {
          if (data && data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("login", this.email);
            authState.updateAuthState();
            this.$router.push('/notes');
            this.closeModal();
          }
        })
        .catch(error => console.error("Ошибка:", error));
      } else {
      if (this.password !== this.repeatPassword) {
      } else {
        fetch('https://dist.nd.ru/api/reg', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            confirm_password: this.repeatPassword
          })
        })
        .then(response => {
          if (response.status === 200) {
            this.toggleMode()
            messageBlock.style.display = "flex";
            this.message = "Регистрация упешна! Авторизуйтесь";
            // TODO: green color for success message
          } else if (response.status === 400) {
            messageBlock.style.display = "flex";
            this.message = "Ошибка запроса";
          } else if (response.status === 409) {
            messageBlock.style.display = "flex";
            this.message = "Пользователь с таким email уже зарегистрирован";
          }
        })
        .catch(error => console.error("Ошибка:", error));
      }
      }
    }
  }
};
</script>

<style>

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100% - 80px);
    height: 100%;
    background: rgba(10, 31, 56, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 40px;
  }

  .modal {
    position: relative;
    display: flex;
    width: 620px;
    padding: 80px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 40px;
    border-radius: 40px;
    background: #1B2F46;
  }

  .form-header {
    color: #FFF;
    font-size: 48px;
    font-weight: 600;
    line-height: 72px;
    padding-right: 60px;
  }

  .form {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-direction: column;
    gap: 24px;
  }

  .input-container {
    display: flex;
    justify-content: space-between;
    align-items: start;
    flex-direction: column;
    gap: 8px;
  }

  .input-container label {
    margin-left: 24px;
    color: #9DA5AF;
    font-size: 18px;
    font-weight: 400;
    line-height: 28px;
  }

  .input-container input {
    width: calc(100% - 56px);
    height: 72px;
    padding: 0 28px;
    border-radius: 36px;
    background: #FFF;
    border: none;
  }

  .auth-controls-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 10px;
  }

  .auth-type-change-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 18px;
    line-height: 28px;
  }

  .auth-type-change {
    color: #9DA5AF;
    font-weight: 400;
    margin-right: 4px ;
  }

  .auth-type-change-btn {
    color: #B1C909;
    font-weight: 700;
    cursor: pointer;
  }

  .auth-type-change-btn:hover {
    color: #FFF;
  }

  .auth-send-btn {
    font-size: 20px;
    font-weight: 500;
    line-height: 32px;
    color: #FFF;
    display: flex;
    height: 56px;
    padding: 0px 24px;
    justify-content: center;
    align-items: center;
    border-radius: 32px;
    background: #B1C909;
    cursor: pointer;
  }

  .auth-send-btn:hover {
    background-color: #97AB0D;
  }

  .auth-send-btn:active {
    background-color: #819400;
  }

  .close-modal-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 56px;
    height: 56px;
    border-radius: 32px;
    background: #B1C909;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
  }

  .close-modal-btn:hover {
    background-color: #97AB0D;
  }

  .close-modal-btn:active {
    background-color: #819400;
  }

  .message {
    display: none;
    justify-content: start;
    align-items: center;
    padding: 8px 20px;
    border-radius: 24px;
    background: rgba(255, 116, 97, 0.10);
    color: #FF7461;
    font-size: 18px;
    font-weight: 400;
    line-height: 28px;
    width: calc(100% - 40px);
    margin-top: -20px;
  }
  

  @media (max-width: 1366px) { 
    .modal {
      padding: 56px;
    }
  }

  @media (max-width: 705px) { 

    .auth-controls-container {
      flex-direction: column-reverse;
      gap: 12px;
    }

    .auth-send-btn {
      width: 100%;
    }

  }

  @media (max-width: 575px) { 
    .modal-overlay {
      width: calc(100% - 8px);
      height: calc(100% - 8px);
      padding: 4px;
    }

    .modal {
      gap: 28px;
      padding: 42px 16px 24px;
    }

    .form-header {
      font-size: 32px;
      line-height: 36px
    }

    #authForm {
    gap: 16px;
    }

    .auth-type-change-container {
      font-size: 14px;
      line-height: 24px;
    }

    .close-modal-btn {
      top: 12px;
      right: 12px;
    }
  }

</style>