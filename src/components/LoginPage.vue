<template>
  <div class="login-page">
    <div class="image-banner">
      <img src="@/assets/banner.jpg" alt="음식 배너" class="banner-image"/>
    </div>
    <div class="main-text"><h2>카카오톡 간편로그인으로 시작할 수 있습니다.</h2></div>
    
    <div class="login-box">
      <button @click="kakaoLogin" class="kakao-login-btn">카카오톡 간편 로그인</button>
    </div>
    
    <!-- 회원가입 모달 -->
    <div v-if="showSignupModal" class="modal-overlay">
      <div class="modal">
        <h3>등록되지 않은 회원입니다.</h3>
        <p>카카오 계정으로 간편 회원가입 하시겠습니까?</p>
        <div class="modal-buttons">
          <button @click="confirmSignup" class="yes-btn">예</button>
          <button @click="cancelSignup" class="no-btn">아니오</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    return { store };
  },
  data() {
    return {
      KAKAO_JS_KEY: 'eb9ca0d8ebadeebe7b5674e70ceb4116',
      showSignupModal: false,
      userInfo: null,
    };
  },
  mounted() {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(this.KAKAO_JS_KEY);
    }
  },
  methods: {
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: 'profile_nickname, account_email, profile_image',
        success: async () => {
          try {
            const userInfo = await window.Kakao.API.request({
              url: '/v2/user/me',
            });

            const email = userInfo.kakao_account.email;
            const nickname = userInfo.kakao_account.profile.nickname;
            const profile_image = userInfo.kakao_account.profile.profile_image_url;

            const response = await axios.post('http://localhost:5001/api/login', { email });

            if (response.data.isRegistered) {
              this.store.dispatch('login', { email, nickname, profile_image });
              alert('로그인되었습니다.');
              this.$router.push('/'); // 로그인 후 메인 페이지로 이동
            } else {
              this.userInfo = { email, nickname, profile_image };
              this.showSignupModal = true;
            }
          } catch (error) {
            console.error(error);
            alert('로그인 중 오류가 발생했습니다.');
          }
        },
        fail: (error) => {
          console.error(error);
          alert('카카오 로그인에 실패했습니다.');
        },
      });
    },
    async confirmSignup() {
      try {
        await axios.post('http://localhost:5001/api/signup', this.userInfo);
        this.store.dispatch('login', this.userInfo);
        alert('회원가입이 완료되었습니다!');
        this.$router.push('/'); // 회원가입 후 메인 페이지로 이동
      } catch (error) {
        console.error(error);
        alert('회원가입 중 오류가 발생했습니다.');
      } finally {
        this.showSignupModal = false;
      }
    },
    cancelSignup() {
      this.showSignupModal = false;
    },
  },
};
</script>






<style scoped>
@font-face {
  font-family: 'BMHANNAPRO';
  src: url('../assets/fonts/BMHANNAPro.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.main-text {
  font-family: 'BMHANNAPRO';
  font-size: 15px;
  font-weight: lighter;
  margin-top:20px;
}

.login-box {
  position: relative;
  width: 300px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFFFFF;
  border: 3px solid #EF9B13;
  border-radius: 20px;
  box-sizing: border-box;
  margin-top: 20px; /* 상자의 위치를 조정 */
}

.image-banner {
  width: 100%;
  display: flex;
  justify-content: center;
}

.banner-image {
  width: 100%;
  height: auto;
}






.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.kakao-login-btn {
  
  background-color: #FEE500;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 300px;
}
.modal-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.yes-btn, .no-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.yes-btn {
  background-color: #4CAF50;
  color: white;
}
.no-btn {
  background-color: #f44336;
  color: white;
}
</style>
