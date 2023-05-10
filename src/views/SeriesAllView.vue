<template>
  <div>
    <div class="allSeriesCtn my-5">
      <div class="allSeriesCtn_cards"
           v-for="(albumName, seriesName, index) in oldestAlbum">
        <SeriesCard :seriesName="seriesName"
                    :imageSrc="require(`@/assets/images/album/${albumName}/cover/cover.jpg`)" />
      </div>
    </div>
  </div>
</template>

<script>
import { SeriesCard } from "@/components";
import { mapGetters } from "vuex"

export default {
  name: "SeriesAllView",
  components: { SeriesCard },
  computed: {
    ...mapGetters(['oldestAlbum']),
  },

};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/setups.scss";

.allSeriesCtn {
  display: grid;
  width: 100%;
  grid-row-gap: 2rem;
  grid-column-gap: 3rem;
  /* automatically adjust the number of columns */
  grid-template-columns: 1fr; // Keep in 1 column
  grid-auto-flow: row; // Switch to new row


  &_cards {
    width: 100%;
  }
}

@media screen and (min-width: 768px) {
  .allSeriesCtn {
    grid-template-columns: repeat(2, 1fr); // Keep in 2 columns
    grid-row-gap: 2rem;
    grid-column-gap: 3rem;
  }
}

@media screen and (min-width: 992px) {
  .allSeriesCtn {
    grid-row-gap: 3rem;
    grid-column-gap: 6.5rem;
  }
}
</style>


