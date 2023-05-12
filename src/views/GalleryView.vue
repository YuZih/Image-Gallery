<template>
  <section class="gallery my-5">
    {{ galleryName }}
    <div class="gallery_imgCtn"
         v-for="(imageSrc, index) in galleryImageList"
         :key="index">
      <img :src="imageSrc"
           alt="gallery photo"
           class="gallery_imgCtn_img">
    </div>
  </section>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  name: "GalleryView",
  data() {
    return {
      galleryImageList: [],
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
  column-gap: 20px;
}

.gallery img {
  width: 100%;
  height: auto;
  padding-bottom: 20px;
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
</style>

