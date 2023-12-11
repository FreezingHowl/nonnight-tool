// router.ts
import { createRouter, createWebHistory } from 'vue-router';

// @ts-ignore
const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/base-map',
    component: () => import('@/views/Map/Base.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
