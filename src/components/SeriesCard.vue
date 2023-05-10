<template>
  <div class="card">
    <div class="card_img">
      <img :src="imageSrc"
           alt="series cover">
    </div>
    <h1 class="card_title">{{ seriesName }}</h1>
  </div>
</template>

<script>
export default {
  name: "SeriesCard",
  props: {
    imageSrc: {
      type: String,
      required: true
    },
    seriesName: {
      type: String,
      required: true
    },
  }

}
</script>

<style lang="scss" scoped>
@use "@/assets/scss/setups.scss";

/* Basic style setting */
.card {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 2;
  margin-bottom: 5rem;

  &_title {
    position: absolute;
    top: 104%;
    /* horizontal centering */
    left: 50%;
    transform: translateX(-50%);
    @extend %title-font;
  }

  &_img {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}


/* Photo 3D effect */
.card_img {
  position: relative;

  &::before,
  &::after {
    content: "";
    height: 30%;
    position: absolute;
    bottom: 4px;
    background: rgba(0, 0, 0, .3);
    box-shadow: 0 15px 10px rgba(0, 0, 0, .6);
    z-index: -1;
  }

  &::before {
    transform: skewY(-6deg);
    transform-origin: 0 0;
    left: 5px;
    right: 50%;
  }

  &::after {
    transform: skewY(6deg);
    transform-origin: 100% 0;
    left: 50%;
    right: 5px;
  }
}
</style>