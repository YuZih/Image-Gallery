<template>
  <div class="card" @click="goToGallery(seriesName, galleryName)">
    <img :src="imageSrc"
         alt="album cover"
         class="card_img">
    <div class="card_text text-center">
      <h3 class="card_title">{{ galleryName }}</h3>
      <p class="card_description">- Click to view album -</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlbumCard",
  props: {
    imageSrc: {
      type: String,
      required: true
    },
    seriesName: {
      type: String,
      required: true
    },
    galleryName: {
      type: String,
      required: true
    },
  },
  methods: {
    // Route to gallery page when albumCard is clicked
    goToGallery(series, album) {
      const seriesParam = series.toLowerCase().replace(/\s+/g, '');
      const albumParam = album.toLowerCase().replace(/\s+/g, '');
      this.$router.push(`/album/${seriesParam}/${albumParam}`);
    },
  }

}
</script>

<style lang="scss" scoped>
.card {
  overflow: hidden;
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #a7a7a7;
  -webkit-box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  -moz-box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);

  &:hover {
    cursor: pointer;
  }
}

.card::before,
.card::after {
  content: "";
  position: absolute;
  top: 1rem;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  transition: transform 0.4s ease-out;
}

.card::before {
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  transform: scale(0, 1);
}

.card::after {
  border-left: 1px solid white;
  border-right: 1px solid white;
  transform: scale(1, 0);
}

.card:hover::before {
  transform: scale(1.05, 1);
}

.card:hover::after {
  transform: scale(1, 1.05);
}

.card_img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: opacity 0.2s ease-out;
}

.card:hover .card_img {
  opacity: 0.4;
}

.card_text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease-out;
}

.card:hover .card_text {
  opacity: 1;
}

.card_title {
  font-size: 1.5rem;
}

.card_description {
  margin-top: 1rem;
  font-size: 1rem;
}
</style>