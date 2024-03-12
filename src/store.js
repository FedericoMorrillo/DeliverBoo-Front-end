import { reactive } from "vue";
export const store = reactive({
  type: "",
  restaurant_id: '',
  counter: JSON.parse(localStorage.getItem('counterr')) || [],
});
