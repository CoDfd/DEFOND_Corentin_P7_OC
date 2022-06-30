<template>
  <div class="home">

    <div class="home__scroll">

      <div class="home__scroll__container">
        <ArticleComponent :article="article"/>
        <ArticleModify :article="article"/>
      </div>

    </div>
   
  </div>
</template>

<script>
import axios from 'axios';
import ArticleComponent from '@/components/ArticleComponent.vue'
import ArticleModify from '@/components/ArticleModify.vue'

export default {
    
  name: "ArticlePage",
  components: { 
      ArticleComponent,
      ArticleModify
  },
  data () {
    return {
      article:{},
      comments : []
    }
  },
  methods: {
    /*getComments: function (token, article) {
      console.log('-->on rentre dans la requete get comments');
      console.log(article);
      //Collecting of the token
      const token = localStorage.getItem('token');
      //init request
      const articleId = this.article.id;
      console.log(articleId);
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
    },*/

    async getArticle  () {
      console.log('on rentre dans get One');
      //Collection of the webpage URL into a string
      const urlProductString = window.location.href;
      //Converting the string into an URL
      const urlArticle = urlProductString.replace(/\/$/, "");
      //Collecting the id of the product
      const idArticle = urlArticle.substring (urlArticle.lastIndexOf( "/" )+1 );
      console.log(idArticle);
      //Collecting of the token
      const token = localStorage.getItem('token');
      console.log(token);
      try {
        const articledata = await axios.get(`http://localhost:3000/api/articles/${idArticle}`, { headers: { authorization: `Bearer ${token}` } });
        console.log('-->réponse à la requete get one');
        console.log(articledata);        
        this.article = articledata.data;
      }
      catch (e) {
        this.errors.push(e)
      }
       
      /*axios.get(`http://localhost:3000/api/articles/${idArticle}`, { headers: { authorization: `Bearer ${token}` } }) 
        .then(response =>{
          console.log('-->réponse à la requete get one');
          console.log(response);
          this.article = response.data;
        })
        .catch(() => {
          console.log(`Erreur`); // Une erreur est survenue
          alert(`Erreur de requête API (GET)`);
        })*/
    }
  },

  async created () {
    await this.getArticle();
    
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

    &__container{
      width : 90%;
      height : auto;
      display : flex ;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap : 30px;
    }
  }

}


</style>
