<template>
  <DefaultLayout>
    <!-- Carousel -->
    <div class="carouselCtn container  mx-auto">
      <Carousel :images="carouselImages" />
    </div>

    <!-- Main -->
    <div class="mt-5">
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
                               :seriesName="albumSeries"
                               :galleryName="albumName"
                               :imageSrc="require(`@/assets/images/album/${albumName}/cover/cover.jpg`)" />
                  </div>
                </div>
              </div>
            </div>
            <div class="albumCtn_buttonCtn">
              <button class="viewMoreBtn">
                <font-awesome-icon :icon="['fas', 'angles-right']"
                                   fade /> <router-link
                             :to="{ name: 'series', params: { seriesName: albumSeries.replace(/\s+/g, '').toLowerCase() } }">View
                  More</router-link></button>
            </div>
          </div>

        </div>
      </section>
    </div>
  </DefaultLayout>
</template>


<script>
import { DefaultLayout, Carousel, AlbumCard } from "@/components";
import { mapGetters } from "vuex"

export default {
  name: "HomeView",
  components: {
    DefaultLayout, Carousel, AlbumCard
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
    font-size: 1.4rem;
  }

  h6 {
    line-height: 2rem;
    font-weight: 400;
    font-size: .9rem;
  }
}

.albumCtn {
  padding: 3rem;

  &_header {
    @extend %logo-font;
    margin-bottom: 2rem;
    width: 80%;

    &_underline-top {
      width: 50%;
      max-width: 165px;
      border: 1px solid black;
    }

    &_underline-bottom {
      margin-top: 3px;
      width: 35%;
      max-width: 120px;
      border: 1px solid black;
    }
  }

  &_title {
    @extend %title-font;
    font-size: 1.9rem;
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
      font-size: 1.1rem;
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
  .introCtn {
    h1 {
      font-size: 1.6rem;
    }

    h6 {
      font-size: 1rem;
    }
  }

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
      font-size: 1.1rem;
      padding: 1.1rem;
    }
  }

  .albumCtn {
    &_title {
      font-size: 2.5rem;
    }
  }
}


@media screen and (min-width: 576px) {
  .introCtn {
    h1 {
      font-size: 2rem;
    }

    h6 {
      font-size: 1.1rem;
    }
  }


}

// medium screen: iPad, PC
@media screen and (min-width: 768px) {
  .introCtn {
    h1 {
      font-size: 2rem;
    }

    h6 {
      font-size: 1rem;
    }
  }

  .cardsCtn {
    .container {
      .cards_wrap {
        grid-template-columns: repeat(3, 1fr); // Keep in 3 columns
      }
    }
  }

  .albumCtn_buttonCtn {
    .viewMoreBtn {
      font-size: 1.1rem;
      padding: 1.1rem;
      font-weight: 500;
    }
  }

  .albumCtn {
    &_title {
      font-size: 2.8rem;
    }
  }
}

@media screen and (min-width: 992px) {
  .introCtn {
    h1 {
      font-size: 2.2rem;
    }

    h6 {
      font-size: 1.1rem;
      // line-height: 3rem;
    }
  }
}
</style>