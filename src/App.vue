<template>
  <div id="app">
    <Header/>
    <router-view />
  </div>
</template>


<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Header from '@/components/Header.vue'

export default {
  name: "App",
  components: {
    Header
  }
};
</script>


<style lang="scss">
@import "./assets/scss/setups.scss";
</style>
