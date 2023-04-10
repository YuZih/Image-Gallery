<template>
  <div>
    <!-- header & nav -->
    <Header />
    <Navbar />

    <!-- carousel -->
    <div class="carousel-ctn container mt-5 mt-md-3 mx-auto">
      <Carousel />
    </div>

    <!-- main section -->
    <main class="mt-5">
      <!-- Introduction for home page -->
      <div class="intro-ctn container text-center mx-auto">
        <a href="email:ex@test.com"></a>
        <h1>“We're more beautiful than we think.”</h1>

        <!-- Mobile version -->
        <h6 class="d-md-none">
          Underneath the lace of vintage dress,<br>
          lies my fondness for the years gone by,<br>
          Below the satin of the bridal gown,<br>
          my cherished joy in the present I spy.<br>
          A keepsake for each version of me,<br>
          in time and memory I embrace.
        </h6>
        <!-- iPad & PC version -->
        <h6 class="d-none d-md-block">
          Underneath the lace of vintage dress, lies my fondness for the years gone by,<br>
          Below the satin of the bridal gown, my cherished joy in the present I spy.<br>
          A keepsake for each version of me, in time and memory I embrace.
        </h6>
      </div>

      <!-- Links for album -->
      <div class="album-ctn container mx-auto mt-5">
        <div class="row">
          <div class="col-12">Bridal Gown</div>
          <div class="col-6">Image 1</div>
          <div class="col-6">Image 2</div>
        </div>
        <div class="row">Vintage Dress</div>
      </div>
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

    <!-- footer section -->
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import Navbar from "@/components/Navbar.vue"
import Carousel from "@/components/Carousel.vue"
import Footer from "@/components/Footer.vue"

export default {
  name: "HomeView",
  components: {
    Header, Navbar, Carousel, Footer
  }
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/setups.scss";

.intro-ctn {
  // border: 1px solid blue;
  padding: 2rem;
  background-color: rgb(245, 244, 244);
  border-radius: 15px;

  h1 {
    @extend %logo-font;
  }

  h6 {
    line-height: 2rem;
  }
}

.album-ctn {
  border: 1px solid green;
}

.carousel-ctn {
  max-width: 960px;
}
</style>