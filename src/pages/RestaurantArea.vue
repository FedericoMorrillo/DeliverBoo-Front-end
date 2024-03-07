<!--JS-->

<script>
import axios from 'axios';
import { store } from '../store';
export default {
    data() {
        return {
            'restaurant': {}
        }
    },
    methods: {
        getRestaurant() {
            axios.get('http://127.0.0.1:8000/api/restaurants/'+store.restaurant_id).then((response) => {
                this.restaurant = response.data.results;
                console.log(response);
            });
        },
    },
    created() {
        this.getRestaurant();
    }
}
</script>

<!--/JS-->

<!--HTML-->

<template>
    <section class="container">
        <h2></h2>
        <div class="d-flex flex-wrap">
            <!-- Itera su ciascun tipo nell'array types -->
            <div class="type-card" v-for="item in restaurant.dishes">
                <img :src="item.image" class="card-img-top" :alt="item.name">
                <div class="card-body">
                    <div class="card-text text-center">{{ item.name }}</div>
                </div>
            </div>
        </div>
    </section>
</template>

<!--/HTML-->

<!--CSS-->

<style scoped lang="scss"></style>
<!--/CSS-->