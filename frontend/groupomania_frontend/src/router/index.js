import Vue from 'vue'
import VueRouter from 'vue-router'
import AccueilView from '../views/AccueilView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView'
import HomeView from '../views/HomeView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'accueil',
    component: AccueilView
  },
  {
    path: '/auth/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/auth/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
