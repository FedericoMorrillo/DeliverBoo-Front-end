<!--JS-->

<script>
import axios from 'axios';
import { store } from '../store';

export default {
    data() {
        return {
            restaurant: [],
            cart: JSON.parse(localStorage.getItem('cart')) || [],
            store,
        }
    },
    methods: {
        clearcart() {
            localStorage.removeItem('cart');
            this.cart = [];
        },

        clearcounter() {
            localStorage.removeItem('counterr');
            store.counter = [];
        },
        addToCart(product) {
            // console.log(product);
            const existingProduct = this.cart.find(item => item.id === product.id);

            if (existingProduct) {
                existingProduct.quantity += product.quantity;
            } else {
                this.cart.push({ ...product, quantity: product.quantity });
            }
            localStorage.setItem('cart', JSON.stringify(this.cart));
            store.counter += product.quantity; localStorage.setItem('counter', JSON.stringify(store.counter));
            // console.log(this.cart)
        },

        getRestaurant() {
            axios.get('http://localhost:8000/api' + this.$route.path).then((response) => {
                this.restaurant = response.data.results;
                // console.log(response);
                this.restaurant.dishes.forEach(item => {
                    item.quantity = 1;
                });
            });
        },

        plusQuantity(item) {
            return item.quantity++
        },
        minusQuantity(item) {
            if (item.quantity > 1) {
                return item.quantity--
            }
        },

    },
    created() {
        this.getRestaurant();
        store.counter = JSON.parse(localStorage.getItem('counterr')) || 0;
    }
}
</script>

<!--/JS-->

<!--HTML-->

<template>
    <section class="container in-b stylesection">
        <!-- Loader -->
        <div v-if="restaurant.length === 0">
            <div class="imgloading">
                <img src="/img/logo.jpeg" alt="Logo"> <span>
                    <h2>Loading ...</h2>
                </span>
            </div>
        </div>
        <!-- Loader -->

        <!-- Intestazione -->
        <div class="d-flex align-items-center">
            <!-- Button trigger modal -->
            <div>
                <button class="btn btn-secondary" v-if="this.cart.length > 0" data-bs-toggle="modal"
                    data-bs-target="#exampleModal">
                    <i class="fa-solid fa-right-to-bracket fa-rotate-180 fs-2"></i>
                </button>
                <a class="btn btn-secondary" href="/" v-else>
                    <i class="fa-solid fa-right-to-bracket fa-rotate-180 fs-2"></i>
                </a>
            </div>
            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Torna indietro</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Sei sicuro di voler tornare indietro e svuotare il carrello ?
                        </div>
                        <div class="modal-footer">
                            <a @click="clearcart(), clearcounter()" class="btn btn-danger" href="/">
                                Svuota e torna indietro
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Modal -->

            <div>
                <strong class="px-3 py-2 rounded btn-org mx-3 fs-3">Menù</strong>
            </div>
            <div class="ms-auto">
                <router-link :to="{ name: Cart, path: '/cart' }" class="btn btncart position-relative" type="button">
                    <i class="fa-solid fa-cart-shopping fs-1"></i>
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary fs-5">
                        {{ store.counter }}
                    </span>
                </router-link>
            </div>
            <!-- <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions"
                    aria-labelledby="offcanvasWithBothOptionsLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Backdrop with scrolling</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                </div> -->
        </div>
        <!-- Intestazione -->

        <!-- Menu -->
        <div class="row row-cols-2 g-4">
            <!-- Itera su ciascun piatto nell'array -->
            <div class="col" v-for="item in restaurant.dishes">
                <div class="restaurant-card rounded p-3 my-3">
                    <img v-if="item.image" :src="item.image" class="card-img-top" :alt="item.name">
                    <div class="card-body">
                        <div class="row fs-4">
                            <div class="col col-5">
                                <div class="card-text"><strong>Nome: </strong>{{ item.name }}</div>
                            </div>
                            <div class="col col-4">
                                <strong>Prezzo: </strong>
                                <span>{{ item.price }}€</span>
                            </div>
                        </div>
                    </div>
                    <div class="row align-items-center text-center mt-4" v-if="item.availability">
                        <div class="col col-3 text-end fs-4"><strong>Quantità:</strong></div>
                        <div class="col col-4 text-start">
                            <button class="btn btn-secondary" @click="minusQuantity(item)"
                                v-bind:disabled="item.quantity === 1">
                                <i class=" fa-solid fa-minus"></i>
                            </button>
                            <strong class="mx-3">{{ item.quantity }}</strong>
                            <button class="btn btn-secondary" @click="plusQuantity(item)">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </div>
                        <div class="col col-5">
                            <button @click="addToCart(item)" class="btn btn-org fs-5">
                                Aggiungi al carrello
                            </button>
                        </div>
                    </div>
                    <div v-else class="text-center fs-5">
                        <span class="badge text-bg-secondary">Prodotto non disponibile</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- Menu -->
    </section>
</template>

<!--/HTML-->

<!--CSS-->

<style scoped lang="scss">
.stylesection {
    margin-top: 100px;
}

.modal-dialog {
    margin-top: 100px;
}

.addcart:hover {
    background-color: greenyellow;

}

.imgloading img {
    width: 100px;
    animation: logoduck 1s infinite ease-in-out;
    border-radius: 20px;
    margin-right: 20px;
}

.btncart {
    background-color: lightblue;
}

.imgloading {
    text-align: center;
}

@keyframes logoduck {
    0% {
        transform: rotate(360deg);
    }

}
</style>
<!--/CSS-->