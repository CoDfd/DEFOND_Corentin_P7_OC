<template>

  <div class="home">
    <HeaderAccueil/>
    <AccueilPage msg="Bienvenue sur Groupalink"/>
    <FooterAll/>
  </div>
</template>

<script>
// @ is an alias to /src
import AccueilPage from '@/components/AccueilPage.vue' 
import HeaderAccueil from '@/components/HeaderAccueil.vue' 
import FooterAll from '@/components/FooterAll.vue'

export default {
  name: 'AccueilView',
  components: {
    AccueilPage,
    HeaderAccueil,
    FooterAll
  }
}
</script>

<style scoped lang="scss">

.home {
  width : 100%;
  height : 100vh;
  margin : 0;
  padding : 0;

  display : flex;
  flex-direction: column;
}

</style>


