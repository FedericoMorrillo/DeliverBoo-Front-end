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
    <div class="card mt-4 message">
        <div class="card-body d-flex justify-content-center align-items-center gap-3">
            <h3>{{ message }}</h3>
            <a href="/" role="button" class="btn btn-org">Torna alla Home</a>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>