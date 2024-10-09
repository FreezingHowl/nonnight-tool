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
  },
  {
    path: '/base-util',
    component: () => import('@/views/Util/Base.vue'),
  },
  {
    path: '/base-util-video',
    component: () => import('@/views/Util/Video.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
