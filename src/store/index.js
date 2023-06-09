import Vue from "vue"
import Vuex from "vuex"
import { defaultAlbums } from "@/utils/defaultSetting.js"
import { db, storage } from "@/store/firebase.js"
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    albums: {},
    albumNamesForURL: {},
    posts: [], // [post{id, date, title, content, cover, album}]
    searchKey: "",
    isLoadingPost: true, // check if fetching posts is completed
    isAdmin: true,
    focusPostID: "", // for edit mode
    postChanged: false,
  },

  getters: {
    // Filter posts by search key
    postsFilterBySearchKey: (state) => {
      if (state.posts.length) { // if any post exists
        if (!state.searchKey) { // if searchKey is empty
          return state.posts;
        } else { // if searchKey is not empty
          const keyword = state.searchKey.toLowerCase();
          return state.posts.filter(post => post.title.toLowerCase().includes(keyword) || post.content.toLowerCase().includes(keyword))
        }
      }
    },

    // Filter posts by focusPostID when in edit mode
    postFilterByPostID: (state) => {
      if (state.posts.length) { // if any post exists
        if (!state.focusPostID) { // if no post is focused
          return null;
        } else { // if a post is focused
          return state.posts.filter(post => post.id === state.focusPostID)[0];
        }
      }
    },

    // Check if params of album path is valid
    isValidAlbumParam: (state) => (seriesName, galleryName) => {
      if (!state.albumNamesForURL[seriesName]) { return false; }
      if (galleryName !== undefined && !state.albumNamesForURL[seriesName].includes(galleryName)) {
        return false;
      }
      return true; 
    },

    // Check if params of post path is valid
    isValidPostParam: (state) => (postID) => {
      const postExists = state.posts.find(post => post.id === postID);
      return postExists ? true : false;
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
    oldestAlbum: (state) => {
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
    albumsInOrder: (state) => {
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
    },
    setIsLoadingPost(state, payload) {
      state.isLoadingPost = payload;
    },
    changeSearchKey(state, payload) {
      state.searchKey = payload;
    },
    changeFocusPostID(state, payload) {
      state.focusPostID = payload;
    },
    fetchPosts(state, payload) {
      state.posts = payload;
    },
    addPost(state, payload) {
      // payload: {id, date, title, content, cover, album}
      state.posts = [payload, ...state.posts];
      state.postChanged = !state.postChanged;
    },
    updatePost(state, {id, newPost}) {
      const index = state.posts.map(post => post.id).indexOf(id);
      state.posts[index] = { id, ...newPost };
      state.postChanged = !state.postChanged;
    },
    deletePost(state, postID) {
      const index = state.posts.map(post => post.id).indexOf(postID);
      state.posts.splice(index, 1);
    },
  },


  actions: {
    // Default order of albums: from latest to old
    toSetAlbums({ commit }) {
      commit("setAlbums", defaultAlbums);
    },

    // To initialize albumNamesForURL state
    toSetAlbumNamesForURL({ commit }) {
      commit("setAlbumNamesForURL");
    },

    // Dispatch all the actions that need to be performed at startup
    initializeStore({ dispatch }) {
      dispatch("toSetAlbums");
      dispatch("toSetAlbumNamesForURL");
      return Promise.resolve(); // Return a resolved promise, to make albumGuard wait for this action
    },

    // To change searchKey state
    toChangeSearchKey({ commit }, payload) {
      commit("changeSearchKey", payload);
    },

    // change focus ID when editing post
    toChangeFocusPostID({ commit }, payload) {
      commit("changeFocusPostID", payload);
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
        commit("fetchPosts", payload);
        commit("setIsLoadingPost", false);
        return true; 
      } catch (error) {
        commit("setIsLoadingPost", true);
        console.error("Error fetching documents: ", error);
        return false;
      }
    },

    // Add doc data to Firestore database
    toAddPost: async ({ commit }, payload) => {
      // payload: {date, title, content, cover, album}
      const Ref = collection(db, "Posts");
      try {
        // Add post document into posts collection with an automatically generated ID
        const docRef = await addDoc(Ref, payload);
        console.log("Document written with ID: ", docRef.id);
        console.log("addPost payload: ", { id: docRef.id, ...payload });
        commit("addPost", {id: docRef.id, ...payload});
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },

    // Update doc data in Firestore database
    toUpdatePost: async ({ commit }, payload) => {
      const docRef = doc(db, "Posts", payload.id);
      try {
        // Update post document with an existing ID
        await updateDoc(docRef, payload.newPost);
        console.log("Document updated with new post: ", docRef.id);
        console.log("UpdatePost payload: ", { id: docRef.id, ...payload });
        commit("updatePost", payload);
      } catch (e) {
        console.error("Error updating document: ", e);
      }
    },

    // Delete doc data in Firestore database
    toDeletePost: async ({ commit }, postID) => {
      const docRef = doc(db, "Posts", postID);
      try {
        await deleteDoc(docRef);
        console.log("Document deleted: ", postID);
        commit("deletePost", postID);
      } catch (e) {
        console.error("Error deleting document: ", e);
      }
    }
  },

  modules: {
  }
})
