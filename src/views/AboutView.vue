<template>
  <div>
    <main>
      <div class="imgCtn mx-auto">
        <img class="imgCtn_img img-fluid"
             src="@/assets/images/others/about_image.jpg"
             alt="about-image">
      </div>

      <div class="container textCtn mx-auto my-5 pb-5 text-center">
        <p>Hi there, welcome to my gallery!<br> Here, you'll see my photos of wedding and vintage dress.
        </p>
        <br>
        <p>I love the elegance of these timeless garments,<br> so I created this space to share their beauty.</p>
        <br>
        <p>Join me in exploring the world of <br> wedding and vintage dresses showcased here,
          <br>and let's appreciate their charm together.
        </p>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "AboutView",
};
</script>


<style lang="scss" scoped>
@use "@/assets/scss/setups.scss";

.imgCtn,
.textCtn {
  width: 70%;
}

.imgCtn {
  margin-top: 4rem;
  aspect-ratio: 3 / 2;
  overflow: hidden; //Hide the overflowing image
  border: .5em solid white;
  -webkit-box-shadow: 0px 5px 10px 5px rgba(0, 0, 0, 0.133);
  -moz-box-shadow: 0px 5px 10px 5px rgba(0, 0, 0, 0.133);
  box-shadow: 0px 5px 10px 5px rgba(0, 0, 0, 0.133);

  &_img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.textCtn {
  font-family: 'Caveat', cursive;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.2rem;
}

@media screen and (min-width: 576px) {

  .imgCtn,
  .textCtn {
    width: 75%;
  }

  .imgCtn {
    margin-top: 5rem;
    border-width: .6em;
  }

  .textCtn {
    font-size: 1.3rem;
    line-height: 1.5rem;
  }
}


@media screen and (min-width: 768px) {

  .imgCtn,
  .textCtn {
    max-width: 900px;
  }

  .imgCtn {
    margin-top: 0;
    border-width: .7em;
  }

  .textCtn {
    font-size: 1.6rem;
    line-height: 1.8rem;
  }
}
</style>