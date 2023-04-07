<template>
  <header class="container-fluid">

    <!-- logo -->
    <div class="logo text-center mt-4 mt-md-5 mb-md-4">
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

    <div class="tt">
      main
    </div>
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
    this.navbarOffsetTop = this.$el.querySelector('.navbar').offsetTop;
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll);
    });
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isSticky = window.pageYOffset >= this.navbarOffsetTop;
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
  // border: 1px red solid;

  :hover {
    cursor: pointer;
  }
}

.navbar {
  // border: 1px green solid;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-border {
  border-bottom: 2px solid #f7f7f7;
}

.tt {
  height: 1000px;
}

#navbar1 {
  // border: 1px blue solid;
  max-width: 800px;

  .navbar-nav {
    text-align: center;

    .nav-item {
      padding: 1rem;
    }

    .dropdown-menu {
      line-height: 1.5rem;
      text-align: center;
      // border: 1px green solid;

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