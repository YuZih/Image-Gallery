<template>
  <section class="gallery my-5">
    <div class="gallery_imgCtn"
         v-for="(imageSrc, index) in galleryImageList"
         :key="index">
      <img :src="imageSrc"
           alt="gallery photo"
           class="gallery_imgCtn_img"
           @click="lightboxIndex = index"
           @contextmenu.prevent>
    </div>

    <CoolLightBox :items="galleryImageList"
                  :index="lightboxIndex"
                  @close="lightboxIndex = null">
    </CoolLightBox>
  </section>
</template>


<script>
import { mapGetters } from 'vuex';
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

export default {
  name: "GalleryView",
  components: {
    CoolLightBox,
  },
  data() {
    return {
      galleryImageList: [],
      lightboxIndex: null,
    }
  },
  computed: {
    ...mapGetters(["restoreSeriesName"]),
    seriesName() {
      return this.restoreSeriesName(this.$route.params.seriesName); // return an string
    },
    galleryName() {
      return this.$route.params.galleryName.toUpperCase(); // return an string
    },
  },
  mounted() {
    // Load list of image URLs
    this.galleryImageList = this.loadGalleryImageList();
  },
  methods: {
    // Automatically traverse all photos in the specific folder with dynamic path
    loadGalleryImageList() {
      // Traverse all photos of all albums
      const allImagesContext = require.context(
        '@/assets/images/album/',
        true,
        /\.(png|jpg|jpeg|gif|svg)$/
      );
      // Filter the photos of target album
      const galleryImages = allImagesContext
        .keys()
        .filter(path => path.startsWith(`./${this.galleryName}`) && !path.includes('/cover/'))
        .map(path => allImagesContext(path));

      return galleryImages;
    },
  },
};
</script>


<style lang="scss" scoped>
.gallery {
  line-height: 0; // Prevent vertical gaps
  column-count: 1;
  column-gap: 30px;
}

.gallery img {
  width: 100%;
  height: auto;
  padding-bottom: 30px;
  transition: transform .3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
}

@media screen and (min-width: 576px) {
  .gallery {
    column-count: 2;
  }
}

@media screen and (min-width: 768px) {
  .gallery {
    column-count: 3;
  }
}

@media screen and (min-width: 992px) {
  .gallery {
    column-count: 4;
  }
}
</style>

