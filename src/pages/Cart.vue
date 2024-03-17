<script>
import axios from 'axios';
import { store } from '../store'
import CheckoutComponent from '../components/CheckoutComponent.vue';
import PaymentSuccessMessage from '../components/PaymentSuccessMessage.vue'

export default {
    name: 'Cart',
    components: {
        CheckoutComponent,
        PaymentSuccessMessage
    },
    data() {
        return {
            store,
            message: null,
            showForm: false, // Inizializza la visibilità del modulo a falso
            // dishes: [],
            selectedProductIndex: null, // Indice del prodotto selezionato dall'utente
            quantity: 1, // Inizializza la quantità predefinita del prodotto
            total: 0, // Inizializza il totale dei prodotti nel carrello
            userData: {
                name: '',
                surname: '',
                phone: '',
                email: '',
                address: ''
            }
        };
    },
    methods: {
        saveLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(store.cart));
        },
        showUserDataForm() {
            if (store.cart.length > 0) {
                this.showForm = true; // Mostra il modulo dei dati dell'utente quando il pulsante "Checkout" viene premuto
            }
        },
        calculateCounter() {
            let counter = store.cart.reduce((total, item) => total + item.quantity, 0);
            localStorage.setItem('counter', JSON.stringify(counter));
            store.counter = JSON.parse(localStorage.getItem("counter")) || 0;
        },
        saveCart() {
            // Salva il carrello in localStorage
            this.saveLocalStorage();
            // Calcola il totale dei prodotti nel carrello
            this.calculateTotal();
        },
        removeFromCart(index) {
            // Rimuove un elemento dal carrello
            store.cart.splice(index, 1);
            this.saveCart(); // Salva il carrello in localStorage
        },
        clearCart() {
            // Svuota completamente il carrello
            store.cart = [];
            this.saveCart();
            this.showUserDataForm();
        },
        calculateTotal() {
            // Calcola il prezzo totale dei prodotti nel carrello
            this.total = store.cart.reduce((acc, item) => acc + (item.price * item.quantity || 0), 0);
            this.calculateCounter();
        },
        validateUserData() {
            return (
                this.userData.name !== '' &&
                this.userData.surname !== '' &&
                this.userData.phone !== '' &&
                this.userData.email !== '' &&
                this.userData.address !== ''
            );
        },

        clearUserData() {
            this.userData = {
                name: '',
                surname: '',
                phone: '',
                email: '',
                address: ''
            };
        },
        confirmOrder() {
            // Assicurati che il carrello non sia vuoto e che tutti i campi utente siano compilati
            if (store.cart.length > 0 && this.validateUserData()) {
                const orderData = {
                    cart: store.cart,
                    total: this.total,
                    userData: this.userData
                };
                console.log(orderData);
                this.showForm = false;
                axios.post('http://localhost:8000/api/orders', JSON.stringify(orderData), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    // Il server ha confermato l'ordine e ha salvato i dati nel database
                    console.log('Ordine confermato:', response.data);
                    // Puoi resettare il carrello e i dati utente dopo che l'ordine è stato confermato
                    this.clearCart();
                    this.clearUserData();
                    this.message = 'Pagamento effettuato con successo!';
                }).catch(error => {
                    console.error('Errore durante la conferma dell\'ordine:', error);
                }).finally(() => {
                    // Disattiva il loader
                    this.loading = false;
                })
            } else {
                console.warn('Impossibile confermare un ordine vuoto o con dati utente incompleti.');
            }
        },

        plusQuantity(item) {
            item.quantity++
            this.saveCart();
        },
        minusQuantity(item) {
            if (item.quantity > 1) {
                item.quantity--
                this.saveCart();
            }
        },
        hideMessage() {
            this.message = null;
        }
    },
    created() {
        // Carica il carrello dal localStorage all'avvio dell'applicazione
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            store.cart = JSON.parse(savedCart);
            this.calculateTotal(); // Calcola il totale dei prodotti nel carrello
        };
    }
}
</script>

<template>
    <div class="cart p-0 pb-5 container">
        <!-- Intestazione -->
        <div class="d-flex align-items-center my-4 py-3">
            <!-- Indietro -->
            <router-link :to="{ name: RestaurantArea, path: '/restaurants/' + store.restaurant_slug }"
                class="btn fs-1 border-0" type="button">
                <i class="fa-solid fa-arrow-left"></i> </router-link>
            <!-- Indietro -->

            <h2 class="mx-3 fs-1">Carrello</h2>
        </div>
        <!-- Intestazione -->

        <PaymentSuccessMessage v-show="message" :message="message" @hide-message="hideMessage" />


        <div id="ms_content" v-if="store.cart.length > 0">
            <!-- Carrello -->
            <table id="ms_table" class="table bg-transparent fs-4">
                <thead>
                    <tr>
                        <th scope="col" class="col-4 ps-4">Piatto</th>
                        <th scope="col" class="col-3">Quantità</th>
                        <th scope="col" class="col-3">Prezzo</th>
                        <th scope="col" class="col-2 text-center">Elimina</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in store.cart" :key="index">
                        <td class="ps-4">{{ item.name }}</td>
                        <td>
                            <button class="btn border-0 btn_quantity" @click="minusQuantity(item)"
                                v-bind:disabled="item.quantity === 1">
                                <i class=" fa-solid fa-minus"></i>
                            </button>
                            <strong class="mx-3">{{ item.quantity }}</strong>
                            <button class="btn border-0 btn_quantity" @click="plusQuantity(item)">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </td>
                        <td>{{ item.price }} &euro;</td>

                        <td class="text-center">
                            <button class="btn text-danger fs-4" @click="removeFromCart(index)">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Mostra il totale del carrello -->
            <h2 class="text-center">
                <span class=" ms_text">
                    Totale: {{ total.toFixed(2) }} &euro;
                </span>
            </h2>
            <!-- /Carrello -->

            <div class="text-end">
                <!-- Pulsante per svuotare completamente il carrello -->
                <button class="btn btn-danger mx-2 fs-4" @click="clearCart">Svuota Carrello</button>
                <!-- Bottone Checkout -->
                <button class="btn custom_btn fs-4" @click="showUserDataForm" v-show="!showForm">Checkout</button>
            </div>

            <div id="checkout_form" class="rounded my-4 p-4" v-show="showForm">
                <div class="row">
                    <div class="col col-12 col-md-5">
                        <!-- Dati utente -->
                        <form @submit.prevent="confirmOrder">
                            <h2>Dati dell'utente</h2>
                            <div class="mb-1">
                                <label for="name" class="form-label fs-5">Nome</label>
                                <input type="text" id="name" v-model="userData.name" class="form-control">
                            </div>
                            <div class="mb-1">
                                <label class="form-label fs-5" for="surname">Cognome:</label>
                                <input type="text" id="surname" v-model="userData.surname" class="form-control">
                            </div>
                            <div class="mb-1">
                                <label class="form-label fs-5" for="phone">Telefono:</label>
                                <input type="text" id="phone" v-model="userData.phone" class="form-control">
                            </div>
                            <div class="mb-1">
                                <label class="form-label fs-5" for="email">Email:</label>
                                <input type="email" id="email" v-model="userData.email" class="form-control">
                            </div>
                            <div class="mb-1">
                                <label class="form-label fs-5" for="address">Indirizzo:</label>
                                <input type="text" id="address" v-model="userData.address" class="form-control">
                            </div>
                        </form>
                    </div>
                    <div class="col col-12 col-md-7">
                        <CheckoutComponent :total="this.total" @confirmOrder="confirmOrder" />
                    </div>
                </div>
            </div>
        </div>

        <h2 v-else class="display-4 text-center">Il carrello è vuoto</h2>

    </div>
</template>

<style scoped lang="scss">
@use '../assets/scss/variables.scss' as *;

table#ms_table {

    th,
    td {
        color: $color8;
        background-color: $color4 !important;
    }

    .btn_quantity {
        color: $color10;
        background-color: $color9;
    }
}

#checkout_form {
    background-color: $color2;
    color: $color8 !important;
}
</style>