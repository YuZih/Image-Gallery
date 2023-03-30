<template>
  <header>
    <div class="h container">
      <div class="h__brand">Yuzu x Pic</div>

      <div class="h__navbar nav-justified">
        <ul class="nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">HOME</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">POST</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
              aria-expanded="false">Dropdown</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Wedding-1</a></li>
              <li><a class="dropdown-item" href="#">Wedding-2</a></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><a class="dropdown-item" href="#">Vintage-1</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link">ABOUT</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style lang="scss">
.h {
  // max-width: 768px;
  text-align: center;
  border: 1px green solid;

  &__brand {
    font-family: 'Dancing Script', cursive;
    font-size: 30px;
    font-weight: 500;
    margin: 30px 0 30px 0;
    border: 1px blue solid;
  }

  &__navbar {
    font-size: 14px;
    border: 1px red solid;

  }
}
</style>