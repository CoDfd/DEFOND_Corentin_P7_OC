<template>
  <div class="home">

    <div class="home__scroll">

      <ArticleComponent :article="article"/>

    </div>
   
  </div>
</template>

<script>
import axios from 'axios';
import ArticleComponent from '@/components/ArticleComponent.vue'

export default {
    
  name: "ArticlePage",
  components: { 
      ArticleComponent
  },
  data () {
    return {
      article:{}
    }
  },
  methods: {
    getArticle: function () {
      //Collection of the webpage URL into a string
      const urlProductString = window.location.href;
      //Converting the string into an URL
      const urlArticle = new URL(urlProductString);
      //Collecting the id of the product
      const idArticle = urlArticle.searchParams.get('id');
      axios.get(`http://localhost:3000/api/articles/${idArticle}`)
        .then(response =>{
          this.article = response
        })
        .catch(() => {
          console.log(`Erreur`); // Une erreur est survenue
          alert(`Erreur de requête API (GET)`);
        })
    }
  },

  created : function() {
    this.getArticle();
    
  }


}
</script>



<style scoped lang="scss">
.home {
  width : 100%;
  height : calc(100% - 180px);
  background-color: #F0F2F5;
  margin : 0;
  display : flex ;
  justify-content: center;
  align-items : stretch;
  position : relative;
  top : 100px;
  overflow :hidden;

  &__scroll {
    width : 70%;
    height : auto;
    min-width : 767px;
    margin : 0;
    padding-top: 15px;
    padding-bottom: 15px;
    overflow: scroll;

    display : flex ;
    flex-direction: column;
    justify-content: flex-start;
    gap : 30px;
    align-items: center;
  }

}


</style>
