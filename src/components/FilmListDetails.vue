<template>
     <div class="filmDetails">
        <section v-if="loading">
            <h2>Chargement des films...</h2>
        </section>
    
        <section v-else>
            <ul class="movieInfos">
                <li><h2 class="title"> {{filmInfos.title}} </h2></li>
                <li class="filmImage"> 
                     <section v-if="filmInfos.image != null  && filmInfos.image.length >0 ">
                        <img :src="filmInfos.image" alt="une image" height="200" width="200">
                     </section>
            
                    <section v-else>
                        <img src="@/assets/noImage.png" alt="aucune image pour le film" height="200px" width="200px"> 
                     </section>
                </li>
                <li>  <StarRating :nbOfRatings="nbOfCritics" :ratings="filmData.critic"  /> </li>
                <li>{{summaryPreview}} </li>
                <li>  <button class="filmPageButton" @click="showFilmPage">Consulter ce film </button></li>
                <li>Rating : {{filmInfos.rating}} </li>
            </ul>
           
        </section>
        
    </div>
</template>

<script>
import FilmService from '@/services/FilmService.js';
import StarRating from '@/components/StarRating.vue';
    export default {
        components: {
            StarRating,
        },
        props: {
            filmId: {
                type: Number,
                required: true,
                default : 0
            },
        },
        data() {
            return {
                error : null,
                loading : false,
                filmData: {}
            }
        },
        created () {
            if(this.filmId > 0) {
                this.getFilmData();
            }
            
        },
        computed: {
            filmInfos() {
                return this.filmData.film;
            },
            nbOfCritics() {
                return this.filmData.critic.length; 
            },
            criticsAverage(){
                let rating = 0;
                if (this.nbOfCritics > 0) {
                    for (let critic of this.filmData.critic)  {
                         rating += critic.score;
                    }
                    return (rating/this.nbOfCritics);
                }
                return rating;
            },
            summaryPreview() {
                if (this.filmInfos.description.size >= 100){
                    return (this.filmInfos.description.substring(0,100)+"...");
                }
                return (this.filmInfos.description+"...") ;
            },
        
        },
        watch: {
            filmId : function() {
                this.getFilmData();
            }
        },
        methods: {
            getFilmData() {
                this.loading =true;
                FilmService.getFilmById(this.filmId)
                .then(response => {
                this.filmData = response.data;
                })
                .catch(error => {
                this.error = error;
                })
                .finally(() => this.loading =false);
            },
            showFilmPage() {
                this.$router.push('/films/'+this.filmId);
            }
            
        },
    

    
    }
</script>

<style scoped>
    ul{
    list-style-type:none;
    padding:0px;
    margin:0px;
    }
</style>