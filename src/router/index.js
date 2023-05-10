import Vue from "vue"
import VueRouter from "vue-router"
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
    // alias: "/homepage", // Discard alias so as to keep the CSS effect of linkActiveClass
    component: HomeView },
  {
    path: "/about",
    name: "about",
    component: () => import(/* webpackChunkName: "about" */ "@/views/AboutView.vue")
  },
  {
    path: "/post",
    name: "post",
    component: () => import(/* webpackChunkName: "post" */ "@/views/PostView.vue")
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
         component: () => import(/* webpackChunkName: "singleSeries" */ "@/views/SeriesSingleView.vue")
      }
    ]
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
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition;
  //   } else {
  //     return { x: 0, y: 0 };
  //   }
  // },
})

export default router
