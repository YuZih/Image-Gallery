<template>
  <DefaultLayout>
    <section class="container postSec">
      <div class="row postCtn mx-auto"
           v-for="(post, index) in posts"
           :key="index">
        <div class="col-md-8 postText"
             :imageAtLeft="index % 2 === 0">
          <h3>{{ post.title }}</h3>
          <p>May 24, 2023</p>
          <p v-html="post.content"></p>
        </div>
        <div class="col-md-4 postImg">
          <img :src="post.image"
               alt="post-image"
               @contextmenu.prevent>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<script>
import { DefaultLayout } from "@/components";
import { mapState } from "vuex";

export default {
  name: "PostView",
  components: {
    DefaultLayout,
  },
  computed: {
    ...mapState(["posts"]),
  },
};
</script>


<style lang="scss" scoped>
.postSec {
  .postCtn {
    max-width: 960px;
    min-height: 250px;
    padding-top: 2rem;
    padding-bottom: 2rem;
    border-top: 1px solid grey;
    word-wrap: break-word;

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

