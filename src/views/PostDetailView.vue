<template>
  <DefaultLayout>
    <section class="postSec container mx-auto">
      <h3 class="postSec_title">{{ postFilterByID.title }}</h3>
      <div class="postSec_contentCtn">
        <div class="postSec_contentCtn_imageCtn">
          <img class="postSec_contentCtn_imageCtn_image"
               :src="postFilterByID.cover | emptyImage"
               alt="post-cover">
        </div>
        <p class="postSec_contentCtn_date">May, 3, 2023</p>
        <p class="postSec_contentCtn_content"
           v-html="postFilterByID.content"></p>
      </div>
    </section>
  </DefaultLayout>
</template>

<script>
import { DefaultLayout } from "@/components";
import { mapState } from "vuex";
import { emptyImageFilter } from "@/utils/mixins"

export default {
  name: "PostDetailView",
  mixins: [emptyImageFilter],
  components: {
    DefaultLayout
  },
  computed: {
    ...mapState(["posts"]),
    postID() {
      return this.$route.params.id;
    },
    postFilterByID() {
      return this.posts.find(post => post.id === this.postID);
    },
  },
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/color.scss";

.postSec {
  max-width: 960px;
  min-height: 70vh;

  &_title {
    text-align: center;
    margin: 2.5rem 0 1.5rem 0;
  }

  &_contentCtn {
    &_date {
      font-size: 0.8rem;
    }

    &_content {
      font-size: 1.1rem;
      line-height: 1.5rem;
    }

    &_imageCtn {
      float: left;
      width: 300px;
      margin: 0 30px 10px 30px;

      &_image {
        width: 100%;
        object-fit: cover;
      }
    }
  }


}
</style>

