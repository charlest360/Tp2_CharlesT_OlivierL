<template>
    <div>
        <h1>Manage a movie</h1>
        <div v-if="error != null && action == 'edit'">
             <span class="error">Error editing the movie: {{error}}</span>
        </div>
        <div v-else-if="error != null && action == 'delete'">
             <span class="error">Error editing the movie: {{error}}</span>
        </div>
        <div v-else-if="response != null && action == 'edit'">
            <span class="response"> Movie edited with success </span>
        </div>
        <div v-else-if="response != null && action == 'delete'">
            <span  class="response"> Movie deleted with success </span>
        </div>
        <div class="addMovieForm" v-else>
            <form @submit.prevent="validateAndSend" >
            <ul>
                <li v-if="filmId == 'none'">
                    <label class=" form__label" for="registrationForm_id">Movie's id :</label>
                    <input v-model="movieId"   type="number" class="form__control " id="registrationForm_id" name="id" >
                </li>
                <div v-if=" filmIdError != null"> 
                    <span class="validationError">Film not found </span>
                </div>
                
                <li>
                    <label class=" form__label" for="registrationForm_title">Title :</label>
                    <input v-model="title"  maxlength="50" minlength="2" type="text" class="form__control " id="registrationForm_title" name="title" >
                </li>
                <div v-if="validationErrors.length >= 1 && validationErrors[0].type == 'title' "> 
                    <span class="validationError">{{validationErrors[0].message}} </span>
                </div>

                
                <li>
                    <label class=" form__label" for="registrationForm_Release_year">Release year :</label>
                    <input v-model="release_year" maxlength="4" minlength="4"  type="text" class="form__control " id="registrationForm_Release_yeard" name="Release_year" autocomplete="off">
                </li>
                <div v-if="validationErrors.length >= 1 && validationErrors[0].type == 'release_year' "> 
                    <span class="validationError">{{validationErrors[0].message}} </span>
                </div>

                 


                <li>
                    <label class=" form__label" for="registrationForm_Length">Length in minutes :</label>
                    <input v-model="length" min="1" max="999" type="number" class="form__control " id="registrationForm_Length" name="Length" autocomplete="off">
                </li>
                <div v-if="validationErrors.length >= 1 && validationErrors[0].type == 'length' "> 
                    <span class="validationError">{{validationErrors[0].message}} </span>
                </div>
                
                <li class="radioLi">
                    <span class="form__label">Rating :</span> 
                    <div class="radioDiv" v-for="ratingType in ratingTypes" :key="ratingType.id">
                        <input   v-model="rating"  class="radioButt " type="radio" :id="ratingType.id" :name="ratingType.name" :value="ratingType.name">
                        <label  class=" radioLabel" :for="ratingType.id"> {{ratingType.name}}</label>
                    </div>
                    
                </li>
                <div v-if="validationErrors.length >= 1 && validationErrors[0].type == 'rating' "> 
                    <span class="validationError">{{validationErrors[0].message}} </span>
                </div>


                <li>
                     <span class=" form__label"> Decription :</span>
                    <textarea class="form__control" v-model="description" name="Description"  placeholder="Add a movie description" min="5"  cols="10" rows="5"></textarea>
                </li>
                <div v-if="validationErrors.length >= 1 && validationErrors[0].type == 'description' "> 
                    <span class="validationError">{{validationErrors[0].message}} </span>
                </div>


                <li class="radioLi">
                    <span class="form__label">Language :</span> 
                    <div class="radioDiv" v-for="language in languages" :key="language.id">
                        <input   v-model="language_id"  class="radioButt " type="radio" :id="language.id" :name="language.name" :value="language.id">
                        <label  class=" radioLabel" :for="language.id"> {{language.name}}</label>
                    </div>
                    
                </li>
                <div v-if="validationErrors.length >= 1 && validationErrors[0].type == 'language' "> 
                    <span class="validationError">{{validationErrors[0].message}} </span>
                </div>
                
                <li>
                    <label class=" form__label" for="registrationForm_Special_Features">Special features :</label>
                    <input v-model="special_features" type="text" class="form__control "  max="200" id="registrationForm_Special_Features" name="special_features" >
                </li>
                <div v-if="validationErrors.length >= 1 && validationErrors[0].type == 'special_features' "> 
                    <span class="validationError">{{validationErrors[0].message}} </span>
                </div>

                


                
                <li class="submitButtonLi">
                    <button  id="editButt" class="submitButton" @click="setAction('edit')" >
                        Edit movie
                    </button>
                    <button  id="addButt" class="submitButton" @click="setAction('delete')" >
                        Delete movie
                    </button>
                </li>

                <li class="submitButtonLi">
                    
                </li>

            </ul>
        </form>
        </div>
    </div>
</template>

<script>
import FilmService from '@/services/FilmService.js';
    export default {
        props: {
            filmId: {
                default : 'none',
                required : false,
            },
        },
        data() {
            return {
                title: '',
                release_year: '',
                length: '',
                description: '',
                rating: '',
                language_id: '',
                special_features: '',
                validationErrors: [],
                error : null,
                response : null,
                ratingTypes : null,
                languages: null,
                action: null,
                filmIdError: null,
                movieId : null,
            }
        },
        created(){
            this.getRatingTypes();
            this.getLanguages();
            if(this.filmId != 'none'){
                this.movieId = this.filmId;
                //this.getFilminfos();
            }
        }  ,
        watch: {
            movieId: function() {
                if(this.movieId != null && this)
                    if(this.movieId == ""){
                        this.emptyForm();
                    }
                    else{
                        this.getFilminfos();
                    }
                
            }
        },    
        methods: {
            setAction(action){
                this.action = action;
            },
            emptyForm(){
                this.title = '';
                this.release_year = '';
                this.length ='';
                this.description ='';
                this.rating ='';
                this.language_id ='';
                this.special_features ='';
            },
            validateAndSend(){
                if(this.validateData() == true){
                    if(this.action == 'edit'){
                        let data = {
                            title: this.title,
                            release_year: this.release_year,
                            length: this.length,
                            description: this.description,
                            rating: this.rating,
                            special_features: this.special_features,
                            language_id: parseInt(this.language_id)
                        }
                        FilmService.editMovie(this.movieId,data,localStorage.getItem('token'))
                        .then(response => {
                        this.response = response.data;
                        })
                        .catch(error => {
                        this.error = error;
                        });
                    }
                    else {
                        FilmService.deleteMovie(this.movieId,localStorage.getItem('token'))
                        .then(response => {
                        this.response = response.data;
                        })
                        .catch(error => {
                        this.error = error;
                        });
                    }
                    
                }
            },
            validateData() {
                this.validationErrors = [];
                if (this.validateTitle() ==true &&
                this.validateReleaseYear() ==true &&
                this.validateLength() &&
                this.validateRating()== true &&
                this.validateDescription() == true && 
                this.validateLanguage() == true&&
                this.validateSpecialFeatures() == true
                ) 
                {
                    return true;
                }
                else{
                    return false;
                }
            },
            
            validateTitle(){
                if(this.validateTitle == ''){
                    this.validationErrors.push({type:'title',message:'Title field is required'});
                    return false;
                }
                else if(this.title.length < 2 || this.title.length > 50) {
                    this.validationErrors.push({type:'title', message:'Title field must be between 2 and 50 characters long'});
                    return false;
                }
                return true;
            },
            validateReleaseYear(){
                if(this.release_year == ''){
                    this.validationErrors.push({type:'release_year',message:'release_year field is required'});
                    return false;
                }
                else if(this.release_year.length != 4) {
                    this.validationErrors.push({type:'release_year',message:'release_year field must be 4 characters long (AAAA)'});
                    return false;
                }
                else if(isNaN(this.release_year)) {
                    this.validationErrors.push({type:'release_year',message:'release_year field must be numbers only'});
                    return false;
                }
                else if(this.release_year < this.currentYear) {
                    this.validationErrors.push({type:'release_year',message:'release_year cant be anterior to the current year'});
                    return false;
                }
                return true;
            },
            validateLength(){
                if(this.length == ''){
                    this.validationErrors.push({type:'length',message:'Length field is required'});
                    return false;
                }
                else if(this.length.length <1 || this.length.length > 3 ) {
                    this.validationErrors.push({type:'length',message:'Length field must between 1 and 3 characters long'});
                    return false;
                }
                else if(isNaN(this.length)){
                    this.validationErrors.push({type:'length',message:'Length field must be numbers only'});
                    return false;
                }
                else if(parseInt(this.length) <= 0){
                    this.validationErrors.push({type:'length',message:'Length field must be greater than zero'});
                    return false;
                }  
                return true;
            },
            validateDescription(){
                if(this.description == ''){
                    this.validationErrors.push({type:'description',message:'Description field is required'});
                    return false;
                }
                else if(this.description.length < 5 ) {
                    this.validationErrors.push({type:'description',message:'The description must have a minimum of 5 characters '});
                    return false;
                }
                return true;
            },
            validateRating(){
                if(this.rating == ''){
                    this.validationErrors.push({type:'rating',message:'rating  field is required'});
                    return false;
                }
                return true;
            },
            validateLanguage(){
                if(this.language == ''){
                    this.validationErrors.push({type:'language',message:':anguage field is required'});
                    return false;
                }
                return true;
            },
            validateSpecialFeatures(){
                if(this.special_features != null && this.special_features.length > 200 ) {
                    this.validationErrors.push({type:'special_features',message:'The special_features field must be 200 characters maximum'});
                    return false;
                } 
                return true;
            },
            getRatingTypes(){
                FilmService.getRatingTypes()
                .then(response => {
                    this.ratingTypes = response.data;
                })
                .catch(error => {
                    this.error = error;
                });
            },
            getLanguages(){
                FilmService.getLanguages()
                .then(response => {
                    this.languages = response.data;
                })
                .catch(error => {
                    this.error = error;
                });
            },
            getFilminfos(){
                this.filmIdError = null;
                let filmData;
                FilmService.getFilmById(this.movieId)
                .then(response => {
                filmData = response.data.film;
                this.title = filmData.title;
                this.release_year = filmData.release_year;
                this.length = parseInt(filmData.length);
                this.description = filmData.description;
                this.rating = filmData.rating;
                this.language_id = parseInt(filmData.language_id);
                this.special_features = filmData.special_features;


                })
                .catch(error => {
                this.filmIdError = error;
                this.emptyForm();
                });
            }
        } 
    }
    
</script>

<style scoped>
.addMovieForm{
    padding-top: 10px;
    padding-bottom :40px;
    text-align: center;
    margin: auto;
    width:50%;
    background-color: #fcdc6d;
    border: 1px solid black;
    margin-top:20px;
}
.form__label {
        float: left;
        width: 25%;
        text-align: left;
        padding-bottom: 5px;
        font-size: 20px;
        color: black;
    }
    li {
        margin-top: 20px;
        text-align: left;
        

    }
    .form__control{
        display: inline-block;
        width: 50%;
        padding-bottom: 5px;
        padding-top: 5px;
    }
    ul {
        list-style-type: none;
    }
    .submitButton {
        width: 40%;
        font-size: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
        font-weight: bold;
        color: #E6B91E;
        background-color: black;
        
        
    }
    #registrationForm_Description{
        width:75%;
        margin-left: 5%;
    }
    .radioLi{
        text-align: left;
    }
    .radioDiv{
        width: 20%;
        display: inline-block;
    }

    #registrationForm_Description{
        margin-left: 0%;
    }
    .submitButtonLi{
        margin-top: 40px;
        text-align: center;
        width: 100%;
    }
    .error {
        color: red;
        font-size: 35px;
    }
    .response{
        color:green;
        font-size: 35px;
    }
    .validationError{
        color: red;
    }
</style>