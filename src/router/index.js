import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from "@/views/RegisterView";
import LoginView from "@/views/LoginView";
import DashboardView from "@/views/DashboardView";
import store from "@/store";
import ProductView from "@/views/ProductView";
import ProductCreateView from "@/views/ProductCreateView";

function alreadyLogin(to,from,next){
  if(store.state.auth){
    return next("/dashboard")
  }
  return next()
}

function needAuth(to,from,next){
  if(store.state.auth === null){
    return next("/login")
  }
  return next()
}

const routes = [
  {
    path: '/',
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
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    beforeEnter: [alreadyLogin]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    beforeEnter : [alreadyLogin]
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    beforeEnter:[needAuth]
  },
  {
    path: '/product',
    name: 'product',
    component: ProductView,
    beforeEnter:[needAuth]
  },
  {
    path: '/product/create',
    name: 'product.create',
    component: ProductCreateView,
    beforeEnter:[needAuth]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
