<template>
  <div class="recommand-page">
    <div class="image-banner">
      <img src="@/assets/banner.jpg" alt="음식 배너" class="banner-image" />
    </div>
    <div class="main-text"><h2>오늘의 추천 음식</h2></div>
    <div v-if="recommendedFoods.length > 0" class="recommended-foods">
      <div 
        v-for="food in recommendedFoods" 
        :key="food.음식" 
        class="food-item" 
        @click="goToRestaurantMap(food.음식)"
      >
        <img :src="food['이미지 URL']" :alt="food.음식" class="food-image" />
        <p>{{ food.음식 }}</p>
      </div>
    </div>
    <div v-else>
      <p>추천할 음식이 없습니다.</p>
    </div>
    <h3 class="rerecommand">추천음식을 먹을 수 있는 주변 식당을 검색하고 싶다면 음식사진을 클릭해주시기 바랍니다.</h3>
    <button class="rerecommand" @click="goToMainPage">다시 추천받기</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recommendedFoods: []
    };
  },
  created() {
    const foodsQuery = this.$route.query.foods;
    if (foodsQuery) {
      this.recommendedFoods = JSON.parse(foodsQuery);
    }
  },
  methods: {
    goToMainPage() {
      this.$router.push({ name: 'MainPage' });
    },
    goToRestaurantMap(foodName) {
      // RestaurantMap.vue로 이동하면서 음식 이름을 전달
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

  .rerecommand {
    font-family: 'BMHANNAPRO';
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
  margin-bottom: 20px;
}

.banner-image {
  width: 100%;
  height: auto;
}

.recommand-page {
  text-align: center;
}

.recommended-foods {
  font-family:  'BMHANNAPRO';
  display: flex;
  justify-content: center;
  gap: 50px; /* 간격을 50px로 조정 */
}

.food-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.food-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff9800;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #e68900;
}
</style>
