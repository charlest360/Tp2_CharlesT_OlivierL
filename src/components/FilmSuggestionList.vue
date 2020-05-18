<template>
    <div class="listDiv">
        <ul class="filmsSuggestionList">
           
            <ul>
                <div class="filmListPreview" v-for="movie in sortedResults" :key="movie.id"> 
                    <li> 
                        <div class="filmImages" @click="showFilmPage(movie)"> <film-image :filmInfos="movie" :width="40" :height="40" /> </div>
                        <div class="filmTitle" @click="showFilmPage(movie)"> <film-title :filmInfos="movie" /> </div>
                        
                        (<film-year :filmInfos="movie" />)  
                    </li>
                </div>
            </ul>
    
            
        </ul>
    </div>
</template>

<script>
import FilmService from '@/services/FilmService.js';
import FilmTitle from '@/components/FilmTitle.vue';
import FilmYear from '@/components/FilmYear.vue';
import FilmImage from '@/components/FilmImage.vue';
    export default {
        props: {
            keyword: {
                type: String,
                default: ''
            },
        },
        components: {
            FilmYear,
            FilmTitle,
            FilmImage,
        },
        data() {
            return {
                result: {},
                pageNumber: 1,
                error : null,
                sortedResults : {}
            }
        },
        watch: {
            keyword : function() {
                if(this.keyword.length >= 3) {
                    this.fetchResults();
                }
                
            },
            pageNumber : function() {
                this.fetchResults();
            },
         
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
            showFilmPage(movieInfos) {
                this.$router.push('/films/'+movieInfos.id);
                this.$router.go();
            }
        },    
        computed: {
           /*sortedResults() {
                    return [...this.result.data].sort((a,b) => {
                        let modifier = -1;
                        if(a.release_year < b.release_year) return -1 * modifier;
                        if(a.release_year > b.release_year) return 1 * modifier;
                        return 0;
                    })   
           }, */
        }
    }   

        

        
    
</script>

<style scoped>
    .listDiv{
        text-align: center;
    }
    ul {
        list-style-type:none;
        padding-inline-start: 0px;
        
    }
    .filmsSuggestionList {
        left: 0;
        right: 0;
        position: absolute;
        display: block;
        background-color : white;
        border-width: thin;
        border-style: solid;
        border-color: black;
        width: 30%;
        margin: auto ;
        z-index: 100;
        
        
    }

    .filmsSuggestionList li {
        border-width: thin;
        border-style: solid;
        border-color: black;
        height: 40px;
        display: block;
        text-align: left;
       
        
    }
    .filmImages {
        display: inline-block;
    }
    .filmTitle  {
        display: inline-block;
       
    }
    
</style>