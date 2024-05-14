<template>
        <div class="navbar">
      <router-link to="/logged">
        <img class="logo" src="@/assets/logo.png" alt="logo-spotiflix">
      </router-link>
      <ModaleUserMenu v-bind:clicked="clicked" v-bind:toggleModale="toggleModale"/>
      <div>
          <button v-on:click="toggleModale" class="login">Settings</button>
          <button v-on:click="Logout" class="logout login">Logout</button>
      </div>
    </div>
</template>

<script>
import ModaleUserMenu from './ModaleUserMenu.vue'

export default {
    name: 'NavMenu',
    components: {
        ModaleUserMenu
    },
    data() {
        return {
            clicked: false
        };
    },
    methods: {
        Logout() {
            localStorage.removeItem('token');
            this.$router.push('/');
        },
        toggleModale: function() {
            console.log(this.clicked);
            this.clicked = !this.clicked;
        }
    }
}
</script>

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
    width: auto;
    border-radius: 50px;
    font-size: 16.5px;
    font-weight: 600;
    border: 2px solid grey;
    margin: 0px 1rem;
  }
  .logout:hover {
    background: rgb(234, 75, 75);
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.479);
  }
</style>