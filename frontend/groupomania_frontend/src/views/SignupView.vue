<template>

  <div class="home">
    <HeaderAccueil lsref="signup"/>
    <SignupPage/>
    <FooterAll/>
  </div>
</template>

<script>
import HeaderAccueil from '@/components/HeaderAccueil.vue' 
import FooterAll from '@/components/FooterAll.vue'
import SignupPage from'@/components/SignupPage.vue'

export default {
  name: 'LoginView',
  components: {
    HeaderAccueil,
    FooterAll,
    SignupPage
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


