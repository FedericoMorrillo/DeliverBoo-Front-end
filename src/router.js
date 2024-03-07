import { createRouter, createWebHistory } from "vue-router";
import HomeArea from "./pages/HomeArea.vue";
import AdvanceResearch from "./pages/AdvanceResearch.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "HomeArea",
      component: HomeArea,
    },
    {
      path: "/restaurants",
      name: "AdvanceResearch",
      component: AdvanceResearch,
    },
  ],
});
export { router };
