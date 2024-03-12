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
        setType(id) {
            return this.store.type = id;
        },
        getTypes() {
            axios.get('http://localhost:8000/api/types/').then((response) => {
                this.types = response.data.results;
            });
        },
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
        setRestaurant(id) {
            return this.store.restaurant_id = id;
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
    <!--Tipologie-->
    <div class="container">
        <h4 class="lengtharray mt-4 my-3">Attualmente ci sono {{ types.length }} tipi di Tipologie</h4>
    </div>

    <div class="d-flex flex-wrap container mt-2 mb-4">
        <!-- Itera su ciascun tipo nell'array types -->
        <div class="type-card rounded hoverimg mb-5" v-for="item in types" :key="item.id" @click="toggleType(item.id)"
            :class="{ 'bg-success': selectedTypes.includes(item.id) }">
            <div class="clickable card-body">
                <img :src="item.image" class="card-img-top" :alt="item.name">
                <div class="form-check">
                    <input class="visually-hidden form-check-input" type="checkbox" :value="item.id"
                        :id="'type-checkbox-' + item.id" v-model="selectedTypes" @change="filterRestaurants">
                    <label class="form-check-label" :for="'type-checkbox-' + item.id">
                        {{ item.name }}
                    </label>
                </div>
            </div>
        </div>
    </div>

    <!--Ristoranti-->
    <h3 class="text-center mt-4 lengtharray colorrestaurant">Ristoranti trovati {{ filteredRestaurants.length }}:</h3>
    <div class="d-flex flex-wrap container mb-3">
        <!-- Itera su ciascun tipo nell'array types -->
        <router-link class="restaurant-card rounded p-3 my-3" role="button" @click="setRestaurant(item.id)"
            v-for="item in filteredRestaurants" :key="item.id"
            :to="{ name: RestaurantArea, path: '/restaurants/' + item.id }">
            <img :src="item.image" class="card-img-top" :alt="item.name">
            <div class="card-body">
                <div class="card-text text-center">{{ item.name }}</div>
                <div class="d-flex flex-wrap">
                    <span v-if="item.types" class="badge me-1 my-1"
                        :class="{ 'bg-success': selectedTypes.includes(category.id), 'bg-secondary': !selectedTypes.includes(category.id) }"
                        v-for="category in item.types" :key="category.id">
                        {{ category.name }}
                    </span>
                </div>
            </div>
        </router-link>
    </div>
    <!--/Ristoranti-->
</template>

<style scoped lang="scss">
.hoverimg:hover {
    transition: 0.5s ease-in-out;
    transform: scale(1.1);
    background-color: #FFA500;
    box-shadow: none;
}

.hoverimg {
    transform: perspective(1000px);
    transform-style: preserve-3d;
}

.colorrestaurant {
    color: lightsalmon;
}

.clickable {
    cursor: pointer;
}
</style>

<!--/HTML-->

<!--CSS-->
<!--/CSS-->
