<template>
  <div class="post">

    <form method="post" class="post__form">
          
      <div class="post__form__text">
        <textarea name="title" id="title" placeholder="Sujet de votre post" rows="1"></textarea>
      </div>

      <div class="post__form__text">
        <textarea name="description" id="description" placeholder="Quoi de neuf ?" rows="4"></textarea>
      </div>

      <div class="post__form__bottom">

        <div class="post__form__img">
          <label for="image_upload"><p><font-awesome-icon icon="fa-solid fa-image" /> Ajouter une image</p></label>
          <input type="file" id="image_upload" name="image_upload" accept=".jpg, .jpeg, .png, .gif">
        </div>

        <div class="post__form__submit">
          <label for="submit"><p>Publier</p></label>
          <input type="submit" value="publier" id="submit">
        </div>

      </div>


    </form>

  </div>
</template>

<script>

//import ButtonRename from '@/components/ButtonRename.vue'

export default {
    name: "HomePost",

    components: {  }
}
</script>



<style scoped lang="scss">
.post {
  width : 90%;
  max-width : 900px;
  height : 20vh;
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
      padding : 0;
      width : 50%;

      & label {
        display: flex;
        align-items: center;
        justify-content: center;

        height: 30px;
        width: 150px;
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
