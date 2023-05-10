<template>
  <div>
    <div class="galleryCtn my-5">
      {{ galleryName }}
    </div>
  </div>
</template>


<script>

export default {
  name: "GalleryView",
  computed: {
    seriesName() {
      return this.restoreSeriesName(this.$route.params.seriesName); // return an string
    },
    galleryName() {
      return this.$route.params.galleryName; // return an string
    },

  },
};
</script>


<style lang="scss" scoped>
@use "@/assets/scss/setups.scss";
</style>

