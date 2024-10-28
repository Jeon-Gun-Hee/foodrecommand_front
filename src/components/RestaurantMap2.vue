<template>
  <div class="restaurant-map-page">
    <h2>{{ foodtype }} 맛집 찾기</h2>
    <div class="map-container">
      <div id="map" class="map"></div>

      <!-- 내 위치로 이동 버튼과 위치 변경 버튼 -->
      <button class="current-location-button" @click="moveToInitialLocation">
        내 위치로 이동
      </button>
      <button class="change-location-button" @click="openChangeLocationModal">
        위치 변경
      </button>

      <!-- 위치 변경 모달 -->
      <div v-if="showLocationModal" class="modal-overlay">
        <div class="modal-content">
          <h3>위치 변경</h3>
          <input type="text" v-model="newLocation" placeholder="주소를 입력하세요" />
          <button @click="changeLocation">확인</button>
          <button @click="closeChangeLocationModal">취소</button>
        </div>
      </div>

      <!-- 오른쪽 음식점 리스트 -->
      <div class="restaurant-list">
        <div
          v-for="place in places"
          :key="place.place_id"
          class="restaurant-card"
          @click="focusOnPlace(place)"
        >
          <img
            v-if="place.photos && place.photos.length > 0"
            :src="place.photos[0].getUrl({ maxWidth: 100, maxHeight: 100 })"
            alt="음식점 이미지"
            class="restaurant-image"
          />
          <div class="restaurant-info">
            <h4>{{ place.name }}</h4>
            <p>주소: {{ place.vicinity }}</p>
            <p>평점: {{ place.rating || '평점 없음' }} ⭐</p>
          </div>
          <button
            class="favorite-button"
            @click.stop="toggleFavorite(place.place_id)"
          >
            {{ favorites.has(place.place_id) ? '❤️' : '🤍' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  data() {
    return {
      foodtype: this.$route.query.food || "맛집",
      places: [],
      favorites: new Set(),
      map: null,
      markers: {},
      infoWindow: null,
      userLocation: null,
      initialLocation: null, // 초기 위치 저장
      showLocationModal: false,
      newLocation: "",
      userMarker: null
    };
  },
  mounted() {
    this.loadGoogleMapScript().then(() => {
      this.getInitialLocation();
    }).catch(error => {
      console.error('Google Maps 스크립트를 로드하지 못했습니다:', error);
    });
  },
  methods: {
    loadGoogleMapScript() {
      return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
          resolve();
        } else {
          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDWLquqKUOD0s0n2OMSR5djb9nM2TXLh_M&libraries=places&callback=initializeMap`;
          script.async = true;
          window.initializeMap = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        }
      });
    },
    getInitialLocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.initialLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.userLocation = this.initialLocation; // 초기 위치를 사용자 위치로 설정
          this.initializeMap(this.userLocation);
        },
        () => {
          alert("현재 위치를 확인할 수 없습니다.");
        }
      );
    },
    initializeMap(location) {
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: location,
        zoom: 14,
      });
      this.updateUserMarker(location);
      this.fetchNearbyPlaces();
    },
    updateUserMarker(location) {
      if (this.userMarker) {
        this.userMarker.setMap(null);
      }
      this.userMarker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: "현재 위치",
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        }
      });
    },
    moveToInitialLocation() {
      if (this.initialLocation) {
        this.map.panTo(this.initialLocation);
        this.map.setZoom(14);
      } else {
        alert("초기 위치 정보를 사용할 수 없습니다.");
      }
    },
    openChangeLocationModal() {
      this.showLocationModal = true;
    },
    closeChangeLocationModal() {
      this.showLocationModal = false;
    },
    async changeLocation() {
      try {
        const geocoder = new google.maps.Geocoder();
        const { results } = await geocoder.geocode({ address: this.newLocation });
        if (results.length > 0) {
          const location = results[0].geometry.location;
          const newLocation = { lat: location.lat(), lng: location.lng() };
          this.updateUserMarker(newLocation); // 새 위치에 빨간 마커 생성
          this.userLocation = newLocation; // 위치 변경 후 새 위치 설정
          this.map.panTo(newLocation);
          this.fetchNearbyPlaces(); // 새 위치 기준 음식점 재검색
          this.closeChangeLocationModal();
        } else {
          alert("주소를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("위치 변경 실패:", error);
      }
    },
    fetchNearbyPlaces() {
      const service = new google.maps.places.PlacesService(this.map);
      service.nearbySearch(
        {
          location: this.userLocation,
          radius: 5000,
          keyword: this.foodtype
        },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            this.places = results;
            results.forEach((place) => {
              const marker = new google.maps.Marker({
                position: place.geometry.location,
                map: this.map,
                title: place.name,
                icon: {
                  url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                }
              });
              this.markers[place.place_id] = marker;
              marker.addListener("click", () => {
                this.fetchPlaceDetails(place.place_id, marker);
              });
            });
          } else {
            alert("맛집을 찾을 수 없습니다.");
          }
        }
      );
    },
    fetchPlaceDetails(placeId, marker) {
      const service = new google.maps.places.PlacesService(this.map);
      service.getDetails({ placeId }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.showPlaceDetails(place, marker);
        } else {
          alert("음식점 정보를 가져올 수 없습니다.");
        }
      });
    },
    showPlaceDetails(place, marker) {
      const isFavorite = this.favorites.has(place.place_id);
      const heartIcon = isFavorite ? "❤️" : "🤍";

      const contentString = `
        <div style="max-width: 250px;">
          <h4>${place.name}</h4>
          ${
            place.photos && place.photos.length > 0
              ? `<img src="${place.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 })}" alt="${place.name}" style="width: 100%; height: auto; margin-bottom: 10px;">`
              : ""
          }
          <p><strong>주소:</strong> ${place.formatted_address || "정보 없음"}</p>
          <p><strong>전화번호:</strong> ${place.formatted_phone_number || "정보 없음"}</p>
          <p><strong>평점:</strong> ${place.rating || "평점 없음"} ⭐</p>
          ${
            place.website
              ? `<p><a href="${place.website}" target="_blank">웹사이트 방문</a></p>`
              : ""
          }
          <button id="favorite-button" style="font-size: 24px; background: none; border: none; cursor: pointer;">${heartIcon}</button>
        </div>
      `;

      if (this.infoWindow) {
        this.infoWindow.close();
      }

      this.infoWindow = new google.maps.InfoWindow({
        content: contentString
      });
      this.infoWindow.open(this.map, marker);

      google.maps.event.addListenerOnce(this.infoWindow, 'domready', () => {
        document.getElementById("favorite-button").addEventListener("click", () => {
          this.toggleFavorite(place.place_id);
          this.showPlaceDetails(place, marker);
        });
      });
    },
    toggleFavorite(placeId) {
      if (this.favorites.has(placeId)) {
        this.favorites.delete(placeId);
      } else {
        this.favorites.add(placeId);
      }
      this.$forceUpdate();
    },
    focusOnPlace(place) {
      const marker = this.markers[place.place_id];
      if (marker) {
        this.map.panTo(marker.getPosition());
        this.fetchPlaceDetails(place.place_id, marker);
      }
    }
  }
};
</script>

<style scoped>
.restaurant-map-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.map-container {
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.map {
  width: 60%;
  height: 600px;
}

.current-location-button,
.change-location-button {
  position: absolute;
  bottom: 40px;
  left: 10px;
  z-index: 5;
  padding: 8px 16px;
  font-size: 14px;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 8px;
}

.change-location-button {
  left: 130px;
  background-color: #2196f3;
}

.restaurant-list {
  width: 40%;
  height: 600px;
  overflow-y: auto;
  background-color: #f9f9f9;
  padding: 10px;
  border-left: 1px solid #ddd;
}

.restaurant-card {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.restaurant-image {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  margin-right: 10px;
}

.restaurant-info h4 {
  margin: 0;
  font-size: 1.2rem;
}

.restaurant-info p {
  margin: 4px 0;
  color: #666;
  font-size: 0.9rem;
}

.favorite-button {
  margin-left: auto;
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
}

.favorite-button.liked {
  color: red;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 300px;
  width: 100%;
  text-align: center;
}
</style>
