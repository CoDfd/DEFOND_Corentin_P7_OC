<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div class="welcome-action">

      <div class="welcome-action__button">
        <router-link to="/login">
          <ButtonRename name="Login"/>
        </router-link>
      </div>

      <div class="welcome-action__button">
        <router-link to="/signup">
          <ButtonRename name="Signup"/>
        </router-link>
      </div>

    </div>


   
  </div>
</template>

<script>

import ButtonRename from '@/components/ButtonRename.vue'

export default {
    name: "AccueilPage",
    props: {
        msg: String
    },
    components: { ButtonRename }
}
</script>



<style scoped lang="scss">
.hello {
  width : 100%;
  Height : 100%;
  border : 1px solid white;
  background-color: #F0F2F5;
  margin : 0;
  padding-top: 20px;
  flex : 1;

  display : flex ;
  flex-direction: column;
  align-items: center;
}

.welcome-action{

  width : 100%;
  max-width: 900px;
  height : 50vh ;

  display : flex ;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;

    & a
    {
        text-decoration: none;
        color: black;
    }  
}


</style>
