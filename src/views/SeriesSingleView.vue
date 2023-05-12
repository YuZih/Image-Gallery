<template>
  <div>
    <div class="title my-5">- Series of {{ seriesTitle }} -</div>
    <div class="singleSeriesCtn">
      <div class="singleSeriesCtn_cards"
           v-for="(albumName, index) in targetSeries"
           :key="index">
        <AlbumCard :galleryName="albumName"
                   :seriesName="seriesTitle"
                   :imageSrc="require(`@/assets/images/album/${albumName}/cover/cover.jpg`)" />
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import { AlbumCard } from "@/components";

export default {
  name: "SeriesSingleView",
  components: {
    AlbumCard
  },
  computed: {
    ...mapGetters(["restoreSeriesName", "albumsInOrder"]),
    seriesTitle() {
      return this.restoreSeriesName(this.$route.params.seriesName); // return an string
    },
    targetSeries() {
      return this.albumsInOrder[this.seriesTitle]; // return an array
    }
  },
};
</script>


<style lang="scss" scoped>
@use "@/assets/scss/setups.scss";

.title {
  @extend %title-font;
  font-size: 2.1rem;
}

.singleSeriesCtn {
  display: grid;
  width: 100%;
  margin-bottom: 5rem;
  grid-row-gap: 2rem;
  grid-column-gap: 3rem;
  /* automatically adjust the number of columns */
  grid-template-columns: 1fr; // Keep in 1 column
  grid-auto-flow: row; // Switch to new row


  &_cards {
    width: 100%;
  }
}

@media screen and (min-width: 420px) {
  .title {
    font-size: 2.5rem;
  }
}

@media screen and (min-width: 576px) {
  .title {
    font-size: 2.8rem;
  }
}

@media screen and (min-width: 768px) {
  .title {
    font-size: 3rem;
  }

  .singleSeriesCtn {
    grid-template-columns: repeat(2, 1fr); // Keep in 2 columns
    grid-row-gap: 2rem;
    grid-column-gap: 3rem;

  }
}

@media screen and (min-width: 992px) {
  .singleSeriesCtn {
    grid-template-columns: repeat(3, 1fr); // Keep in 3 columns
    grid-row-gap: 3rem;
    grid-column-gap: 6.5rem;

  }
}
</style>

