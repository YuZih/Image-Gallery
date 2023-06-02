<template>
  <DefaultLayout>
    <section v-if="targetPost">
      <h1>{{ targetPost.title }}</h1>
      <h3 v-html="targetPost.content"></h3>
      <img :src="targetPost.image"
           alt="post-image">
    </section>

    <div v-else
         class="spinnerCtn">
      <Spinner />
    </div>
  </DefaultLayout>
</template>

<script>
import { DefaultLayout, Spinner } from "@/components";
import { mapState } from "vuex";

export default {
  name: "PostDetailView",
  components: {
    DefaultLayout, Spinner
  },
  computed: {
    ...mapState(["posts"]),
    postID() {
      return this.$route.params.id;
    },
    targetPost() {
      return this.posts.find(post => post.id === this.postID);
    },
  },
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/color.scss";
</style>

