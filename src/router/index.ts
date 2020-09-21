import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import FeedList from '../views/FeedList.vue'
import FeedNewsList from '../views/FeedNewsList.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'FeedList',
    component: FeedList
  },
  {
    path: '/feed-news-list',
    name: 'FeedNewsList',
    component: FeedNewsList
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
