
<template>
    
    <div class="filmDetails">
        <section v-if="loading">
            <h2>Chargement des films...</h2>
        </section>
    
        <section v-else>
            <ul class="movieInfos">
                <li>
                    <h2> <film-title :filmInfos="filmInfos" /> </h2>
                </li>
                <li class="filmImage"> 
                    <film-image :filmInfos="filmInfos" :width="300" :height="300"/>
                </li>
                <li id="rating">  <film-review-display  :filmInfos="filmInfos"  /> </li>
                <li>{{summaryPreview}} </li>
                <li>  <button id="filmButton" class="filmPageButton" @click="showFilmPage">Show this movie's page</button></li>
            </ul>
           
        </section>
        
    </div>
</template>

<script>
import FilmService from '@/services/FilmService.js';
import FilmReviewDisplay from '@/components/FilmReviewDisplay.vue';
import FilmTitle from '@/components/FilmTitle.vue';
import FilmImage from '@/components/FilmImage.vue';
    export default {
        components: {
            FilmReviewDisplay,
            FilmTitle,
            FilmImage
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
                filmData: null
            }
        },
        mounted () {
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
            }
        },
        watch: {
            filmId : function() {
                if(this.filmId > 0) {
                    this.getFilmData();
                }
                
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
ul
{
    list-style-type:none;
    padding:0px;
    margin:0px;
}
.filmImage {
    width : 300px;
    height : 300px;
    background-color: lightgray;
    margin : auto;
}
.movieInfos {
    width : 40%;
    margin: auto;
    
}
#filmButton  {
    padding: 10px 40px 10px 40px;
    font-weight: bold;
    color: #E6B91E;
    background-color: black;
  }
#filmRating{
    padding-top: 15px;
}
#rating{
    display: inline-block;
    margin: auto;
}

</style>