<template>
  <DefaultLayout>
    <div v-if="isLoading"
         class="spinnerCtn">
      <Spinner />
    </div>

    <div v-else>
      <main class="tableCtn container">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Post Title</th>
              <th scope="col">Date</th>
              <th scope="col">Content</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(post, index) in posts"
                :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ post.title }}</td>
              <td>May, 23, 2023</td>
              <td>{{ filteredContent(post.content) }}</td>
              <td class="iconCtn"><button @click="toAddPostPage()"
                        class="btn btn-light"><font-awesome-icon :icon="['fas', 'pen']" /></button>
                <button class="btn btn-light"><font-awesome-icon :icon="['fas', 'xmark']" /></button>
              </td>
            </tr>
          </tbody>
        </table>
        <router-link :to="{
          name: 'adminAdd'
        }"><button class="plusBtn">+</button></router-link>
      </main>
    </div>
  </DefaultLayout>
</template>


<script>
import { DefaultLayout, Spinner } from "@/components";
import { mapState } from "vuex";

export default {
  name: "AdminView",
  components: {
    DefaultLayout, Spinner
  },
  computed: {
    isLoading() {
      return this.isLoadingPost || !this.posts;
    },
    ...mapState(["isLoadingPost", "posts"]),
  },
  methods: {
    filteredContent(content) {
      let replacedContent = content.replace(/<br>/g, ' ');
      return replacedContent.length >= 40 ? replacedContent.slice(0, 40) + "..." : replacedContent;
    },
    toAddPostPage() {
      this.$router.push({ name: "adminEdit" });
    },
  },
};
</script>


<style lang="scss" scoped>
@import "@/assets/scss/color.scss";

.tableCtn {
  max-width: 960px;
  min-height: 75vh;
}

.table-striped>tbody>tr:nth-child(2n+1)>td,
.table-striped>tbody>tr:nth-child(2n+1)>th {
  background-color: #edfffd;
}

.table-hover>tbody>tr:hover>td,
.table-hover>tbody>tr:hover>th {
  background-color: #edfaf9;
}

.table>tbody {
  border-top: 2px groove $green-6;
}

.table>thead {
  font-weight: 500;
}

.iconCtn {
  button {
    margin: 3px 3px 3px 3px;
  }
}


.plusBtn {
  position: fixed;
  bottom: 120px;
  right: 170px;
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
</style>