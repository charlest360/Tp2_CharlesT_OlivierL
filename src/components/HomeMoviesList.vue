<template>
  <div class="HomeMovieList">
    <section v-if="loading">
            <h2>Chargement en cours...</h2>
    </section>
    <section v-else>
      <film-details :filmId=pagesData[pagesData.length-1] />
      <film-details :filmId=pagesData[pagesData.length-2] />
      <film-details :filmId=pagesData[pagesData.length-3] />
    </section>
    
    <ul class="films">
     
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import FilmService from '@/services/FilmService.js';
import FilmDetails from '@/components/FilmDetails.vue';
export default {
  name: 'HelloWorld',
  components: {
   FilmDetails
  },
  props: {
    filmsData: {
      type : Object,
      default : null
    }
  },
  data() {
    return {
      pagesData: [],
      required : true
    }
  },
 
 computed: {
    lastPageNb() {
      if (this.filmsData != null) {
        return this.filmsData.meta.last_page;
      }
       else{
         return 0;
       }
    },
    loading() {
      if(this.lastPageNb == null) {
        return true;
      }
      else {
        return false;
      }
    }
  },
  watch: {
    filmsData: function() {
      this.getData();
    }
  },
  methods: {
    addIdToData(dataArray) {
      for (let data of dataArray) {
        this.pagesData.push(data['id']);
      }
    },
    getData() {
       axios.all([
      FilmService.getFilmsPage(this.lastPageNb),
      FilmService.getFilmsPage(this.lastPageNb -1)
      ])
      .then(axios.spread((last, secondLast) => {
      this.addIdToData(secondLast.data.data);
      this.addIdToData(last.data.data); //this.pagesData.push(JSON.stringify(secondLast.data.data[0])),this.pagesData.push(JSON.stringify(last.data.data))// , this.pagesData.push((last.data.data.id).toString)
    })
  ); 
    }
  },
    

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
