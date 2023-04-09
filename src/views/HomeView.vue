<template>
  <div>
    <!-- header & nav -->
    <Header />
    <Navbar />
  
    <img class="img-fluid" src="@/assets/images/others/404.jpg" alt="">
    <img class="img-fluid" src="@/assets/images/others/404.jpg" alt="">
    <img class="img-fluid" src="@/assets/images/others/404.jpg" alt="">
    <!-- carousel -->
    <!-- main -->
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'HomeView',
  components: {
    Header, Navbar
  }
}
</script>


<style lang="scss" scoped></style>