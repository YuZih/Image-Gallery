import Vue from "vue"
import VueRouter from "vue-router"
import HomeView from "../views/HomeView.vue"



Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView 
  },
  {
    path: "/about",
    name: "about",
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue")
  },
  {
    path: "/post",
    name: "post",
    component: () => import(/* webpackChunkName: "post" */ "../views/PostView.vue")
  },
  {
    path: "/album",
    name: "album",
    component: () => import(/* webpackChunkName: "album" */ "../views/AlbumView.vue")
  },
  {
    path: "*",
    name: "notFound",
    component: () => import(/* webpackChunkName: "notFound" */ "../views/NotFoundView.vue")
  }
]

const router = new VueRouter({
  routes,
  mode: "hash",
  linkActiveClass: "activeLink",
  linkExactActiveClass: "exactActiveLink",
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition;
  //   } else {
  //     return { x: 0, y: 0 };
  //   }
  // },
})

export default router
