<template>
  <header id="logo-header">

    <!-- logo -->
    <div class="logo text-center py-2 my-md-4">
      <router-link :to="{ name: 'home' }">Yuzu x Pic</router-link>
    </div>
  </header>
</template>



<script>
export default {
  name: "Header",
}
</script>



<style lang="scss" scoped>
@use "@/assets/scss/header.scss";
</style>