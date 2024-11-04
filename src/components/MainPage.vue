<template>
  <div class="main-page">
    <div class="image-banner">
      <img src="@/assets/banner.jpg" alt="음식 배너" class="banner-image"/>
    </div>
    <div class="main-text">
      <h2>추천받고 싶은 음식을 선택해주세요</h2>
    </div>
    <div class="filter-section">
      <h3>필터 선택</h3>
      
      <!-- 필터 그룹을 가로로 정렬 -->
      <div class="filter-groups">
        <!-- 음식 종류 필터 -->
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

        <!-- 가격대 필터 -->
        <div class="filter-group">
          <label for="price">가격대:</label>
          <select v-model="filters.price" id="price" name="price">
            <option value="">모두</option>
            <option value="15000">15,000원 이하</option>
            <option value="30000">30,000원 이하</option>
            <option value="50000">50,000원 이하</option>
          </select>
        </div>

        <!-- 조리 유형 필터 -->
        <div class="filter-group">
          <label for="cooking_type">조리 유형:</label>
          <select v-model="filters.cooking_type" id="cooking_type" name="cooking_type">
            <option value="">모두</option>
            <option value="구이">구이</option>
            <option value="찌개">찌개</option>
            <option value="볶음">볶음</option>
            <option value="밥류">밥류</option>
            <option value="찜류">찜류</option>
            <option value="면류">면류</option>
            <option value="전/부침">전/부침</option>
            <option value="탕/국">탕/국</option>
            <option value="반찬류">반찬류</option>
            <option value="튀김류">튀김류</option>
            <option value="해산물">해산물</option>
            <option value="전골">전골</option>
            <option value="빵류">빵류</option>
          </select>
        </div>

        <!-- 맵기 필터 -->
        <div class="filter-group">
          <label for="spiciness">맵기:</label>
          <select v-model="filters.spiciness" id="spiciness" name="spiciness">
            <option value="">모두</option>
            <option value="순한맛">순한맛</option>
            <option value="매운맛">매운맛</option>
          </select>
        </div>
      </div>

      <!-- 추천 버튼 -->
      <div class="filter-buttons">
        <button class="recommend-button" @click="getFoodRecommendations">추천받기</button>
      </div>

      <!-- 상세설명 -->
      <div class="explain">
        <h3>안내사항</h3>
        <h4>가격대는 1인분을 기준으로 가격을 잡은 것으로 해당음식의 대략적인 평균 가격대입니다.</h4>
        <h4>추천받은 음식의 가격대는 음식점에서 파는 실제 가격과 다를 수 있습니다.</h4>
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
      }
    };
  },
  methods: {
    async getFoodRecommendations() {
      try {
        console.log('필터로 요청 보내기:', JSON.parse(JSON.stringify(this.filters)));
        const response = await axios.post('http://localhost:5001/api/recommend-foods', this.filters);
        const recommendedFoods = response.data.slice(0, 3); // 최대 3개의 추천 음식만 가져옴
        // RecommandPage로 음식 데이터 전달
        this.$router.push({
          name: 'RecommandPage',
          query: { foods: JSON.stringify(recommendedFoods) }
        });
      } catch (error) {
        console.error('음식 추천 중 오류 발생:', error);
      }
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

@font-face {
  font-family: 'Euljiro';
  src: url('../assets/fonts/BMEuljiro10yearslater.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.explain {
  margin-top: 50px;
}

.main-text {
  font-family: 'BMHANNAPRO';
  font-size: 23px;
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

.filter-section {
  font-family: 'BMHANNAPRO';
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  
}

.filter-groups {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap; /* 줄 바꿈을 허용해 화면에 맞게 배치 */
  justify-content: center;
  gap: 20px;
}

.filter-group {
  display: flex;
  align-items: center;
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
  margin-top: 20px;
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
  font-family: 'BMHANNAPRO';
  background-color: #4fc3f7;
  color: white;
  border-radius: 5px;
  
}
</style>
