<template>
  <DefaultLayout>
    <div class="container-md">
      <!-- breadcrumb -->
      <div class="breadCrumbCtn">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><router-link :to="{ name: 'album' }">All Series</router-link></li>

            <li class="breadcrumb-item"
                v-if="seriesName"><router-link :to="{ name: 'series', params: { seriesName: this.seriesName } }">
                {{ currentSeries }}</router-link>
            </li>

            <li class="breadcrumb-item"
                v-if="galleryNameForURL"><router-link
                           :to="{ name: 'gallery', params: { galleryName: this.galleryNameForURL } }">{{
                             galleryNameForURL.toUpperCase() }}</router-link>
            </li>
          </ol>
        </nav>
      </div>

      <!-- Show series or album photos -->
      <router-view />

    </div>
  </DefaultLayout>
</template>

<script>
import { DefaultLayout } from "@/components";
import { mapGetters } from 'vuex';

export default {
  name: "AlbumView",
  components: {
    DefaultLayout,
  },
  data() {
    return {
      currentSeries: null,
    }
  },
  computed: {
    ...mapGetters(["restoreSeriesName"]),
    seriesName() {
      const seriesName = this.$route.params.seriesName;
      this.currentSeries = this.restoreSeriesName(this.$route.params.seriesName);
      return seriesName;
    },
    galleryNameForURL() {
      return this.$route.params.galleryName;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/color.scss";

.breadcrumb-item {
  color: $green-4;

  a:hover {
    color: $green-6;
  }

  .exactActiveLink {
    color: $green-5;
    text-decoration: underline;
  }
}
</style>


