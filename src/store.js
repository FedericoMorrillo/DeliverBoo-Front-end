import { reactive } from "vue";
export const store = reactive({
  type: "",
  restaurant_slug: "",
  restaurant_id: "",
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  counter: JSON.parse(localStorage.getItem("counter")) || 0,
});
