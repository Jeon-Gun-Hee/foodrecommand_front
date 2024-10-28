<template>
  <div id="app">
    <header>
      <router-link to="/" class="title-link">
        <h1 class="title">Food Choice</h1>
      </router-link>
      <nav>
        <ul class="navbar">
          <li><router-link to="/">음식추천</router-link></li>
          <li><router-link to="/random">랜덤추천</router-link></li>
          <li><router-link to="/restaurant">맛집추천</router-link></li>
          <li><router-link to="/mypage">마이페이지</router-link></li>
        </ul>
        <button @click="handleAuthAction" class="auth-button">
          {{ isLoggedIn ? '로그아웃' : '로그인' }}
        </button>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    ...mapActions(['logout']),
    handleAuthAction() {
      if (this.isLoggedIn) {
        this.kakaoLogout();
      } else {
        this.$router.push('/login');
      }
    },
    kakaoLogout() {
      const REST_API_KEY = 'd5484d5ec247e475a1779d13c83d9fc0'; // 여기에 실제 REST API 키를 입력하세요.
      const LOGOUT_REDIRECT_URI = 'http://localhost:8080'; // 실제 로그아웃 리디렉트 URI를 설정하세요.

      // 카카오 계정과 서비스 로그아웃 요청
      window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`;
    },
  },
};
</script>


<style>

#app {
  font-family: 'Arial', sans-serif;
  text-align: center;
  height: 100%;
  width: 100%;
}

header {
  position: relative;
  border-bottom: 2px solid #e0e0e0;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ff9800;
  margin: 10px;
}

.title-link {
  text-decoration: none;
  color: inherit; /* 링크 색상을 상속받아 글자 색과 동일하게 유지 */
}

.navbar {
  display: flex;
  justify-content: center;
  gap: 100px;
  padding: 20px 0;
  background-color: #b2ebf2;
  list-style-type: none;
  margin: 0;
}

.navbar li {
  display: inline;
}

.navbar a {
  text-decoration: none;
  color: black;
  font-size: 18px;
}

.login-button {
  position: absolute;
  right: 20px;
  top: 10px;
  font-size: 18px;
  color: black;
}

.auth-button{
  position: absolute;
  right: 20px;
  top: 10px;
  font-size: 18px;
  color: black;
}

body {
  margin: 0px;
}

</style>
