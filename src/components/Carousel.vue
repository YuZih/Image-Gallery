<template>
  <div id="home_carousel"
       class="carousel slide"
       data-bs-ride="carousel">

    <!-- indicators -->
    <div class="carousel-indicators">
      <button type="button"
              class="active"
              data-bs-target="#home_carousel"
              data-bs-slide-to="0"
              aria-current="true"
              aria-label="Slide 1"></button>
      <button type="button"
              data-bs-target="#home_carousel"
              data-bs-slide-to="1"
              aria-label="Slide 2"></button>
      <button type="button"
              data-bs-target="#home_carousel"
              data-bs-slide-to="2"
              aria-label="Slide 3"></button>
      <button type="button"
              data-bs-target="#home_carousel"
              data-bs-slide-to="3"
              aria-label="Slide 4"></button>
      <button type="button"
              data-bs-target="#home_carousel"
              data-bs-slide-to="4"
              aria-label="Slide 5"></button>
      <button type="button"
              data-bs-target="#home_carousel"
              data-bs-slide-to="5"
              aria-label="Slide 6"></button>
      <button type="button"
              data-bs-target="#home_carousel"
              data-bs-slide-to="6"
              aria-label="Slide 7"></button>
    </div>

    <!-- inner -->
    <div class="carousel-inner">
      <div class="carousel-item active"
           data-bs-interval="3000">
        <img src="@/assets/images/others/carousel_images/1.jpg"
             class="d-block w-100"
             alt="...">
      </div>
      <div class="carousel-item"
           data-bs-interval="3000">
        <img src="@/assets/images/others/carousel_images/2.jpg"
             class="d-block w-100"
             alt="...">
      </div>
      <div class="carousel-item"
           data-bs-interval="3000">
        <img src="@/assets/images/others/carousel_images/3.jpg"
             class="d-block w-100"
             alt="...">
      </div>
      <div class="carousel-item"
           data-bs-interval="3000">
        <img src="@/assets/images/others/carousel_images/4.jpg"
             class="d-block w-100"
             alt="...">
      </div>
      <div class="carousel-item"
           data-bs-interval="3000">
        <img src="@/assets/images/others/carousel_images/5.jpg"
             class="d-block w-100"
             alt="...">
      </div>
      <div class="carousel-item"
           data-bs-interval="3000">
        <img src="@/assets/images/others/carousel_images/6.jpg"
             class="d-block w-100"
             alt="...">
      </div>
      <div class="carousel-item"
           data-bs-interval="3000">
        <img src="@/assets/images/others/carousel_images/7.jpg"
             class="d-block w-100"
             alt="...">
      </div>
    </div>

    <!-- control button -->
    <button class="carousel-control-prev"
            type="button"
            data-bs-target="#home_carousel"
            data-bs-slide="prev">
      <span class="carousel-control-prev-icon"
            aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next"
            type="button"
            data-bs-target="#home_carousel"
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
}
</script>


<style lang="scss" scoped>
#home_carousel {
  width: 100%;
  aspect-ratio: 3 / 2; // Set the aspect ratio of the carousel
  overflow: hidden; //Hide the overflowing image

  .carousel-inner .carousel-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>