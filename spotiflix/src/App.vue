<template>
  <NavBar></NavBar>
  <router-view></router-view>
  <Footer></Footer>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue';


export default {
  name: 'App',
  components: {
    NavBar,
    Footer
  }
}
</script>


<style>
  body {
    margin: 0;
    padding: 0;
    text-decoration: none;
  }
  #app {
    background: rgb(67,177,173);
    background: linear-gradient(180deg, rgba(67,177,173,1) 20%, rgba(29,11,126,1) 100%);
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }

</style>

