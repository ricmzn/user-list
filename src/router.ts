import { createRouter, createWebHistory } from "vue-router";
import Users from "./views/Users.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: "/",
    component: Users
  }],
});

export default router;
