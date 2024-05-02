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
        </form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserRegister',
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
    register() {
      console.log("Tentative de connexion");
      axios.post('http://127.0.0.1:8000/auth/register', this.user)
      .then(response => {
          console.log(response.data);
          // Traitez ici la réponse, par exemple en sauvegardant le token
        })
        .catch(error => {
          console.error('Erreur lors de l’enregistrement:', error);
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    @font-face {
        font-family: 'iconso';
        src: url('@/assets/Inconsolata.ttf') format('truetype'),
    }
    .input {
        margin: 1rem;
        color: black;
    }
    .input label {
        font-family: iconso, sans-serif;
        font-size: 28px;
        margin: 10px 25px;
    }
    .input input {
        width: 19rem;
        border: 3px solid grey;
        border-radius: 50px;
    }
    input{
        display: flex;
        padding: 0.2rem 1rem;
        font-size: 16px;
        font-weight: 600;
        justify-content: center;
    }
    button {
        padding: 7px 15px;
        width: 7rem;
        border-radius: 50px;
        font-size: 16.5px;
        font-weight: 600;
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
