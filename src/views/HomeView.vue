<template>
  <div>
    <!-- header & nav -->
    <Header />
    <Navbar />

    <!-- carousel -->
    <div class="carousel-ctn container mt-5 mt-md-3 mx-auto">
      <Carousel :images="carouselImages" />
    </div>

    <!-- main section -->
    <main class="mt-5">
      <!-- Introduction for home page -->
      <div class="introCtn container text-center mx-auto">
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
      <div class="albumCtn container mx-auto mt-5 text-center">
        <h1 class="albumCtn_header">
          Recent Stories
          <div class="albumCtn_header_underline-top mx-auto"></div>
          <div class="albumCtn_header_underline-bottom mx-auto"></div>
        </h1>
        <!-- Bridal Gown -->
        <h2 class="albumCtn_title col-12 text-start">Series of Bridal Gown</h2>
        <div class="albumCtn_wrap row">
          <div class="albumCtn_wrap_item col-md-6">Image 1</div>
          <div class="albumCtn_wrap_item col-md-6">Image 2</div>
        </div>
        <!-- Series of Vintage Dress -->
        <h2 class="albumCtn_title col-12 text-start">Series of Vintage dress</h2>
        <div class="albumCtn_wrap row">
          <div class="albumCtn_wrap_item col-md-6">Image 1</div>
          <div class="albumCtn_wrap_item col-md-6">Image 2</div>
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
webpack 
file-loader(hash-value)  url-loader(base64)

<script>
import Header from "@/components/Header.vue"
import Navbar from "@/components/Navbar.vue"
import Carousel from "@/components/Carousel.vue"
import Footer from "@/components/Footer.vue"


import img from "@/assets/images/album/V-1/cover/cover-1.jpg"
console.log("img: ", img);

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
    this.carouselImages = this.loadCarouselImages();
    console.log("Created!");
  },
  methods: {
    loadCarouselImages() {
      const carouselImageContext = require.context(
        "@/assets/images/others/carousel_images",
        false,
        /\.(png|jpg|jpeg|gif|svg)$/
      );

      console.log("carouselImageContext:", carouselImageContext);
      console.log("carouselImageContext.id:", carouselImageContext.id);
      console.log("carouselImageContext resolve 方法: ", carouselImageContext.resolve);
      console.log("carouselImageContext keys 方法，返回請求鍵的數組: ", carouselImageContext.keys());
      console.log("carouselImageContext keys[0]: ", carouselImageContext.keys()[0]);
      console.log("carouselImageContext resolve(key) 返回圖片相對路徑: ", carouselImageContext.resolve('./2.jpg'));
      console.log("carouselImageContext(key): ", carouselImageContext('./2.jpg'));
      console.log("require(key): ", require("/src/assets/images/others/carousel_images" + '/2.jpg'));



      const imageList = carouselImageContext
        .keys()
        .map((image) => carouselImageContext(image));
      console.log("imageList: ", imageList);
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
  // border: 1px solid green;
  padding: 3rem;

  &_header {
    @extend %logo-font;
    margin-bottom: 2rem;

    &_underline-top {
      width: 210px;
      border: 1px solid black;
    }

    &_underline-bottom {
      margin-top: 3px;
      width: 180px;
      border: 1px solid black;
    }
  }

  &_title {
    @extend %title-font;
    color: $green-4;
    text-shadow: $green-2 0.05em 0.05em 0.05em;
  }

  &_wrap {
    border: 1px solid rgb(128, 0, 255);
    margin-bottom: 2rem;

    &_item {
      border: 1px solid rgb(255, 0, 119);
    }
  }
}
</style>