<template>
  <header class="container-fluid">

    <!-- logo -->
    <div class="logo text-center mt-4 my-md-4">
      <a href="#">Yuzu x Pic</a>
    </div>


    <!-- navbar -->
    <nav class="navbar navbar-expand-md navbar-light">
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
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                ALBUM
              </a>

              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
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
              <a class="nav-link">ABOUT</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <hr>
  </header>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style lang="scss" scoped>
@use "@/assets/scss/setups.scss";

// XS screen
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
  border: 1px red solid;

  :hover {
    cursor: pointer;
  }
}

#navbar1 {
  border: 1px blue solid;
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
    .dropdown-menu {
      display: none;

      .dropdown-divider {
        display: block;
      }
    }

    &:hover {
      .dropdown-menu {
        display: block;
      }
    }
  }
}
</style>