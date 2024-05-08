<template>
    <div class="navbar">
      <router-link to="/">
        <img class="logo" src="@/assets/logo.png" alt="logo-spotiflix">
      </router-link>
      <div>
        <router-link to="/login">
          <button class="login">Sign in</button>
        </router-link>
        <router-link to="/register">
          <button class="login">Register</button>
        </router-link>
      </div>
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
    padding: 0px 2rem;
    justify-content: space-between;
  }
  .logo {
    width: 10rem;
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
    margin: 0px 1rem;
  }
</style>
