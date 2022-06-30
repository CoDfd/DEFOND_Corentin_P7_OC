<template>
  
  <form method="post" @submit.prevent="lsAuth" class="lsform">

    <div class="lsform__header">
      <h2 v-if="lsref === 'login'">Connexion</h2>
      <h2 v-if="lsref === 'signup'">Inscription</h2>
      <p>Veuillez entrer vos informations</p>
    </div>

    <div class="lsform__question">
      <label for="email">email: </label>
      <input type="email" name="email" v-model="email" id="email" required>
      <p id="emailErrorMsg"></p>
    </div>
        
    <div v-if="lsref === 'signup'" class="lsform__question">
      <label for="pseudo">pseudo: </label>
      <input type="text" name="pseudo" v-model="pseudo" id="pseudo">
      <p id="pseudoErrorMsg"><!-- ci est un message d'erreur --></p>
    </div>

    <div class="lsform__question">
      <label for="password">password: </label>
      <input type="password" name="password" v-model="password" id="password" required>
      <p id="passwordErrorMsg"></p>
    </div>

    <div class="lsform__submit">
      <p><input type="submit" v-bind:value="lsref" id="submit"></p>
    </div>
  
  </form>    

    
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginSignupForm',
  props: {
    lsref : String
  },
  data () {
    return {
      email : "",
      pseudo : "",
      password : ""
    } 
  },
  methods : {
    signup () {
      const user_signup = {
        email : this.email, 
        pseudo : this.pseudo,
        password : this.password
      };
      console.log(user_signup);
      axios.post(`http://localhost:3000/api/auth/signup`, user_signup)
        .then((res) => {
          console.log(res);
          alert(res.data.message);
          this.$router.push('login');
        })
        .catch(() => {
          console.log(`Erreur`); // Une erreur est survenue
          alert(`Erreur de requête API`);
        })
    },

    login () {
      const user_login = {
        email : this.email,
        password : this.password
      };
      console.log(user_login);
      //const ulog = JSON.stringify(user_login);
      //console.log(ulog);

      axios.post(`http://localhost:3000/api/auth/login`, user_login)
        .then ((res) => {
          console.log(res);
          const token = res.data.token;
          localStorage.setItem('token', token);
          this.$router.replace('home');
        })
        .catch(() => {
          console.log(`Erreur`); // Une erreur est survenue
          alert(`Erreur de requête API`);
        })
    },

    lsAuth () {
      if (this.lsref === "signup"){
        console.log('signup route');
        this.signup();
      }
      else if (this.lsref === "login"){
        console.log('login route');
        this.login();
      }
      else {
        console.log(`Erreur`); // Une erreur est survenue
        alert(`Erreur d'aiguillage de requête`);
      }
    }
  }
}

</script>


<style scoped lang="scss">
.lsform {
	display: flex;
	justify-content: center;
    flex-direction: column;
    align-items: stretch;
    width : 100%;
    height : auto;

    &__question {

        padding: 20px 0px 20px 0px;
        margin : 0;
        width : 100%;


        & input {
            border-radius: 13px;
            border: 0;
            height: 26px;
            margin-top: 4px;       
            
            &:focus{
                outline : none;
            }
        }

        & p {
            margin: 0;
            color: #fbbcbc;
            font-size: 15px;
            margin-left: 8px;   
        }
    }

    &__submit {
        padding: 10px 0px 10px 0px;
        display : flex;
        justify-content: center;
        

        & input{
        height: 50px;
        width: 220px;
        font-size: 110%;
        font-weight: 600;
        background-color: lighten(#0968EC,0%);
        color: white;
        border : 0;
        cursor: pointer;
        font : inherit;
        font-weight : 800;

        display: flex;
        align-items: center;
        justify-content: center;

        border-top-left-radius: 12% 50%;
        border-bottom-left-radius: 12% 50%;
        border-top-right-radius: 12% 50%;
        border-bottom-right-radius: 12% 50%;
        box-shadow: 0px 5px 10px rgba(0,0,0,0.20),
                    inset 2px 10px 20px rgba(255,255,255,0.5),
                    inset -2px -3px 20px rgba(0,0,0,0.2); 
            
        &:hover
        {
            box-shadow: 0px 5px 10px rgba(0,0,0,0.30),
                        inset 2px 10px 20px rgba(255,255,255,0.65),
                        inset -2px -3px 20px rgba(0,0,0,0.35); 
        }
        }
    }
}


</style>