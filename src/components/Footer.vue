<template>
  <div class="footer-ctn container-fluid mx-auto">
    <footer class="mx-auto d-flex">
      <span><a href="https://www.instagram.com/yuzuxpic/"
           target="_blank"><font-awesome-icon :icon="['fab', 'instagram']" />
          <span class="d-xs-none d-sm-inline-block">&nbsp;Follow me on Instagram</span>
        </a></span>
      <span><font-awesome-icon :icon="['far', 'copyright']"
                           size="sm" />&nbsp;yuzuxpic</span>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/color.scss";

.footer-ctn {
  border-top: 3px solid $main-grey;
  height: 50px;
  padding: 1rem;
}

footer {
  width: 100%;
  height: 30px;
  color: $green-5;
  font-size: .8rem;
  line-height: .8rem;
  justify-content: space-evenly;

  span a {
    color: $green-5; // Instagram icon color
    margin-right: 10px;
  }
}

@media screen and (min-width: 768px) {
  footer {
    width: 35%;
    justify-content: space-between;
  }
}
</style>