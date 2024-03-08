<!--JS-->

<script>
import axios from 'axios';
import { store } from '../store';
export default {
    data() {
        return {
            'searchkey': null,
            'types': [],
            store
        }

    },
    methods: {
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
            <div class="mb-3 row">
                <div class="col-10">
                    <label for="exampleInputEmail1" class="form-label fw-bold">Cerca la Tipologia</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        v-model="searchkey">
                </div>
                <div class="col-2 mt-auto">
                    <button class="btn btn-org">cerca</button>
                </div>
            </div>

        </form>

        <div class="d-flex flex-wrap">
            <!-- Itera su ciascun tipo nell'array types -->
            <router-link :to="{ name: AdvanceResearch, path: '/restaurants' }" class="type-card rounded" role="button"
                v-for="item in types" @click="setType(item.id)">
                <img :src="item.image" class="card-img-top" :alt="item.name">
                <div class="card-body">
                    <div class="card-text text-center">{{ item.name }}</div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<!--/HTML-->

<!--CSS-->
<!--/CSS-->
