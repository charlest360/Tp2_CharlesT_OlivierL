<template>
    <div >
        <section v-if="loading ==true">
            <span>Loading</span>
        </section>
        <section v-else>
            <buttons-menu />
            <search-bar />
                
            <div id="filmPage">
            
                
                <section>
                    <ul class="static" v-bind:class='{ hidden: isClicked}' id="filmData">
                        <li id="filmTitle"> 
                            <h1> <film-title :filmInfos="filmData.film" /> (<film-year :filmInfos="filmData.film" />)</h1> 
                        </li>
                        <li id="filmImage"> 
                            <film-image :filmInfos="filmData.film" height="400" width="400" /> 
                        </li>
                        <li id="rating">
                            <film-review-display :filmInfos="filmData.film"/>
                        </li>
                        <li id="filmDescription"> 
                            <film-description :filmInfos="filmData.film" /> 
                        </li>
                        <li id="filmRanking"> 
                            <film-ranking :filmInfos="filmData.film"/>
                        </li>
                        <li id="filmLength"> 
                            <film-length :filmInfos="filmData.film"/> minutes
                        </li>
                        <li id="filmReleaseYear">
                            
                        </li>
                        <li> 
                            <film-actors :filmId="filmData.film.id"  /> 
                        </li>
                    </ul>
                    
                    <button class="editButton" v-if="roleId ==1" @click="manageMovie()">
                        Edit movie's page 
                    </button>
                
                </section>
                
                <section >
                    <add-critic v-if="loggedIn == true" :filmId="id"/>
                    <h2 v-else>Log in to add a critic </h2>
                </section>
               
                <section >
                    <h2>Users reviews</h2>
                    <comment-section :filmId="id" />
                    
                </section>
                
            </div>
         
        </section>
        
    </div>
</template>

<script>
import FilmService from '@/services/FilmService.js';
import FilmActors from '@/components/FilmActors.vue';
import FilmImage from '@/components/FilmImage.vue';
import FilmTitle from '@/components/FilmTitle.vue';
import FilmYear from '@/components/FilmYear.vue';
import FilmReviewDisplay from '@/components/FilmReviewDisplay.vue';
import FilmDescription from '@/components/FilmDescription.vue';
import FilmRanking from '@/components/FilmRanking.vue';
import FilmLength from '@/components/FilmLength.vue';
import ButtonsMenu from '@/components/ButtonsMenu.vue';
import SearchBar from '@/components/SearchBar.vue';
import addCritic from '@/components/addCritic.vue';
import CommentSection from '@/components/CommentSection.vue';
    export default {
        components: {
            FilmActors,
            FilmImage,
            FilmTitle,
            FilmYear,
            FilmReviewDisplay,
            FilmDescription,
            FilmRanking,
            FilmLength,
            ButtonsMenu,
            SearchBar,
            addCritic,
            CommentSection
        },
        props: {
            id: {
                default: null,
                required: true
            },
        },
        data() {
            return {
                filmData: null,
                filterName : '',
                isClicked : false,
                token : null,
                roleId : null,
                loggedIn : false,
            }
        },
        watch: {
            id: function() {
                this.getFilmInfos();
            }
        },
        created () {
            this.getFilmInfos();
        },
        mounted () {
            this.token = localStorage.getItem('token') || 0;
            this.roleId = localStorage.getItem('roleId') || 0;
            if(this.token != 0) {
                this.loggedIn = true;
             }
             else {
                this.loggedIn = false;
            }
        },
        computed: {
            loading() {
                if(this.filmData ==null) {
                    return true;
                } 
                else {
                    return false;
                }
            },
            shouldClose() {
                 if(this.isClicked ==true || this.filterName.length < 3) {
                    return true;
                } 
                else {
                    return false;
                }
    }
        },
        methods: {
            getFilmInfos() {
                FilmService.getFilmById(this.id)
                .then(response => {
                this.filmData = response.data;
                })
                .catch(error => {
                this.error = error;
                });
            },
            setIsClicked(){
                if(this.isClicked ==true) {
                    this.isClicked = false;
                }
                else {
                    this.isClicked = true;
                }
            },
            manageMovie(){
                this.$router.push('/adminSection/manageMovie/'+this.filmData.film.id);
            }
            
        },
    }
</script>

<style scoped>
.editButton{
    padding: 10px 40px 10px 40px;
    font-weight: bold;
    color: #E6B91E;
    background-color: black;
}
.filmData {
    width : 70%;
    margin: auto;
}
ul
{
    list-style-type:none;
    padding:0px;
    margin:0px;
}

#filmImage {
    width : 400px;
    height : 400px;
    background-color: lightgray;
    margin : auto;
}

.hidden {
    display: none;
}

.page {
    width : 70%;
    margin:  auto;
    text-align: center;
  
  }
  .hidden {
    display: none;
  }
  .movieData {

    background-color: LightGray;
  }
  #filmPage{
      background-color: white;
      width: 70%;
      margin:auto;
  }
  #filmTitle h1 {
      padding-top: 20px;
  }
  #rating{
    display: inline-block;
    margin: auto;
  }
  #searchBar{
    vertical-align: bottom;
  background-color: #E6B91E;
  color: black;
  width: 100%;
  font-weight: bold;
  font-size: 20px;;
  display: inline-block;
  padding-top: 15px;
  padding-bottom: 15px;
  
  }
  #searchBox{
    width: 30%;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 10px 20px ;
  }
  #searchButton  {
    padding: 10px 40px 10px 40px;
    font-weight: bold;
    color: #E6B91E;
    background-color: black;
  }
  #filmDescription {
      width:50%;
      margin: auto;
      padding-top: 10px;
      padding-bottom: 10px;
  }

</style>