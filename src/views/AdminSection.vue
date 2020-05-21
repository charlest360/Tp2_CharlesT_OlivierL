<template>
    <div>
        <add-film v-if="adminAction == 'addMovie'" />
        <manage-film v-if="adminAction == 'manageMovie'" :filmId="filmId" />
    </div>
</template>

<script>
import AddFilm from '@/components/AddFilm.vue';
import ManageFilm from '@/components/ManageFilm.vue';
    export default {
        props: {
            adminAction: {
                type: String,
                default: null,
                required: true, 
            },
            filmId: {
                default : null,
                required : false,
            }
        },
        components: {
            AddFilm,
            ManageFilm
        },
    }
</script>

<style scoped>

</style>