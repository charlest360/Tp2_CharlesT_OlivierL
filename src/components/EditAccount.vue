<template>
    <div class="createAccountForm">
        <div v-if="error != null">
             <span>Erreur : {{error}}</span>
        </div>
        <div v-if="response != null">
            <span> Account edited!</span>
        </div>
        <form @submit.prevent="validateAndSend" v-else>
            <ul>           
                
                <li>
                    <label class=" form__label" for="registrationForm_Last_Name">Last name :</label>
                    <input v-model="lastName" type="text" class="form__control " id="registrationForm_Last_Name" name="lastName" >
                </li>
                <div v-if="validationErrors.length >= 1 && validationErrors[0].type == 'lastName' "> 
                    <span style="color:red;">{{validationErrors[0].message}} </span>
                </div>
                
                <li>
                    <label class=" form__label" for="registrationForm_First_Name">First name :</label>
                    <input v-model="firstName" type="text" class="form__control " id="registrationForm_First_Name" name="firstName" >
                </li>
                <div v-if="validationErrors.length >= 1 && validationErrors[0].type == 'firstName' "> 
                    <span style="color:red;">{{validationErrors[0].message}} </span>
                </div>
                
                <li>
                    <label class=" form__label" for="registrationForm_Password">Password :</label>
                    <input v-model="password" type="text" class="form__control " id="registrationForm_Password" name="Password" autocomplete="off">
                </li>
                <div v-if="validationErrors.length >= 1 && validationErrors[0].type == 'password' "> 
                    <span style="color:red;">{{validationErrors[0].message}} </span>
                </div>


                <li>
                    <label class=" form__label" for="registrationForm_ConfirmPassword">Confirm Password :</label>
                    <input v-model="confirmPassword" type="text" class="form__control " id="registrationForm_ConfirmPassword" name="Password" autocomplete="off">
                </li>
                <div v-if="validationErrors.length >= 1 && validationErrors[0].type == 'confirmPassword' "> 
                    <span style="color:red;">{{validationErrors[0].message}} </span>
                </div>
                
                
                <li>
                    <label class=" form__label" for="registrationForm_Email">Email :</label>
                    <input v-model="email" type="text" class="form__control " id="registrationForm_Email" name="Email">
                </li>
                <div v-if="validationErrors.length >= 1 && validationErrors[0].type == 'email' "> 
                    <span style="color:red;">{{validationErrors[0].message}} </span>
                </div>
                

         
                
                <li>
                    <button @click="validateAndSend" id="submitButton" >
                        Edit account
                    </button>
                </li>

            </ul>
        </form>
        
        
        
    </div>
</template>

<script>
import FilmService from '@/services/FilmService.js';
    export default {
     
        data() {
            return {
                password: '',
                confirmPassword: '',
                email: '',
                lastName: '',
                firstName: '',
                response: null,
                error: null,
                validationErrors: [],
                success: null,
                userInfos : null,
                role_id : null,
                login : null,
            }
        },
        created () {
            //this.success = FilmService.setToken();
            this.getUserInfos();
           
        },
              
        methods: {
            getUserInfos(){
                FilmService.getUserInfos(localStorage.getItem('id'),localStorage.getItem('token'))
                    .then(response => {
                    this.userInfos = response.data.user;
                    this.email = this.userInfos.email;
                    this.lastName = this.userInfos.last_name;
                    this.firstName = this.userInfos.first_name;
                    this.login = this.userInfos.login;
                    this.role_id = this.userInfos.role_id
                    })
                    .catch(error => {
                    this.error = error;
                    });
            },
            validateAndSend(){
                this.success = this.validateData();
                if( this.success == true){
                    let data = {
                        password : this.password,
                        email : this.email,
                        last_name : this.lastName,
                        first_name : this.firstName,
                        role_id : this.role_id,
                        login : this.login
                    }
                    FilmService.editUser(localStorage.getItem('id'),data,localStorage.getItem('token'))
                    .then(response => {
                    this.response = response.data;
                    })
                    .catch(error => {
                    this.error = error;
                    });

                    FilmService.editUserPassword(localStorage.getItem('id'),data,localStorage.getItem('token'))
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
                if (this.validatePassword() ==true &&
                this.validateConfirmPassword() &&
                this.validateEmail() == true && 
                this.validateLastName()== true &&
                this.validateFirstName() == true
                ) 
                {
                    return true;
                }
                else{
                    return false;
                }
            },
            validatePassword(){
                if(this.password == ''){
                    this.validationErrors.push({type:'password',message:'Password field is required'});
                    return false;
                }
                else if(this.password.length < 5 || this.password.length > 50) {
                    this.validationErrors.push({type:'password',message:'Password field must be between 5 and 50 characters long'});
                    return false;
                }
                return true;
            },
            validateConfirmPassword(){
                if(this.confirmPassword == ''){
                    this.validationErrors.push({type:'confirmPassword',message:'You must confirm your password'});
                    return false;
                }
                else if(this.confirmPassword != this.password) {
                    this.validationErrors.push({type:'confirmPassword',message:'Passwords are not identical'});
                    return false;
                }
                return true;
            },
            validateEmail(){
                if(this.email == ''){
                    this.validationErrors.push({type:'email',message:'Email field is required'});
                    return false;
                }
                else if(this.email.length < 8 || this.email.length > 50) {
                    this.validationErrors.push({type:'email',message:'Please enter a valid email address '});
                    return false;
                }
                return true;
            },
            validateFirstName(){
                if(this.firstName == ''){
                    this.validationErrors.push({type:'firstName',message:'First name field is required'});
                    return false;
                }
                else if(this.firstName.length < 2 || this.firstName.length > 50) {
                    this.validationErrors.push({type:'firstName',message:'First name field must be between 2 and 50 characters '});
                    return false;
                }
                return true;
            },
            validateLastName(){
                if(this.lastName == ''){
                    this.validationErrors.push({type:'lastName',message:'Last name field is required'});
                    return false;
                }
                else if(this.lastName.length < 2 || this.lastName.length > 50) {
                    this.validationErrors.push({type:'LastName',message:'Last name field must be between 2 and 50 characters '});
                    return false;
                }
                return true;
            },
        } 
    }
    
</script>

<style scoped>
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

        

    }
    .form__control{
        display: inline-block;
        width: 70%;
        padding-bottom: 5px;
        padding-top: 5px;
    }
    ul {
        list-style-type: none;
    }
    .createAccountForm{
        width: 50%;
        background-color: #fcdc6d;
        display: inline-block;
        margin: auto;
    }
    #submitButton {
        width: 50%;
        font-size: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        font-weight: bold;
        color: #E6B91E;
        background-color: black;
    }
    .accountContent{
        color: black;
    }
    .hidden {
        display: none;
    }
    .error {
        float: left;
    }
    
</style>