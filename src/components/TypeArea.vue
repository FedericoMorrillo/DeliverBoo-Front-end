<!--JS-->

<script>
import axios from 'axios';
export default {
    data() {
        return {
            'types': [],
        }
    },
    methods: {
        getTypes() {
            axios.get('http://127.0.0.1:8000/api/types/').then((response) => {
                this.types = response.data.results;
                console.log(this.types);
            });
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
    <div class="section my-4">
        <div class="container d-flex flex-wrap">
            <!-- Itera su ciascun tipo nell'array types -->
            <div class="type-card" v-for="item in types">
                <img :src="item.image" class="card-img-top" :alt="item.name">
                <div class="card-body">
                    <div class="card-text text-center">{{ item.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<!--/HTML-->

<!--CSS-->
<!--/CSS-->
