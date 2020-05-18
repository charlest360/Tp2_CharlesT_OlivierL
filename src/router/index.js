import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import FilmPage from '../views/FilmPage.vue';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title : 'Home Page - OMDb'
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/films/:id',
    name: 'FilmPage',
    component: FilmPage,
    props: true,
    meta: {
      title : 'Show movie page - OMDb '
    }
    },
]

const router = new VueRouter({
  routes
})

export default router
