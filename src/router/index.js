import { createRouter, createWebHistory } from 'vue-router'
import Homeacer from '@/pages/Homeacer.vue'
import ProductDetail from '@/pages/ProductDetail.vue'
import SupportDetail from '@/pages/SupportDetail.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Homeacer,
  },
  {
    path: '/product/:slug',
    name: 'product-detail',
    component: ProductDetail,
    props: true
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
