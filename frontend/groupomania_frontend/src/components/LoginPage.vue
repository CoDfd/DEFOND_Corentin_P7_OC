<template>
  <div class="hello">

    <div class="hello__page">

      <div class="welcome">
        <h1>Bienvenue</h1>  
        <a title="Groupomania_logo"><img src="../assets/Groupomania_Logos+(3)/icon.svg" class="logo__img" alt="Logo Groupomania" title="Groupomnania" /></a>
      </div>
      

      <div class="welcome-action">

        <LoginSignupForm lsref="login"/>

      </div>

    </div>
   
  </div>
</template>

<script>
import LoginSignupForm from '@/components/LoginSignupForm.vue'

export default {
    
    name: "LoginPage",

    components: { 
      LoginSignupForm
   },

}
</script>



<style scoped lang="scss">
.hello {
  width : 100%;
  background-color: #F0F2F5;
  margin : 0;
  flex : 1;
  display : flex ;
  justify-content: center;
  align-items : stretch;

  &__page {
    width : 70%;
    background-color: white;
    margin : 0;
    padding-top: 20px;

    display : flex ;
    justify-content: center;
  }

}

.welcome {

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
      width: 80%;
      height : 80%;
      object-fit: contain;
    }
}

.welcome-action{

  background-color: #F0F2F5;
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

  display : flex ;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;

    & a
    {
        text-decoration: none;
        color: black;
    }  
}

@media (min-width : 768px) {
  .hello__page {
    min-width : 767px;
  }

  .welcome-action{
    width : 40%;
    max-width: 900px;
    height : 50vh ;
  }
}

@media (max-width: 767px)
{
  .hello {
    &__page {
      width : 95%;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;

      & .welcome{
        height : auto;
        padding : 0px 0px 20px 0px;;
        & h1 {
          margin : 0;
        }
        & img
        {
            display : none;
        }
      }
    }
  }

  .welcome-action{
    width : 80%;
    max-width: 750px;
    max-height : 60vh;
  }

}
</style>
