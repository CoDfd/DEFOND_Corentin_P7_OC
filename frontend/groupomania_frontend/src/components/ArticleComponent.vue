<template>
  <div class="article">

    <div class="article__header">
      <h2>{{article.title}}</h2>
      <p class="article__author"> Par <span class="article__author__name">{{article.pseudo}}</span>, le {{convertDate(article).day}} à {{convertDate(article).hour}}</p>
    </div>

    <div class="article__description">
      <p>{{article.description}}</p>
    </div>

    <div v-show="article.imageUrl != ''" class = "article__image">
      <img :src="article.imageUrl" class="article__image__img" alt="Image article" title="Image article" />
    </div>

    <div class = "article__option">
      <div class="article__option__like">
        <div @click.stop.prevent="likeArticle" class="article__option__like__button">
          <p><font-awesome-icon icon="fa-solid fa-thumbs-up" /> J'aime</p>
        </div>
        <div class = "article__option__like__likes">
          <p><span class="article__option__like__likes__nulber" >{{article.likes}}</span> likes</p>
        </div>
      </div>
      <div v-if="userId == article.user_id || admin == 1" @click.stop.prevent="deleteArticle" class="article__option__delete">
        <p>Supprimer</p>
      </div>
    </div>

    <div v-if="showComment" class="article__comment">


      <form method="post" @submit.prevent="postComment"  class="article__comment__form">
        <div class="article__comment__form__text">
          <textarea v-model="comment_description" @click.stop.prevent name="comment" id="comment" placeholder="Ajouter un commentaire" rows="2"></textarea>
        </div>
        
        <div class="article__comment__form__submit">
          <label for="submit" ><p>Commenter</p></label>
          <input type="submit" value="commenter" id="submit">
        </div>
      </form>

      <div class="article__comment__comments">

        <div v-for="comment in comments" :key="comment.id" class="article__comment__comments__unit">
          <p class="comment_author"><span class="comment_author__name">{{comment.pseudo}}</span>, le {{convertDate(comment).day}} à {{convertDate(comment).hour}} :</p>
          <p class="comment_description">{{comment.description}}</p>
        </div>

      </div>

    </div>


  </div>
</template>

<script>
import axios from 'axios';
//Importation des variables d'environnement
//require('dotenv').config();
//Importation de jasonwebtoken
//const jwt = require(`jsonwebtoken`);

export default {
    name: "ArticleComponent", 
    props: {
      article : {
        type : Object,
        required: true
      },
      showComment : {
        type : Boolean,
        default : true
      }
    },
    data () {
      return {
        userId : null,
        admin : 0,
        comments:[],
        comment_description : null
      }
    },
    components: {  },
    /*computed : {
      convertDate(item) {
        const date_result = new Date(item.date_post);
        const item_date = {
          day : date_result.toLocaleDateString('fr-FR'),
          hour : date_result.toLocaleTimeString('fr-FR')
        }
        return item_date;
      }
    },*/
    methods : {
      getAuth : function () {
        //Collecting auth
        this.userId = localStorage.getItem('user_id');
        console.log(this.userId);
        console.log(this.article.user_id)
        this.admin = localStorage.getItem('admin');
        console.log(this.admin);
      },

      convertDate: function (item) {
        const date_result = new Date(item.date_post);
        const item_date = {
          day : date_result.toLocaleDateString('fr-FR'),
          hour : date_result.toLocaleTimeString('fr-FR')
        }
        return item_date;
      }, 

      getComments () {
        //init request
        var articleId = this.article.id;
        if (articleId == null){
          //Collection of the webpage URL into a string
          const urlProductString = window.location.href;
          //Converting the string into an URL
          const urlArticle = urlProductString.replace(/\/$/, "");
          //Collecting the id of the product
           articleId = urlArticle.substring (urlArticle.lastIndexOf( "/" )+1 );
        } 
        console.log(articleId);
        console.log('-->on rentre dans la requete get comments');
        //Collecting of the token
        const token = localStorage.getItem('token');



        /*try {
          const commentsdata = await axios.get(`http://localhost:3000/api/comments/${articleId}`, { headers: { authorization: `Bearer ${token}` } });
          this.comments = commentsdata.data;
          console.log(this.comments);
        } catch (e) {
          this.errors.push(e)
        }*/
          
          
          axios.get(`http://localhost:3000/api/comments/${articleId}`, { headers: { authorization: `Bearer ${token}` } }) 
          .then(response =>{
            console.log('-->réponse à la requete get comments');
            console.log(response);
            this.comments = response.data;
          })
          .catch(() => {
            console.log(`Erreur comments`); // Une erreur est survenue
            alert(`Erreur de requête API (GET)`);
          })
      },

      postComment : function () {
        console.log("--- on rentre dans la route POST comment");
        //Collecting of the token
        const token = localStorage.getItem('token');
        //initialisation de la requête
        var articleId = this.article.id;
        if (articleId == null){
          //Collection of the webpage URL into a string
          const urlProductString = window.location.href;
          //Converting the string into an URL
          const urlArticle = urlProductString.replace(/\/$/, "");
          //Collecting the id of the product
           articleId = urlArticle.substring (urlArticle.lastIndexOf( "/" )+1 );
        } 
        console.log(articleId);

        if (this.comment_description != null){
          const comment = {
            article_id : articleId,
            description : this.comment_description
          }

          axios.post(`http://localhost:3000/api/comments`, comment, { headers: { authorization: `Bearer ${token}` } })
            .then ((res) => {
              console.log(res);
              this.$router.go();
            })
            .catch ((e) => {
              this.errors.push(e);
              alert(`Erreur de requête API`);
            })
        } 
      },

      likeArticle : function () {
        //Collecting of the token
        const token = localStorage.getItem('token');
        //initialisation de la requête
        var articleId = this.article.id;
        if (articleId == null){
          //Collection of the webpage URL into a string
          const urlProductString = window.location.href;
          //Converting the string into an URL
          const urlArticle = urlProductString.replace(/\/$/, "");
          //Collecting the id of the product
           articleId = urlArticle.substring (urlArticle.lastIndexOf( "/" )+1 );
        } 
        const like = {
          like : 1
        };
        console.log(articleId);
        axios.post(`http://localhost:3000/api/articles/${articleId}/like`, like, { headers: { authorization: `Bearer ${token}` } })
          .then ((res) => {
            console.log(res);
            this.$router.go();
          })
          .catch (() => {
            alert(`Article déjà liké`);
          })
      },

      deleteArticle : function () {
        //Collecting of the token
        const token = localStorage.getItem('token');
        //initialisation de la requête
        var articleId = this.article.id;
        if (articleId == null){
          //Collection of the webpage URL into a string
          const urlProductString = window.location.href;
          //Converting the string into an URL
          const urlArticle = urlProductString.replace(/\/$/, "");
          //Collecting the id of the product
           articleId = urlArticle.substring (urlArticle.lastIndexOf( "/" )+1 );
        } 
        axios.delete(`http://localhost:3000/api/articles/${articleId}`, { headers: { authorization: `Bearer ${token}` } })
        .then ((res) => {
          console.log(res);
          try {
            this.$forceUpdate();
            this.$router.replace('/home');
          } catch {
            this.$router.go();
          }

        })
        .catch ((e) => {
          this.errors.push(e);
          alert(`Erreur de requête API`);
        })
      }
      
    }, 

  /*Create : function () {
    this.getAuth();
  },*/

  mounted : function () {
    console.log("hello");
    this.getAuth();
    this.getComments();
    console.log("tchao");
  }
}
</script>



<style scoped lang="scss">
.article {
  width : 100%;
  max-width : 900px;
  background-color:white;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

  margin : 0;
  padding: 10px;

  display : flex ;
  flex-direction : column;
  align-items: flex-start;

  font-size: 85%;

  &__header {
    width : 100%;
    height : auto;
    line-height: 130%;
    text-align: start;

    & h2{
      margin : 0;
      padding : 0 10px 0 10px;
    }
    & p{
      margin : 0;
      padding : 0 10px 0 30px;
    }
  }

  &__author {
    font-style: italic;
    &__name {
      font-weight: 600;
    }
  }

  &__description {
    padding : 0 20px 0 20px;
    width : auto;
    height : auto;
    line-height: 120%;
    text-align: start;
    & p{
      vertical-align: top;
      text-align: justify;
    }
  }

  &__image {
    width : 100%;
    overflow : hidden;
    & img {
      max-width : 100%;
      height : fit-content;
      object-fit:scale-down;
    }
  }

  &__option {
    border-top: solid 2px lightgray;
    border-bottom: solid 2px lightgray;
    width : 100%;
    height : auto;
    padding : 0px;

    display: flex;
    justify-content: flex-start;

    &__like {
      width : 100%;
      height : auto;
      padding : 0px;

      display: flex;
      justify-content: flex-start;

      &__button {
        height : auto;
        padding : 5px;
        text-align: start;
        cursor: pointer;
        z-index: 1;

        & p{
          vertical-align: top;
          margin : 0;
        }

        &:hover {
          color : blue;
          background-color: #F0F2F5;
        }
      }

      &__likes {
        height : auto;
        padding : 5px 0 5px 30px;
        text-align: start;
        & p{
          vertical-align: top;
          margin : 0;
        }
      }

    }

    &__delete {
        height : auto;
        padding : 5px;
        text-align: start;
        cursor: pointer;
        z-index :1;

        & p{
          vertical-align: top;
          margin : 0;
        }
        &:hover {
          color : blue;
          background-color: #F0F2F5;
        }
    }
  }

  &__comment {

    width : 100%;
    height : auto;
    padding : 0px;

    display: flex;
    flex-direction: column;

    &__form {
      width : auto;
      height : auto ;
      padding : 5px;
      display : flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-around;
      gap: 0px;

      &__text {
        width : 100%;
        display : flex;

        & textarea{
          width : 95%;
        }
      }

      &__submit{
        display : flex;
        justify-content: flex-start;
        padding : 0 0 0 5px;
        width : 50%;
        height : auto;

        & label {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          height : 20px;
          padding : 0;
          margin : 0;
          text-decoration: underline;
          font-weight: 500;

          &:hover {
            color : blue;
          }
        }

        & input {
          visibility : hidden;
        }

      }
    }

    &__comments {
      width : auto;
      height : auto ;
      padding : 10px 5px 5px 5px;
      display : flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-around;
      gap: 10px;

      &__unit {
        border : solid lightgray 2px;
        border-radius:5px;
        background-color: #F0F2F5;
        width : 98%;
        padding : 2px 5px 5px 5px;

        & p{
          margin : 0;
          line-height: 120%;
        }

        & .comment_author {
          font-style: italic;
          text-align: justify;
          line-height: 200%;
          &__name {
            font-weight: 600;
          }
        }
        & .comment_description {
          line-height: 120%;
          text-align: justify;
        }
      }
    }
  }

}

@media (max-width : 767px){
  .article {
    width : 99%;
  }
}

</style>
