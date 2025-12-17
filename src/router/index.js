import { createRouter, createWebHistory } from 'vue-router'
import Homeacer from '@/pages/Homeacer.vue'
import ProductPage from '@/pages/ProductPage.vue'
import ProductDetail from '@/pages/ProductDetail.vue'
import SupportDetail from '@/pages/SupportDetail.vue'
import About from '@/pages/About.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Homeacer,
  },
  {
    path: '/products',
    name: 'products',
    component: ProductPage,
  },
  {
    path: '/product/:slug',
    name: 'product-detail',
    component: ProductDetail,
    props: true
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/support/:slug',
    name: 'support-detail',
    component: SupportDetail,
    props: true
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
