import Vue from "vue"
import Vuex from "vuex"
import {defaultAlbums} from "@/utils/defaultSetting.js"

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

    // Convert URL param to seriesName
    restoreSeriesName: (state) => (param) => {
      for (const series in state.albums) {
        const seriesName = series.replace(/\s+/g, '').toLowerCase();
        if (seriesName === param) {
          return series;
        }
      }
      return null;
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
    setAlbums(state, payload) {
      state.albums = payload;
    },
  },

  actions: {
    // Initialize the albums with default values
    // Default order of albums: from latest to old
    toSetAlbums({ commit }) {
      commit("setAlbums", defaultAlbums)
    },
  },

  modules: {
  }
})
