<template>
        <form @submit.prevent="register" class="register">
            <div class="input">
                <label for="user_email">Email</label>
                <input v-model="user.email" type="email" required>
            </div>
            <div class="input">
                <label for="user_name">Username</label>
                <input v-model="user.name" type="name" required>
            </div>
            <div class="input">
                <label for="user_password">Password</label>
                <input v-model="user.password" type="password" required>
            </div>
            <button type="submit">submit</button>
            <div id="notification" class="hidden">
                Bienvenue sur spotiflix
            </div>
        </form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserRegister',
  components: {
  },
  data(){
    return {
        user: {
            name: '',
            email: '',
            password: ''
        }
    }
  },
  methods: {
    showNotification() {
      var notification = document.getElementById('notification');
      notification.classList.remove('hidden');
      notification.classList.add('visible');

      setTimeout(() => {
        notification.classList.remove('visible');
        notification.classList.add('hidden');
        this.$router.push('/logged');
      }, 2000);
    },
    register() {
      console.log("Tentative de connexion");
      axios.post('http://localhost:9000/auth/register', this.user)
      .then(response => {
          console.log('Connexion réussie:', response);
          localStorage.setItem('token', response.data.token);
          this.showNotification();
        })
      .catch(error => {
          alert('Erreur lors de l’enregistrement');
        });
    }
  },
  created() {
    const token = localStorage.getItem('token');
    if(token) {
      axios.defaults.headers.common['Authorization'] = token;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    @font-face {
        font-family: 'iconso';
        src: url('@/assets/Inconsolata.ttf') format('truetype'),
    }
    #notification {
      position: fixed;
      top: 1%;
      left: 50%;
      scale: 1.4;
      transform: translateX(-50%);
      background-color: #333;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      z-index: 1000;
      transition: top 0.5s ease;
    }
    .hidden {
        display: none;
    }
    .input {
        margin: 1rem;
        color: black;
    }
    .input label {
        font-family: iconso, sans-serif;
        font-size: 28px;
        font-weight: 600;
        margin: 10px 25px;
        color: #fff;
    }
    .input input {
        width: 20rem;
        height: 1.5rem;
        border: 3px solid grey;
        border-radius: 50px;
    }
    input{
        display: flex;
        padding: 0.4rem 1rem;
        font-size: 16px;
        font-weight: 600;
        justify-content: center;
    }
    button {
        padding: 8px 15px;
        width: 7rem;
        border-radius: 50px;
        font-size: 20px;
        font-weight: 600;
        margin: 10px 25px;
        font-family: iconso, sans-serif;
        border: 3px solid grey;
    }
    .register {
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 65vh;
    }
</style>
