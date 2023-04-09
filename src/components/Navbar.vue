<template>
  <!-- navbar -->
  <nav ref="navbar"
       class="navbar navbar-expand-md navbar-light"
       :class="{ 'navbar-border': isSticky }">
    <div class="container-fluid justify-content-center">

      <!-- hamburger icon -->
      <button class="navbar-toggler collapsed d-md-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbar1"
              aria-controls="navbar1"
              aria-expanded="false"
              aria-label="Toggle navigation">
        <div class="toggler-icon top-bar"></div>
        <div class="toggler-icon middle-bar"></div>
        <div class="toggler-icon bottom-bar"></div>
      </button>

      <!-- navigation tabs -->
      <div id="navbar1"
           class="collapse navbar-collapse mt-md-2">
        <ul class="navbar-nav me-auto justify-content-evenly w-100">
          <li class="nav-item">
            <a class="nav-link active"
               aria-current="page"
               href="#">Home</a>
          </li>

          <li class="nav-item">
            <a class="nav-link"
               href="#">POST</a>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link"
               href="#"
               id="navbarDropdown"
               role="button"
               data-bs-toggle="dropdown"
               aria-expanded="false">
              ALBUM
              <font-awesome-icon id="caret-icon"
                                 :icon="['fas', 'angle-down']"
                                 size="xs"
                                 style="color: #808080;" />
            </a>
            <ul class="dropdown-menu"
                id="dropdown-menu"
                aria-labelledby="navbarDropdown">
              <li>
                <div class="dropdown-header">Wedding Series</div>
              </li>
              <li><a class="dropdown-item"
                   href="#">Wedding-1</a></li>
              <li><a class="dropdown-item"
                   href="#">Wedding-2</a></li>
              <li>
                <div class="divider-container">
                  <hr class="dropdown-divider">
                </div>
              </li>

              <li>
                <div class="dropdown-header">Vintage Series</div>
              </li>
              <li><a class="dropdown-item"
                   href="#">Vintage-1</a></li>
              <li><a class="dropdown-item"
                   href="#">Vintage-2</a></li>
            </ul>
          </li>

          <li class="nav-item">
            <a class="nav-link"
               href="#">ABOUT</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script>
export default {
  name: "Navbar",
  data() {
    return {
      isSticky: false,
      navbarOffsetTop: 0,
    };
  },
  mounted() {
    // 使用 $nextTick 來確保 navbar 元素已經在 DOM 中完成渲染與更新
    // 避免 navbar 在還未準備好前就欲取得 offsetTop 以及添加監聽事件
    this.$nextTick(() => {
      this.navbarOffsetTop = this.$refs.navbar.offsetTop;
      window.addEventListener('scroll', this.handleScroll);
    });
  },
  beforeDestroy() {
    //刪除滾動事件的監聽器，以避免內存洩漏
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    // 若當前滾動距離大於等於 navbar 的初始位置，navbar 會藉由 isSticky 新添 navbar-border 的類別
    handleScroll() {
      this.isSticky = window.pageYOffset >= this.navbarOffsetTop;
      console.log("p:", window.pageYOffset);
      console.log("n:", this.navbarOffsetTop)
    },
  },
}
</script>

<style lang="scss" scoped>
@use "@/assets/scss/header.scss";
</style>