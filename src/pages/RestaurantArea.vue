<!--JS-->

<script>
import axios from 'axios';
import { store } from '../store';
import Cart from '../components/Cart.vue';

export default {
    data() {
        return {
            'restaurant': {}
        }
    },
    components: {
        Cart
    },
    methods: {
        getRestaurant() {
            axios.get('http://127.0.0.1:8000/api/restaurants/' + store.restaurant_id).then((response) => {
                this.restaurant = response.data.results;
                console.log(response);
            });
        },
    },
    created() {
        this.getRestaurant();
    }
}
</script>

<!--/JS-->

<!--HTML-->

<template>
    <section class="container in-b">
        <h2 class="mt-3 py-2 px-3 btn-org">Menù</h2>
        <Cart />
        <div class="d-flex flex-wrap">
            <!-- Lista dei piatti come caselle di controllo -->
            <div class="restaurant-card d-flex flex-column gap-3 rounded p-3 my-3"
                v-for="(dish, index) in restaurant.dishes" :key="index">
                <div>
                    <input type="checkbox" v-model="dish.selected" :id="'dish_' + index">
                    <label class="card-body" :for="'dish_' + index"><img class="card-img-top" :src="dish.image"
                            :alt="dish.name"> {{ dish.name }} - {{ dish.price }}€</label>
                </div>

                <div class="mt-auto">
                    <!-- Input per selezionare la quantità dei piatti -->
                    <input type="number" v-model.number="dish.quantity" :min="1" placeholder="Quantità"
                        @input="validateQuantity(dish)">
                    <button class="btn btn-org mt-3" @click="addToCart(dish)">Aggiungi al carrello</button>
                </div>

            </div>
        </div>

    </section>
</template>

<!--/HTML-->

<!--CSS-->

<style scoped lang="scss"></style>
<!--/CSS-->