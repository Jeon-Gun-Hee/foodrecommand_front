<template>
  <div id="app">
    <header>
      <router-link to="/" class="title-link">
        <h1 class="title">Food Choice</h1>
      </router-link>
      <nav>
        <ul class="navbar">
          <li><router-link to="/">음식추천</router-link></li>
          <li><router-link to="/random">랜덤추천</router-link></li> <!-- 랜덤 추천 추가 -->
          <li><router-link to="/restaurant">맛집추천</router-link></li>
          <li><router-link to="/mypage">마이페이지</router-link></li>
        </ul>
        <router-link to="/login" class="login-button">로그인</router-link>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
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

body {
  margin: 0px;
}

</style>
