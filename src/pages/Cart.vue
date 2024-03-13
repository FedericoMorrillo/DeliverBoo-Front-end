<script>
import axios from 'axios';
import { store } from '../store'
import CheckoutComponent from '../components/CheckoutComponent.vue';
export default {
    name: 'Cart',
    components: {
        CheckoutComponent,
    },
    data() {
        return {
            store,
            showForm: false, // Inizializza la visibilità del modulo a falso
            // dishes: [],
            cart: [], // Inizializza il carrello come un array vuoto
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
        showUserDataForm() {
            if (this.cart.length > 0) {
                this.showForm = true; // Mostra il modulo dei dati dell'utente quando il pulsante "Checkout" viene premuto
            }
        },
        saveCart() {
            // Salva il carrello in localStorage
            localStorage.setItem('cart', JSON.stringify(this.cart));
            // Calcola il totale dei prodotti nel carrello
            this.calculateTotal();
        },
        removeFromCart(index) {
            // Rimuove un elemento dal carrello
            this.cart.splice(index, 1);
            this.saveCart(); // Salva il carrello in localStorage
        },
        updateQuantity() {
            // Aggiorna la quantità di un elemento nel carrello
            this.saveCart(); // Salva il carrello in localStorage
        },
        clearCart() {
            // Svuota completamente il carrello
            this.cart = [];
            localStorage.removeItem('cart'); // Rimuovi il carrello da localStorage
            this.calculateTotal(); // Aggiorna il totale
        },
        calculateTotal() {
            // Calcola il totale dei prodotti nel carrello
            this.total = this.cart.reduce((acc, item) => acc + (item.price * item.quantity || 0), 0);
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
            if (this.cart.length > 0 && this.validateUserData()) {
                const orderData = {
                    cart: this.cart,
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
                })
                    .catch(error => {
                        console.error('Errore durante la conferma dell\'ordine:', error);
                    });
            } else {
                console.warn('Impossibile confermare un ordine vuoto o con dati utente incompleti.');
            }
        },

        plusQuantity(item) {
            item.quantity++
            this.calculateTotal();
            return item
        },
        minusQuantity(item) {
            if (item.quantity > 1) {
                item.quantity--
                this.calculateTotal();
                return item
            }
        },
    },
    created() {
        // this.getDishes();

        // Carica il carrello dal localStorage all'avvio dell'applicazione
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
            this.calculateTotal(); // Calcola il totale dei prodotti nel carrello
        };
    }
}
</script>

<template>
    <div class="cart container">
        <h2 class="mb-3">
            <span class=" text-org">Carrello</span>
        </h2>
        <table class="table fs-4">
            <thead>
                <tr>
                    <th scope="col">Img</th>
                    <th scope="col">Piatto</th>
                    <th scope="col">Prezzo</th>
                    <th scope="col">Quantità</th>
                    <th scope="col" class="text-center">Elimina</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in cart" :key="index">
                    <td><img v-show="item.image" :src="item.image" :alt="item.name"></td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.price }} &euro;</td>
                    <td>
                        <button class="btn btn-secondary" @click="minusQuantity(item)"
                            v-bind:disabled="item.quantity === 1">
                            <i class=" fa-solid fa-minus"></i>
                        </button>
                        <strong class="mx-3">{{ item.quantity }}</strong>
                        <button class="btn btn-secondary" @click="plusQuantity(item)">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </td>
                    <td class="text-center">
                        <button class="btn btn-danger" @click="removeFromCart(index)">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Mostra il totale del carrello -->
        <h2 class="text-center">
            <span class=" text-org">
                Totale: {{ total.toFixed(2) }} &euro;
            </span>
        </h2>

        <router-link :to="{ name: RestaurantArea, path: '/restaurants/' + store.restaurant_id }"
            class="btn btn-secondary" type="button">
            <i class="fa-solid fa-right-to-bracket fa-rotate-180 fs-3"></i>
        </router-link>

        <!-- Pulsante per svuotare completamente il carrello -->
        <button class="btn btn-danger mx-2 fs-4" @click="clearCart">Svuota Carrello</button>
        <!-- Bottone Checkout -->
        <button class="btn btn-org fs-4" @click="showUserDataForm">Checkout</button>

        <div class="card mt-3 p-4" v-show="showForm">
            <div class="row">
                <div class="col col-4">
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
                <div class="col col-8">
                    <CheckoutComponent :total="this.total" @confirmOrder="confirmOrder" />
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">
img {
    height: 25px;
    width: 25px;
}

.cart {
    margin-top: 100px;
}

.dishes {
    width: 500px;
    margin-top: 50px;

    .dish {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>