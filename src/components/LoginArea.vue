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
    <header class="d-flex align-items-center headerblackmode">
        <div class="container d-flex justify-content-between nav">

            <div class="d-flex">
                <!--logo-->
                <div class="logo pt-1">
                <img src="/img/logo.jpeg" alt="Logo" class="logo-img">
             </div>
                <!--/logo-->
                <ul class="d-flex align-items-center ps-3">
                    <li class="scale">
                        <a class="hovernav" href="http://localhost:5173/">Home</a>
                    </li>
                </ul>
            </div>


            <!--login-register-->
            <ul class="d-flex align-items-center">
                <li class="pe-3 login scale">
                    <a class="hovernav" href="http://localhost:8000/login">Login</a>
                </li>
                <li class="pe-2 register scale">
                    <a class="hovernav" href="http://localhost:8000/register">Registrati</a>
                </li>
            </ul>
            <!--/login-register-->
        </div>
    </header>
</template>

<!--/HTML-->

<!--CSS-->

<style scoped lang="scss">

header{
    font-size: 1.5rem;
}
.hovernav:hover{
    color: white;
}

.scale:hover{
    transform: scale(1.2);
    transition: 0.3s ease-in-out;
}

.dark, .light{
    border-radius: 50px;
    padding: 10px;
}


.dark:hover{
    background-color: black;
    color: white;
    transition: 0.5s ease-in-out;
}



.logo-img {
  animation: walk 2s linear infinite;
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


</style>
<!--/CSS-->