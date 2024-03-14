<!--JS-->

<script>
export default {
    data() {
        return {
        }

    }
}
</script>

<!--/JS-->

<!--HTML-->

<template>
    <header class="fs-5 fw-medium">
        <div class="container d-flex">
            <!--logo-->
            <div class="logo pt-1">
                <img src="/img/logo.jpeg" alt="Logo">
            </div>
            <!--/logo-->
            <ul class="d-flex align-items-center mb-0 w-100">
                <li class="scale d-flex align-items-center">
                    <a class="hovernav" href="http://localhost:5174/">Home</a>
                </li>
                <li class="pe-3 login scale d-flex align-items-center ms-auto">
                    <a class="hovernav" href="http://127.0.0.1:8000/login">Login</a>
                </li>
                <li class="pe-2 register scale d-flex align-items-center">
                    <a class="hovernav" href="http://127.0.0.1:8000/register">Registrati</a>
                </li>
            </ul>
        </div>
    </header>
</template>

<!--/HTML-->

<!--CSS-->

<style scoped lang="scss">
@use '../assets/scss/variables.scss' as *;

header {
    padding: 10px 0;
    background-color: $color1;
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    z-index: 9999;
    color: $color6;
    text-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.5);

    .scale:hover {
        transform: scale(1.2);
        transition: 0.3s ease-in-out;
    }

    // LOGO
    .logo {
        object-fit: cover;
        width: 3.125rem;

        img {
            width: 100%;
            border-radius: 6.25rem;
            animation: walk 2s linear infinite;
        }
    }

    @keyframes walk {
        0% {
            transform: translateX(0);
        }

        50% {
            transform: translateX(10px);
        }

        100% {
            transform: translateX(0);
        }
    }

    // LOGO
}
</style>
<!--/CSS-->