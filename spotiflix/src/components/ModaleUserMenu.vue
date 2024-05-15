<template>
    <div class="bloc-modale" v-if="clicked">
        <div class="overlay" v-on:click="toggleModale"></div>
        <div class="modale card">
            <div v-on:click="toggleModale" class="btn-modale ">Close</div>
                <h2>Email: {{ user.email }}</h2>
                <div class="acc">
                    <EditUser/>
                    <form @submit.prevent="DeleteAccount" class="del input">
                        <h2>DeleteAccount</h2>
                        <input v-model="user.password" type="password" input="password" placeholder="Password" required>
                        <button type="submit">delete account</button>
                    </form>
                </div>
        </div>
    </div>
</template>

<script>
import EditUser from './editUser.vue'
import axios from 'axios'

export default {
    name: 'ModaleUserMenu',
    props: ["clicked", "toggleModale"],
    components: {
        EditUser
    },
    data(){
        return {
            user: {
                email: '',
                password: '',
            }
        }
    },
    mounted() {
        this.GetUser();
    },
    // data(){
    //     return {
    //         user: {
    //             email: '',
    //             oldpassword: '',
    //             newpassword: ''
    //         }
    //     }
    // },
    methods: {
        DeleteAccount() {
            console.log("Token utilisé:", localStorage.getItem('token'));
            console.log(this.user);
            axios.delete('http://localhost:9000/user/remove', {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                },
                data: {
                    password: this.user.password
                }
            })
            .then(response => {
                console.log('Compte supprimé:', response.data);
                localStorage.removeItem('token');
                this.$router.push('/');
            })
            .catch(error => {
                console.error('Erreur lors de la suppression:', error);
            });
        },
        GetUser() {
            axios.get('http://localhost:9000/user/me',{
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
            }})
            .then(response => {
                this.user.email = response.data.email;
            })
            .catch(error => {
            console.error('Erreur lors de l\'initialisation de la base de données:', error);
            });
        }
    },
}
</script>

<style scoped>
h2 {
    font-family: iconso, sans-serif;
    font-size: 28px;
    font-weight: 600;
    color: #fff;
}
.del {
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: auto;
}
.acc {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: auto;
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
    width: auto;
    border-radius: 50px;
    font-size: 20px;
    font-weight: 600;
    margin: 10px 25px;
    font-family: iconso, sans-serif;
    border: 3px solid grey;
}

.bloc-modale {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.modale {
  background: #333;
  color: white;
  width: 80vw;
  height: auto;
  padding: 50px;
  position: fixed;
  top: 10%;
  bottom: 10%;
  border-radius: 20px;
}

.btn-modale {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 20px;
  right: 20px;
  padding: 10px;
  border-radius: 50px;
  background: rgb(250, 62, 62);
}
</style>