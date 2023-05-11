<template>
  <DefaultLayout>
    <div>
      <div>Post page!</div>
      <img class="img-fluid"
           src="@/assets/images/others/404.jpg"
           alt="">
      <img class="img-fluid"
           src="@/assets/images/others/404.jpg"
           alt="">
      <img class="img-fluid"
           src="@/assets/images/others/404.jpg"
           alt="">
    </div>
  </DefaultLayout>
</template>

<script>
import { DefaultLayout } from "@/components";
export default {
  name: "PostView",
  components: {
    DefaultLayout,
  },
};
</script>


