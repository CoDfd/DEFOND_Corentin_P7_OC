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
          <textarea name="comment" id="comment" placeholder="Ajouter un commentaire" rows="1"></textarea>
        </div>
        
        <div class="article__comment__form__submit">
          <label for="submit"><p>Commenter</p></label>
          <input type="submit" value="commenter" id="submit">
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
    border : dotted black 1px;

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
    border : dotted black 1px;

    width : 100%;
    height : auto;
    line-height: 120%;
    text-align: start;
    & p{
      vertical-align: top;
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

}

@media (max-width : 767px){
  .article {
    width : 99%;
  }
}

</style>
