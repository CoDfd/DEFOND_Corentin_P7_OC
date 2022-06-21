<template>

  <div class="home">
      <HeaderAccueil/>
    <HelloWorld msg="Bienvenue sur Groupalink"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue' 
import HeaderAccueil from '@/components/HeaderAccueil.vue' 

export default {
  name: 'AccueilView',
  components: {
    HelloWorld,
    HeaderAccueil
  }
}
</script>

<style scoped lang="scss">

.home {
  width : 100%;
  margin : 0;
}

</style>


