import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/readme',
    name: 'Read me',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    name: 'Playground',
    component: () => import(/* webpackChunkName: "playground" */ '../views/Playground.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
