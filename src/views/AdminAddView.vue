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
            <div v-show="showErrorMsg && !formData.title.trim()"
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
            <div v-show="showErrorMsg && !formData.content.trim()"
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
        <!-- <div class="row">
          <label for="selectAlbum"
                 class="col-sm-2 col-form-label">Album (Optional)</label>
          <div class="col-sm-10">
            <select v-model="formData.album"
                    class="form-control"
                    id="selectAlbum"
                    name="albums">
              <option value=""
                      class="text-center"
                      selected>- Choose album if you want it to show on the post -</option>
              <option v-for="(albumName, index) in albumNames"
                      :key="index"
                      :value="albumName">{{ albumName }}</option>
            </select>
          </div>
        </div> -->

        <!-- Post button -->
        <div class="container text-center">
          <button @click="handleReset"
                  class="resetBtn"
                  type="button"
                  :disabled="isProcessing"
                  :style="{ cursor: isProcessing ? 'not-allowed' : 'pointer' }">
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
import { mapGetters, mapActions, mapState } from "vuex";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/store/firebase.js";

export default {
  name: "AdminAddView",
  components: {
    DefaultLayout
  },
  data() {
    return {
      mode: "add",
      isProcessing: false,
      showErrorMsg: false,
      fileChanged: false, // for edit mode
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
  mounted() {
    if (this.$route.name === "adminEdit") {
      this.mode = "edit";
      const id = this.$route.params.id;
      this.$store.dispatch("toChangeFocusPostID", id);
    }
  },
  beforeRouteLeave(to, from, next) {
    // Reset focusPostID if leaving to other pages from edit page
    if (to.name !== "adminAdd" && to.name !== "adminEdit") {
      this.toChangeFocusPostID("");
    }
    next();
  },
  computed: {
    ...mapState(["postChanged"]),
    ...mapGetters(["albumsInOrder", "postFilterByPostID"]),
    albumNames() {
      return Object.values(this.albumsInOrder).flat();
    },
  },
  watch: {
    postFilterByPostID() {
      if (this.mode === "edit") {
        console.log("postFilterByPostID: ", this.postFilterByPostID);
        this.formData.title = this.postFilterByPostID.title;
        this.formData.content = this.postFilterByPostID.content;
        this.formData.album = this.postFilterByPostID.album;
        this.formData.cover = this.postFilterByPostID.cover;
        this.coverPreviewURL = this.postFilterByPostID.cover;
        this.fileName = "original post cover";
      }
    },
    postChanged() {
      // redirect to admin page after clicking submit button
      this.$router.push({ name: "admin" });
    }
  },
  methods: {
    ...mapActions(["toChangeFocusPostID", "toAddPost", "toUpdatePost"]),
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    updateFileName(event) {
      // Access to the image file object
      const file = event.target.files[0];
      if (file) {
        this.fileChanged = true;
        this.fileName = file.name; // Change fileName to show
        // Create a blob URL representing the file
        this.coverPreviewURL = URL.createObjectURL(file);
        console.log(file);
        console.log(this.coverPreviewURL);
      }
    },
    handleReset() {
      this.$refs.fileInput.value = ""; // Clear the value of fileInput
      this.isProcessing = false;
      this.showErrorMsg = false;
      this.fileName = null;
      this.coverPreviewURL = null;
      this.formData.date = "";
      this.formData.title = "";
      this.formData.content = "";
      this.formData.album = "";
    },
    async handleSubmit() {
      // Step 1: Validate form: Ensure all required fields and cover photo are provided.
      if (!this.formData.title.trim() || !this.formData.content.trim() || !this.fileName) {
        this.showErrorMsg = true;
        return;
      }

      // Step 2: Update states of post button and error message 
      this.isProcessing = true;
      this.showErrorMsg = false;

      // Step 3: Check if cover URL needs to update or not
      if (this.fileChanged) {
        const file = this.$refs.fileInput.files[0];
        if (file) {
          const storageRef = ref(storage, 'post-cover/' + file.name);
          const uploadTask = uploadBytesResumable(storageRef, file);

          // Create a promise to handle the upload process
          const uploadPromise = new Promise((resolve, reject) => {
            uploadTask.on('state_changed', null,
              (error) => {
                // Handle uploading error
                console.log("Error uploading cover image: ", error);
                reject(error);
              },
              () => {
                // Upload completed, get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  this.formData.cover = downloadURL; // Update cover URL
                  console.log('File available at', downloadURL);
                  resolve();
                });
              }
            );
          });
          // Wait for the upload and URL fetching to finish
          await uploadPromise;
        }
      }

      // Step 4: Send back to database
      this.formData.date = new Date().getTime(); // Update post date
      if (this.mode === "edit") {
        console.log("toUpdatePost payload: ", this.formData);
        this.toUpdatePost({ id: this.$route.params.id, newPost: this.formData });
      } else {
        console.log("toAddPost payload: ", this.formData);
        this.toAddPost(this.formData);
      }
    },
  }
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/color.scss";

.formCtn {
  max-width: 900px;
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
  text-align: start;
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
  background-color: $pink-0;

  &:hover {
    background-color: $pink-2;
  }

  &:active {
    box-shadow: 0 0 20px $pink-1;
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
    color: $pink-2;
    font-size: 0.9rem;
    font-weight: bold;
  }
}

@media screen and (min-width: 576px) {
  .col-form-label {
    text-align: end;
  }
}
</style>