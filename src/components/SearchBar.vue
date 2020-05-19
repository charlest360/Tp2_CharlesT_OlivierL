<template>
    <div>
        <div id=searchBar>
            <span class="static" v-bind:class='{ hidden: isClicked}' >Search a movie by keyword: <input id="searchBox" v-model="filterName" /></span> 
            <button  id="searchButton" class=" static" v-bind:class='{ hidden: isClicked}'  @click="setIsClicked"> Search</button>
            <button  id="searchButton" class="static" v-bind:class='{ hidden: isClicked ==false }' @click="setIsClicked"> Back</button>
        </div>
        <film-suggestion-bar :isClicked="isClicked" :filterName="filterName" />
    </div>
   
    
    
</template>

<script>
import FilmSuggestionBar from '@/components/FilmSuggestionBar.vue';
export default {
    components: {
        FilmSuggestionBar,
    },
    data() {
        return {
        isClicked : false,
        filterName : '',
    }
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
  
    }
}
</script>

<style scoped>
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
  .hidden {
        display: none;
}
</style>