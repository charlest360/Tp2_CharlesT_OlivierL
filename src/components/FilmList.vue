<template>
    <div>
        <section v-if="result.meta.total ==0">
            <h1>No match was found for "{{keyword}}"</h1>     
        </section>
        <section v-else>
            <h1>{{result.meta.total}} matches were found for "{{keyword}}"   </h1>
            <button v-if="pageNumber > 1" @click="previousPageNumber" > Previous page </button>
            <button v-if="pageNumber < nbPagesResult" @click="nextPageNumber" > Next page </button>
            <ul class="filmList" v-for="movie in sortedResults" :key="movie.id">
                <li  class="filmTitle" > <h2> <film-title :filmInfos="movie" /></h2>  </li>
                <li class="filmImages" > <film-image :filmInfos="movie" :width="200" :height="200" />  </li>
                <li> (<film-year :filmInfos="movie" />) </li> 
                <li id="rating"> <film-review-display :filmInfos="movie" /> </li>
                <li> <film-description :filmInfos="movie" :nbCharToDisplay="100" /> </li>
                <li><button id="filmButton" class="filmPageButton" @click="showFilmPage(movie.id)">Consulter ce film </button></li>
            </ul>
            
        </section>
        
    </div>
</template>

<script>
/*
<ul class="films">
            <h1>{{result.meta.total}} results founds</h1>
            <ul>
                <div class="filmListLi" v-for="movie in sortedResults" :key="movie.id"> <film-list-details :filmId="movie.id" /> </div>
                
            </ul>
    
            
        </ul>
*/
import FilmService from '@/services/FilmService.js';
import FilmImage from '@/components/FilmImage.vue';
import FilmTitle from '@/components/FilmTitle.vue';
import FilmYear from '@/components/FilmYear.vue';
import FilmReviewDisplay from '@/components/FilmReviewDisplay.vue';
import FilmDescription from '@/components/FilmDescription.vue';
    export default {
        props: {
            keyword: {
                type: String,
                default: null,
                required : true
            },
            clicked : {
                type: Boolean,
                default: false
            }
        },
        components: {
            FilmImage,
            FilmTitle,
            FilmYear,
            FilmReviewDisplay,
            FilmDescription
        },
        data() {
            return {
                result: Array,
                pageNumber: 1,
                error : null,
                sortedResults : {}

            }
        },
        watch: {
            keyword : function() {   
                this.fetchResults();         
            },
            pageNumber : function() {
                this.fetchResults();
            },
            clicked : function(){
                this.pageNumber =1;
            }
        },
        methods: {
            fetchResults() {
                FilmService.getFilmsByKeyword(this.keyword,this.pageNumber)
                .then(response => {
                this.result = response.data;
                this.sortResults();
                })
                .catch(error => {
                this.error = error;
                });
            },
            sortResults(){
                this.sortedResults = [...this.result.data].sort((a,b) => {
                        let modifier = -1;
                        if(a.release_year < b.release_year) return -1 * modifier;
                        if(a.release_year > b.release_year) return 1 * modifier;
                        return 0;
                })   
            },
            showFilmPage(id) {
                this.$router.push('/films/'+id);
                this.$router.go();
            },
            nextPageNumber(){
                //if(this.pageNumber < nbPagesResult) {
                    this.pageNumber++;
                //}
            },
            previousPageNumber(){
                this.pageNumber--;
            }
        },    
        computed: {
            nbPagesResult() {
                return this.result.meta.last_page; 
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