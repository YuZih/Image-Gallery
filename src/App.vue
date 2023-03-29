<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>


<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
export default {
  name: "App",
};
</script>


<style lang="scss">
@import "./assets/scss/setups.scss";
</style>
