<template>
  <div class="page">
          
        <buttons-menu />
        <search-bar />
        
        <div class="actualPage">
            <span class="error in Home.vue :">{{error}}</span>
            <section class="static">
              <home-movies-list :filmsData=filmsData />
            </section>
        </div> 
        <span class="error in Home.vue :">{{error}}</span>
      
    
  </div>
 
</template>

<script>
import HomeMoviesList from '@/components/HomeMoviesList.vue'
import FilmService from '@/services/FilmService.js';
import ButtonsMenu from '@/components/ButtonsMenu.vue';
import SearchBar from '@/components/SearchBar.vue';
export default {
  name: 'Home',
  components: {
    HomeMoviesList,
    ButtonsMenu,
    SearchBar,
  },
  data() {
    return {
      filmsData: null,
      error: null,
      filterName : '',
      isClicked : false,
      isLoggedIn : false,
      connection :[]
    }
  },
  mounted () {
    if(localStorage.getItem('token')!= null){
      this.connection[0] = localStorage.getItem('roleId');
      this.connection[1] = localStorage.getItem('token'); 
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
    },
  },
  
  
}
</script>

<style scoped>
 
  .actualPage {
    width : 70%;
    margin:  auto;
    text-align: center;
    background-color: white;
  
  }
  

  
  #welcome {
    padding-top : 15px;
    padding-bottom: 25px;
  }
</style>