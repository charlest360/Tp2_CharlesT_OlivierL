<template>
    <div class="ratingStars">

                    <span></span>
                    <div v-if="nbOfCritics >= 5">
                       <span class="starRate"><star-rating
                            
                            v-bind:increment="0.5"
                            v-bind:max-rating="5"
                            inactive-color="#dbdbdb"
                            active-color="#cc1166"
                            v-bind:star-size="40"
                            :rating="criticsAverage" 
                            :read-only="true"/> </span> 
                    </div>
                    <div v-else>
                         <span class="starRate"><star-rating
                            
                            v-bind:increment="0.5"
                            v-bind:max-rating="5"
                            inactive-color="#dbdbdb"
                            active-color="#cc1166"
                            v-bind:star-size="40"
                            :rating="0"
                            :read-only="true"
                             />  not enough reviews</span> 
                    </div>

            

        </div>
</template>

<script>
import StarRating from 'vue-star-rating';
import FilmService from '@/services/FilmService.js';
    export default {
        props: {
            filmInfos: {
                type: Object,
                default: null,
                required : true
            },
        },
        components: {
            StarRating,
        },
        data() {
            return {
                filmCritics: {'empty':'string'},
                criticsAverage: null,
                nbOfCritics: 0
            }
        },
        created () {
            this.getFilmCritics();
        },
        watch: {
            filmInfos : function() {
                this.getFilmCritics();
            },
            filmCritics : function(){
                this.nbOfCritics =this.filmCritics.length; 
            },
            nbOfCritics: function(){
                this.calculateCriticsAverage()
            }
        },
        methods: {
            getFilmCritics() {
                this.loading =true;
                FilmService.getFilmById(this.filmInfos.id)
                .then(response => {
                this.filmCritics = response.data.critic;
                })
                .catch(error => {
                this.error = error;
                })
                .finally(() => this.loading =false);
            },
            calculateCriticsAverage() {
                    if (this.nbOfCritics >= 5) {
                         var i;
                        for (i = 0; i < this.nbOfCritics; i++) {
                            this.criticsAverage+= parseFloat( this.filmCritics[i].score);
                        }
                        this.criticsAverage = Math.round(((this.criticsAverage/this.nbOfCritics)*100)/20*1) /100; //division par 20 pour ramener sur 5
                    }
                    else {
                        this.criticsAverage = 0;
                    }
            },
        },
        
    }
</script>

<style scoped>

</style>