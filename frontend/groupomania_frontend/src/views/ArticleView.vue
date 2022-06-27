<template>

  <div class="articlepage">
    <HeaderPages/>
    <ArticlePage/>
    <FooterAll/>
  </div>
</template>

<script>
import HeaderPages from '@/components/HeaderPages.vue' 
import FooterAll from '@/components/FooterAll.vue'
import ArticlePage from '@/components/ArticlePage.vue'

export default {
  name: 'ArticleView',
  components: {
    HeaderPages,
    FooterAll,
    ArticlePage
  }
}
</script>

<style scoped lang="scss">

.articlepage {
  width : 100%;
  height : 100%;
  margin : 0;
  padding : 0;
  position : relative;

  display : flex;
  flex-direction: column;

}

</style>


