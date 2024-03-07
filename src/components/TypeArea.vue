<!--JS-->

<script>
import axios from 'axios';
import RestaurantArea from './RestaurantArea.vue'
export default {
    components: {
        RestaurantArea,
    },
    data() {
        return {
            'searchkey': null,
            'types': [],
        }
    },
    methods: {
        getTypes() {
            if (this.searchkey) {
                axios.get('http://127.0.0.1:8000/api/types/', { params: { key: this.searchkey } }).then((response) => {
                    this.types = response.data.results;

                    console.log(response);
                });
            }
            else {
                axios.get('http://127.0.0.1:8000/api/types/').then((response) => {
                    this.types = response.data.results;

                    console.log(response);
                });
            }
        }
    },
    created() {
        this.getTypes();
    }
}
</script>

<!--/JS-->

<!--HTML-->

<template>
    <div class="container section my-4">
        <form action="" @submit.prevent="getTypes">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Cerca la Tipologia</label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    v-model="searchkey">
            </div>
        </form>

        <div class="d-flex flex-wrap">
            <!-- Itera su ciascun tipo nell'array types -->
            <div class="type-card" v-for="item in types">
                <img :src="item.image" class="card-img-top" :alt="item.name">
                <div class="card-body">
                    <div class="card-text text-center">{{ item.name }}</div>
                </div>
            </div>
        </div>
    </div>
    <RestaurantArea />
</template>

<!--/HTML-->

<!--CSS-->
<!--/CSS-->
