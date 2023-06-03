<template>
  <section>

    <div class="imgCtn text-center">
      <router-link :to="{ name: 'home' }">
        <div class="homeBtn">GO HOME</div>
      </router-link>
      <img class="img-fluid"
           src="@/assets/images/others/404.jpg"
           alt="404-image">
    </div>
  </section>
</template>

<script>
export default {
  name: "NotFoundView",
};
</script>




<style lang="scss" scoped>
@import "@/assets/scss/color.scss";

.imgCtn {
  display: flex;
  flex-direction: column;
  align-items: center;
}

img {
  width: 100vh;
}

.homeBtn {
  width: 100vw;
  color: white;
  background-color: $green-4;
  font-size: 1rem;
  padding: 1rem;
  font-weight: bold;

  &:hover {
    color: white;
    background-color: $green-6;
  }
}
</style>