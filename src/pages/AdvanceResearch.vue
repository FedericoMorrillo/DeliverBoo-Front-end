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
            axios.get('http://127.0.0.1:8000/api/restaurants').then((response) => {
                this.restaurants = response.data.results;
                console.log(response);
            });
        }
    },
    created() {
        this.getRestaurants();
    }
}
</script>

<!--/JS-->

<!--HTML-->

<template>
    <section class="container">
        <div class="d-flex flex-wrap">
            <!-- Itera su ciascun tipo nell'array types -->
            <div class="type-card" v-for="item in restaurants">
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