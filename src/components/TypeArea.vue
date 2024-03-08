<!--JS-->

<script>
import axios from 'axios';
import { store } from '../store';
export default {
    data() {
        return {
            types: [],
            store,
        }

    },
    methods: {
        setType(id) {

            return store.type = id;
        },
        getTypes() {
                axios.get('http://localhost:8000/api/types/').then((response) => {
                    this.types = response.data.results;
                })
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
    <div class="container section my-4 mt-5 ciao">
         <h4 class="lengtharray">attualmente ci sono {{ types.length }} tipi di ristoranti</h4>
        <div class="d-flex flex-wrap">
            <!-- Itera su ciascun tipo nell'array types -->
            <router-link :to="{ name: AdvanceResearch, path: '/restaurants' }" class="type-card rounded hoverimg  mb-5" role="button"
                v-for="item in types" @click="setType(item.id)">
                <img :src="item.image" class="card-img-top" :alt="item.name">
                <div class="card-body">
                    <div class="card-text text-center">{{ item.name }}</div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<style scoped lang="scss">
.hoverimg:hover{
    transition: 1s ease-in-out;
    transform: translateZ(300px) translateY(20px) rotateZ(2deg);
    background-color:#FFA500 ;
}

.hoverimg{
    transform:perspective(1000px);
    transform-style: preserve-3d;
}
</style>

<!--/HTML-->

<!--CSS-->
<!--/CSS-->
