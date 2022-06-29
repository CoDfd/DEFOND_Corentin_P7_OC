<template>
  <div class="home">

    <div class="home__scroll">

      <HomePost/>

      <ArticleComponent v-for="item in articles" :article="item" :key="item.id"> </ArticleComponent> 
      <!--v-for="item in articles" :article="item" :article="articles[0]"-->

    </div>
   
  </div>
</template>

<script>
import axios from 'axios';
import HomePost from '@/components/HomePost.vue'
import ArticleComponent from '@/components/ArticleComponent.vue'

export default {
    
    name: "HomePage",

    components: { 
      HomePost,
      ArticleComponent
   },

   data () {
      return {
        articles:[],
      }
    },
    methods : {
      getArticles : function () {
        console.log("on entre dans getArticles")
        //Collecting of the token
        const token = localStorage.getItem('token');
        console.log(token);
        //requete axios GET All
        axios.get(`http://localhost:3000/api/articles/`, { headers: { authorization: `Bearer ${token}` } })
          .then(response =>{
            console.log(response.data);
            this.articles = response.data;
          })
          .catch(() => {
            console.log(`Erreur`); // Une erreur est survenue
            alert(`Erreur de requête API (GET)`);
          })
      }
    },
    created : function () {
      console.log("created");
      this.getArticles();
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
