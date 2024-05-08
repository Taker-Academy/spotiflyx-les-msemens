<template>
    <form @submit.prevent="EditUser" class="edit">
        <div class="input">
            <label for="user_email">Email</label>
            <input v-model="user.email" type="email" required>
        </div>
        <div class="input">
            <label for="user_password">Old Password</label>
            <input v-model="user.oldpassword" type="password" required>
        </div>
        <div class="input">
            <label for="user_password">New Password</label>
            <input v-model="user.newpassword" type="password" required>
        </div>
        <button type="submit">submit</button>
    </form>
</template>

<script>
import axios from 'axios'

export default {
    name: 'EditUser',
    data(){
        return {
            user: {
                email: '',
                oldpassword: '',
                newpassword: ''
            }
        }
    },
    methods: {
        Logout() {
            axios.put('http://localhost:9000/user/edit', this.user)
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.error('Erreur lors de l\'initialisation de la base de données:', error);
            });
        },
        EditUser() {
            console.log(this.user)
            axios.put('http://localhost:9000/user/edit', this.user, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.error('Erreur lors de l\'initialisation de la base de données:', error);
            });
        }
    }
}
</script>

<style scoped>
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
    .edit {
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 65vh;
    }
</style>