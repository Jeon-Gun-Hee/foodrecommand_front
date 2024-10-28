import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoggedIn: false,
    userProfile: null,
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    userProfile: (state) => state.userProfile,
  },
  mutations: {
    SET_LOGIN_STATE(state, payload) {
      state.isLoggedIn = payload.isLoggedIn;
      state.userProfile = payload.userProfile;
    },
    LOGOUT(state) {
      state.isLoggedIn = false;
      state.userProfile = null;
    },
  },
  actions: {
    login({ commit }, userProfile) {
      commit('SET_LOGIN_STATE', { isLoggedIn: true, userProfile });
    },
    logout({ commit }) {
      commit('LOGOUT');
    },
  },
});
