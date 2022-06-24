<template>

  <div class="home">
    <HeaderPages/>
    <FooterAll/>
  </div>
</template>

<script>
import HeaderPages from '@/components/HeaderPages.vue' 
import FooterAll from '@/components/FooterAll.vue'

export default {
  name: 'HomeView',
  components: {
    HeaderPages,
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


