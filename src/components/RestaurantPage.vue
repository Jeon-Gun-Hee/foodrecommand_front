<template>
  <div class="restaurant-page">
    <!-- 상단 배너 이미지 -->
    <div class="image-banner">
      <img src="@/assets/banner.jpg" alt="음식 배너" class="banner-image" />
    </div>

    <!-- 음식 종류 선택 -->
    <h2>맛집 종류 선택</h2>
    <div class="food-categories">
      <!-- 한식 -->
      <div class="food-category">
        <img src="@/assets/korean-food-icon.jpg" alt="한식" class="category-image" />
        <p>한식</p>
      </div>

      <!-- 중식 -->
      <div class="food-category">
        <img src="@/assets/chinese-food-icon.jpg" alt="중식" class="category-image" />
        <p>중식</p>
      </div>

      <!-- 일식 -->
      <div class="food-category">
        <img src="@/assets/japanese-food-icon.jpg" alt="일식" class="category-image" />
        <p>일식</p>
      </div>

      <!-- 양식 -->
      <div class="food-category">
        <img src="@/assets/western-food-icon.jpg" alt="양식" class="category-image" />
        <p>양식</p>
      </div>

      <!-- 치킨 -->
      <div class="food-category">
        <img src="@/assets/chicken-icon.jpg" alt="치킨" class="category-image" />
        <p>치킨</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RestaurantPage",
};
</script>

<style scoped>
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
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
}

.food-category {
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
