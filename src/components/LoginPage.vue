<template>
  <div class="login-page">
    <h1>카카오톡 로그인</h1>

    <!-- 로그인 상태에 따라 버튼과 메시지를 변경 -->
    <div v-if="!isLoggedIn">
      <button id="kakao-login-btn" @click="kakaoLogin">카카오 로그인</button>
    </div>

    <div v-else>
      <p>환영합니다, {{ user.nickname }}님!</p>
      <button @click="logout">로그아웃</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isLoggedIn: false, // 로그인 상태
      user: null, // 로그인된 사용자 정보
    };
  },
  mounted() {
    this.loadKakaoSDK(); // 카카오 SDK 로드
  },
  methods: {
    loadKakaoSDK() {
      if (!window.Kakao) {
        const script = document.createElement('script');
        script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
        script.onload = () => {
          window.Kakao.init('eb9ca0d8ebadeebe7b5674e70ceb4116'); // 카카오 JavaScript 키 입력
        };
        document.head.appendChild(script);
      }
    },
    kakaoLogin() {
      window.Kakao.Auth.login({
        success: (authObj) => {
          // 카카오 로그인 성공 시, 백엔드로 access_token 전송
          this.handleLogin(authObj.access_token);
        },
        fail: (err) => {
          console.error('카카오 로그인 실패', err);
        },
      });
    },
    async handleLogin(accessToken) {
      try {
        const response = await axios.post('http://localhost:5000/api/kakao-login', {
          accessToken,
        });

        if (response.data.isNewUser) {
          // 신규 사용자일 경우 회원가입 페이지로 이동
          this.$router.push({ name: 'SignUpPage', params: { user: response.data.user } });
        } else {
          // 기존 사용자일 경우 로그인 처리
          this.user = response.data.user;
          this.isLoggedIn = true;
        }
      } catch (error) {
        console.error('로그인 처리 중 오류:', error);
      }
    },
    logout() {
      this.isLoggedIn = false;
      this.user = null;
      window.Kakao.Auth.logout();
    },
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

button {
  margin-top: 20px;
}
</style>
