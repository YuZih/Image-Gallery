import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    albums: {},
  },

  getters: {
    // Choose the latest albums (Top N) 
    latestAlbumsByN: (state) => (n) => {
      const latestAlbums = {};
      for (const series in state.albums) {
        const seriesAlbums = state.albums[series];
        const latestSeriesAlbums = seriesAlbums.slice(0, n);
        latestAlbums[series] = latestSeriesAlbums;
      }
      return latestAlbums;
    },

    // Choose the oldest album of each series
    oldestAlbum(state) {
      const oldestAlbum = {}
      for (const series in state.albums) {
        const seriesAlbums = state.albums[series];
        const oldestSeriesAlbum = seriesAlbums.slice(-1);
        oldestAlbum[series] = oldestSeriesAlbum;
      }
      return oldestAlbum;
    },

    // Order albums from old to latest
    albumsInOrder(state) {
      const albumsInOrder = {}
      for (const series in state.albums) {
        const seriesAlbums = state.albums[series];
        const orderedSeriesAlbums = seriesAlbums.slice().reverse();
        albumsInOrder[series] = orderedSeriesAlbums;
      }
      return albumsInOrder;
    },
  },

  mutations: {
    // Change the values of albums
    setAlbums(state, payload) {
      state.albums = payload;
    },
  },

  actions: {
    // Initialize the albums with default values
    // Default order of albums: from latest to old
    fetchAlbums({ commit }) {
      const albums = {
        "Wedding Dress": ["W-3", "W-2", "W-1"],
        "Vintage Dress": ["V-2", "V-1"],
      };
      commit("setAlbums", albums)
    },
  },

  modules: {
  }
})
