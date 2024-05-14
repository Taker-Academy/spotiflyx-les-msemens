<template>
  <router-view></router-view>
  <Footer></Footer>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    NavBar,
    Footer
  },
  mounted() {
    this.initDatabase();
  },
  methods: {
    initDatabase() {
      axios.get('http://localhost:9000/setup')
      .then(response => {
        console.log('Base de données initialisée:', response.data);
      })
      .catch(error => {
        console.error('Erreur lors de l\'initialisation de la base de données:', error);
      });
    }
  },
}
</script>


<style>
body {
  margin: 0;
  padding: 0;
  text-decoration: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
#app::before {
  content: "";  /* necessary for pseudo-elements */
  position: fixed;  /* fixed or absolute depending on your layout */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;  /* positions it behind the content */
  background-image: url('./assets/background1.jpg'); /* path to your image */
  background-size: cover;  /* ensures the background covers the entire element */
  background-position: center;  /* centers the background */
  filter: brightness(50%);  /* adjust brightness as needed */
}
</style>

