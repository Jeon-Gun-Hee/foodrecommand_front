<template>
  <div class="recommand-page">
    <div class="image-banner">
      <img src="@/assets/banner.jpg" alt="음식 배너" class="banner-image" />
    </div>
    <div class="main-text">
      <h2>랜덤으로 추천된 음식</h2>
    </div>
    <div class="food-item" v-if="recommendedFood" @click="goToRestaurantMap(recommendedFood.음식)">
      <img :src="recommendedFood['이미지 URL']" alt="음식 이미지" class="food-image" />
      <p class="food-name">{{ recommendedFood.음식 }}</p>
      <button @click.stop="getNewRandomRecommendation" class="re-recommend-button">재추천하기</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recommendedFood: null
    };
  },
  created() {
    this.fetchRandomFood();
  },
  methods: {
    async fetchRandomFood() {
      try {
        const response = await fetch('http://localhost:5001/api/random-food');
        this.recommendedFood = await response.json();
      } catch (error) {
        console.error('랜덤 추천 실패:', error);
      }
    },
    getNewRandomRecommendation() {
      this.fetchRandomFood();
    },
    goToRestaurantMap(foodName) {
      this.$router.push({ name: 'RestaurantMap', query: { food: foodName } });
    }
  }
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
  font-size: 20px;
  font-weight: lighter;
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

.recommand-page {
  text-align: center;
}

.food-item {
  display: inline-block;
  text-align: center;
  margin: 10px;
  cursor: pointer; /* 클릭 가능 표시 */
}

.food-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
}

.food-name {
  font-family: 'BMHANNAPRO';
  font-size: 20px;
  margin-top: 10px;
}

.re-recommend-button {
  font-family: 'BMHANNAPRO';
  margin-top: 15px; /* 음식 이름 아래에 위치 */
  padding: 10px 20px;
  background-color: #ff9800;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.re-recommend-button:hover {
  background-color: #e68900;
}
</style>
