<template>
  <div>
    <!-- Header & Navbar -->
    <Header />
    <Navbar />
    <main class="mt-5 mt-md-3">
      <div class="imgCtn mx-auto">
        <img class="img-fluid"
             src="@/assets/images/others/about_image.jpg"
             alt="about-image">
      </div>

      <div class="container textCtn mx-auto my-5 pb-5 text-center">
        <p>Hi there, welcome to my gallery!<br> Here, you'll see my photos of wedding and vintage dress.
        </p>
        <p>I love the elegance of these timeless garments,<br> so I created this space to share their beauty.</p>
        <p>Join me in exploring the world of <br> wedding and vintage dresses showcased here,
          <br>and let's appreciate their charm together.
        </p>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import { Header, Navbar, Footer } from "@/components";

export default {
  name: "AboutView",
  components: {
    Header, Navbar, Footer
  },
};
</script>


<style lang="scss" scoped>
@use "@/assets/scss/setups.scss";


.imgCtn,
.textCtn {
  width: 70%;
}

.textCtn {
  // width: 70%;
  font-family: 'Caveat', cursive;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.3rem;
}

@media screen and (min-width: 576px) {

  .imgCtn,
  .textCtn {
    width: 75%;
  }

  .textCtn {
    font-size: 1.3rem;
    line-height: 1.5rem;
  }
}


@media screen and (min-width: 768px) {

  .imgCtn,
  .textCtn {
    width: 704px;
  }

  .textCtn {
    font-size: 1.5rem;
    line-height: 1.7rem;
  }
}
</style>