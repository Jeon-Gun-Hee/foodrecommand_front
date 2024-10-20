import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/components/MainPage.vue';

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: '/random',
    name: 'RandomPage',
    component: () => import('@/components/RandomPage.vue'),
  },
  {
    path: '/restaurant',
    name: 'RestaurantPage',
    component: () => import('@/components/RestaurantPage.vue'),
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: () => import('@/components/MyPage.vue'),
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('@/components/LoginPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
