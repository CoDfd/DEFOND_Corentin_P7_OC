<template>
  <div class="hello">

    <div class="hello__page">

      <div class="welcome">
        <h1>Bienvenue</h1>  
        <a title="Groupomania_logo"><img src="../assets/Groupomania_Logos+(3)/icon.svg" class="logo__img" alt="Logo Groupomania" title="Groupomnania" /></a>
      </div>
      

      <div class="welcome-action">

        <LoginSignupForm :name="queue_url"/>

      </div>

    </div>
   
  </div>
</template>

<script>
import LoginSignupForm from '@/components/LoginSignupForm.vue'

export default {
    
    name: "LoginPage",
    data() {
      return {
        queue_url:" "
      }
      

    },
    props: {
        msg: String
    },
    components: { 
      LoginSignupForm
   },
   computed: {
      getQueue () {
      //récupération de l'URL
      const urlProductString = window.location.href;
      // Supprimons l'éventuel dernier slash de l'URL
      const urlcourante = urlProductString.replace(/\/$/, "");
      // Gardons dans la variable queue_url uniquement la portion derrière le dernier slash de urlcourante
      const queue = urlcourante.substring (urlcourante.lastIndexOf( "/" )+1 );
      return queue;
    }
   },
   methods: {
    getUrlQueue : function () {
      //récupération de l'URL
      const urlProductString = window.location.href;
      // Supprimons l'éventuel dernier slash de l'URL
      const urlcourante = urlProductString.replace(/\/$/, "");
      // Gardons dans la variable queue_url uniquement la portion derrière le dernier slash de urlcourante
      const queue = urlcourante.substring (urlcourante.lastIndexOf( "/" )+1 );
      console.log(queue);
      this.queue_url = queue;
    }
   },

   created : function() {
    this.getUrlQueue()
    
   }
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
    min-width : 767px;
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
  width : 40%;
  max-width: 900px;
  height : 50vh ;

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


</style>
