import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/view-1",
    name: "contact",
    component: () => import("@/views/ContactView.vue"),
  },
  {
    path: "/view-2",
    name: "about",
    component: () => import("@/views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
