<template>
  <div class="container">
    <img class="logo" src="/src/assets/img/icons/logo.svg" alt="logo" @click="goHome">
    <div>
      <div v-if="authState.isLoggedIn" class="profile-btn" @click="goToNotes">
        <p>{{ userLogin }}</p>
        <img src="/src/assets/img/icons/profile.svg" alt="profile">
        <div class="exit-modal" id="exitModal">
          <div class="exit-modal__text" @click="deleteToken">Выйти</div>
        </div>
      </div>
      <div v-else class="login-btn" @click="$emit('open-modal')">
        <img src="/src/assets/img/icons/login.svg" alt="login">
        Вход
      </div>
    </div>
  </div>
</template>

<script>
import { authState } from '../store/authState';

export default {
  emits: ['open-modal'],
  computed: {
    authState() {
      return authState;
    },
    userLogin() {
      return localStorage.getItem("login");
    }
  },
  methods: {
    goHome() {
      if (this.$route.path === '/') {
        return
      } else {
        this.$router.push('/');
      }
    },
    goToNotes() {
      if (this.$route.path === '/notes') {
        const exitModal = document.querySelector('#exitModal');
          if(exitModal) {
            exitModal.style.display = 'flex';
            document.addEventListener('click', (event) => {
            const profileBtn = document.querySelector('.profile-btn');
            if(profileBtn) {
              if (!profileBtn.contains(event.target)) {
              exitModal.style.display = 'none';
            }
            }
            });
          }
      } else {
        this.$router.push('/notes');
      }
    },
    deleteToken() {
      const token = localStorage.getItem("accessToken");

      fetch("https://dist.nd.ru/api/auth", {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then(response => {
          if (response.status === 200) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("login");
            authState.updateAuthState();
            this.$router.push('/');
          } else {
            console.error(`Ошибка: ${response.status}`);
          }
        })
        .catch(error => {
          console.error("Произошла ошибка:", error);
        });
    },
  }
};
</script>

<style scoped>

  .logo {
    cursor: pointer;
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 0;
    flex: 0;
  }

  .login-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    border-radius: 32px;
    background-color: #B1C909;
    padding: 12px 24px;
    color: #FFF;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 32px;
    cursor: pointer;
  }

  .login-btn:hover {
    background-color: #97AB0D;
  }

  .login-btn:active {
    background-color: #819400;
  }

  .profile-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    color: #FFF;
    font-size: 18px;
    font-weight: 400;
    line-height: 28px;    
    position: relative;
  }

  .profile-btn p,
  .profile-btn img {
    cursor: pointer;
  }
  
  .login-btn img {
    width: 32px;
  }
  
  .exit-modal {
    position: absolute;
    top: 42px;
    right: -38px;
    background-image: url("/src/assets/img/exitModal.png");
    background-size: cover;
    background-repeat: no-repeat;
    height: 189px;
    width: 219px;
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }

  .exit-modal__text {
    color: #B1C909;
    font-size: 18px;
    font-weight: 700;
    line-height: 28px;  
    margin-bottom: 20px;
    cursor: pointer;
  }

  .exit-modal__text:hover {
    color: #FFF;
  }

  @media (max-width: 768px) { 

    .container {
    padding: 20px 0;
   }

    .logo {
      width: 154px;
    }
  }

  @media (max-width: 500px) {
    .profile-btn p {
      display: none;
    }
  }
</style>