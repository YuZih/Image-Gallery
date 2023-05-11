<template>
  <div>
    <Header />
    <Navbar />
    <main class="mt-5 mt-md-3">
      <slot />
    </main>
    <Footer />
  </div>
</template>


<script>
import { Header, Navbar, Footer } from "@/components";

export default {
  name: "DefaultLayout",
  components: {
    Header, Navbar, Footer
  },
};
</script>
