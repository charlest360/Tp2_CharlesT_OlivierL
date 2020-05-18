<template>
  <div class="page">
    
     
        <div id=searchBar>
          <span class="static" v-bind:class='{ hidden: isClicked}' >Search a movie by keyword: <input id="searchBox" v-model="filterName" /></span> 
          <button  id="searchButton" class=" static" v-bind:class='{ hidden: isClicked}'  @click="setIsClicked"> Search</button>
          <button  id="searchButton" class="static" v-bind:class='{ hidden: isClicked ==false }' @click="setIsClicked"> Back</button>
        </div>
        
        <div class="actualPage">
          <span class="error in Home.vue :">{{error}}</span>
      
        <section class="static" v-bind:class='{ hidden: shouldClose ==true }'>
          <film-suggestion-list :keyword="filterName" />
        </section>

         <h1 id="welcome" v-bind:class='{ hidden: isClicked}'>Welcome to Our Movie Database!</h1>

        
         <div class="movieData">
          <section class="static" v-bind:class='{ hidden: isClicked == false }' >
            <film-list :keyword="filterName" :clicked="isClicked" />
          </section>
      
        <section class="static" v-bind:class='{ hidden: isClicked}' >
          <home-movies-list :filmsData=filmsData />
        </section>
      </div>
      </div> 
        <span class="error in Home.vue :">{{error}}</span>
      
    
  </div>
 
</template>

<script>
import HomeMoviesList from '@/components/HomeMoviesList.vue'
import FilmService from '@/services/FilmService.js';
import FilmList from '@/components/FilmList.vue';
import FilmSuggestionList from '@/components/FilmSuggestionList.vue';
export default {
  name: 'Home',
  components: {
    HomeMoviesList,
    FilmList,
    FilmSuggestionList
  },
  data() {
    return {
      filmsData: null,
      error: null,
      filterName : '',
      isClicked : false
    }
  },
  created () {
    
    FilmService.getFilms()
      .then(response => {
        this.filmsData = response.data;
      })
      .catch(error => {
        this.error = error;
      });

    
   
  },
  methods: {
    setIsClicked(){
      if(this.isClicked ==true) {
        this.isClicked = false;
      }
      else {
        this.isClicked = true;
      }
    }
  },
  computed: {
    shouldClose() {
      if(this.isClicked ==true || this.filterName.length < 3) {
        return true;
      } 
      else {
        return false;
      }
    }
  },
  
}
</script>

<style scoped>
  #searchBar{
    vertical-align: bottom;
  background-color: #E6B91E;
  color: black;
  width: 110%;
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
  .actualPage {
    width : 70%;
    margin:  auto;
    text-align: center;
    background-color: white;
  
  }
  .hidden {
    display: none;
  }

  
  #welcome {
    padding-top : 15px;
    padding-bottom: 25px;
  }
</style>