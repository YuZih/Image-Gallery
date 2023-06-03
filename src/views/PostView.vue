<template>
  <DefaultLayout>
    <!-- Show spinner if mapState[posts] has not completed yet  -->
    <div v-if="isLoading"
         class="spinnerCtn">
      <Spinner />
    </div>



    <!-- Show posts section after mapState[posts] has completed-->
    <div v-else>
      <!-- If no post exits-->
      <section v-if="noPost"
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

      <!-- If any post exits -->
      <section v-else
               class="container postSec">
        <!-- search bar -->
        <div class="searchCtn mx-auto">
          <form class="searchBar">
            <input v-model="searchKey"
                   class="form-control me-2"
                   type="search"
                   placeholder="Type something to search..."
                   aria-label="Search">
            <button @click.prevent="toChangeSearchKey(searchKey)"
                    class="searchBtn btn btn-outline-success"
                    type="submit">Search</button>
          </form>
        </div>

        <!-- post -->
        <div v-if="postsFilterBySearchKey && postsFilterBySearchKey.length">
          <article v-for="(post, index) in postsFilterBySearchKey"
                   @click="toDetailPage(post.id)"
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
        </div>

        <div v-else
             class="noMatchCtn mx-auto text-center">
          <p>We're sorry, but there is no post matched your search.</p>
          <p>Please try search other words or clear the search field.</p>
        </div>
      </section>
    </div>




  </DefaultLayout>
</template>

<script>
import { DefaultLayout, Spinner } from "@/components";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "PostView",
  components: {
    DefaultLayout, Spinner
  },
  data() {
    return {
      searchKey: "",
    }
  },
  computed: {
    isLoading() {
      return this.isLoadingPost || !this.posts;
    },
    ...mapState(["isLoadingPost", "posts"]),
    ...mapGetters(["postsFilterBySearchKey"]),
    noPost() {
      return !this.isLoadingPost && this.posts && this.posts.length === 0; // Make sure fetching posts and mapping posts state are completed first
    }
  },
  watch: {
    searchKey() {
      if (!this.searchKey) {
        this.toChangeSearchKey("");
      }
    }
  },
  methods: {
    ...mapActions(["toChangeSearchKey"]),
    isOdd(index) {
      return index % 2 !== 0;
    },
    filteredContent(content) {
      let replacedContent = content.replace(/<br>/g, ' ');
      return replacedContent.length >= 200 ? replacedContent.slice(0, 200) + "..." : replacedContent;
    },
    toDetailPage(postID) {
      this.$router.push({ name: "postDetail", params: { id: postID } });
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
  margin-bottom: 2rem;

  .searchCtn {
    display: flex;
    justify-content: end;
    max-width: 900px;
    padding: 1rem;
    border-bottom: 4px groove $green-2;

    .searchBar {
      display: flex;
      width: 350px;

      .searchBtn {
        border-color: $green-3;
        color: $green-6;

        &:hover {
          color: white;
          background-color: $green-6;
        }
      }

      .form-control {
        font-style: italic;

        &:focus {
          // box-shadow: none;
          box-shadow: 0 0 5px $green-4;
          border-color: $green-3;
        }

        /* Chrome, Firefox, Opera, Safari 10.1+ */
        &::-webkit-input-placeholder {
          color: $shadow-grey;
        }

        /* Firefox 19+ */
        &::-moz-placeholder {
          color: $shadow-grey;
        }

        /* IE 10+ */
        &:-ms-input-placeholder {
          color: $shadow-grey;
        }

        /* Edge 18+ */
        &::-ms-input-placeholder {
          color: $shadow-grey;
        }

        /* Safari 12+ & Chrome (Not including Android) */
        &::placeholder {
          color: $shadow-grey;
        }
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

// No top border for the first post
.postCtn:nth-child(1) {
  border-top: none;
}

.noMatchCtn {
  max-width: 900px;
  padding: 1rem;
  color: $green-6;
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

