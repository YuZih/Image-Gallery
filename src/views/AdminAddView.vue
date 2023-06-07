<template>
  <DefaultLayout>
    <main class="formCtn container my-4">
      <form @submit.prevent.stop="handleSubmit"
            role="form">

        <h3 class="container text-center">Add New Post</h3>
        <!-- Title field -->
        <div class="mb-3 mb-md-4 row">
          <label for="inputTitle"
                 class="col-sm-2 col-form-label">Title<span>*</span></label>
          <div class="col-sm-10">
            <input v-model="title"
                   type="text"
                   required
                   class="form-control"
                   id="inputTitle"
                   name="title"
                   placeholder="Enter post title here">
          </div>
          <div class="col-sm-10 offset-sm-2">Title is required.</div>
        </div>

        <!-- Content field -->
        <div class="mb-3 mb-md-4 row">
          <label for="contentArea"
                 class="col-sm-2 col-form-label">Content<span>*</span></label>
          <div class="col-sm-10">
            <textarea v-model="content"
                      required
                      class="form-control"
                      id="contentArea"
                      name="content"
                      rows="10"
                      placeholder="Enter what you want to share here"></textarea>
          </div>
          <div class="col-sm-10 offset-sm-2">Content is required.</div>
        </div>

        <!-- Post Cover Image field -->
        <div class="mb-3 mb-md-4 row">
          <label for="inputCover"
                 class="col-sm-2 col-form-label">Cover Image<span>*</span></label>
          <div class="col-sm-2 d-flex">
            <!-- Hide fileInput to replace default displaying with custom text -->
            <input type="file"
                   accept="image/*"
                   class="d-none"
                   id="inputCover"
                   name="cover"
                   ref="fileInput"
                   @change="updateFileName">
            <!-- button for choosing file -->
            <button class="form-control"
                    type="button"
                    @click="triggerFileInput">{{ fileName ? "Reselect file" : "Choose file" }}</button>
          </div>
          <div class="col-sm-8">
            <input type="text"
                   readonly
                   class="form-control"
                   :value="fileName"
                   placeholder="No file chosen">
          </div>
          <div class="col-sm-10 offset-sm-2">Cover image is required.</div>
        </div>

        <!-- image preview -->
        <div v-if="coverPreviewURL"
             class="mb-3 mb-md-4 row">
          <div class="col-sm-10 offset-sm-2">
            <img :src="coverPreviewURL"
                 alt="cover-preview"
                 class="coverPreview">
          </div>
        </div>

        <!-- Album field -->
        <div class="mb-3 mb-md-4 row">
          <label for="selectAlbum"
                 class="col-sm-2 col-form-label">Album (Optional)</label>
          <div class="col-sm-10">
            <select v-model="album"
                    class="form-control"
                    id="selectAlbum"
                    name="albums">
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

        <!-- Post button -->
        <div class="container text-center">
          <button class="postBtn"
                  type="submit"
                  :disabled="isProcessing">
            {{ isProcessing ? "Processing" : "Post" }}
          </button>
        </div>
      </form>
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
  data() {
    return {
      isProcessing: false,
      title: "",
      content: "",
      album: "",
      fileName: null, // for file name showing
      coverPreviewURL: null, // for preview showing
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    updateFileName(e) {
      if (e.target.files[0]) {
        this.fileName = e.target.files[0].name;
        // create a blob URL representing the file
        this.coverPreviewURL = URL.createObjectURL(e.target.files[0]);
        console.log(e.target.files[0]);
        console.log(this.coverPreviewURL);
      }
    },
    handleSubmit(e) {
      const form = e.target;
      const formData = new FormData(form);
      console.log(formData);
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
    },
  }
}
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
  margin: 1rem;
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

.coverPreview {
  width: 50%;
}
</style>