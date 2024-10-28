<template>
  <div class="random-page">
    <div class="image-banner">
      <img src="@/assets/banner.jpg" alt="음식 배너" class="banner-image" />
    </div>
    <h2>랜덤으로 음식을 추천해드려요!</h2>
    <div class="random-recommend-section">
      <img src="@/assets/cloche.jpg" alt="음식 추천" class="cloche-image" />
      <button class="random-button" @click="getRandomRecommendation">랜덤추천받기</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async getRandomRecommendation() {
      try {
        const response = await fetch('http://localhost:5001/api/random-food');
        const randomFood = await response.json();

        // RecommandPage2.vue로 랜덤 음식 전달 (query 사용)
        this.$router.push({ name: 'RecommandPage2', query: { food: JSON.stringify(randomFood) } });
      } catch (error) {
        console.error('랜덤 추천 실패:', error);
      }
    },
  },
};
</script>
  
  <style scoped>
  .random-page {
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
  
  .random-recommend-section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .cloche-image {
    width: 400px;
    height: 300px;
  }
  
  .random-button {
    margin-top: 20px;
    padding: 15px 30px;
    background-color: #ff9800;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 18px;
    cursor: pointer;
  }
  
  .random-button:hover {
    background-color: #e68900;
  }
  </style>
  