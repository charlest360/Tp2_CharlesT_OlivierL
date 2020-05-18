<template>
    <div class ="buttonMenu">
          <div class="connectionButtons">
            <button id="signupButton" class="static" v-bind:class='{ hidden: isLoggedIn}'  @click="login"> Sign up</button>
            <button id="loginButton" class="static" v-bind:class='{ hidden: isLoggedIn}'  @click="login"> Login</button>
            <button id="profileButton" class="static" v-bind:class='{ hidden: isLoggedIn ==false}'  @click="login"> Profile</button>
            <button id="logoutButton" class="static" v-bind:class='{ hidden: isLoggedIn ==false}'  @click="login"> Logout</button>
          </div>
        </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn : false
    }
  },
  methods: {
    login(){
      if(this.isLoggedIn == true){
        this.isLoggedIn =false;
      }
      else {
        this.isLoggedIn = true
      }
      
    }
  },
}
</script>

<style scoped>
    .connectionButtons {
    
    padding-top: 15px;
    background-color: #E6B91E;
    width:100%;
  }
  #loginButton{
    
    
    float: right;
    width: 8%;
    padding: 10px 40px 10px 40px;
    font-weight: bold;
    color: #E6B91E;
    background-color: black;
  }
  #logoutButton{

    
    float: right;
    width: 8%;
    padding: 10px 40px 10px 40px;
    font-weight: bold;
    color: #E6B91E;
    background-color: black;
  }
  #signupButton{
    padding: 10px 40px 10px 40px;
    font-weight: bold;
    color: #E6B91E;
    background-color: black;
    
  }
  #profileButton{
    padding: 10px 40px 10px 40px;
    font-weight: bold;
    color: #E6B91E;
    background-color: black;
  }
  .hidden {
    display: none;
  }
</style>