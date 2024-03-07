import { createRouter, createWebHistory } from "vue-router";
import HomeArea from "./pages/HomeArea.vue";
import AdvanceResearch from "./pages/AdvanceResearch.vue";
import RestaurantArea from "./pages/RestaurantArea.vue";

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
    {
      path: "/restaurants/:id",
      name: "RestaurantArea",
      component: RestaurantArea,
    },
  ],
});
export { router };
