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
        setRestaurant(item) {
            store.restaurant_slug = item.slug;
            store.restaurant_id = item.id;

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
    <div id="type-area" class="container">
        <h2 class="text-center mb-5">
            <span class=" text-org">
                Scegli cosa vuoi e noi te lo portiamo!
            </span>
        </h2>
        <!--Tipologie-->
        <div>
            <h4 class="lengtharray mt-4 my-5">
                <span class=" text-org">
                    Attualmente sono disponibili {{ types.length }} Tipologie di Ristoranti
                </span>
            </h4>
        </div>

        <div class="row row-cols-4 g-4">
            <!-- Itera su ciascun tipo nell'array types -->
            <div class="col type-card-all" v-for="item in types">
                <div class="type-card rounded hoverimg" :key="item.id" @click="toggleType(item.id)"
                    :class="{ 'bg-orng': selectedTypes.includes(item.id) }">
                    <div class="clickable card-body">
                        <img :src="item.image" class="card-img-top" :alt="item.name">
                        <div class="form-check px-1 py-2 text-center">
                            <input class="visually-hidden form-check-input" type="checkbox" :value="item.id"
                                :id="'type-checkbox-' + item.id" v-model="selectedTypes" @change="filterRestaurants">
                            <label class="form-check-label " :for="'type-checkbox-' + item.id">
                                {{ item.name }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--Ristoranti-->
        <div class="mt-5">
            <h4 class="lengtharray pb-2">
                <span class=" text-org">
                    Ristoranti trovati: {{ filteredRestaurants.length }}
                </span>
            </h4>

            <div class="row row-cols-3">
                <!-- Itera su ciascun tipo nell'array types -->

                <router-link class="col restaurant-card card rounded h-100" role="button" @click="setRestaurant(item)"
                    v-for="item in filteredRestaurants" :key="item.id"
                    :to="{ name: RestaurantArea, path: '/restaurants/' + item.slug }">
                    <img v-if="item.image" :src="item.image" class="card-img-top" :alt="item.name">
                    <div class="card-body">
                        <div class="card-text text-center restaurant_name mb-3">{{ item.name }}</div>
                        <div class="row row-cols-3 mx-0 g-2">
                            <div class="col text-center" v-for="category in item.types">
                                <span class="badge ms_badge" :key="category.id"
                                    :class="{ 'bg-success': selectedTypes.includes(category.id), 'bg-secondary': !selectedTypes.includes(category.id) }">
                                    {{ category.name }}
                                </span>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <!--/Ristoranti-->
    </div>
</template>

<style scoped lang="scss">
#type-area {
    padding: 75px 0;
}

h2 {
    font-size: 4rem;
}

h4 {
    font-size: 2rem;
}

.restaurant_name {
    font-size: 2rem;
}

.ms_badge {
    font-size: 1.125rem;
}

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

.clickable {
    cursor: pointer;
}

.bg-orng {
    background-color: #FFA500;
}

@media screen and (max-width:1400px) {
    h2 {
        font-size: 50px;
    }
}

@media screen and (max-width:1200px) {
    .type-card {
        .form-check-label {
            font-size: 15px;
        }
    }

    h4 {
        text-align: center;
    }
}

@media screen and (max-width:992px) {
    h2 {
        font-size: 38px;
    }

    h4 {
        font-size: 26px;
    }

    .type-card-all {
        width: calc(100% / 4 - 20px);


    }

    .type-card {
        .form-check-label {
            font-size: 14px;
        }
    }
}

@media screen and (max-width:768px) {
    h2 {
        font-size: 28px
    }

    h4 {
        font-size: 18px;
    }

    .type-card-all {
        width: calc(100% / 4 - 20px);


    }

}
</style>

<!--/HTML-->

<!--CSS-->
<!--/CSS-->
