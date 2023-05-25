<template>
  <DefaultLayout>
    <!-- <section class="container">
      <div class="text-center">
        <img class="img-fluid"
             src="@/assets/images/others/coming.jpg"
             alt="coming-soon">
      </div>
    </section> -->

    <section class="container postSec">
      <div class="row postCtn mx-auto">
        <div class="col-md-8 postText">
          <h3>1 Post Title</h3>
          <p>May 24, 2023</p>
          <p>Gunne Sax is a beloved vintage clothing label known for its enchanting, prairie-inspired dresses. Founded in
            San Francisco in the late 1960s by designer Jessica McClintock, the brand became famous for its distinctive
            blend of romantic styles, rich fabrics, and intricate detailing.</p>
        </div>
        <div class="col-md-4 postImg">
          <img src="https://rudstonbrownvintage.com/cdn/shop/products/IMG_4708_1200x1200.jpg?v=1668206273"
               alt="post-image"
               @contextmenu.prevent>
        </div>
      </div>

      <div class="row postCtn mx-auto">
        <div class="col-md-8 postText order-md-5">
          <h3>2 Post Title</h3>
          <p>May 24, 2023</p>
          <p>Gunne Sax is a beloved vintage clothing label known for its enchanting, prairie-inspired dresses. Founded in
            San Francisco in the late 1960s by designer Jessica McClintock, the brand became famous for its distinctive
            blend of romantic styles, rich fabrics, and intricate detailing.</p>
        </div>
        <div class="col-md-4 postImg order-md-1">
          <img src="https://rudstonbrownvintage.com/cdn/shop/products/IMG_4708_1200x1200.jpg?v=1668206273"
               alt="post-image"
               @contextmenu.prevent>
        </div>
      </div>

      <div class="row postCtn mx-auto">
        <div class="col-md-8 postText">
          <h3>3 Post Title</h3>
          <p>May 24, 2023</p>
          <p>Gunne Sax is a beloved vintage clothing label known for its enchanting, prairie-inspired dresses. Founded in
            San Francisco in the late 1960s by designer Jessica McClintock, the brand became famous for its distinctive
            blend of romantic styles, rich fabrics, and intricate detailing.</p>
        </div>
        <div class="col-md-4 postImg">
          <img src="https://rudstonbrownvintage.com/cdn/shop/products/IMG_4708_1200x1200.jpg?v=1668206273"
               alt="post-image"
               @contextmenu.prevent>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<script>
import { DefaultLayout } from "@/components";
export default {
  name: "PostView",
  components: {
    DefaultLayout,
  },
};
</script>


<style lang="scss" scoped>
// img {
//   margin-top: 50px;
//   margin-bottom: 50px;
//   width: 100vw;
// }

.postSec {
  .postCtn {
    max-width: 960px;
    min-height: 250px;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid grey;

    .postText {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    .postImg {
      height: 230px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>

