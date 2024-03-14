<!--JS-->

<script>
import TypeArea from '../components/TypeArea.vue';

export default {
    name: 'HomeArea',
    components: {
        TypeArea,
    }
}
</script>

<!--/JS-->

<!--HTML-->

<template>
    <!--Jumbotron-->
    <div class="jumbotron p-5 bg-light">
        <div class="card ms_card p-5">
            <!--title-->
            <h1 class="fs-1 fw-semibold align-self-center">
                Vuoi ordinare qualcosa al volo?
            </h1>
            <!--/title-->

            <h5 class="fw-light my-4 fs-2">Il traffico per le anatre non è un problema!</h5>

            <!--btn jumbo-->
            <div>
                <a class="btn btn-org" href="#type-area" data-scroll="">Cosa vuoi mangiare?</a>
            </div>
            <!--/btn jumbo -->
        </div>
    </div>
    <!--/Jumbotron-->
    <TypeArea />
</template>

<!--/HTML-->

<!--CSS-->

<style scoped lang="scss">
@use '../assets/scss/variables.scss' as *;
//jumbotron
.jumbotron {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: url('/img/jumbo.png');
    background-size: cover;
    background-repeat: no-repeat;

    .ms_card {
        background-color: transparent;
        padding: .625rem;
        color: $color1b;
        border: 0;
        margin-top: 200px;
        margin-left: -300px;

        h1 {
            font-size: 4rem;
            color: rgba(0, 0, 0, 0.767);
        }

        h5 {
            font-size: 2.25rem;
        }

        a {
            font-size: 1.5rem;
        }
    }

}

//jumbotron
.description:hover {
    transform: scale(1.1);
    transition: 0.8s;
}

@media screen and (max-width:1400px) {
    .jumbotron {
        display: flex;
        flex-direction: row;
        justify-content: end;
        background-position: center;

        .card {
            width: 600px;

            h1 {
                font-size: 60px;
            }
        }

        .ms_card {
            margin: 0;
        }
    }
}

@media screen and (max-width:800px) {
    .jumbotron {
        flex-direction: row;
        justify-content: end;
        background-position: center;
    }
}

@media screen and (max-width:600px) {
    .jumbotron {
        .card {
            h1 {
                font-size: 45px;
            }
        }
    }
}
</style>
<!--/CSS-->