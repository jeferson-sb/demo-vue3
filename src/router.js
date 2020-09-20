import { createRouter, createWebHistory } from 'vue-router';

// Enable browser history mode
export const routerHistory = createWebHistory();

// Component routes
const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('./pages/Home.vue'),
  },
  {
    path: '/games/:name',
    component: () => import('./pages/GameProfile.vue'),
  },
];

const router = createRouter({
  history: routerHistory,
  routes,
});

export default router;
