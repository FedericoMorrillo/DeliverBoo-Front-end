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
            const existingProduct = this.cart.find(item => item.id === product.id);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                this.cart.push({ ...product, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(this.cart));
            console.log(this.cart)
        },
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
                <!-- <div>
                    <input type="number" v-model.number="dish.quantity" :min="1" placeholder="Quantità"
                        @input="validateQuantity(dish)">
                    <button class="btn btn-org mt-3" @click="addToCart(dish)">Aggiungi al carrello</button>
                </div> -->
                <div>
                    <button @click="addToCart(item)" class="btn btn-org">Aggiungi al carrello</button>
                </div>
            </div>
        </div>
    </section>

    <!-- <section class="container in-b">
        <h2 class="mt-3 py-2 px-3 btn-org">Menù</h2>

        <div class="d-flex flex-wrap">
            <div class="restaurant-card d-flex flex-column gap-3 rounded p-3 my-3"
                v-for="(dish, index) in restaurant.dishes" :key="index">
                <div>
                    <input type="checkbox" v-model="dish.selected" :id="'dish_' + index">
                    <label class="card-body" :for="'dish_' + index"><img class="card-img-top" :src="dish.image"
                            :alt="dish.name"> {{ dish.name }} - {{ dish.price }}€</label>
                </div>
                <div>
                    <button @click="addToCart(item)" class="btn btn-org">Acquista</button>

                    <div class="mt-auto">
                        <input type="number" v-model.number="dish.quantity" :min="1" placeholder="Quantità"
                            @input="validateQuantity(dish)">
                        <button class="btn btn-org mt-3" @click="addToCart(dish)">Aggiungi al carrello</button>
                    </div>

                </div>
            </div>
        </div>
    </section> -->
</template>

<!--/HTML-->

<!--CSS-->

<style scoped lang="scss">
.stylesection {
    margin-top: 100px;
}
</style>
<!--/CSS-->./Cart.vue