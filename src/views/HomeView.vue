<template>
  <div>
    <!-- Header & Navbar -->
    <Header />
    <Navbar />

    <!-- Carousel -->
    <div class="carouselCtn container mt-5 mt-md-3 mx-auto">
      <Carousel :images="carouselImages" />
    </div>

    <!-- Main -->
    <main class="mt-5">
      <!-- Introduction section -->
      <section class="introSec">
        <div class="introCtn container text-center mx-auto">
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
            Below the satin of the wedding dress, my cherished joy in the present I spy.<br>
            A keepsake for each version of me, in time and memory I embrace.
          </h6>
        </div>
      </section>


      <!-- Series section -->
      <section class="seriesSec">
        <div class="albumCtn container mx-auto mt-md-5 text-center">
          <!-- Header for series section -->
          <h1 class="albumCtn_header mx-auto">
            Recent Stories
            <div class="albumCtn_header_underline-top mx-auto"></div>
            <div class="albumCtn_header_underline-bottom mx-auto"></div>
          </h1>

          <!-- Each album series -->
          <div v-for="(albumNames, albumSeries, seriesIndex) in latestAlbums"
               :key="seriesIndex">
            <h1 class="albumCtn_title col-12 text-start">Series of {{ albumSeries }}</h1>
            <div class="albumCtn_wrap row">
              <div class="cardsCtn">
                <div class="container">
                  <div class="cards_wrap">

                    <!-- Each album card -->
                    <AlbumCard v-for="(albumName, index) in albumNames"
                               :key="index"
                               :cardTitle="albumName"
                               :imageSrc="require(`@/assets/images/album/${albumName}/cover/cover.jpg`)" />
                  </div>
                </div>
              </div>
            </div>
            <div class="albumCtn_buttonCtn">
              <button class="viewMoreBtn">
                <font-awesome-icon :icon="['fas', 'angles-right']"
                                   fade /> View More</button>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- footer section -->
    <Footer />
  </div>
</template>


<script>
import { Header, Navbar, Carousel, AlbumCard, Footer } from "@/components";
import { mapGetters } from "vuex"

export default {
  name: "HomeView",
  components: {
    Header, Navbar, Carousel, AlbumCard, Footer
  },
  data() {
    return {
      carouselImages: [],
    };
  },
  computed: {
    // Show only latest 3 albums for each series
    ...mapGetters(['latestAlbumsByN']),
    latestAlbums() {
      return this.latestAlbumsByN(3)
    }
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

.carouselCtn {
  max-width: 900px;
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
    font-weight: 400;
  }
}

.albumCtn {
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

  &_buttonCtn {
    text-align: end;
    margin-bottom: 1.5rem;

    .viewMoreBtn {
      all: unset;
      cursor: pointer;
      background: $green-4;
      color: white;
      margin-top: 1rem;
      padding: .5rem;
      border-radius: 30px;
      font-size: .5rem;
      font-weight: 400;
      box-shadow: 2px 4px 5px $green-1;

      &:hover {
        background: $green-6;
      }
    }
  }


  .cards_wrap {
    display: grid;
    width: 100%;
    grid-gap: 1rem;
    /* automatically adjust the number of columns */
    grid-template-columns: 1fr; // Keep in 1 column
    grid-auto-flow: row; // Switch to new row
  }
}


// XS screen: mobile
@media screen and (min-width: 420px) {
  .cardsCtn {
    margin-bottom: 2rem;

    .container {
      .cards_wrap {
        grid-template-columns: repeat(2, 1fr); // Keep in 2 columns
      }
    }
  }

  .albumCtn_buttonCtn {
    .viewMoreBtn {
      margin-top: 0;
      font-size: .9rem;
      padding: .9rem;
    }
  }
}


// medium screen: iPad, PC
@media screen and (min-width: 768px) {
  .cardsCtn {
    .container {
      .cards_wrap {
        grid-template-columns: repeat(3, 1fr); // Keep in 3 columns
      }
    }
  }

  .albumCtn_buttonCtn {
    .viewMoreBtn {
      font-size: 1rem;
      padding: 1rem;
      font-weight: 500;
    }
  }
}
</style>