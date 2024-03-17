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
            if (this.checkRestaurantId(product)) {
                const existingProduct = store.cart.find(item => item.id === product.id);

                if (existingProduct) {
                    existingProduct.quantity += product.quantity;
                } else {
                    store.cart.push({ ...product, quantity: product.quantity });
                }
                this.saveLocalStorage();
                this.calculateTotal();
            }
        },

        checkRestaurantId(product) {
            if (store.cart.length > 0 && store.cart.find(item => item.restaurant_id !== product.restaurant_id)) {
                return false;
            } else {
                return true;
            }
        },

        getRestaurant() {
            axios.get('http://localhost:8000/api' + this.$route.path).then((response) => {
                this.restaurant = response.data.results;
                this.restaurant.dishes.forEach(item => {
                    item.quantity = 1;
                });
            });
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

        closeModal() {
            document.getElementById('closeModal').click();
        },
    },
    created() {
        this.getRestaurant();
        this.calculateTotal();
    }
}
</script>

<!--/JS-->

<!--HTML-->

<template>
    <section class="pb-5">
        <div class="container">
            <!-- Intestazione -->
            <div class="d-flex align-items-center my-4 py-3">
                <!-- Button trigger modal -->
                <button class="btn fs-1 border-0" v-if="store.cart.length > 0" data-bs-toggle="modal"
                    data-bs-target="#ms_modal">
                    <i class="fa-solid fa-arrow-left"></i> </button>
                <!-- Button trigger modal -->

                <!-- Home -->
                <a class="btn fs-1 border-0" href="/" v-else>
                    <i class="fa-solid fa-arrow-left"></i> </a>
                <!-- Home -->

                <h2 class="mx-3 fs-1">{{ restaurant.name }} - Menù</h2>
                <!-- Modal -->
                <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="ms_modal" tabindex="-1"
                    aria-labelledby="ms_modalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-3" id="ms_modalLabel">Attenzione!</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    id="closeModal"></button>
                            </div>
                            <div class="modal-body fs-4">
                                Puoi ordinare prodotti da un solo ristorante alla volta.
                                <br>
                                Per continuare devi prima svuotare il carrello o completare il tuo ordine!
                            </div>
                            <div class="modal-footer">
                                <button @click="clearCart" class="btn btn-danger fs-5" data-bs-dismiss="modal">
                                    Svuota il carrello
                                </button>
                                <router-link :to="{ name: Cart, path: '/cart' }" class="btn custom_btn fs-5"
                                    type="button" @click="closeModal">
                                    Completa il tuo ordine
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Modal -->

                <!-- Anteprima carrello -->
                <div class="dropdown ms-auto">
                    <button type="button" id="toggle_dropdown" class="btn border-0 position-relative"
                        data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                        <i class="fa-solid fa-cart-shopping fs-1"></i>
                        <span v-show="store.counter > 0" id="ms_counter"
                            class="position-absolute top-0 start-100 translate-middle badge rounded-pill fs-5">
                            {{ store.counter }}
                        </span>
                    </button>
                    <div class="dropdown-menu p-4 cart-preview">
                        <ul v-if="store.cart.length > 0" class="p-0">
                            <li v-for="item in store.cart" class="py-2 d-flex gap-2">
                                <img :src="item.image" :alt="item.name" class="cart-thumb">
                                <div>
                                    <h5>{{ item.name }}</h5>
                                    {{ item.price }} &euro; x {{ item.quantity }}
                                </div>
                            </li>
                        </ul>
                        <span v-else>Il carrello è vuoto</span>
                        <hr>
                        <div class="d-flex justify-content-between">
                            <strong class="py-2">Totale: {{ total.toFixed(2) }} &euro;</strong>
                            <div>
                                <router-link :to="{ name: Cart, path: '/cart' }" id="go-to-cart" class="btn"
                                    type="button">
                                    Vai al carrello
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Anteprima carrello -->
            </div>
            <!-- Intestazione -->

            <!-- Loader -->
            <div v-if="restaurant.length === 0" class="mt-5 pt-5">
                <div class="ms_loader">
                    <img src="/img/logo.jpeg" alt="Logo"> <span>
                        <h2>Loading ...</h2>
                    </span>
                </div>
            </div>
            <!-- Loader -->

            <!-- Menu -->
            <div class="row g-3 my-3">
                <div class="col col-12 col-lg-6" v-for="item in restaurant.dishes">
                    <div class="card rounded-4 mb-3 overflow-hidden dish_card">
                        <div class="row g-0">
                            <div class="col-md-4" v-if="item.image">
                                <img v-if="item.image" :src="item.image" class="img-fluid" :alt="item.name + ' img'">
                            </div>
                            <div class="col">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col col-8">
                                            <h4 class="fs-1">{{ item.name }}</h4>
                                        </div>
                                        <div class="col col-4 text-end fs-3"><strong>{{ item.price }} €</strong></div>
                                        <p class="col col-8 fw-light dish_description" v-if="item.description">
                                            {{ item.description }}
                                        </p>
                                    </div>
                                    <p class="card-text text-end">
                                        <!-- se il prodotto è disponibile mostra il bottone -->
                                    <div v-if="item.availability">
                                        <!--  se i prodotti nel carrello appartengono allo stesso ristorante dell'item, l'item viene aggiunto al carrello -->
                                        <button v-if="checkRestaurantId(item)" @click="addToCart(item)"
                                            class="btn custom_btn fs-5 position-relative">
                                            + <i class="fa-solid fa-cart-shopping fs-5"></i>
                                        </button>
                                        <!-- altimenti viene mostrato il modal -->
                                        <button v-else data-bs-toggle="modal" data-bs-target="#ms_modal"
                                            class="btn custom_btn fs-5 position-relative">
                                            + <i class="fa-solid fa-cart-shopping fs-5"></i>
                                        </button>
                                    </div>
                                    <!-- se il prodotto non è disponibile mostra il badge -->
                                    <span v-else class="badge fs-6 fw-normal not_available">
                                        Prodotto non disponibile
                                    </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Menu -->
        </div>
    </section>
</template>

<!--/HTML-->

<!--CSS-->

<style scoped lang="scss">
@use '../assets/scss/variables.scss' as *;

section {

    // Loader
    .ms_loader {
        text-align: center;

        & img {
            width: 100px;
            animation: logoduck 1s infinite ease-in-out;
            transition: 0.5s;
            border-radius: 20px;
            margin-right: 20px;
        }
    }

    // Modal
    // #ms_modal{
    //     margin-top: 200px;
    // }

    // cart preview
    #toggle_dropdown {
        color: $color8;
    }

    #ms_counter {
        background-color: $color9;
        color: $color10;
    }

    .cart-preview {
        width: 375px;
        color: $color8 !important;
        background-color: rgba(255, 255, 255, .75);

        .cart-thumb {
            width: 4.375rem;
        }

        #go-to-cart {
            background-color: $color9;
            color: $color10;
        }
    }

    @keyframes logoduck {
        0% {
            transform: rotate(360deg);
        }

    }

    @media screen and (max-width:576px) {
        .row-cols-2 {
            justify-content: center;
        }

        .fq {
            font-size: 30px;
        }
    }

    //card
    .dish_card {
        background-color: $color2 !important;
        box-shadow: rgba(0, 0, 0, 0.356) .625rem .625rem;

        .dish_description {
            color: $color5;
        }

        .not_available {
            color: $color6;
            background-color: $color4;
        }
    }
}
</style>
<!--/CSS-->