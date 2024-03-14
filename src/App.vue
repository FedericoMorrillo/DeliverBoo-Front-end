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
  <LoginArea />
  <div id="giga-container" class="d-flex flex-column">
    <main>
      <router-view></router-view>
    </main>
    <FooterArea />
  </div>
</template>

<style scoped>
#giga-container {
  margin-top: 71.8px;
  height: calc(100vh - 71.8px);
  overflow-y: auto;
}
</style>
