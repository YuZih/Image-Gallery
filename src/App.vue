<template>
  <div id="app">
    <!-- Show notFound page if URL is incorrect -->
    <div v-if="$route.name === 'notFound'">
      <router-view name="notFound" />
    </div>

    <!-- Show normal view if URL is correct -->
    <div v-else>
      <Header />
      <Navbar />
      <main class="mt-5 mt-md-3">
        <router-view />
      </main>
      <Footer />
    </div>
  </div>
</template>


<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { Header, Navbar, Footer } from "@/components";


export default {
  name: "App",
  components: {
    Header, Navbar, Footer
  },
  created() {
    this.$store.dispatch("fetchAlbums");
  }
};
</script>


<style lang="scss">
@import "./assets/scss/setups.scss";
</style>
