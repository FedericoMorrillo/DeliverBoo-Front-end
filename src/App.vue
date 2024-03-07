<script>
import FooterArea from './components/FooterArea.vue';
import LoginArea from './components/LoginArea.vue';
export default {
  components: {
    FooterArea,
    LoginArea,
  }
}
</script>

<template>
  <LoginArea />
  <router-view></router-view>
  <FooterArea />
</template>

<style scoped></style>
