<template>
    <div class ="buttonMenu">
          <div class="connectionButtons">
            
            <button id="signupButton" class="static" v-bind:class='{ hidden: loggedIn}'  @click="profile('signUp')"> Sign up</button>
            <button id="loginButton" class="static" v-bind:class='{ hidden: loggedIn}'  @click="login()"> Login</button>
            <button id="profileButton" class="static" v-bind:class='{ hidden: loggedIn ==false}'  @click="profile('profile')"> Profile</button>
            <button id="logoutButton" class="static" v-bind:class='{ hidden: loggedIn ==false}'  @click="login"> Logout</button>
          </div>
        </div>
</template>

<script>
export default {
  data() {
    return {
    token : null,
     loggedIn : false,
    }
  },
  mounted () {
     this.token = localStorage.getItem('token') || 0;
  },
  watch: {
    token: function() {
      if(this.token != 0) {
        this.loggedIn = true;
      }
      else {
        this.loggedIn = false;
      }
    }
  },
  methods: {
    login(){
        if(this.token != 0){
          localStorage.removeItem('token');
          localStorage.removeItem('roleId');
          localStorage.removeItem('id');
          localStorage.removeItem('backURL');
          this.token = 0; 
        }
      else {
        localStorage.setItem('backURL',window.location.href)
        this.$router.push('/users/Login');
        this.$router.go();
      }
      
      
    },
    profile(button) {
      this.$router.push('/users/profile/'+button);
      this.$router.go();       
    },
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