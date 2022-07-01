<template>

  <div class="articlepage">
    <HeaderPages/>
    <ProfilePage/>
    <FooterAll/>
  </div>
</template>

<script>
import HeaderPages from '@/components/HeaderPages.vue' 
import FooterAll from '@/components/FooterAll.vue'
import ProfilePage from '@/components/ProfilePage.vue'

export default {
  name: 'ProfileView',
  components: {
    HeaderPages,
    FooterAll,
    ProfilePage
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


