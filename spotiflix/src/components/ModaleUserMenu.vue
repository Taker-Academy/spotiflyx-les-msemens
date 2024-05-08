<template>
    <div class="bloc-modale" v-if="clicked">
        <div class="overlay" v-on:click="toggleModale"></div>
            <div class="modale card">
                <div v-on:click="toggleModale" class="btn-modale ">Close</div>
                <EditUser/>
                <button v-on:click="DeleteAccount">delete account</button>
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
    // mounted() {
    //     // const user = this.GetUser();
    // },
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
            axios.delete('http://localhost:9000/user/remove', {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            .then(response => {
                console.log('Compte supprimé:', response.data);
                localStorage.removeItem('token');
                this.$router.push('/')
            })
            .catch(error => {
                console.error('Erreur lors de la suppression:', error);
            });
        }
    //   GetUser() {
    //     axios.get('http://localhost:9000/user/me')
    //     .then(response => {
    //       return response.data
    //     })
    //     .catch(error => {
    //       console.error('Erreur lors de l\'initialisation de la base de données:', error);
    //     });
    //   }
    },
}
</script>

<style scoped>
.bloc-modale {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
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