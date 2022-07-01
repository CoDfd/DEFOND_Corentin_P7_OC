<template>
  <div class="profile">

    <div class="profile__info">

      <h2>Pseudo : {{pseudo}}</h2>
      <p>Enregistré le {{convertDate(date_signup).day}} à {{convertDate(date_signup).hour}}</p>

    </div>

    <ButtonRename name="Supprimer" v-if="showDelete" @click.native.prevent="deleteUser()"/>


  </div>
</template>

<script>
import axios from 'axios';
import ButtonRename from '@/components/ButtonRename.vue'

export default {
    name: "ProfileComponent",
    
    components: { 
      ButtonRename
    },
    data () {
      return {
        pseudo : "",
        date_signup : ""
      }
    },

    computed : {
      showDelete () {
        //Collection of the webpage URL into a string
        const urlProductString = window.location.href;
        //Converting the string into an URL
        const urlUser = urlProductString.replace(/\/$/, "");
        //Collecting the id of the product
        const userIdPage = urlUser.substring (urlUser.lastIndexOf( "/" )+1 );
        //Collecting id de l'utilisateur en cours
        const userIdCurrent = localStorage.getItem('user_id');
        const isAdmin = localStorage.getItem('admin');
        console.log('authorisation de show delete?');
        console.log(userIdCurrent);
        console.log(userIdPage);
        console.log(isAdmin);

        if (userIdPage == userIdCurrent && isAdmin == 1) {
          return false ;
        } else if (userIdPage != userIdCurrent && isAdmin == 0) {
          return false;
        } else {
          return true;
        }
      }
    },

    methods : {
      convertDate: function (date) {
        const date_result = new Date(date);
        const item_date = {
          day : date_result.toLocaleDateString('fr-FR'),
          hour : date_result.toLocaleTimeString('fr-FR')
        }
        return item_date;
      },

      getUserInfo : function () {
        //Collection of the webpage URL into a string
        const urlProductString = window.location.href;
        //Converting the string into an URL
        const urlUser = urlProductString.replace(/\/$/, "");
        //Collecting the id of the product
        const userId = urlUser.substring (urlUser.lastIndexOf( "/" )+1 );
        console.log(userId);
        //Collecting of the token
        const token = localStorage.getItem('token');
        console.log(token);
        if (token != null) {
          //requete axios GET user
          axios.get(`http://localhost:3000/api/users/${userId}`, { headers: { authorization: `Bearer ${token}` } })
            .then(response =>{
              console.log(response.data);
              this.pseudo = response.data.pseudo;
              this.date_signup = response.data.date_signup;
            })
            .catch(() => {
              console.log(`Erreur`); // Une erreur est survenue
              alert(`Erreur de requête API (GET)`);
            })
        } else {
          this.$router.replace('/');
        }
      },

      deleteUser : function () {
        //Collection of the webpage URL into a string
        const urlProductString = window.location.href;
        //Converting the string into an URL
        const urlUser = urlProductString.replace(/\/$/, "");
        //Collecting the id of the product
        const userId = urlUser.substring (urlUser.lastIndexOf( "/" )+1 );
        console.log(userId);
        //Collecting of the token
        const token = localStorage.getItem('token');
        console.log(token);
        if (token != null) {
          //requete axios GET user
          axios.delete(`http://localhost:3000/api/users/${userId}`, { headers: { authorization: `Bearer ${token}` } })
            .then(response =>{
              console.log(response.data); 
              this.$router.replace('/');
            })
            .catch(() => {
              console.log(`Erreur`); // Une erreur est survenue
              alert(`Erreur de requête API (GET)`);
            })
        } else {
          this.$router.replace('/');
        }
      }
    }, 

    created : function () {
      this.getUserInfo();
    }
}
</script>



<style scoped lang="scss">
.profile {
  width : 90%;
  max-width : 900px;
  height : auto;
  background-color:white;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

  margin : 0;
  padding: 10px;

  display : flex ;
  justify-content: space-between;
  align-items : center;

  font-size: 85%;

  &__info {
    width : auto;
    height : auto;
    padding : 20px 20px 20px 30px;
    line-height: 200%;
    text-align: start;

    & h2{
      margin : 0;
    }
    & p{
      margin : 0;
    }
  }

}

@media (max-width : 767px){
  .post {
    width : 99%;
  }
}

</style>