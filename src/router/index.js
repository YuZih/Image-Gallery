import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PostView from '../views/PostView.vue'
import AlbumView from '../views/AlbumView.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/post',
    name: 'post',
    component: PostView
  },
  {
    path: '/album',
    name: 'album',
    component: AlbumView
  },
  {
    path: '*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
