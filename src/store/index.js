import Vue from "vue"
import Vuex from "vuex"
import { defaultAlbums } from "@/utils/defaultSetting.js"
import { db } from "@/store/firebase.js"
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

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
      dispatch("toSetAlbums");
      dispatch("toSetAlbumNamesForURL");
      // Return a resolved promise
      return Promise.resolve();
    },

    // Read doc data from Firestore database
    toFetchPosts: async ({ commit }) => {
      const Ref = collection(db, "Posts");// Ref Prototype: Object
      try {
        const querySnapshot = await getDocs(Ref);// Docs Prototype: Object
        let payload = [];// Prototype: Array [{post1}, {post2},...]
        querySnapshot.forEach(doc => {
          payload.push({ id: doc.id, ...doc.data() });
        });
        // commit("fetchPosts", payload);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    },

    // Add doc data to Firestore database
    toAddPost: async ({ commit }, payload) => {
      const Ref = collection(db, "Posts");
      try {
        const docRef = await addDoc(Ref, payload);
        console.log("Document written with ID: ", docRef.id);
        // commit("AddPost", {id: docRef.id, ...payload});
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },

    // Update doc data in Firestore database
    toUpdatePost: async ({ commit }, payload) => {
      const docRef = doc(db, "Posts", payload.id);
      try {
        await updateDoc(docRef, payload.newPost);
        console.log("Document updated with new post: ", docRef.id);
        // commit("updatePost", payload);
      } catch (e) {
        console.error("Error updating document: ", e);
      }
    },

    // Delete doc data in Firestore database
    toDeletePost: async ({ commit }, id) => {
      const docRef = doc(db, "Posts", id);
      try {
        await deleteDoc(docRef);
        console.log("Document deleted: ", id);
        // commit("deletePost", id);
      } catch (e) {
        console.error("Error deleting document: ", e);
      }
    }
  },

  modules: {
  }
})
