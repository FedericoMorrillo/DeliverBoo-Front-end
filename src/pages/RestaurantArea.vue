<!--JS-->

<script>
import axios from 'axios';
import { store } from '../store';

export default {
    cart: JSON.parse(localStorage.getItem('cart')) || [],

    data() {
        return {
            restaurant: [],
            cart: JSON.parse(localStorage.getItem('cart')) || [],
            counter: [],
        }
    },
    methods: {
        addToCart(product) {
            console.log(product);
            const existingProduct = this.cart.find(item => item.id === product.id);

            if (existingProduct) {
                existingProduct.quantity += product.quantity;
            } else {
                this.cart.push({ ...product, quantity: product.quantity });
            }
            localStorage.setItem('cart', JSON.stringify(this.cart));
            console.log(this.cart)
        },

        getRestaurant() {
            axios.get('http://127.0.0.1:8000/api/restaurants/' + store.restaurant_id).then((response) => {
                this.restaurant = response.data.results;
                console.log(response);
                this.restaurant.dishes.forEach(item => {
                    item.quantity = 1;
                });
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
    <section class="container in-b stylesection">
        <div class="d-flex justify-content-between">
            <div>
                <h2 class="mt-3 py-2 px-3 btn-org">Menù</h2>
            </div>
            <div>
                <router-link :to="{ name: Cart, path: '/cart' }" class="btn btn-primary" type="button"> <i
                        class="fa-solid fa-cart-shopping"></i><span></span>carrello</router-link>
                <!-- <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions"
                    aria-labelledby="offcanvasWithBothOptionsLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Backdrop with scrolling</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                </div> -->
            </div>
        </div>
        <div class="d-flex flex-wrap">
            <!-- Itera su ciascun tipo nell'array types -->
            <div class="restaurant-card rounded p-3 my-3" v-for="item in restaurant.dishes">
                <img :src="item.image" class="card-img-top" :alt="item.name">
                <div class="card-body">
                    <div class="card-text text-center"><strong>{{ item.name }}</strong></div>
                </div>
                <div>
                    <span class="fs.secondary me-2 mt-3 mb-2"><strong>Prezzo:</strong></span>{{ item.price }}€
                </div>
                <input type="number" min="1" max="50" v-model="item.quantity" class="form-control mt-3 mb-3">
                <div>
                    <button @click="addToCart(item)" class="btn btn-org">Aggiungi al
                        carrello</button>
                </div>
            </div>
        </div>
    </section>
</template>

<!--/HTML-->

<!--CSS-->

<style scoped lang="scss">
.stylesection {
    margin-top: 100px;
}
</style>
<!--/CSS-->./Cart.vue