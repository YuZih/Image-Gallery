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
          <h6>*For admin, please <router-link :to="{
            name: 'admin'
          }"><button>login</button></router-link> to add new post.</h6>
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
        <!-- Search Bar Section -->
        <div class="searchCtn mx-auto">

          <div class="manageBtn"><router-link :to="{
            name: 'admin'
          }"><font-awesome-icon :icon="['fas', 'user-pen']"
                                 class="manageIcon mx-4 mx-md-1" /><span class="d-none d-md-inline">
                Manage</span></router-link></div>
          <form class="searchBar">
            <input v-model="searchKey"
                   name="searchKeyInput"
                   class="form-control me-2"
                   type="search"
                   placeholder="Type something to search..."
                   aria-label="Search">
            <button @click.stop.prevent="toChangeSearchKey(searchKey)"
                    class="searchBtn btn btn-outline-success"
                    type="submit">Search</button>
          </form>
        </div>

        <!-- Post Section-->
        <div v-if="postsFilterBySearchKey && postsFilterBySearchKey.length">
          <article v-for="( post, index ) in  postsFilterBySearchKey "
                   @click="toDetailPage(post.id)"
                   class="row postCtn mx-auto"
                   :key="index">
            <div class="col-md-8 postText"
                 :class="{ 'order-md-5': isOdd(index) }">
              <h3>{{ post.title }}</h3>
              <p class="postDate">{{ post.date | toDate }}</p>
              <p>{{ filteredContent(post.content) }}</p>
            </div>

            <div class="col-md-4 postImg">
              <img :src="post.cover | emptyImage"
                   alt="post-cover"
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
import { emptyImageFilter, toDateFilter } from "@/utils/mixins";

export default {
  name: "PostView",
  mixins: [emptyImageFilter, toDateFilter],
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
      return replacedContent.length >= 250 ? replacedContent.slice(0, 250) + "..." : replacedContent;
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
    justify-content: space-between;
    align-items: flex-end;
    max-width: 900px;
    padding: 1rem 0 1rem 0;
    border-bottom: 4px groove $green-2;

    .manageBtn {
      font-size: 1.2rem;
      font-weight: bold;
      color: $green-6;

      &:hover {
        a {
          color: $green-6;
          text-decoration: underline;
        }
      }
    }

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
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
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

    .postDate {
      font-size: 0.8rem;
    }

    .postImg {
      height: 200px;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
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

