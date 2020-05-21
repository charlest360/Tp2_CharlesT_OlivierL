<template>
    <div>
        <h1>Add a movie to our database</h1>

         <div v-if="error != null">
             <span>Erreur : {{error}}</span>
        </div>
        <div v-if="response != null && response == 'abracadabra'">
            <span> Account created!</span>
        </div>
        <div class="addMovieForm" v-else>
            <form @submit.prevent="validateAndSend" >
            <ul>
                <li>
                    <label class=" form__label" for="registrationForm_title">Title :</label>
                    <input v-model="title"  maxlength="50" minlength="2" type="text" class="form__control " id="registrationForm_title" name="title" >
                </li>
                <div v-if="validationErrors.length >= 1 && validationErrors[0].type == 'title' "> 
                    <span style="color:red;">{{validationErrors[0].message}} </span>
                </div>

                
                <li>
                    <label class=" form__label" for="registrationForm_Release_year">Release year :</label>
                    <input v-model="release_year" maxlength="4" minlength="4"  type="text" class="form__control " id="registrationForm_Release_yeard" name="Release_year" autocomplete="off">
                </li>
                <div v-if="validationErrors.length >= 1 && validationErrors[0].type == 'release_year' "> 
                    <span style="color:red;">{{validationErrors[0].message}} </span>
                </div>

                 


                <li>
                    <label class=" form__label" for="registrationForm_Length">Length in minutes :</label>
                    <input v-model="length" min="1" max="999" type="number" class="form__control " id="registrationForm_Length" name="Length" autocomplete="off">
                </li>
                <div v-if="validationErrors.length >= 1 && validationErrors[0].type == 'length' "> 
                    <span style="color:red;">{{validationErrors[0].message}} </span>
                </div>

                <li>
                     <span class=" form__label"> Decription :</span>
                    <textarea class="form__control" v-model="description" name="Description"  placeholder="Add a movie description" min="5"  cols="10" rows="5"></textarea>
                </li>
                <div v-if="validationErrors.length >= 1 && validationErrors[0].type == 'description' "> 
                    <span style="color:red;">{{validationErrors[0].message}} </span>
                </div>

              
                <li class="radioLi">
                    <span class="form__label">Rating :</span> 
                    <div class="radioDiv" v-for="ratingType in ratingTypes" :key="ratingType.id">
                        <input   v-model="rating"  class="radioButt " type="radio" :id="ratingType.id" :name="ratingType.name" :value="ratingType.name">
                        <label  class=" radioLabel" :for="ratingType.id"> {{ratingType.name}}</label>
                    </div>
                    
                </li>
                <div v-if="validationErrors.length >= 1 && validationErrors[0].type == 'rating' "> 
                    <span style="color:red;">{{validationErrors[0].message}} </span>
                </div>
                
                <li>
                    <label class=" form__label" for="registrationForm_Special_Features">Special features :</label>
                    <input v-model="special_features" type="text" class="form__control "  max="200" id="registrationForm_Special_Features" name="special_features" >
                </li>
                <div v-if="validationErrors.length >= 1 && validationErrors[0].type == 'special_features' "> 
                    <span style="color:red;">{{validationErrors[0].message}} </span>
                </div>

                


                
                <li class="submitButtonLi">
                    <button @click="validateAndSend" id="submitButton" >
                        Add movie to database
                    </button>
                </li>

            </ul>
        </form>
        </div>
        
    </div>
</template>

<script>
   import FilmService from '@/services/FilmService.js';
    export default {
     
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
            }
        },
        created(){
            this.getRatingTypes();
        }  ,    
        methods: {
            validateAndSend(){
                if(this.validateData() == true){
                    let data = {
                        title: this.title,
                        release_year: this.release_year,
                        length: this.length,
                        description: this.description,
                        rating: this.rating,
                        special_features: this.special_features,
                        language_id: 1
                    }
                    FilmService.addMovie(data,localStorage.getItem('token'))
                    .then(response => {
                    this.response = response.data;
                    })
                    .catch(error => {
                    this.error = error;
                    });
                }
            },
            validateData() {
                this.validationErrors = [];
                if (this.validateTitle() ==true &&
                this.validateReleaseYear() ==true &&
                this.validateLength() &&
                this.validateDescription() == true && 
                this.validateRating()== true &&
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
                }else if(isNaN(this.release_year)) {
                    this.validationErrors.push({type:'release_year',message:'release_year field must be numbers only'});
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
                    this.validationErrors.push({type:'language',message:'Last name field is required'});
                    return false;
                }
                return true;
            },
            validateSpecialFeatures(){
                if(this.special_features.length > 200 ) {
                    this.validationErrors.push({type:'image',message:'The special_features field must be 200 characters maximum'});
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
    #submitButton {
        width: 50%;
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
        width: 10%;
        display: inline-block;
    }
    .radioButt{
        
    }
    .radioLabel{

    }
    #registrationForm_Description{
        margin-left: 0%;
    }
    .submitButtonLi{
        margin-top: 40px;
        text-align: center;
    }
</style>