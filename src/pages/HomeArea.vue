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
            <h1 class="display-5 fw-bold align-self-center text-white">
                Vuoi ordinare qualcosa al volo?
            </h1>
            <!--/title-->

            <h5 class="text-light fw-light my-4">Il traffico per le anatre non è un problema!</h5>

            <!--btn jumbo-->
            <div>
                <a class="btn btn-org" href="#type-area" data-scroll="">Cosa vuoi mangiare?</a>
            </div>
            <!--/btn jumbo -->
        </div>
    </div>
    <!--/Jumbotron-->

    <!-- <div class="content">
        <div class="container">

            <div class="d-flex gap-5 mb-4">

                <div class="home-card p-3 rounded description">
                    <h4>Ordina in modo semplice e veloce</h4>
                    <p>
                        Con la nostra applicazione intuitiva e facile da usare, puoi ordinare il tuo pasto preferito in
                        pochi
                        semplici passaggi. Aggiungi articoli al carrello, personalizza il tuo ordine e rilassati mentre
                        noi ci
                        occupiamo del resto.
                    </p>
                </div>


                <div class="home-card p-3 rounded description">
                    <h4>Consegna veloce e affidabile</h4>
                    <p>
                        Non importa dove ti trovi, il tuo pasto arriverà caldo e fresco in breve tempo. Grazie alla
                        nostra
                        affidabile rete di consegna, puoi gustare il tuo cibo preferito senza uscire di casa.
                    </p>
                </div>
            </div>

            <div class="d-flex justify-content-center">
                <div class="bg-white order p-3 rounded description">
                    <h4>Ordina ora!</h4>
                    <p>
                        Scegli la tipologia di ristoranti per visualizzare i ristoranti di quel genere
                    </p>
                </div>
            </div>
        </div>
    </div> -->

    <TypeArea />
</template>

<!--/HTML-->

<!--CSS-->

<style scoped lang="scss">
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