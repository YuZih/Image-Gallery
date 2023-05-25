<template>
  <div class="card"
       @click="goToSeries(seriesName)">
    <div class="card_img">
      <img :src="imageSrc"
           alt="series cover"
           @contextmenu.prevent>
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
  },
  methods: {
    goToSeries(seriesName) {
      const urlParam = seriesName.toLowerCase().replace(/\s+/g, '');
      this.$router.push(`/album/${urlParam}`);
    }
  },

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
  cursor: pointer;

  &_title {
    @extend %title-font;
    color: #557C7C;
    position: absolute;
    top: 104%;
    /* horizontal centering */
    left: 50%;
    transform: translateX(-50%);
  }

  &_img {
    width: 100%;
    height: 100%;
    transition: transform .3s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }

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