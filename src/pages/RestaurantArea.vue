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
    <section class="container stylesection">
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
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Attenzione!</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                id="closeModal"></button>
                        </div>
                        <div class="modal-body">
                            Puoi ordinare prodotti da un solo ristorante alla volta.
                            Per continuare devi prima svuotare il carrello o completare il tuo ordine!
                        </div>
                        <div class="modal-footer">
                            <button @click="clearCart" class="btn btn-danger" data-bs-dismiss="modal">
                                Svuota il carrello
                            </button>
                            <router-link :to="{ name: Cart, path: '/cart' }" class="btn btn-primary" type="button"
                                @click="closeModal">
                                Completa il tuo ordine
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Modal -->

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
                                    {{ item.price }} &euro; x {{ item.quantity }}
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
        </div>
        <!-- Intestazione -->

        <!-- Loader -->
        <div v-if="restaurant.length === 0" class="mt-5 pt-5">
            <div class="imgloading">
                <img src="/img/logo.jpeg" alt="Logo"> <span>
                    <h2>Loading ...</h2>
                </span>
            </div>
        </div>
        <!-- Loader -->

        <!-- Menu -->
        <div class="d-flex flexxato">
            <div class="imgrestaurantbg col-12 col-md-10">
                <!-- <img  class="img-fluid" :src="restaurant.image" :alt="restaurant.name"> -->
                <h2>Benvenuti in <span class="namerestaurant">{{ restaurant.name }}</span></h2>
                <p>L'app quack delivery ti consente di ordinare cibo o prodotti direttamente dal tuo telefono e
                    riceverli comodamente a casa tua. Con un'ampia selezione di ristoranti e negozi disponibili, puoi
                    scegliere tra una vasta gamma di piatti e prodotti per soddisfare i tuoi gusti e bisogni. Grazie
                    alla tracciabilità degli ordini in tempo reale, puoi monitorare il progresso della consegna e
                    ricevere notifiche sullo stato del tuo ordine. Con un'interfaccia intuitiva e facile da usare, l'app
                    delivery rende il processo di ordinare e ricevere cibo o prodotti più semplice e conveniente che
                    mai.</p>
            </div>

            <div class="imgrestaurantbg col col-md-2">
                <img class="img-fluid" :src="restaurant.image" :alt="restaurant.name">
            </div>
        </div>
        <div class="menu">
            <strong class="px-3 py-2 rounded btn-org mx-3 fs-3">Menù</strong>
        </div>
        <div class="row g-3 my-3">
            <div class="col col-12" v-for="item in restaurant.dishes">
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-12 col-img col-md-4 imagrestaurants" v-if="item.image">
                            <img v-if="item.image" :src="item.image" class="img-fluid p-2 rounded-start"
                                :alt="item.name + ' img'">
                        </div>
                        <div class="col">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col col-9">
                                        <h4>{{ item.name }}</h4>
                                    </div>
                                    <div class="col col-3 text-end"><strong>{{ item.price }} €</strong></div>
                                    <div class="col col-9" v-if="item.description">{{ item.description }}</div>
                                </div>
                                <p class="card-text text-end">
                                    <!-- se il prodotto è disponibile mostra il bottone -->
                                <div v-if="item.availability">
                                    <!--  se i prodotti nel carrello appartengono allo stesso ristorante dell'item, l'item viene aggiunto al carrello -->
                                    <button v-if="checkRestaurantId(item)" @click="addToCart(item)"
                                        class="btn btn-org fs-5 position-relative">
                                        + <i class="fa-solid fa-cart-shopping fs-5"></i>
                                    </button>
                                    <!-- altimenti viene mostrato il modal -->
                                    <button v-else data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        class="btn btn-org fs-5 position-relative">
                                        + <i class="fa-solid fa-cart-shopping fs-5"></i>
                                    </button>
                                </div>
                                <!-- se il prodotto non è disponibile mostra il badge -->
                                <span v-else class="badge text-bg-secondary">
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
    </section>
</template>

<!--/HTML-->

<!--CSS-->

<style scoped lang="scss">
.type-card {
    background-color: white;
    border: 2px solid #FFA500;
    box-shadow: rgba(0, 0, 0, 0.356) .625rem .625rem;
    object-fit: cover;

    .form-check {
        font-size: 22px;
    }
}

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
    transition: 0.5s;
    border-radius: 20px;
    margin-right: 20px;
}

.btncart {
    background-color: lightblue;
}

.imgloading {
    text-align: center;
}

// cart preview
.cart-thumb {
    width: 4.375rem;
}

.cart-preview {
    width: 18.75rem;
}

// cart preview
@keyframes logoduck {
    0% {
        transform: rotate(360deg);
    }

}

@media screen and (max-width:768px) {
    .col-img {
        display: flex;
        justify-content: center;
    }
}

@media screen and (max-width:576px) {

    .row-cols-2 {
        justify-content: center;

        .fq {
            font-size: 30px;
        }
    }
}
</style>
<!--/CSS-->