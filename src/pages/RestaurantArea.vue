<!--JS-->

<script>
import axios from 'axios';
import { store } from '../store';

export default {
    data() {
        return {
            restaurant: [],
            store,
            total: 0, // Inizializza il totale dei prodotti nel carrello
        }
    },
    methods: {
        saveLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(store.cart));
        },
        calculateCounter() {
            let counter = store.cart.reduce((total, item) => total + item.quantity, 0);
            localStorage.setItem('counter', JSON.stringify(counter));
            store.counter = JSON.parse(localStorage.getItem("counter")) || 0;
        },
        addToCart(product) {
            const existingProduct = store.cart.find(item => item.id === product.id);

            if (existingProduct) {
                existingProduct.quantity += product.quantity;
            } else {
                store.cart.push({ ...product, quantity: product.quantity });
            }
            this.saveLocalStorage();
            this.calculateTotal();
        },

        getRestaurant() {
            axios.get('http://localhost:8000/api' + this.$route.path).then((response) => {
                this.restaurant = response.data.results;
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
        calculateTotal() {
            // Calcola il totale dei prodotti nel carrello
            this.total = store.cart.reduce((acc, item) => acc + (item.price * item.quantity || 0), 0);
            this.calculateCounter();
        },

        clearCart() {
            // Svuota completamente il carrello
            store.cart = [];
            this.saveCart();
        },

        saveCart() {
            // Salva il carrello in localStorage
            this.saveLocalStorage();
            // Calcola il totale dei prodotti nel carrello
            this.calculateTotal();
        },
    },
    created() {
        this.getRestaurant();
        this.calculateTotal();
        console.log(localStorage.getItem('counter'))
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
                <button class="btn btn-secondary" v-if="store.cart.length > 0" data-bs-toggle="modal"
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
                            <a @click="clearCart" class="btn btn-danger" href="/">
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
                <!-- Anteprima carrello -->
                <div class="dropdown">
                    <button type="button" class="btn btncart position-relative dropdown-toggle"
                        data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                        <i class="fa-solid fa-cart-shopping fs-1"></i>
                        <span
                            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary fs-5">
                            {{ store.counter }}
                        </span>
                    </button>
                    <div class="dropdown-menu p-4 cart-preview">
                        <ul class="p-0">
                            <li v-for="item in store.cart" class="border-bottom py-2 d-flex gap-2">
                                <img :src="item.image" :alt="item.name" class="cart-thumb">
                                <div>
                                    <h5>{{ item.name }}</h5>
                                    &euro;{{ item.price }} x {{ item.quantity }}
                                </div>
                            </li>
                            <li class="py-2">
                                Totale: {{ total.toFixed(2) }} &euro;
                            </li>
                        </ul>
                        <router-link :to="{ name: Cart, path: '/cart' }" class="btn btn-primary" type="button">
                            Vai al carrello
                        </router-link>
                    </div>
                </div>
                <!-- Anteprima carrello -->
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
                <div class="restaurant-card rounded p-3 my-3 h-100">
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