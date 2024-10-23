<template>
  <div class="recommand-page">
    <h2>오늘의 추천 음식</h2>
    <div v-if="recommendedFoods.length > 0" class="recommended-foods">
      <div v-for="food in recommendedFoods" :key="food.음식" class="food-item">
        <img :src="food['이미지 URL']" :alt="food.음식" class="food-image" />
        <p>{{ food.음식 }} - {{ food.가격대 }}원</p>
      </div>
    </div>
    <div v-else>
      <p>추천할 음식이 없습니다.</p>
    </div>
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
  }
};
</script>

<style scoped>
.food-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.food-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.recommended-foods {
  display: flex;
  justify-content: space-around;
}
</style>
