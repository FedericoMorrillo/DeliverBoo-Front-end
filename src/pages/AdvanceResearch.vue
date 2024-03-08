<!--JS-->

<script>
import axios from 'axios';
import { store } from '../store';
export default {
    data() {
        return {
            'restaurants': []
        }
    },
    methods: {
        getRestaurants() {
            axios.get('http://127.0.0.1:8000/api/restaurants', { params: { type: store.type } }).then((response) => {
                this.restaurants = response.data.results;
            });
        },

        setRestaurant(id) {
            return store.restaurant_id = id;
        },
    },
    created() {
        this.getRestaurants();
    }
}
</script>

<!--/JS-->

<!--HTML-->

<template>
    <section class="container in-b">
        <h2 class="mt-3 py-2 px-3 btn-org">Ristoranti</h2>
        <div class="d-flex flex-wrap">
            <!-- Itera su ciascun tipo nell'array types -->
            <router-link class="type-card rounded p-3 my-3" role="button" @click="setRestaurant(item.id)"
                v-for="item in restaurants" :to="{ name: RestaurantArea, path: '/restaurants/' + item.id }">
                <img :src="item.image" class="card-img-top" :alt="item.name">
                <div class="card-body">
                    <div class="card-text text-center">{{ item.name }}</div>
                </div>
            </router-link>
        </div>
    </section>
</template>

<!--/HTML-->

<!--CSS-->

<style scoped lang="scss"></style>
<!--/CSS-->