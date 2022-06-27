<template>
  <div class="home">

    <div class="home__scroll">

      <HomePost/>

      <ArticleComponent/>

    </div>
   
  </div>
</template>

<script>
import HomePost from '@/components/HomePost.vue'
import ArticleComponent from '@/components/ArticleComponent.vue'

export default {
    
    name: "HomePage",

    components: { 
      HomePost,
      ArticleComponent
   },

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
    border : dotted black 1px;
    width : 70%;
    height : auto;
    min-width : 767px;
    margin : 0;
    padding-top: 10px;
    padding-bottom: 10px;
    overflow: scroll;

    display : flex ;
    flex-direction: column;
    justify-content: flex-start;
    gap : 15px;
    align-items: center;
  }

}


</style>
