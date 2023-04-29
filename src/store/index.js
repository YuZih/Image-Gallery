import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    albums: {},
  },
  getters: {
    // Filter the latest N albums 
    latestAlbumsByN: (state) => (n) => {
      const latestAlbums = {};
      for (const series in state.albums) {
        const seriesAlbums = state.albums[series];
        const latestSeriesAlbums = seriesAlbums.slice(-n);
        latestAlbums[series] = latestSeriesAlbums;
      }
      return latestAlbums;
    }
  },
  mutations: {
    // Change the values of albums
    setAlbums(state, payload) {
      state.albums = payload;
    },
  },
  actions: {
    // Initialize the albums with default values
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
