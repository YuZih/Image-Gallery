<template>
  <DefaultLayout>
    <div v-if="isLoading"
         class="spinnerCtn">
      <Spinner />
    </div>

    <div v-else>
      <main class="tableCtn container">

        <!-- Table section -->
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
              <td>{{ post.title }}</td>
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
             class="noPostMsg">No post yet. Please click the button in the bottom right to add a new post!
        </div>
      </main>

      <!-- Plus button for adding post -->
      <router-link :to="{
        name: 'adminAdd'
      }"><button class="plusBtn">+</button></router-link>

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
                  id="exampleModalLabel"><font-awesome-icon :icon="['fas', 'circle-exclamation']" /> Confirm Delete</h5>
              <button @click.stop="cancelDelete"
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="modalQuestion">Are you sure you want to delete this post?</div>
              <div class="modalPostTitle">【 Post Title 】 <span>{{ postTitleToDelete }}</span></div>
              <div class="modalPostCoverCtn">
                <img :src="postCoverToDelete | emptyImage"
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
  </DefaultLayout>
</template>


<script>
import { DefaultLayout, Spinner } from "@/components";
import { mapState, mapActions, mapGetters } from "vuex";
import { emptyImageFilter, toDateFilter } from "@/utils/mixins";

export default {
  name: "AdminView",
  mixins: [emptyImageFilter, toDateFilter],
  components: {
    DefaultLayout, Spinner
  },
  data() {
    return {
      postIDToDelete: null,
      postTitleToDelete: null,
      postCoverToDelete: null,
      postsInDesc: true,
    }
  },
  computed: {
    isLoading() {
      return this.isLoadingPost || !this.posts;
    },
    ...mapState(["isLoadingPost", "posts"]),
    ...mapGetters(["sortedPostsAsc"]),
    orderedPosts() {
      return this.postsInDesc ? this.posts : this.sortedPostsAsc;
    },
  },
  methods: {
    ...mapActions(["toDeletePost"]),
    oderPosts() {
      this.postsInDesc = !this.postsInDesc;
    },
    filteredContent(content) {
      let replacedContent = content.replace(/<br>/g, ' ');
      return replacedContent.length >= 40 ? replacedContent.slice(0, 40) + "..." : replacedContent;
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
      // Save the post ID that the user wants to delete
      this.postIDToDelete = post.id;
      this.postTitleToDelete = post.title;
      this.postCoverToDelete = post.cover;
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
  },
};
</script>


<style lang="scss" scoped>
@import "@/assets/scss/color.scss";

.tableCtn {
  max-width: 1200px;
  min-height: 75vh;
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
  font-weight: 500;
  border-bottom: 3px groove $green-6;
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

.plusBtn {
  position: absolute;
  bottom: 5vh;
  right: 5vw;
  width: 3.5rem;
  height: 3.5rem;
  font-size: 3.5rem;
  border-radius: 50%;
  color: white;
  background-color: $green-3;
  border: none;

  &:hover {
    color: white;
    background-color: $green-6;
  }

  &:active {
    box-shadow: 0 0 20px $green-4;
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
}

.modalPostCoverCtn {
  width: 100%;

  &_img {
    width: 100%;
    object-fit: cover;
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

@media screen and (min-width: 992px) {
  .plusBtn {
    bottom: 15vh;
    right: 10vw;
  }
}
</style>