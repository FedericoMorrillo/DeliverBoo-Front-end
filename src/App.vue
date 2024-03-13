<script>
import FooterArea from './components/FooterArea.vue';
import LoginArea from './components/LoginArea.vue';
export default {
  data() {
    return {

      types: [],
    }

  },
  components: {
    FooterArea,
    LoginArea,

    methods: {
      apiloadign() {
        axios.get('http://localhost:8000/api/types/').then((response) => {
          this.types = response.data.results;
        });
      },
    }
  }
}
</script>

<template>
  <div id="giga-container" class="d-flex flex-column">
    <LoginArea />
    <main>
      <router-view></router-view>
      <FooterArea />
    </main>
  </div>
</template>

<style scoped>
#giga-container {
  min-height: 100vh;
}
</style>
