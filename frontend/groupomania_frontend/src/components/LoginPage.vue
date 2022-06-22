<template>
  <div class="hello">

    <div class="welcome">
      <h1>Bienvenue</h1>  
      <!--<a title="Groupomania_logo"><img src="../assets/Groupomania_Logos+(3)/icon-above-font.svg" class="logo__img" alt="Logo Groupomania" title="Groupomnania" /></a>-->
    </div>
    

    <div class="welcome-action">

      <div class="welcome-action__button">
        <a href="#">
          <ButtonRename name="Login"/>
        </a>
      </div>

    </div>


   
  </div>
</template>

<script>

import ButtonRename from '@/components/ButtonRename.vue'

export default {
    name: "LoginPage",
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

  display : flex ;
  justify-content: center;
}

.welcome {

  border : 1px solid red;

  margin : 0;
  width: auto;
  height:fit-content;
  padding: 20px 0px 0px 0px;
    
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  & img
    {
      background-color: red;    
      width: 80%;
      height : 80%;
      object-fit: contain;
    }
}

.welcome-action{


  border : 1px solid red;

  width : 40%;
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
