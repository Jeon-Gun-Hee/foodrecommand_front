// index.js
import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/components/MainPage.vue';
import RecommandPage from '@/components/RecommandPage.vue';
import RandomPage from '@/components/RandomPage.vue';
import RecommandPage2 from '@/components/RecommandPage2.vue';
import RestaurantPage from '@/components/RestaurantPage.vue';
import MyPage from '@/components/MyPage.vue';
import LoginPage from '@/components/LoginPage.vue';
import RestaurantMap from '@/components/RestaurantMap.vue';
import RestaurantMap2 from '@/components/RestaurantMap2.vue'

const routes = [
  { path: '/', name: 'MainPage', component: MainPage },
  { path: '/random', name: 'RandomPage', component: RandomPage },
  { path: '/restaurant', name: 'RestaurantPage', component: RestaurantPage },
  { path: '/mypage', name: 'MyPage', component: MyPage },
  { path: '/login', name: 'LoginPage', component: LoginPage },
  { path: '/recommand', name: 'RecommandPage', component: RecommandPage },
  { path: '/recommand2', name: 'RecommandPage2', component: RecommandPage2 },
  { path: '/restaurant-map', name: 'RestaurantMap', component: RestaurantMap },
  { path: '/restaurant-map2', name: 'RestaurantMap2', component: RestaurantMap2 },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
