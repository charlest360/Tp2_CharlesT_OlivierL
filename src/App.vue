<template>
  <div id="app">
    <div id="nav">
      <img id="logo" src="@/assets/logo.png" alt="logo de OMDb" height="40px" width="80px" >
      <div class="links">
        <router-link  to="/">Home</router-link> |
        <router-link  to="/about">About</router-link>
      </div>
      
    </div>
    <router-view/>
  </div>
</template>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}

#nav {
  padding: 20px;
  background-color: black;
  text-align: center;
  display:inline-table;
  width : 100%;
 
}
#logo {
  float : left;
  margin-left: 5%;
  
}
.links{
  width: 20%;
  float: right;
  margin:auto;
  
}
#nav a {
  vertical-align: super;
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: #E6B91E;
}
body{
  background-color: #F2CE57;
}
</style>
