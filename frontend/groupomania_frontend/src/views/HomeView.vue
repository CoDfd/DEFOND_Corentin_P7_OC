<template>

  <div class="homepage">
    <HeaderPages/>
    <HomePage/>
    <FooterAll/>
  </div>
</template>

<script>
import HeaderPages from '@/components/HeaderPages.vue' 
import FooterAll from '@/components/FooterAll.vue'
import HomePage from '@/components/HomePage.vue'

export default {
  name: 'HomeView',
  components: {
    HeaderPages,
    FooterAll,
    HomePage
  }
}
</script>

<style scoped lang="scss">

.homepage {
  width : 100%;
  height : 100%;
  margin : 0;
  padding : 0;
  position : relative;

  display : flex;
  flex-direction: column;

}

</style>


