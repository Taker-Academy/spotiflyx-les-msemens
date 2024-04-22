<template>
    <div class="navbar">
      <img class="logo" src="../assets/spotiflix-logo.png" alt="logo-spotiflix">
      <button class="login">Login</button>
    </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navbar {
    display: flex;
    width: auto;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    width: 15vh;
    margin: 0px 30px;
  }
  .login {
    height: 10%;
    padding: 7px 15px;
    width: 7rem;
    border-radius: 50px;
    font-size: 16.5px;
    font-weight: 600;
    border: 2px solid grey;
    margin: 0px 3rem;
  }
</style>
