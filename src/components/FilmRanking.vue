<template>
        <span >{{filmInfos.rating}}</span>
</template>

<script>
    export default {
        props: {
            filmInfos: {
                type: Object,
                default: null,
                required : true
            },
        },

    }
</script>

<style scoped>

</style>