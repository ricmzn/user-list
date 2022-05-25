import { createRouter, createWebHistory } from "vue-router";
import UserDetails from "./views/UserDetails.vue";
import Users from "./views/Users.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: "/",
    component: Users,
  }, {
    path: "/user/:userId",
    component: UserDetails,
    props: true,
  }],
});

export default router;
