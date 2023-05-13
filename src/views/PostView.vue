<template>
  <DefaultLayout>
    <section class="container">
      <div class="text-center">
        <img class="img-fluid"
             src="@/assets/images/others/coming.jpg"
             alt="coming-soon">
      </div>
    </section>
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


<style lang="scss" scoped>
img {
  margin-top: 50px;
  margin-bottom: 50px;
  width: 100vw;
}
</style>

