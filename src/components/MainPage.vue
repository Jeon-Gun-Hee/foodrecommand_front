<template>
    <div class="main-page">
      <div class="image-banner">
        <!-- 이미지 배너 부분 -->
        <img src="@/assets/banner.jpg" alt="음식 배너" class="banner-image"/>
      </div>
      <h2>추천받고 싶은 음식을 선택해주세요</h2>
      <div class="filter-section">
        <h3>필터 선택</h3>
        <div class="filter-buttons">
          <button>음식 종류</button>
          <button>가격대</button>
          <button>재료</button>
          <button class="recommend-button">추천받기</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MainPage',
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
  </style>
  

  
  