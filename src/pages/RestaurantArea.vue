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
            axios.get('http://127.0.0.1:8000/api/restaurants/' + store.restaurant_id).then((response) => {
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
    <section class="container in-b">
        <h2 class="mt-3 py-2 px-3 btn-org">Menù</h2>
        <div class="d-flex flex-wrap">
            <!-- Itera su ciascun tipo nell'array types -->
            <div class="restaurant-card rounded p-3 my-3" v-for="item in restaurant.dishes">
                <img :src="item.image" class="card-img-top" :alt="item.name">
                <div class="card-body">
                    <div class="card-text text-center"><strong>{{ item.name }}</strong></div>
                </div>
                <div class="desc-window text-secondary">
                    {{ item.description }}
                </div>
                <div class="d-flex mt-3 mb-2 justify-content-between align-items-center">
                    <div>
                        <span class="fs.secondary me-2 bold"><strong>Prezzo:</strong></span>{{ item.price }}€
                    </div>
                    <div>
                        <button class="btn btn-org">Acquista</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<!--/HTML-->

<!--CSS-->

<style scoped lang="scss"></style>
<!--/CSS-->