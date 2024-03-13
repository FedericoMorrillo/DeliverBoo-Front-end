import { createRouter, createWebHistory } from "vue-router";
import HomeArea from "./pages/HomeArea.vue";
import RestaurantArea from "./pages/RestaurantArea.vue";
import Cart from "./pages/Cart.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "HomeArea",
      component: HomeArea,
    },
    {
      path: "/restaurants/:slug",
      name: "RestaurantArea",
      component: RestaurantArea,
    },
    {
      path: "/cart",
      name: "Cart",
      component: Cart,
    },
  ],
});
export { router };
