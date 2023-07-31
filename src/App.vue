<template>
  <div id="app">
    <router-view />
  </div>
</template>


<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

export default {
  name: "App",
  created() {
    this.$store.dispatch("toSetAlbums");
    this.$store.dispatch("toSetAlbumNamesForURL");
    this.$store.dispatch("toFetchPosts");
  },
};
</script>


<style lang="scss">
@import "./assets/scss/setups.scss";
</style>
