<template>
    <div class ="buttonMenu">
          <div class="connectionButtons">
            
            <button id="signupButton" class="static" v-bind:class='{ hidden: loggedIn}'  @click="profile('signUp')"> Sign up</button>
            <button id="loginButton" class="static" v-bind:class='{ hidden: loggedIn}'  @click="login()"> Login</button>
            <span style="font-size:20px;color:black;font-weight:bold;" v-if="username != 0" > Welcome {{username}} !!!</span>
            <button id="profileButton" class="static" v-bind:class='{ hidden: loggedIn ==false}'  @click="profile('profile')"> 's Profile</button>
            <button id="logoutButton" class="static" v-bind:class='{ hidden: loggedIn ==false}'  @click="login"> Logout</button>
          </div>
        </div>
</template>

<script>
export default {
  data() {
    return {
      token : null,
      id : null,
      roleId : null,
      username : null,
      loggedIn : false,
    }
  },
  mounted () {
     this.token = localStorage.getItem('token') || 0;
     this.id = localStorage.getItem('id') || 0;
     this.roleId = localStorage.getItem('roleId') || 0;
     this.username = localStorage.getItem('username') || 0;
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
          this.roleId =0;
          this.username = 0;
          this.id = 0;
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
     overflow:hidden;
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
    float:  left;
    overflow:hidden;
    
  }
  #profileButton{
    padding: 10px 40px 10px 40px;
    font-weight: bold;
    color: #E6B91E;
    background-color: black;
    float:  left;
    overflow:hidden;
   
  }
  .hidden {
    display: none;
  }
</style>