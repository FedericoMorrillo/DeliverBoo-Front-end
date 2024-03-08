<!--JS-->

<script>
import axios from 'axios';
import { store } from '../store';
import RestaurantArea from '../pages/RestaurantArea.vue';
export default {
    data() {
        return {
            'searchkey': null,
            'types': [],
            'restaurants': [],
            store
        }

    },
    methods: {
        //TIPOLOGIE
        setType(id) {

            return store.type = id;
        },
        getTypes() {
            if (this.searchkey) {
                axios.get('http://127.0.0.1:8000/api/types/', { params: { key: this.searchkey } }).then((response) => {
                    this.types = response.data.results;
                });
            }
            else {
                axios.get('http://127.0.0.1:8000/api/types/').then((response) => {
                    this.types = response.data.results;
                });
            }
        },
        //RISTORANTI

        getRestaurants() {
            if (store.type) {
                axios.get('http://127.0.0.1:8000/api/restaurants/', { params: { type: store.type } }).then((response) => {
                    this.restaurants = response.data.results;
                });
            }
            else {
                axios.get('http://127.0.0.1:8000/api/restaurants/').then((response) => {
                    this.restaurants = response.data.results;
                });

            }
        },


        setRestaurant(id) {
            return store.restaurant_id = id;
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
    <h3 class="text-center mt-4">Tipologie:</h3>
    <div class="d-flex flex-wrap container mt-2 mb-4">
        <!-- Itera su ciascun tipo nell'array types -->
        <div class="type-card rounded" role="button" v-for="item in types" @click="setType(item.id)">
            <img :src="item.image" class="card-img-top" :alt="item.name">
            <div class="card-body">
                <div class="card-text text-center">{{ item.name }}</div>
            </div>
        </div>
    </div>
    <!--/Tipologie-->

    <!--Ristoranti-->
    <h3 class="text-center mt-4">Ristoranti:</h3>
    <div class="d-flex flex-wrap container">
        <!-- Itera su ciascun tipo nell'array types -->
        <router-link class="restaurant-card rounded p-3 my-3" role="button" @click="setRestaurant(item.id)"
            v-for="item in restaurants" :to="{ name: RestaurantArea, path: '/restaurants/' + item.id }">
            <!-- <img :src="item.image" class="card-img-top" :alt="item.name"> -->
            <div class="card-body">
                <div class="card-text text-center">{{ item.name }}</div>
            </div>
        </router-link>
    </div>
    <!--/Ristoranti-->

</template>

<!--/HTML-->

<!--CSS-->
<!--/CSS-->
