<template>
  <div>
    <!-- Header & Navbar -->
    <Header />
    <Navbar />
    <main class="mt-5 mt-md-3">
      <div>Album page!</div>
      <img class="img-fluid"
           src="@/assets/images/others/404.jpg"
           alt="">
      <img class="img-fluid"
           src="@/assets/images/others/404.jpg"
           alt="">
      <img class="img-fluid"
           src="@/assets/images/others/404.jpg"
           alt="">
    </main>
    <Footer />
  </div>
</template>

<script>
import { Header, Navbar, Footer, Carousel, AlbumCard } from "@/components";

export default {
  name: "AlbumView",
  components: {
    Header, Navbar, Footer, Carousel, AlbumCard
  },
};
</script>


