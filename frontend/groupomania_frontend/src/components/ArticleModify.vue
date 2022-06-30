<template>
  <div class="post">

    <form method="put" @submit.prevent="modifyArticle" class="post__form">
          
      <div class="post__form__text">
        <textarea name="title" v-model="title" id="title" placeholder="titre modifié" rows="1"></textarea>
      </div>

      <div class="post__form__text">
        <textarea name="description" :value="description" id="description" placeholder="article modifié" rows="6"></textarea>
      </div>

      <div class="post__form__bottom">

        <div class="post__form__img">
          <label for="image_upload"><p><font-awesome-icon icon="fa-solid fa-image" /> Ajouter une image</p></label>
          <div class="post__form__img__name">{{imageName}}</div>
          <input type="file" @change="upload($event)" id="image_upload" name="image_upload" accept=".jpg, .jpeg, .png, .gif">
        </div>

        <div class="post__form__submit">
          <label for="submit"><p>Modifier</p></label>
          <input type="submit" value="modifier" id="submit">
        </div>

      </div>


    </form>

  </div>
</template>

<script>
import axios from 'axios';

//import ButtonRename from '@/components/ButtonRename.vue'

export default {
    name: "ArticleModify",   
    props: {
      article : {
        type : Object,
        required: true
      }
    },
    
    data () {
      return {
        title : "",
        description : "",
        image : null
      }
    },

    computed :{
      imageName () {
        if (this.image != null) {
          return this.image.name;
        } else {
          return "";
        }
      }
    },

    methods : {
      upload : function (event) {
        this.image = event.target.files[0];
      },

      async actuData () {
        console.log(this.article.title);
        this.title = this.article.title;
        this.description = this.article.description;
      },

      modifyArticle : function () {
        console.log("--- on rentre dans la route PUT article");
        //Collecting of the token
        const token = localStorage.getItem('token');
        //initialisation de la requête
        console.log("initialisation PUT");
        var article;
        var config = {};
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

        if (this.image != null) {
          console.log("il y a une image");
          article = new FormData();
          article.append('title', this.title);
          article.append('description', this.description);
          article.append('image', this.image);
          config = {
            headers : {
              authorization: `Bearer ${token}`,
              'Content-Type' : 'multipart/form-data'
            }
          }
        }  else {
          console.log("il n'y a pas d'image");
          article = {
            title : this.title,
            description : this.description
          }
          config = {
            headers : {
              authorization: `Bearer ${token}`
            }
          }
        }

        console.log(config);
        console.log(article);

        axios.put(`http://localhost:3000/api/articles/${articleId}`, article, config)
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

    async beforeMount () {
      await this.actuData();
    }
}
</script>



<style scoped lang="scss">
.post {
  width : 100%;
  max-width : 900px;
  background-color:white;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

  margin : 0;
  padding: 10px;

  display : flex ;
  align-items: flex-start;

  &__form{
    height : 100%;
    width: 100%;
    padding-left: 2%;
    display : flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    gap: 10px;

    &__text{
      width : 100%;
      display : flex;

      & textarea{
        width : 95%;
      }
    }

    &__bottom {
      width : 100%;
      display :flex;
      justify-content: space-between;
    }

    &__img {
      display : flex;
      justify-content:left;
      padding : 0;
      width : auto;

      & label {
        display: flex;
        align-items: center;
        justify-content: center;

        height: 30px;
        min-width: 150px;
        padding : 0;

        font-size: 90%;
        background-color: lighten(#0968EC,0%);
        color: white;
        cursor: pointer;

        border-top-left-radius: 5px ;
        border-bottom-left-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        box-shadow: 0px 5px 10px rgba(0,0,0,0.20),
                    inset 2px 10px 20px rgba(255,255,255,0.5),
                    inset -2px -3px 20px rgba(0,0,0,0.2); 

        & p{
          padding : 0;
          margin : 0;
        }

        &:hover
        {
            box-shadow: 0px 5px 10px rgba(0,0,0,0.30),
                        inset 2px 10px 20px rgba(255,255,255,0.65),
                        inset -2px -3px 20px rgba(0,0,0,0.35); 
        }
        
      }

      & input {
        visibility: hidden;
      }

      &__name {
        display : flex;
        align-items: center;
        padding-left : 5px;
        font-size: 70%;
        font-style :italic;
        text-overflow: ellipsis;
        overflow: hidden;
        flex-wrap: nowrap;
      }
    }

    &__submit {
      display : flex;
      justify-content: flex-end;
      padding : 0;
      width : 50%;

      & label {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        height: 30px;
        width: 150px;
        font-size: 90%;
        font-weight: 500;
        background-color: lighten(#0968EC,0%);
        color: white;

        border-top-left-radius: 5px ;
        border-bottom-left-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
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



      & input {
        visibility : hidden;
      }
    }

  }
}

@media (max-width : 767px){
  .post {
    width : 99%;
  }
}

</style>
