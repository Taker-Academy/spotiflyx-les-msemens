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
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-image: url('./assets/background1.jpg');
  background-size: cover;
  background-position: center;
  filter: brightness(50%);
}
</style>

