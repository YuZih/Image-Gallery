<template>
  <DefaultLayout>
    <!-- Show spinner if mapState[posts] has not completed yet  -->
    <div v-if="isLoading"
         class="spinnerCtn">
      <Spinner />
    </div>

    <!-- Show posts section after mapState[posts] has completed-->
    <div v-else>
      <section class="container postSec">
        <!-- Search Bar Section -->
        <div class="searchCtn mx-auto">
          <div class="manageBtn"><router-link :to="{
            name: 'adminAdd'
          }"><font-awesome-icon :icon="['fas', 'circle-plus']"
                                 class="AddIcon" />
              <span class="d-none d-md-inline">
                Add New Post</span></router-link></div>
          <form class="searchBar">
            <input v-model="searchKey"
                   name="searchKeyInput"
                   class="form-control me-2"
                   type="search"
                   placeholder="Type something to search..."
                   aria-label="Search">
            <button @click.stop.prevent="toChangeSearchKey(searchKey.trim())"
                    class="searchBtn btn btn-outline-success"
                    type="submit">Search</button>
          </form>
        </div>

        <!-- Table Section-->
        <div v-if="postsFilterBySearchKey && postsFilterBySearchKey.length">
          <main class="tableCtn mx-auto">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Post Title</th>
                  <th scope="col">Date <span @click="oderPosts"
                          v-show="postsInDesc"><font-awesome-icon :icon="['fas', 'caret-down']" /></span><span
                          @click="oderPosts"
                          v-show="!postsInDesc"><font-awesome-icon :icon="['fas', 'caret-down']"
                                         rotation=180 /></span></th>
                  <th scope="col">Content</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr @click="openThisPostPage(post.id)"
                    v-for="(post, index) in orderedPosts"
                    :key="index">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ filteredTitle(post.title) }}</td>
                  <td>{{ post.date | toDate }}</td>
                  <td>{{ filteredContent(post.content) }}</td>
                  <td class="iconCtn"><button @click.stop="toAdminEditPage(post.id)"
                            class="editBtb btn btn-light"><font-awesome-icon :icon="['fas', 'pen']" /></button>
                    <button @click.stop="pressDeleteBtn(post)"
                            class="deleteBtn btn btn-light"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"><font-awesome-icon :icon="['fas', 'xmark']" /></button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div v-if="!posts.length"
                 class="noPostMsg">No post yet. Please click the button above to add a new post!
            </div>
          </main>


          <!-- Modal -->
          <div @click="cancelDelete"
               class="modal fade"
               id="exampleModal"
               tabindex="-1"
               aria-labelledby="exampleModalLabel"
               aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title"
                      id="exampleModalLabel"><font-awesome-icon :icon="['fas', 'circle-exclamation']" /> Confirm Delete
                  </h5>
                  <button @click.stop="cancelDelete"
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="modalQuestion">Are you sure you want to delete this post?</div>
                  <div class="modalPostTitle">【 Post Title 】 <span @click.stop="openThisPostPage(postIDToDelete)">{{
                    postTitleToDelete }}</span></div>
                  <div class="modalPostCoverCtn">
                    <img v-if="postCoverToDelete"
                         :src="postCoverToDelete | emptyImage"
                         class="modalPostCoverCtn_img"
                         alt="cover-image">
                  </div>
                </div>
                <div class="modal-footer">
                  <button @click.stop="cancelDelete"
                          type="button"
                          class="btn btn-secondary cancelDeleteBtn"
                          data-bs-dismiss="modal">Cancel</button>
                  <button @click.stop="confirmDelete"
                          type="button"
                          class="btn btn-primary confirmDeleteBtn"
                          data-bs-dismiss="modal">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else
             class="noMatchCtn mx-auto text-center">
          <!-- <p>Sorry, no posts found.</p> -->
          <p>Sorry, no posts found. Please try different keywords or clear the search field.</p>
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
      postIDToDelete: null,
      postTitleToDelete: null,
      postCoverToDelete: null,
      postsInDesc: true,
    }
  },
  beforeRouteLeave(to, from, next) {
    this.toChangeSearchKey("");
    next();
  },
  computed: {
    isLoading() {
      return this.isLoadingPost || !this.posts;
    },
    ...mapState(["isLoadingPost", "posts"]),
    ...mapGetters(["postsFilterBySearchKey", "sortedPostsAsc"]),
    orderedPosts() {
      return this.postsInDesc ? this.postsFilterBySearchKey : this.sortedPostsAsc;
    },
  },
  watch: {
    searchKey() {
      if (!this.searchKey.trim()) {
        this.toChangeSearchKey("");
      }
    }
  },
  methods: {
    ...mapActions(["toDeletePost", "toChangeSearchKey"]),
    oderPosts() {
      this.postsInDesc = !this.postsInDesc;
    },
    filteredTitle(title) {
      return title.length >= 20 ? title.slice(0, 20) + "..." : title;
    },
    filteredContent(content) {
      let replacedContent = content.replace(/<br>/g, ' ');
      return replacedContent.length >= 30 ? replacedContent.slice(0, 30) + "..." : replacedContent;
    },
    openThisPostPage(postID) {
      console.log("open: ", postID);
      // Direct to the page page by opening a new tab
      window.open('/post/' + postID, '_blank');
    },
    toAdminEditPage(postID) {
      this.$router.push({ name: "adminEdit", params: { id: postID } });
    },
    pressDeleteBtn(post) {
      // Save the post data that the user wants to delete
      this.postIDToDelete = post.id;
      this.postTitleToDelete = post.title;

      // Preload the image: Cover image will only be loaded into the modal once it has fully loaded.
      this.postCoverToDelete = null;
      const img = new Image();
      img.onload = () => {
        this.postCoverToDelete = img.src; // Assign the image's URL (img.src) when the image has finished loading.
      };
      img.src = post.cover; // Preload image in JS
    },
    cancelDelete() {
      // Reset modal content
      this.postIDToDelete = null;
      this.postTitleToDelete = null;
      this.postCoverToDelete = null;
    },
    confirmDelete() {
      console.log("Delete post with ID: ", this.postIDToDelete);
      this.toDeletePost(this.postIDToDelete);
    },
  }
};
</script>


<style lang="scss" scoped>
@import "@/assets/scss/color.scss";

.postSec {
  min-height: 70vh;
  min-width: 414px;
  ;
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

      .AddIcon {
        font-size: 1.8rem;
        margin-left: 10px;
        margin-right: 10px;
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
}


.noMatchCtn {
  max-width: 900px;
  padding: 1rem;
  color: $green-6;
}


.tableCtn {
  max-width: 900px;
  min-height: 50vh;
}

.table-striped>tbody>tr:nth-child(2n+1)>td,
.table-striped>tbody>tr:nth-child(2n+1)>th {
  background-color: #edfffd;
}

.table-hover>tbody>tr:hover>td,
.table-hover>tbody>tr:hover>th {
  background-color: #edfaf9;
  text-decoration: underline;
}

.table>thead {
  font-weight: 600;
  border-bottom: 3px groove $green-6;
  background-color: $green-6;
  line-height: 30px;
  color: white;
}

.iconCtn {
  button {
    margin: 3px 3px 3px 3px;
  }

  .editBtb:hover {
    color: #f8f9fa;
    background-color: $green-6;
  }

  .deleteBtn:hover {
    color: #f8f9fa;
    background-color: $pink-2;
  }
}


.modal-title {
  color: $pink-2;
  font-weight: 600;
}

.modalQuestion {
  color: $green-6;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.modalPostTitle {
  color: $green-6;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.modalPostTitle>span {
  color: black;
  font-weight: 400;
  text-decoration: underline;
  cursor: pointer;
}

.modalPostCoverCtn {
  width: 100%;

  &_img {
    width: 100%;
    max-height: 400px;
    object-fit: contain;
  }
}

.cancelDeleteBtn {
  background-color: $green-6;
  border: none;

  &:active {
    box-shadow: 0 0 20px $green-4;
  }
}

.confirmDeleteBtn {
  background-color: $pink-2;
  border: none;

  &:active {
    box-shadow: 0 0 20px $green-1;
  }
}

.noPostMsg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50vh;
  color: $green-6;
  background-color: $green-0;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
}
</style>

