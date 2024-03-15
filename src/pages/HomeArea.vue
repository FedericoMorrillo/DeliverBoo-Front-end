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
    <div id="jumbotron" class="p-5 d-none d-lg-flex">
        <div id="jumbo-txt">
            <!--title-->
            <h1 class="fs-1 fw-semibold align-self-center">
                Vuoi ordinare qualcosa al volo?
            </h1>
            <!--/title-->

            <h5 class="fw-normal my-4 fs-2">Il traffico per le anatre non è un problema!</h5>

            <!--btn jumbo-->
            <div class="mt-2">
                <a class="btn custom_btn fs-3" href="#type-area" data-scroll="">Cosa vuoi mangiare?</a>
            </div>
            <!--/btn jumbo -->
        </div>
    </div>
    <!--/Jumbotron-->

    <!-- Tipologie -->
    <TypeArea />
    <!-- Tipologie -->


</template>

<!--/HTML-->

<!--CSS-->

<style scoped lang="scss">
@use '../assets/scss/variables.scss' as *;

#jumbotron {
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: url('/img/jumbo.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    #jumbo-txt {
        color: $color8;
        border: 0;
        margin-top: 200px;
        margin-left: -500px;
    }
}
</style>
<!--/CSS-->