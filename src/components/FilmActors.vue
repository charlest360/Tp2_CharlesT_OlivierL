<template>
    <div>
        <span>Actors in this movie :</span>
        <span class="actorsName" v-for="actor in actorData" :key="actor.id">
            {{actor.first_name}} {{actor.last_name}}
        </span>
    </div>
</template>

<script>
    import FilmService from '@/services/FilmService.js';
    export default {
        props: {
            filmId: {
                type: Number,
                default: null,
                required: true
            },
        },
        data() {
            return {
                actorData: null
            }
        },
        mounted () {
            this.getActors();
        },
        watch: {
            filmId: function() {
                this.getActors();
            }
        },
        methods: {
            getActors() {
                FilmService.getFilmActors(this.filmId)
                .then(response => {
                this.actorData = response.data;
                })
                .catch(error => {
                this.error = error;
                });
            },
        },
    }
</script>

<style scoped>

</style>