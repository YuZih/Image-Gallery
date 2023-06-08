<template>
  <DefaultLayout>
    <main class="formCtn container my-4">
      <form @submit.prevent.stop="handleSubmit"
            role="form">

        <h3 class="container text-center">Add New Post</h3>
        <!-- Title field -->
        <div class="row">
          <label for="inputTitle"
                 class="col-sm-2 col-form-label">Title<span>*</span></label>
          <div class="field col-sm-10">
            <input v-model="formData.title"
                   type="text"
                   class="form-control"
                   id="inputTitle"
                   name="title"
                   placeholder="Enter post title here">
            <div v-show="showErrorMsg && !title.trim()"
                 class="errorMsg">Title is required.</div>
          </div>

        </div>

        <!-- Content field -->
        <div class="row">
          <label for="contentArea"
                 class="col-sm-2 col-form-label">Content<span>*</span></label>
          <div class="field col-sm-10">
            <textarea v-model="formData.content"
                      class="form-control"
                      id="contentArea"
                      name="content"
                      rows="10"
                      placeholder="Enter what you want to share here"></textarea>
            <div v-show="showErrorMsg && !content.trim()"
                 class="errorMsg">Content is required.</div>
          </div>

        </div>

        <!-- Post Cover Image field -->
        <div class="row">
          <label for="inputCover"
                 class="col-sm-2 col-form-label">Cover Image<span>*</span></label>
          <div class="field col-sm-4 ">
            <!-- Hide fileInput to replace default displaying with custom text -->
            <input class="d-none"
                   type="file"
                   accept="image/*"
                   id="inputCover"
                   name="cover"
                   ref="fileInput"
                   @change="updateFileName">
            <!-- button for choosing file -->
            <button class="chooseBtn form-control"
                    type="button"
                    @click="triggerFileInput">{{ fileName ? "Reselect file" : "Choose file" }}</button>
            <div v-show="showErrorMsg && !fileName"
                 class="errorMsg">Cover image is required.</div>
          </div>
          <div class="col-sm-6">
            <input type="text"
                   readonly
                   class="form-control"
                   :value="fileName"
                   placeholder="No file chosen">
          </div>
          <!-- image preview -->
          <div v-if="coverPreviewURL"
               class="coverCtn">
            <div class="col-sm-10 offset-sm-2">
              <img :src="coverPreviewURL"
                   alt="cover-preview"
                   class="coverPreview">
            </div>
          </div>
        </div>

        <!-- Album field -->
        <div class="row">
          <label for="selectAlbum"
                 class="col-sm-2 col-form-label">Album (Optional)</label>
          <div class="col-sm-10">
            <select v-model="formData.album"
                    class="form-control"
                    id="selectAlbum"
                    name="albums">
              <option value=""
                      class="text-center"
                      selected>- Choose which album you want to show on the post -</option>
              <option v-for="(albumName, index) in albumNames"
                      :key="index"
                      :value="albumName">{{ albumName }}</option>
            </select>
          </div>
        </div>

        <!-- Post button -->
        <div class="container text-center">
          <button @click="handleReset"
                  class="resetBtn"
                  type="button">
            Reset
          </button>
          <button class="postBtn"
                  type="submit"
                  :disabled="isProcessing"
                  :style="{ cursor: isProcessing ? 'not-allowed' : 'pointer' }">
            {{ isProcessing ? "Processing" : "Post" }}
          </button>
        </div>
      </form>
    </main>
  </DefaultLayout>
</template>


<script>
import { DefaultLayout } from "@/components";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AdminAddView",
  components: {
    DefaultLayout
  },
  data() {
    return {
      isProcessing: false,
      showErrorMsg: false,
      fileName: null, // for file name showing
      coverPreviewURL: null, // for preview showing
      formData: {
        date: "",
        title: "",
        content: "",
        album: "",
        cover: "",
      },
    }
  },
  computed: {
    ...mapGetters(["albumsInOrder"]),
    albumNames() {
      return Object.values(this.albumsInOrder).flat();
    },
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
    handleReset() {
      this.isProcessing = false;
      this.showErrorMsg = false;
      this.fileName = null;
      this.coverPreviewURL = null;
      this.$refs.fileInput.value = ""; // Clear value of fileInput
      this.formData.date = "";
      this.formData.title = "";
      this.formData.content = "";
      this.formData.album = "";
    },
    ...mapActions(["toAddPost"]),
    handleSubmit() {
      // Step 1: Validate form: Ensure all required fields and cover photo are provided.
      if (!this.formData.title.trim() || !this.formData.content.trim() || !this.fileName) {
        this.showErrorMsg = true;
        return;
      }

      // Step 2: Update states of post button and error message 
      this.isProcessing = true;
      this.showErrorMsg = false;

      // Step 3: Upload cover image to Cloud Storage and get the url of uploaded cover image
      // Todo: Write your code here.

      // Step 4: Send data back to Firestore database
      //  Todo: Write your code here.
      // this.formData.cover = coverURL; // 
      this.formData.date = new Date().getTime();
      console.log(this.formData);
      this.toAddPost(this.formData);
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
    color: rgb(218, 90, 165);
    font-size: 1.1rem;
  }
}

.form-control:focus {
  box-shadow: 0 0 10px $green-4;
}

.postBtn,
.resetBtn {
  width: 110px;
  height: 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 1rem;
  color: white;
  border: none;
  border-radius: 10px;
}

.postBtn {
  background-color: $green-3;

  &:hover {
    background-color: $green-6;
  }

  &:active {
    box-shadow: 0 0 20px $green-4;
  }
}

.resetBtn {
  background-color: rgb(242, 194, 222);

  &:hover {
    background-color: rgb(218, 90, 165);
  }

  &:active {
    box-shadow: 0 0 20px rgb(192, 107, 156);
  }
}

input::placeholder,
textarea::placeholder {
  color: $shadow-grey;
}

.row {
  display: flex;
  align-items: center;
  margin-bottom: 2.2rem;
}

.coverCtn {
  margin-top: .8rem;

  .coverPreview {
    width: 50%;
  }
}



.field {
  position: relative;

  .errorMsg {
    position: absolute;
    left: 12px;
    bottom: -20px;
    color: rgb(218, 90, 165);
    font-size: 0.9rem;
    font-weight: bold;
  }
}
</style>