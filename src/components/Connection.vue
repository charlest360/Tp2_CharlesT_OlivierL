<template>
    <div class="createAccountForm">
         <div v-if="error != null">
            <span style="color:red;font-size:25px;" > Login failed</span>
        </div>
        <div v-if="response != null">
            <span style="color:green;font-size:35px;"> Login successful! </span>
        </div>
        <form @submit.prevent="validateAndSend" v-else>
            <ul>
                
                <li>
                    <label class=" form__label" for="registrationForm_Login">Login :</label>
                    <input v-model="login"  type="text" class="form__control " id="registrationForm_Login" name="Login" >
                </li>
                <div v-if="validationErrors.length >= 1 && validationErrors[0].type == 'login' "> 
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
                    <button @click="validateAndSend" id="submitButton" >
                        Log in
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
                login: '',
                password: '',
                email: '',
                response: null,
                error: null,
                validationErrors: [],
            }
        },
        methods: {
            validateAndSend(){
                this.error = null;
                if(this.validateData() == true){
                    let data = {
                        login : this.login,
                        password : this.password,
                    }
                    FilmService.userLogin(data)
                    .then(response => {
                    this.response = response.data;
                    this.addResponseToStorage();
                    })
                    .catch(error => {
                    this.error = error;
                    });
                   
                        
                }
                
                
            },
            addResponseToStorage(){
                if(this.response.token != null){
                    localStorage.setItem('roleId',this.response.role_id); 
                    localStorage.setItem('token',this.response.token);
                    localStorage.setItem('id',this.response.id);
                    localStorage.setItem('username',this.login);
                    setTimeout(function(){
                        window.location.href = localStorage.getItem('backURL');
                    }, 4000)
                }
            },
            validateData() {
                this.validationErrors = [];
                if (this.validateLogin() ==true && this.validatePassword() ==true) 
                {
                    return true;
                }
                else{
                    return false;
                }
            },
            
            validateLogin(){
                if(this.login == ''){
                    this.validationErrors.push({type:'login',message:'Login field is required'});
                    return false;
                }
                return true;
            },
            validatePassword(){
                if(this.password == ''){
                    this.validationErrors.push({type:'password',message:'Password field is required'});
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