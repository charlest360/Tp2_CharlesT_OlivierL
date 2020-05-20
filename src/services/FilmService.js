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
    },
    createNewUser(data){
      return apiFilms.post('/users',data) ;
    },
    checkUserLoginExists(login){
      return apiFilms.get('/users/'+login+'/verify');
    },
    userLogin(data){
      return apiFilms.post('/users/login',data);
    },
    editUser(id,data,token){
      let apiFilmToken = axios.create({  
        baseURL: `http://radiant-plains-67953.herokuapp.com/api`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer '+token
        }
      })
      return apiFilmToken.put('/users/'+id,data) ;
    },
    editUserPassword(id,data,token){
      let apiFilmToken = axios.create({  
        baseURL: `http://radiant-plains-67953.herokuapp.com/api`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer '+token
        }
      })
      return apiFilmToken.put('/users/'+id+'/password',data) ;
    },
    getUserInfos(id,token) {
      let apiFilmToken = axios.create({  
        baseURL: `http://radiant-plains-67953.herokuapp.com/api`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer '+token
        }
      })
      
      
      return apiFilmToken.get('/users/'+id) ;
    },


  }