<template>
  <div class="main-page">
    <div class="image-banner">
      <img src="@/assets/banner.jpg" alt="음식 배너" class="banner-image"/>
    </div>

    <h2>추천받고 싶은 음식을 선택해주세요</h2>

    <div class="filter-section">
      <h3>필터 선택</h3>
      
      <div class="filter-group">
        <label for="category">음식 종류:</label>
        <select v-model="filters.category" id="category" name="category">
          <option value="">모두</option>
          <option value="한식">한식</option>
          <option value="일식">일식</option>
          <option value="중식">중식</option>
          <option value="양식">양식</option>
          <option value="분식">분식</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="price">가격대:</label>
        <select v-model="filters.price" id="price" name="price">
          <option value="">모두</option>
          <option value="15000">15,000원 이하</option>
          <option value="30000">30,000원 이하</option>
          <option value="50000">50,000원 이하</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="cooking_type">조리 유형:</label>
        <select v-model="filters.cooking_type" id="cooking_type" name="cooking_type">
          <option value="">모두</option>
          <option value="구이">구이</option>
          <option value="찌개">찌개</option>
          <option value="볶음">볶음</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="spiciness">맵기:</label>
        <select v-model="filters.spiciness" id="spiciness" name="spiciness">
          <option value="">모두</option>
          <option value="순한맛">순한맛</option>
          <option value="매운맛">매운맛</option>
        </select>
      </div>

      <div class="filter-buttons">
        <button class="recommend-button" @click="getFoodRecommendations">추천받기</button>
      </div>
    </div>

    <div class="recommendation-section" v-if="recommendedFoods.length">
      <h2>오늘의 추천 음식</h2>
      <div class="recommended-foods">
        <div v-for="food in recommendedFoods" :key="food.음식" class="food-item">
          <img :src="food['이미지 URL']" :alt="food.음식" class="food-image" />
          <p>{{ food.음식 }} - {{ food.가격대 }}원</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      filters: {
        category: '',
        price: '',
        cooking_type: '',
        spiciness: ''
      },
      recommendedFoods: []
    };
  },
  methods: {
    async getFoodRecommendations() {
      try {
        console.log('필터로 요청 보내기:', JSON.parse(JSON.stringify(this.filters)));
        const response = await axios.post('http://localhost:5001/api/recommend-foods', this.filters);
        console.log('받은 음식 추천:', response.data);
        this.recommendedFoods = response.data.slice(0, 3); // 최대 3개의 추천 음식만 표시
      } catch (error) {
        console.error('음식 추천 중 오류 발생:', error);
      }
    }
  }
};
</script>

<style scoped>
.image-banner {
  width: 100%;
  display: flex;
  justify-content: center;
}

.banner-image {
  width: 100%;
  height: auto;
}

.filter-section {
  margin-top: 40px;
}

.filter-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-right: 10px;
}

select {
  padding: 10px;
  font-size: 16px;
}

.filter-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  padding: 10px 20px;
  background-color: #b2ebf2;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #80deea;
}

.recommend-button {
  background-color: #4fc3f7;
  color: white;
}

.recommendation-section {
  margin-top: 20px;
}

.recommendation-section img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>
