// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // store import

createApp(App)
  .use(router)
  .use(store) // store 추가
  .mount('#app');
