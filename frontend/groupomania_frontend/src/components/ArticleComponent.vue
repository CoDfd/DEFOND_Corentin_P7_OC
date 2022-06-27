<template>
  <div class="article">

    <div class="article__header">
      <h2>"Titre"</h2>
      <p> Par <span>"Use Name"</span>, le <span>"date stringifiée"</span></p>
    </div>

    <div class="article__description">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
      </p>
    </div>

    <div class = "article__image">
      <img src="../assets/UserImages/Image image.png" class="article__image__img" alt="user name" title="user name" />
    </div>

    <div class = "article__like">
      <div class="article__like__button">
        <p><font-awesome-icon icon="fa-solid fa-thumbs-up" /> J'aime</p>
      </div>
      <div class = "article__like__likes">
        <p><span class="article__like__likes__nulber" >"nombre"</span> likes</p>
      </div>
    </div>

    <div class="article__comment">

      <div class="article__comment__form">
        <div class="article__comment__form__text">
          <textarea name="comment" id="comment" placeholder="Ajouter un commentaire" rows="2"></textarea>
        </div>
        
        <div class="article__comment__form__submit">
          <label for="submit"><p>Commenter</p></label>
          <input type="submit" value="commenter" id="submit">
        </div>
      </div>

      <div class="article__comment__comments">

        <div class="article__comment__comments__unit">
          <p class="comment_author"><span class="comment_author__name">"Name"</span>, le "Date string" :</p>
          <p class="comment_description">"c'est le commentaire ici. Lorem ipsum etc etc ..."</p>
        </div>

        <div class="article__comment__comments__unit">
          <p class="comment_author"><span class="comment_author__name">"Name"</span>, le "Date string" :</p>
          <p class="comment_description">"c'est le commentaire ici. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "</p>
        </div>

      </div>

    </div>


  </div>
</template>

<script>

//import ButtonRename from '@/components/ButtonRename.vue'

export default {
    name: "ArticleComponent",

    components: {  }
}
</script>



<style scoped lang="scss">
.article {
  width : 90%;
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

  &__like {
    border-top: solid 2px lightgray;
    border-bottom: solid 2px lightgray;
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
