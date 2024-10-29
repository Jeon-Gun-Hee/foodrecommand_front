<template>
  <div class="restaurant-page">
    <!-- 상단 배너 이미지 -->
    <div class="image-banner">
      <img src="@/assets/banner.jpg" alt="음식 배너" class="banner-image" />
    </div>
    
    <!-- 음식 종류 선택 -->
     <div class="main-text">
    <h2>음식 종류 선택</h2>
    </div>
    <div class="food-categories">
      <!-- 상단에 위치할 카테고리 -->
      <div class="category-row">
        <div class="food-category" @click="goToRestaurantMap('한식')">
          <img src="@/assets/korean-food-icon.jpg" alt="한식" class="category-image" />
          <p>한식</p>
        </div>

        <div class="food-category" @click="goToRestaurantMap('중식')">
          <img src="@/assets/chinese-food-icon.jpg" alt="중식" class="category-image" />
          <p>중식</p>
        </div>

        <div class="food-category" @click="goToRestaurantMap('일식')">
          <img src="@/assets/japanese-food-icon.jpg" alt="일식" class="category-image" />
          <p>일식</p>
        </div>

        <div class="food-category" @click="goToRestaurantMap('양식')">
          <img src="@/assets/western-food-icon.jpg" alt="양식" class="category-image" />
          <p>양식</p>
        </div>

        <div class="food-category" @click="goToRestaurantMap('치킨')">
          <img src="@/assets/chicken-icon.jpg" alt="치킨" class="category-image" />
          <p>치킨</p>
        </div>
      </div>

      <!-- 하단에 위치할 카테고리 -->
      <div class="category-row">
        <div class="food-category" @click="goToRestaurantMap('피자')">
          <img src="@/assets/pizza-icon.jpg" alt="피자" class="category-image" />
          <p>피자</p>
        </div>

        <div class="food-category" @click="goToRestaurantMap('분식')">
          <img src="@/assets/snack-food-icon.jpg" alt="분식" class="category-image" />
          <p>분식</p>
        </div>

        <div class="food-category" @click="goToRestaurantMap('디저트')">
          <img src="@/assets/dessert-icon.jpg" alt="디저트" class="category-image" />
          <p>디저트</p>
        </div>

        <div class="food-category" @click="goToRestaurantMap('해산물')">
          <img src="@/assets/seafood-icon.jpg" alt="해산물" class="category-image" />
          <p>해산물</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RestaurantPage",
  methods: {
    goToRestaurantMap(category) {
      this.$router.push({ name: 'RestaurantMap2', query: { food: category } });
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

.restaurant-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

h2 {
  font-size: 2rem;
  font-weight: bold;
  margin: 30px 0;
}

.food-categories {
  display: flex;
  flex-direction: column;
  gap: 20px; /* 카테고리 그룹 간 간격 */
}

.category-row {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.food-category {
  font-family: 'BMHANNAPRO';
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.category-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.food-category p {
  font-size: 1.5rem;
  margin-top: 10px;
  text-align: center;
}
</style>
