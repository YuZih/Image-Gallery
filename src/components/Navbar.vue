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
        <ul class="navbar-nav me-auto justify-content-between w-100">
          <li class="nav-item">
            <a class="nav-link"
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
              <font-awesome-icon id="angle-down"
                                 :icon="['fas', 'angle-down']"
                                 size="xs" />
              <font-awesome-icon id="angle-up"
                                 :icon="['fas', 'angle-up']"
                                 size="xs" />
            </a>
            <ul class="dropdown-menu"
                id="dropdown-menu"
                aria-labelledby="navbarDropdown">
              <li>
                <div class="dropdown-header">&lt;&lt;Choose one&gt;&gt;</div>
              </li>
              <li>
                <a class="dropdown-item"
                   href="#">All Series</a>
              </li>
              <div class="divider-container">
                <hr class="dropdown-divider" />
              </div>
              <li v-for="(_, albumSeries) in albums"
                  :key="albumSeries">
                <a class="dropdown-item"
                   href="#">{{ albumSeries }}</a>
              </li>
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
import { mapState } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {
      isSticky: false,
      navbarOffsetTop: 104, // 因 navbar.offsetTop 會變動而導致 navbar-border 樣式跑掉，故直接設定此數值為 104（ Header 總高）
    };
  },
  computed: {
    ...mapState(["albums"]),
  },
  mounted() {
    // 使用 $nextTick 來確保 navbar 元素已經在 DOM 中完成渲染與更新
    // 避免 navbar 在還未準備好前就欲添加監聽事件以及讀取 offsetTop（＝>改直接設定數值不需再去讀取offsetTop數值）
    this.$nextTick(() => {
      // this.navbarOffsetTop = this.$refs.navbar.offsetTop;
      window.addEventListener("scroll", this.handleScroll);
    });
  },
  beforeDestroy() {
    //刪除滾動事件的監聽器，以避免內存洩漏
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    // 若當前滾動距離大於等於 navbar 的初始位置，navbar 會藉由 isSticky 新添 navbar-border 的類別
    handleScroll() {
      this.isSticky = window.pageYOffset >= this.navbarOffsetTop;
    },
  },
}
</script>

<style lang="scss" scoped>
@use "@/assets/scss/header.scss";
</style>