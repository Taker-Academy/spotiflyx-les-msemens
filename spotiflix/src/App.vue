<template>
  <NavBar></NavBar>
  <UserRegister></UserRegister>
  <PageFooter></PageFooter>
</template>

<script>
import NavBar from './components/NavBar.vue'
// import UserLogin from './components/Login.vue'
import PageFooter from './components/Footer.vue'
import UserRegister from './components/Register.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    PageFooter,
    UserRegister
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  background: #0c2030;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
