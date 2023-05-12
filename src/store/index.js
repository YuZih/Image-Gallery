import Vue from "vue"
import Vuex from "vuex"
import { defaultAlbums } from "@/utils/defaultSetting.js"
import { db } from "@/store/firebase.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    albums: {},
    albumNamesForURL: {},
  },

  getters: {
    // Check if params of album path is valid
    isValidAlbumParam: (state) => (seriesName, galleryName) => {
      if (!state.albumNamesForURL[seriesName]) { return false; }
      if (galleryName !== undefined && !state.albumNamesForURL[seriesName].includes(galleryName)) {
        return false;
      }
      return true; 
    },

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
    setAlbums(state, allAlbums) {
      state.albums = allAlbums;
    },
    setAlbumNamesForURL(state) {
      for (const series in state.albums) {
        const SeriesNameForURL = series.replace(/\s+/g, '').toLowerCase();
        const seriesAlbums = state.albums[series];
        const galleryNamesForURL = seriesAlbums.map(albumName => albumName.replace(/\s+/g, '').toLowerCase());
        state.albumNamesForURL[SeriesNameForURL] = galleryNamesForURL;
      }
    }
  },

  actions: {
    // Default order of albums: from latest to old
    toSetAlbums({ commit }) {
      commit("setAlbums", defaultAlbums);
    },
    toSetAlbumNamesForURL({ commit }) {
      commit("setAlbumNamesForURL");
    },
    initializeStore({ dispatch }) {
      // Dispatch all the actions that need to be performed at startup
      dispatch('toSetAlbums');
      dispatch('toSetAlbumNamesForURL');
      // Return a resolved promise
      return Promise.resolve();
    },
  },

  modules: {
  }
})
