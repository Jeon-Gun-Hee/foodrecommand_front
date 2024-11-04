<template>
  <div class="mypage">
    <div class="image-banner">
      <img src="@/assets/banner2.png" alt="음식 배너" class="banner-image"/>
    </div>
    <div v-if="userProfile" class="profile">
      <img :src="userProfile.profile_image" alt="프로필 이미지" class="profile-image" />
      <p>{{ userProfile.nickname }}님 안녕하세요!</p>
    </div>

    <div class="favorites-container">
      <h3>찜한 식당 목록</h3>
      <div class="favorites-list">
        <div v-for="restaurant in favoriteRestaurants" :key="restaurant.name" class="favorite-item">
          <p><strong>이름:</strong> {{ restaurant.name }}</p>
          <p><strong>주소:</strong> {{ restaurant.address }}</p>
          <button @click="removeFavorite(restaurant)">찜해제</button>
        </div>
      </div>
    </div>
    <!-- 회원 탈퇴 버튼 -->
    <button @click="confirmDeleteAccount" v-if="userProfile" class="delete-account-btn">회원 탈퇴</button>

    <!-- 탈퇴 확인 모달 -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal">
        <h3>회원 탈퇴</h3>
        <p>정말 회원 탈퇴 하시겠습니까?</p>
        <div class="modal-buttons">
          <button @click="deleteAccount" class="yes-btn">예</button>
          <button @click="cancelDeleteAccount" class="no-btn">아니오</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      favoriteRestaurants: [],
      showDeleteModal: false, // 탈퇴 확인 모달 표시 여부
      
    };
  },
  computed: {
    ...mapGetters(['userProfile']),
    userProfile() {
      return this.$store.state.userProfile;
  },
},
  mounted() {
    this.checkLoginStatus(); // 로그인 상태 확인
    this.fetchFavoriteRestaurants();
  },

  methods: {
    checkLoginStatus() {
      if (!this.userProfile) {
        alert("로그인 후 이용 가능합니다.");
        this.$router.push('/login'); // 로그인 페이지로 이동
      }
    },
    async fetchFavoriteRestaurants() {
      if (this.userProfile) {
        try {
          const response = await axios.post('http://localhost:5001/api/get-favorites', {
            email: this.userProfile.email,
          });
          this.favoriteRestaurants = response.data;
        } catch (error) {
          console.error("찜한 식당 목록을 불러오는 중 오류가 발생했습니다:", error);
        }
      }
    },
    async removeFavorite(restaurant) {
      try {
        await axios.post('http://localhost:5001/api/remove-favorite', {
          email: this.userProfile.email,
          restaurant: {
            name: restaurant.name,
            address: restaurant.address,
          },
        });
        this.favoriteRestaurants = this.favoriteRestaurants.filter(
          (fav) => fav.name !== restaurant.name
        );
        alert(`${restaurant.name}이(가) 찜 목록에서 제거되었습니다.`);
      } catch (error) {
        console.error("찜 목록에서 제거하는 중 오류가 발생했습니다:", error);
      }
    },

    ...mapActions(['logout']),
    confirmDeleteAccount() {
      this.showDeleteModal = true;
    },
    cancelDeleteAccount() {
      this.showDeleteModal = false;
    },
    async deleteAccount() {
      try {
        // 데이터베이스에서 사용자 삭제
        await axios.delete('http://localhost:5001/api/delete-account', {
          data: { email: this.userProfile.email },
        });
        
        // 카카오 계정과 웹 서비스에서 로그아웃 요청
        const REST_API_KEY = 'd5484d5ec247e475a1779d13c83d9fc0'; // 본인의 REST API 키로 변경
        const LOGOUT_REDIRECT_URI = 'http://localhost:8080'; // 실제 로그아웃 리디렉트 URI 설정
        this.logout(); // 웹 서비스 로그아웃 처리
        alert('회원 탈퇴가 완료되었습니다.');

        // 카카오 로그아웃 페이지로 리디렉트
        window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`;
      } catch (error) {
        console.error(error);
        alert('회원 탈퇴 중 오류가 발생했습니다.');
      } finally {
        this.showDeleteModal = false;
      }
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

.image-banner {
  width: 100%;
  display: flex;
  justify-content: center;
}

.banner-image {
  width: 100%;
  height: auto;
}

.mypage {
  text-align: center;
}
.profile {
  margin-top: 20px;
  font-family: 'BMHANNAPRO';
}
.profile-image {
  margin-top:20px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.delete-account-btn {
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  border-radius: 5px;
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

.favorites-container {
  font-family: 'BMHANNAPRO';
  margin-top: 20px;
  text-align: left;
  padding: 0px 300px;
}
.favorites-list {
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
}
.favorite-item {
  min-width: 200px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-right: 10px;
  background-color: #f9f9f9;
  text-align: center;
}
.favorite-item p {
  margin: 5px 0;
}
.favorite-item button {
  margin-top: 5px;
  background-color: #ff9800;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
