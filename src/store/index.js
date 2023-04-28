import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    albums: {},
  },
  getters: {
  },
  mutations: {
    setAlbums(state, payload) {
      state.albums = payload;
    },
  },
  actions: {
    fetchAlbums({ commit }) {
      const albums = {
        "Wedding Dress": ["W-1", "W-2", "W-3"],
        "Vintage Dress": ["V-1", "V-2"],
      };
      commit("setAlbums", albums)
    },
  },
  modules: {
  }
})
