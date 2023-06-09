import Vue from "vue"
import VueRouter from "vue-router"
import store from '@/store'
import HomeView from "@/views/HomeView.vue"



Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "home"
  },
  {
    path: "/home",
    name: "home",
    component: HomeView },
  {
    path: "/about",
    name: "about",
    component: () => import(/* webpackChunkName: "about" */ "@/views/AboutView.vue")
  },
  {
    path: "/post",
    name: "post",
    component: () => import(/* webpackChunkName: "post" */ "@/views/PostView.vue"),
  },
  {
    path: "/post/:id",
    name: "postDetail",
    component: () => import(/* webpackChunkName: "postDetail" */ "@/views/PostDetailView.vue"),
    beforeEnter: postDetailGuard,
  }, 
  {
    path: "/album",
    component: () => import(/* webpackChunkName: "album" */ "@/views/AlbumView.vue"),
    children: [
      {
        path: "",
        name: "album",
        component: () => import(/* webpackChunkName: "allSeries" */ "@/views/SeriesAllView.vue"),
      },
      {
        path: ":seriesName",
        name: "series",
        component: () => import(/* webpackChunkName: "singleSeries" */ "@/views/SeriesSingleView.vue"),
        beforeEnter: albumGuard,
      },
      {
        path: ":seriesName/:galleryName",
        name: "gallery",
        component: () => import(/* webpackChunkName: "gallery" */ "@/views/GalleryView.vue"),
        beforeEnter: albumGuard,
      }
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/LoginView.vue")
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import(/* webpackChunkName: "admin" */ "@/views/AdminView.vue"),
    beforeEnter: adminGuard,
  },
  {
    path: "/admin/add",
    name: "adminAdd",
    component: () => import(/* webpackChunkName: "adminAdd" */ "@/views/AdminAddView.vue"),
  },
  {
    path: "/admin/edit/:id",
    name: "adminEdit",
    component: () => import(/* webpackChunkName: "adminAdd" */ "@/views/AdminAddView.vue"),
  },
  {
    path: "*",
    name: "notFound",
    component: () => import(/* webpackChunkName: "notFound" */ "@/views/NotFoundView.vue")
  }
]

const router = new VueRouter({
  routes,
  mode: "history",
  linkActiveClass: "activeLink",
  linkExactActiveClass: "exactActiveLink",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
})
export default router


async function albumGuard(to, from, next) {
  // Wait for the store(albums) to be initialized
  // Make sure that getter isValidAlbumParam works correctly
  await store.dispatch('initializeStore');
  
  const isValid = to.params.galleryName
    ? store.getters.isValidAlbumParam(to.params.seriesName, to.params.galleryName)
    : store.getters.isValidAlbumParam(to.params.seriesName);

  isValid ? next() : next("notFound");  // use next("notFound") instead of using next({name: "notFound"}), in order to avoid bug of Vue Router 3 (error message: [vue-router] missing param for named route "notFound": Expected "0" to be defined)
}


async function postDetailGuard(to, from, next) {
  // Wait for the store(posts) to be initialized
  // Make sure that getter isValidPostParam works correctly
  const isFetchSuccessful = await store.dispatch("toFetchPosts");
  if (!isFetchSuccessful) {
    next("notFound"); // Direct to NotFound page ｉf failed to fetch posts
    return; // Return immediately to prevent further execution
  }
  const isValid = store.getters.isValidPostParam(to.params.id);
  isValid ? next() : next("notFound"); 
}

function adminGuard(to, from, next) {
  store.state.isAdmin ? next() : next({ name: "login" });
}




