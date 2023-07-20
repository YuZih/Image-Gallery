<template>
  <DefaultLayout>
    <section class="postSec container mx-auto mb-5">
      <!-- Post Title -->
      <h3 class="postSec_title">{{ postFilterByID.title }}</h3>
      <div class="postSec_contentCtn">

        <!-- Post Image -->
        <img class="postSec_contentCtn_image"
             :src="postFilterByID.cover | emptyImage"
             alt="post-cover">

        <!-- Post Date -->
        <p class="postSec_contentCtn_date">{{ postFilterByID.date | toDate }}</p>

        <!-- Post Content -->
        <p class="postSec_contentCtn_content"
           v-html="replacedContent"></p>
      </div>
    </section>

    <section v-if="postFilterByID && postFilterByID.geopoint"
             class="mapSec container my-5">
      <h3 class="mapSec_title text-center">Photo Location</h3>

      <div class="my-3">
        <Map :center="postFilterByID.geopoint" :markerDraggable="false"
             :initialMarker="{position: postFilterByID.geopoint }"></Map>
      </div>
      <div class="text-end">(Latitude: {{ postFilterByID.geopoint.lat }}, longitude: {{ postFilterByID.geopoint.lng }})
      </div>
    </section>
  </DefaultLayout>
</template>



<script>
import { DefaultLayout, AlbumCard, Map } from "@/components";
import { mapState } from "vuex";
import { emptyImageFilter, toDateFilter } from "@/utils/mixins"

export default {
  name: "PostDetailView",
  mixins: [emptyImageFilter, toDateFilter],
  components: {
    DefaultLayout, AlbumCard, Map
  },
  computed: {
    ...mapState(["posts"]),
    postID() {
      return this.$route.params.id;
    },
    postFilterByID() {
      const targetPost = this.posts.find(post => post.id === this.postID);
      return targetPost;
    },
    replacedContent() {
      if (this.postFilterByID) {
        return this.postFilterByID.content.replace(/\n/g, "<br/>");
      }
      return "";
    },
  },
}
</script>



<style lang="scss" scoped>
@import "@/assets/scss/color.scss";

.postSec {
  // max-width: 960px;
  min-height: 70vh;

  &_title {
    text-align: center;
    margin: 6rem 0 2rem 0;
  }

  &_contentCtn {
    &_image {
      float: left;
      width: 100%;
      max-height: 50%;
      object-fit: contain;
      padding: 0 10px 10px 10px;
    }

    &_date {
      font-size: 0.8rem;
    }

    &_content {
      font-size: 1.1rem;
      line-height: 1.5rem;
    }
  }
}

@media screen and (min-width: 576px) {
  .postSec {
    min-height: 55vh;
  }

  .postSec_contentCtn_image {
    width: 50%;
    max-height: 50vh;
    padding: 0 20px 10px 10px;
    object-fit: contain;
  }
}

@media screen and (min-width: 768px) {
  .postSec_title {
    margin: 2.5rem 0 1.5rem 0;
  }

  .postSec_contentCtn_image {
    width: 45%;
  }
}

@media screen and (min-width: 992px) {
  .postSec_contentCtn_image {
    width: 40%;
  }
}
</style>

