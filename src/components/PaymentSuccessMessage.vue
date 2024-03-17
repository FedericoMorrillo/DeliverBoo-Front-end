<script>
export default {
    props: {
        message: String
    },
    methods: {
        hideMessage() {
            this.$emit('hide-message');
        }
    }
};
</script>

<template>
    <div class="my-5 mx-auto message text-center">
        <h3 class=" alert alert-success" role="alert">{{ message }}</h3>
        <a href="/" role="button" class="btn custom_btn" @click="hideMessage">Torna alla Home</a>
    </div>
</template>

<style scoped lang="scss"></style>