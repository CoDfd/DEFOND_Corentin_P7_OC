<template>
  <div id="app">
    <!--<nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>-->
    <router-view></router-view>
  </div>
</template>

<style lang="scss">

html {
  margin : 0;
  padding : 0;
  height : 100%;
}

body {
  margin : 0;
  height : 100%;
}

#app {
  font-family: Lato, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin : 0px;
  padding : 0;
  width : 100%;
  height: 100%;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
