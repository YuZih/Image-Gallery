<template>
  <div id="target_carousel"
       class="carousel slide"
       data-bs-ride="carousel">

    <!-- indicators -->
    <div class="carousel-indicators">
      <button v-for="(image, index) in images"
              :key="index"
              type="button"
              :class="{ active: index === 0 }"
              data-bs-target="#target_carousel"
              :data-bs-slide-to="index"
              :aria-current="index === 0"
              :aria-label="'Slide ' + (index + 1)"></button>
    </div>

    <!-- inner -->
    <div class="carousel-inner">
      <div v-for="(image, index) in images"
           :key="index"
           :class="{ 'carousel-item': true, active: index === 0 }"
           data-bs-interval="3000">
        <img :src="image"
             class="d-block w-100"
             alt="carousel image"
             @contextmenu.prevent />
      </div>
    </div>

    <!-- control button -->
    <button class="carousel-control-prev"
            type="button"
            data-bs-target="#target_carousel"
            data-bs-slide="prev">
      <span class="carousel-control-prev-icon"
            aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next"
            type="button"
            data-bs-target="#target_carousel"
            data-bs-slide="next">
      <span class="carousel-control-next-icon"
            aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>


<script>
export default {
  name: "Carousel",
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
}
</script>


<style lang="scss" scoped>
#target_carousel {
  width: 100%;
  aspect-ratio: 3 / 2; // Set the aspect ratio of the carousel
  overflow: hidden; //Hide the overflowing image
  -webkit-box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, 0.25);

  .carousel-inner .carousel-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .carousel-indicators button {
    /* 修改指示器寬度和高度 */
    width: 10px;
    height: 10px;

    /* 添加圓角使其成為圓點 */
    border-radius: 50%;

    /* 修改未激活指示器的背景色 */
    background-color: rgba(255, 255, 255, 0.5);
  }
}
</style>