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
            <router-link :to="{ name: 'home' }"
                         class="nav-link toCollapse"
                         aria-current="page">HOME</router-link>
          </li>

          <li class="nav-item">
            <router-link :to="{ name: 'about' }"
                         class="nav-link toCollapse">ABOUT</router-link>
          </li>

          <li class="nav-item">
            <router-link :to="{ name: 'post' }"
                         class="nav-link toCollapse">POST</router-link>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link"
               :class="{ activeLink: $route.path.includes('/album') }"
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
                <div class="dropdown-header">&lt;&lt; Select Series &gt;&gt;</div>
              </li>
              <li>
                <router-link :to="{ name: 'album' }"
                             class="dropdown-item toCollapse">All Series</router-link>
              </li>
              <div class="divider-container">
                <hr class="dropdown-divider" />
              </div>

              <!-- Automatically generate dropdown-item -->
              <li v-for="(_, albumSeries) in  albums "
                  :key="albumSeries">
                <router-link :to="{ name: 'series', params: { seriesName: albumSeries.replace(/\s+/g, '').toLowerCase() } }"
                             class="dropdown-item toCollapse">{{ albumSeries }}</router-link>
              </li>
            </ul>
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
      navbarOffsetTop: 104, // Since the 'navbar.offsetTop' value may change and cause the 'navbar-border' style to break, set this value directly to 104 (the total height of the Header).
    };
  },
  computed: {
    ...mapState(["albums"]),
  },
  mounted() {
    // Use '$nextTick' to ensure that the navbar element has finished rendering and updating in the DOM.
    // Avoid attempting to add event listeners and reading 'offsetTop' before the navbar is ready. (=> set the value directly instead of reading the 'offsetTop' value)
    this.$nextTick(() => {
      // this.navbarOffsetTop = this.$refs.navbar.offsetTop;
      window.addEventListener("scroll", this.handleScroll);
    });
    this.addClickListener();
  },
  beforeDestroy() {
    //Remove event listeners to prevent memory leaks
    window.removeEventListener("scroll", this.handleScroll);
    this.removeClickListener();
  },
  methods: {
    // If the current scroll distance is greater than or equal to the navbar's initial position 'navbar-border' class will added to the navbar through 'isSticky'.
    handleScroll() {
      this.isSticky = window.pageYOffset >= this.navbarOffsetTop;
    },

    // Manually bind and unbind click events to fix the Bootstrap collapsing navigation bar issue
    onLinkClick(event) {
      if (event.target.classList.contains("toCollapse")) {
        const navbarToggler = this.$refs.navbar.querySelector(".navbar-toggler");
        if (!navbarToggler.classList.contains("collapsed")) {
          navbarToggler.click();
        }
      }
    },
    addClickListener() {
      this.$refs.navbar.addEventListener("click", this.onLinkClick);
    },
    removeClickListener() {
      this.$refs.navbar.removeEventListener("click", this.onLinkClick);
    },
  },
}
</script>

<style lang="scss" scoped>
@use "@/assets/scss/header.scss";
</style>