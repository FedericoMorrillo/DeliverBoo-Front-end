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

    methods:{
      apiloadign(){
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
    <router-view></router-view>
    <FooterArea />
</template>

<style scoped>

</style>
