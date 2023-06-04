<template>
  <DefaultLayout>
    <main class="formCtn container my-4">
      <h3 class="container text-center">Add New Post</h3>
      <!-- Title field -->
      <div class="mb-3 mb-md-4 row">
        <label for="inputTitle"
               class="col-sm-2 col-form-label">Title<span>*</span></label>
        <div class="col-sm-10">
          <input type="text"
                 class="form-control"
                 id="inputTitle"
                 placeholder="Enter post title here">
        </div>
      </div>

      <!-- Post Cover Image field -->
      <div class="mb-3 mb-md-4 row">
        <label for="inputCover"
               class="col-sm-2 col-form-label">Cover Image<span>*</span></label>
        <div class="col-sm-10">
          <input type="file"
                 class="form-control"
                 id="inputCover">
        </div>
      </div>

      <!-- Content field -->
      <div class="mb-3 mb-md-4 row">
        <label for="contentArea"
               class="col-sm-2 col-form-label">Content<span>*</span></label>
        <div class="col-sm-10">
          <textarea class="form-control"
                    id="contentArea"
                    rows="10"
                    placeholder="Enter what you want to share here"></textarea>
        </div>
      </div>

      <!-- Album field -->
      <div class="mb-3 mb-md-4 row">
        <label for="selectAlbum"
               class="col-sm-2 col-form-label">Album (Optional)</label>
        <div class="col-sm-10">
          <select class="form-control"
                  name="albums"
                  id="selectAlbum">
            <option value=""
                    selected>--Choose which album you want to show on the post--</option>
            <option value="V-1">V-1</option>
            <option value="V-2">V-2</option>
            <option value="W-1">W-1</option>
            <option value="W-2">W-2</option>
            <option value="W-3">W-3</option>
          </select>
        </div>
      </div>

      <div class="container text-center">
        <input class="postBtn"
               type="button"
               value="Post">
      </div>

    </main>
  </DefaultLayout>
</template>


<script>
import { DefaultLayout } from "@/components";

export default {
  name: "AdminAddView",
  components: {
    DefaultLayout
  },
};
</script>


<style lang="scss" scoped>
@import "@/assets/scss/color.scss";

.formCtn {
  width: 900px;
  min-height: 65vh;

  h3 {
    color: $green-4;
    border-bottom: 6px groove $green-2;
    line-height: 3rem;
    margin-bottom: 2rem;
  }
}

.col-form-label {
  font-weight: 600;
  text-align: end;
  color: $green-6;

  &>span {
    color: rgb(241, 169, 226);
    font-size: 1.1rem;
  }
}

.form-control:focus {
  box-shadow: 0 0 10px $green-4;
}

.postBtn {
  width: 110px;
  height: 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 2rem;
  color: white;
  background-color: $green-3;
  border: none;
  border-radius: 10px;

  &:hover {
    color: white;
    background-color: $green-6;
  }

  &:active {
    box-shadow: 0 0 20px $green-4;
  }
}

input::placeholder,
textarea::placeholder {
  color: $shadow-grey;
}

.row {
  display: flex;
  align-items: center;
}
</style>