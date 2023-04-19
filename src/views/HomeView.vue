<template>
  <div>
    <!-- header & nav -->
    <Header />
    <Navbar />

    <!-- carousel -->
    <!-- <div class="carousel-ctn container mt-5 mt-md-3 mx-auto">
      <Carousel :images="carouselImages" />
    </div> -->

    <!-- main section -->
    <main class="mt-5">
      <!-- Introduction for home page -->
      <div class="introCtn container text-center mx-auto">
        <!-- <h1>“We're more beautiful than we think.”</h1> -->

        <!-- Mobile version -->
        <!-- <h6 class="d-md-none">
          Underneath the lace of vintage dress,<br>
          lies my fondness for the years gone by,<br>
          Below the satin of the bridal gown,<br>
          my cherished joy in the present I spy.<br>
          A keepsake for each version of me,<br>
          in time and memory I embrace.
        </h6> -->
        <!-- iPad & PC version -->
        <!-- <h6 class="d-none d-md-block">
          Underneath the lace of vintage dress, lies my fondness for the years gone by,<br>
          Below the satin of the bridal gown, my cherished joy in the present I spy.<br>
          A keepsake for each version of me, in time and memory I embrace.
        </h6> -->
      </div>

      <!-- Links for album -->
      <div class="albumCtn container mx-auto mt-5 text-center">
        <h1 class="albumCtn_header mx-auto">
          Recent Stories
          <div class="albumCtn_header_underline-top mx-auto"></div>
          <div class="albumCtn_header_underline-bottom mx-auto"></div>
        </h1>
        <!-- Bridal Gown -->
        <h2 class="albumCtn_title col-12 text-start">Series of Bridal Gown</h2>
        <div class="albumCtn_wrap row">
          <div class="albumCtn_wrap_item col-md-6">Image 1</div>
          <div class="albumCtn_wrap_item col-md-6">Image 2</div>

          <!--Album-->
          <section id="album">
            <div class="container">
              <div class="album-wrapper container">

                <div class="card">
                  <img src="@/assets/images/album/W-1/cover/cover.jpg"
                       alt=""
                       class="card-img">
                  <div class="card-text">
                    <h3 class="card-title">W-1</h3>
                    <p class="card-description">cover</p>
                  </div>
                </div>

                <div class="card">
                  <img src="@/assets/images/album/W-2/cover/cover.jpg"
                       alt=""
                       class="card-img">
                  <div class="card-text">
                    <h3 class="card-title">W-2</h3>
                    <p class="card-description">cover</p>
                  </div>
                </div>

                <div class="card">
                  <img src="@/assets/images/album/W-3/cover/cover.jpg"
                       alt=""
                       class="card-img">
                  <div class="card-text">
                    <h3 class="card-title">W-3</h3>
                    <p class="card-description">cover</p>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </div>


        <!-- Series of Vintage Dress -->
        <h2 class="albumCtn_title col-12 text-start">Series of Vintage dress</h2>
        <div class="albumCtn_wrap row">
          <div class="albumCtn_wrap_item col-md-6">Image 1</div>
          <div class="albumCtn_wrap_item col-md-6">Image 2</div>

          <!--Album-->
          <section id="album">
            <div class="container">
              <div class="album-wrapper">

                <div class="card">
                  <img src="@/assets/images/album/V-1/cover/cover.jpg"
                       alt=""
                       class="card-img">
                  <div class="card-text">
                    <h3 class="card-title">V-1</h3>
                    <p class="card-description">cover</p>
                  </div>
                </div>

                <div class="card">
                  <img src="@/assets/images/album/V-2/cover/cover.jpg"
                       alt=""
                       class="card-img">
                  <div class="card-text">
                    <h3 class="card-title">V-2</h3>
                    <p class="card-description">cover</p>
                  </div>
                </div>


              </div>
            </div>
          </section>
        </div>
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
  },
  data() {
    return {
      carouselImages: [],
    };
  },
  created() {
    // Load list of image URLs
    this.carouselImages = this.loadCarouselImages();
  },
  methods: {
    // Automatically traverse all files in the folder
    // & Convert the image path names into image URLs
    loadCarouselImages() {
      const carouselImageContext = require.context(
        "@/assets/images/others/carousel_images",
        false,
        /\.(png|jpg|jpeg|gif|svg)$/
      );
      const imageList = carouselImageContext
        .keys()
        .map((image) => carouselImageContext(image));
      return imageList;
    },
  },
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/setups.scss";

.carousel-ctn {
  max-width: 960px;
}

.introCtn {
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

.albumCtn {
  border: 1px solid green;
  padding: 3rem;

  &_header {
    @extend %logo-font;
    margin-bottom: 2rem;
    width: 50%;

    &_underline-top {
      width: 50%;
      border: 1px solid black;
    }

    &_underline-bottom {
      margin-top: 3px;
      width: 35%;
      border: 1px solid black;
    }
  }

  &_title {
    @extend %title-font;
  }

  &_wrap {
    border: 1px solid rgb(128, 0, 255);
    margin-bottom: 2rem;

    &_item {
      border: 1px solid rgb(255, 0, 119);
    }
  }


  /*Album*/
  .album-wrapper {
    display: grid;
    width: 100%;
    grid-gap: 1.5rem;
    /* automatically adjust the number of columns */
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    grid-auto-flow: row;
  }

  .card {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #a7a7a7;
    -webkit-box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
    -moz-box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  }

  .card::before,
  .card::after {
    content: "";
    position: absolute;
    top: 1rem;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    transition: transform 0.4s ease-out;
  }

  .card::before {
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    transform: scale(0, 1);
  }

  .card::after {
    border-left: 1px solid white;
    border-right: 1px solid white;
    transform: scale(1, 0);
  }

  .card:hover::before {
    transform: scale(1.05, 1);
  }

  .card:hover::after {
    transform: scale(1, 1.05);
  }

  .card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: opacity 0.2s ease-out;
  }

  .card:hover .card-img {
    opacity: 0.4;
  }

  .card-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    opacity: 0;
    transition: opacity 0.3s ease-out;
  }

  .card:hover .card-text {
    opacity: 1;
  }

  .card-title {
    font-size: 1.5rem;
    margin-bottom: 0.2em;
  }

  .card-description {
    font-size: 1rem;
  }
}

// medium screen: iPad, PC
@media screen and (min-width: 768px) {}
</style>