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
    <div class="card mt-4 mx-auto message">
        <div class="card-body">
            <h3 class="text-center">{{ message }}</h3>
            <a href="/" role="button" class="btn custom_btn" @click="hideMessage">Torna alla Home</a>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>