import { createRouter, createWebHistory } from "vue-router";
import HomeArea from "./pages/HomeArea.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "HomeArea",
      component: HomeArea,
    },
  ],
});
export { router };
