<template>
    <span>{{filmInfos.release_year}}</span>
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

<style lang="scss" scoped>

</style>