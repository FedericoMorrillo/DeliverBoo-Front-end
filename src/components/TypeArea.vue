<!--JS-->

<script>
import axios from 'axios';
import { store } from '../store';
import RestaurantArea from '../pages/RestaurantArea.vue';

export default {
    data() {
        return {
            types: [],
            restaurants: [],
            selectedTypes: [],
            filteredRestaurants: [], // Aggiungi questa linea
            store
        }
    },
    methods: {
        // types
        setType(id) {
            return this.store.type = id;
        },

        getTypes() {
            axios.get('http://localhost:8000/api/types/').then((response) => {
                this.types = response.data.results;
            });
        },

        toggleType(typeId) {
            if (this.selectedTypes.includes(typeId)) {
                // Se l'ID della tipologia è già presente nella lista selectedTypes, lo rimuovi
                this.selectedTypes = this.selectedTypes.filter(id => id !== typeId);
            } else {
                // Altrimenti, lo aggiungi alla lista selectedTypes
                this.selectedTypes.push(typeId);
            }
            // Una volta aggiornata la lista selectedTypes, chiami il metodo per filtrare i ristoranti
            this.filterRestaurants();
        },


        // restaurants
        getRestaurants() {
            axios.get('http://localhost:8000/api/restaurants/').then((response) => {
                this.restaurants = response.data.results;
                this.filterRestaurants();
            });
        },

        filterRestaurants() {
            console.log("Selected Types:", this.selectedTypes);
            if (this.selectedTypes.length > 0) {
                this.filteredRestaurants = this.restaurants.filter(restaurant =>
                    restaurant.types && Array.isArray(restaurant.types) &&
                    this.selectedTypes.every(typeId => restaurant.types.some(type => type.id === typeId))
                );
            } else {
                this.filteredRestaurants = this.restaurants;
            }
            console.log("Filtered Restaurants:", this.filteredRestaurants);
        },

        setRestaurant(item) {
            store.restaurant_slug = item.slug;
            store.restaurant_id = item.id;

        },
    },
    created() {
        this.getTypes();
        this.getRestaurants();
    }
}
</script>

<!--/JS-->

<!--HTML-->

<template>
    <div id="type-area" class="px-3 pb-5">
        <h2 class="text-center my-5 display-4 ms_text">
            Scegli cosa vuoi e noi te lo portiamo!
        </h2>

        <!--Tipologie-->
        <div>
            <h4 class="fs-2 ms_text">
                Attualmente sono disponibili {{ types.length }} Tipologie di Ristoranti
            </h4>
        </div>

        <ul class="row g-4 px-0 py-3 mw-100 flex-nowrap overflow-x-auto">
            <!-- Itera su ciascun tipo nell'array types -->
            <li class="col-6 col-md-4 col-lg-3 col-xl-1" v-for="item in types">
                <div class="type-card rounded" :key="item.id" @click="toggleType(item.id)"
                    :class="{ 'ms_active': selectedTypes.includes(item.id) }">
                    <div role="button" class="card-body">
                        <img :src="item.image" class="card-img-top" :alt="item.name">
                        <div class="form-check px-1 py-2 text-center fs-5">
                            <input class="visually-hidden form-check-input" type="checkbox" :value="item.id"
                                :id="'type-checkbox-' + item.id" v-model="selectedTypes" @change="filterRestaurants">
                            <label class="form-check-label ms_text" :for="'type-checkbox-' + item.id">
                                {{ item.name }}
                            </label>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <!-- /Tipologie-->

        <!--Ristoranti-->
        <div class="mt-3">
            <h4 class="fs-2 ms_text">
                Ristoranti trovati: {{ filteredRestaurants.length }}
            </h4>

            <ul class="row py-3 g-4 mw-100 flex-nowrap overflow-x-auto">
                <!-- Itera su ciascun tipo nell'array types -->
                <li class="col-12 col-md-6 col-lg-2" v-for="item in filteredRestaurants">
                    <router-link :to="{ name: RestaurantArea, path: '/restaurants/' + item.slug }"
                        @click="setRestaurant(item)" :key="item.id">
                        <div class="rounded restaurant-card h-100">
                            <img v-if="item.image" :src="item.image" class="card-img-top" :alt="item.name">
                            <div class="card-body">
                                <div class="text-center my-3 fs-5 fw-normal text-uppercase ms_text">
                                    {{ item.name }}
                                </div>
                                <div class="row g-2 p-3">
                                    <div class="col col-6" v-for="category in item.types">
                                        <span class="badge w-100 fs-6 fw-semibold ms_badge" :key="category.id"
                                            :class="{ 'ms_badge_active': selectedTypes.includes(category.id) }">
                                            {{ category.name }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>

        </div>
        <!--/Ristoranti-->
    </div>
</template>

<style scoped lang="scss">
@use '../assets/scss/variables.scss' as *;

h2 {
    color: $color8;
}

h4 {
    color: $color4;
    text-shadow: 3px 3px 3px $color6 ;
}

.type-card {
    background-color: $color2;
    border: 2px solid $color9;
    box-shadow: rgba(0, 0, 0, 0.356) .625rem .625rem;
    object-fit: cover;

    &:hover {
        transition: 0.5s ease-in-out;
        transform: scale(1.1);
        background-color: $color9;
        box-shadow: none;
        color: $color10;
    }
}

.ms_active {
    background-color: $color9;
    color: $color10;
}

.restaurant-card {
    background-color: $color4;
    border: 2px solid $color9;
    box-shadow: rgba(0, 0, 0, 0.356) .625rem .625rem;

    .ms_badge {
        background-color: $color2;
        color: $color8;
    }

    .ms_badge_active {
        background-color: $color9;
        color: $color10;
    }
}
</style>