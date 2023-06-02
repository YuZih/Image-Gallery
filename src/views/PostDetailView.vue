<template>
  <DefaultLayout>
    Post detail view!


  </DefaultLayout>
</template>

<script>
import { DefaultLayout, Spinner } from "@/components";
import { mapState, mapActions } from "vuex";

export default {
  name: "PostDetailView",
  data() {
    return {
      isLoading: true,
    }
  },
  components: {
    DefaultLayout, Spinner
  },
  computed: {
    ...mapState(["posts"]),
  },
  created() {
    this.fetchAllPosts();
  },
  methods: {
    ...mapActions(["toFetchPosts"]),
    async fetchAllPosts() {
      try {
        await this.toFetchPosts();
        this.isLoading = false;
      } catch (e) {
        this.isLoading = false;
      }

    },
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

