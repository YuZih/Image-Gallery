<template>
  <header>

    <!-- logo -->
    <div class="logo text-center mt-4 mb-1 my-md-4">
      <a href="#">Yuzu x Pic</a>
    </div>

    <!-- navbar -->
    <nav class="navbar navbar-expand-md navbar-light" :class="{ 'navbar-border': isSticky }">
      <div class="container-fluid justify-content-center">

        <!-- hamburger icon -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar1"
          aria-controls="navbar1" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- nav tabs -->
        <div class="collapse navbar-collapse" id="navbar1">
          <ul class="navbar-nav me-auto justify-content-evenly w-100">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#">POST</a>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                ALBUM
                <font-awesome-icon id="caret-icon" :icon="['fas', 'angle-down']" size="xs" style="color: #808080;" />
              </a>
              <ul class="dropdown-menu" id="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <div class="dropdown-header">Wedding Series</div>
                </li>
                <li><a class="dropdown-item" href="#">Wedding-1</a></li>
                <li><a class="dropdown-item" href="#">Wedding-2</a></li>
                <li>
                  <hr class="dropdown-divider">
                </li>

                <li>
                  <div class="dropdown-header">Vintage Series</div>
                </li>
                <li><a class="dropdown-item" href="#">Vintage-1</a></li>
                <li><a class="dropdown-item" href="#">Vintage-2</a></li>
              </ul>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#">ABOUT</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <img class="img-fluid" src="@/assets/images/others/404.jpg" alt="">
  </header>
</template>



<script>
export default {
  name: "Header",
  data() {
    return {
      isSticky: false,
      navbarOffsetTop: 0,
    };
  },
  mounted() {
    // 使用 offsetTop 來獲取 navbar 的初始位置
    this.navbarOffsetTop = this.$el.querySelector('.navbar').offsetTop;

    // 使用 $nextTick 來確保在為 window 添加滾動事件監聽器前，navbar 元素已經在 DOM 中完成渲染與更新
    // 避免在剛剛創建或更新組件時立即觸發事件，從而導致不必要的調用和渲染
    this.$nextTick(() => {
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
      if (this.isSticky) {
        console.log('works');
      }
    },
  },
}
</script>



<style lang="scss" scoped>
@use "@/assets/scss/setups.scss";

header {
  position: relative;

  .navbar-toggler {
    position: absolute;
    top: -35px;
    left: 0px;
    border: none;
  }
}

.logo {
  @extend %logo-font;
  font-size: 28px;
  font-weight: 600;

  :hover {
    cursor: pointer;
  }
}

.navbar {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: grey;
}

.navbar-border {
  border-bottom: 2px solid #f7f7f7;
}

#navbar1 {
  max-width: 800px;

  .navbar-nav {
    text-align: center;

    .nav-item {
      padding: 1rem;
    }

    .dropdown-menu {
      line-height: 1.5rem;
      text-align: center;

      .dropdown-header {
        font-style: italic;
      }

      .dropdown-divider {
        display: none;
      }
    }
  }
}


// Small screen: mobile
@media screen and (min-width: 576px) {
  .logo {
    font-size: 34px;
  }
}


// medium screen: iPad, PC
@media screen and (min-width: 768px) {
  .logo {
    font-size: 40px;
  }

  //show dropdown menu when mouse hovers
  .dropdown {
    position: relative;

    .dropdown-menu {
      display: none;

      .dropdown-divider {
        display: block;
      }
    }

    &:hover {
      .dropdown-menu {
        display: block;
        position: absolute;
        left: 0;
        top: 2.3rem;
      }
    }
  }

  #caret-icon {
    display: none;
  }
}
</style>