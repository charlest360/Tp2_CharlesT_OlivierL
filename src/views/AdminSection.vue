<template>
    <div>
        <add-film v-if="adminAction == 'addMovie'" />
    </div>
</template>

<script>
import AddFilm from '@/components/AddFilm.vue';
    export default {
        props: {
            adminAction: {
                type: String,
                default: null,
                required: true, 
            },
        },
        components: {
            AddFilm,
        },
    }
</script>

<style scoped>

</style>