import axios from 'axios'

const apiFilms = axios.create({  
    baseURL: `http://radiant-plains-67953.herokuapp.com/api`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  

  export default {
    getFilms() {
      return apiFilms.get('/films');
    },
    getFilmsPage(pageNb) {
      return apiFilms.get('/films?page='+pageNb);
    },
    getFilmById(id){
      return apiFilms.get('/films/'+id);
    },
    getFilmActors(id){
      return apiFilms.get('/films/'+id+'/actors');
    },
    getFilmsByKeyword(keyword,pageNb) {
      return apiFilms.get('/films?keyword='+keyword+'&page='+pageNb);
    }
  }