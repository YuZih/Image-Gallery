<template>
  <DefaultLayout>
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
            <td class="iconCtn"><button class="btn btn-light"><font-awesome-icon :icon="['fas', 'pen']" /></button> 
              <button class="btn btn-light"><font-awesome-icon :icon="['fas', 'xmark']" /></button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  </DefaultLayout>
</template>


<script>
import { DefaultLayout } from "@/components";
import { mapState } from "vuex";

export default {
  name: "AdminView",
  components: {
    DefaultLayout
  },
  computed: {
    ...mapState(["posts"]),
  },
  methods: {
    filteredContent(content) {
      let replacedContent = content.replace(/<br>/g, ' ');
      return replacedContent.length >= 40 ? replacedContent.slice(0, 40) + "..." : replacedContent;
    },
  },
};
</script>


<style lang="scss" scoped>
@import "@/assets/scss/color.scss";

.tableCtn {
  max-width: 960px;
  min-height: 70vh;
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
</style>