<script>
export default {
    name: "cart",
    props: ["cart"],


}


</script>
<template>

                  <div class="offcanvas-body">
                   <div>
                      <ul  v-for="carts in cart">
                        <li>{{ carts.name }} X {{ carts.quantity }}</li>
                      </ul>
                    </div>
                 </div>
</template>
<style scoped></style>