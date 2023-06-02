<template>
  <DefaultLayout>
    <section v-if="posts.length === 0"
             class="comingSec container mx-auto">

      <div class="textCtn">
        <h5>There's no post yet.</h5>
        <h6>*For admin, please <button>login</button> to add new post.</h6>
      </div>
      <div class="imgCtn">
        <img class="img-fluid"
             src="@/assets/images/others/coming.jpg"
             alt="coming-soon-image">
      </div>
    </section>


    <section v-else
             class="container postSec">

      <!-- search bar -->
      <div class="searchCtn mx-auto">
        <form class="searchBar">
          <input class="form-control me-2"
                 id="searchInput"
                 type="search"
                 placeholder="Type to search"
                 aria-label="Search">
          <button class="searchBtn btn btn-outline-success"
                  type="submit">Search</button>
        </form>
      </div>

      <!-- post -->
      <article v-for="(post, index) in posts"
               class="row postCtn mx-auto"
               :key="index">
        <div class="col-md-8 postText"
             :class="{ 'order-md-5': isOdd(index) }">
          <h3>{{ post.title }}</h3>
          <p>May 24, 2023</p>
          <p>{{ filteredContent(post.content) }}</p>
        </div>

        <div class="col-md-4 postImg">
          <img :src="post.image"
               alt="post-image"
               @contextmenu.prevent>
        </div>
      </article>
    </section>
  </DefaultLayout>
</template>

<script>
import { DefaultLayout } from "@/components";
import { mapState, mapActions } from "vuex";

export default {
  name: "PostView",
  components: {
    DefaultLayout,
  },
  computed: {
    ...mapState(["posts"]),
  },
  created() {
    this.toFetchPosts();
  },
  methods: {
    ...mapActions(["toFetchPosts"]),
    isOdd(index) {
      return index % 2 !== 0;
    },
    filteredContent(content) {
      let replacedContent = content.replace(/<br>/g, ' ');
      return replacedContent.length >= 200 ? replacedContent.slice(0, 200) + "..." : replacedContent;
    },
  }
};
</script>


<style lang="scss" scoped>
@import "@/assets/scss/color.scss";

.comingSec {
  display: grid;
  grid-template-rows: 1fr 2fr;
  margin-top: 5rem;

  .textCtn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $green-7;
    padding: 2rem;

    button {
      border-radius: 10px;
    }
  }
}

.postSec {
  min-height: 70vh;

  .searchCtn {
    display: flex;
    justify-content: end;
    max-width: 900px;
    padding: 1rem;

    .searchBar {
      display: flex;
      width: 300px;

      #searchInput {
        outline: none;
      }
    }
  }

  .postCtn {
    max-width: 900px;
    min-height: 200px;
    padding-top: 2rem;
    padding-bottom: 2rem;
    border-top: 1.5px solid $shadow-grey;
    word-wrap: break-word;

    &:hover {
      background-color: #ecf6f3;
      cursor: pointer;
    }

    .postText {
      position: relative;
      max-width: 600px;
      line-height: 1.5rem;
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

.postCtn:nth-child(2) {
  border-top: none;
}

@media screen and (min-width: 768px) {
  .comingSec {
    max-width: 1000px;
    height: 580px;
    grid-template-columns: 1.5fr 2fr;
    grid-template-rows: 1fr;
    margin-top: 0;
    margin-bottom: 1rem;
  }

}
</style>

