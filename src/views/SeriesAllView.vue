<template>
  <div>
    <div class="cardCtn">
      <div class="cardCtn_cardWrap"
           v-for="_ in 5">
        <SeriesCard :seriesName="'W-1'"
                    :imageSrc="require('@/assets/images/album/W-1/cover/cover.jpg')" />
      </div>
    </div>
  </div>
</template>

<script>
import { SeriesCard } from "@/components";
export default {
  name: "SeriesAllView",
  components: { SeriesCard },
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/setups.scss";



.cardCtn {
  display: grid;
  width: 100%;
  grid-row-gap: 2rem;
  grid-column-gap: 3rem;
  /* automatically adjust the number of columns */
  grid-template-columns: 1fr; // Keep in 1 column
  grid-auto-flow: row; // Switch to new row


  &_cardWrap {
    width: 100%;
  }
}

@media screen and (min-width: 768px) {
  .cardCtn {
    grid-template-columns: repeat(2, 1fr); // Keep in 2 columns
    grid-row-gap: 2rem;
    grid-column-gap: 3rem;

  }
}

@media screen and (min-width: 992px) {
  .cardCtn {
    grid-row-gap: 3rem;
    grid-column-gap: 6.5rem;

  }
}
</style>


