<template>
    <form class="search" @submit.prevent="searchQuery">
      <div class="keep">
        <input class="query" type="text" v-model="user.search" placeholder="Search on Spotify...">
        <button class="button" type="submit">
          <font-awesome-icon icon="search" />
        </button>
      </div>
    </form>
    <div class="pos" v-if="responses.length >= 0">
      <div class="response">
        <div class="song" v-for="response in responses" :key="response.id">
          <iframe class="player" :src="`https://open.spotify.com/embed/track/${response.id}`" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </div>
      </div>
    </div>
    <div class="empty" v-else>
      <p>Aucune réponse trouvée</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'searchSpotifyVue',
  components: {
  },
  data() {
    return {
      user: {
        search: ''
      },
      responses: []
    };
  },
  methods: {
    searchQuery() {
      console.log('Searching for:', this.user.search);
      if (!this.user.search) return
      axios.post('http://localhost:9000/spotify/search', this.user)
        .then(response => {
          this.responses = response.data.tracks.items;
          console.log(this.responses);
        })
        .catch(error => {
          console.error('Erreur de recherche:', error);
          alert('Erreur de recherche');
        });
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
.empty {
  display: flex;
  align-items: center;
  justify-content: center;
}
.content{
    height: 100vh;
}
.search {
  display: flex;
  align-content: center;
  justify-content: center;
  height: auto;
}
.button, .query {
  background: transparent;
  height: auto;
}
.keep {
  background: #00000074;
  display: flex;
  align-content: center;
  justify-content: center;
  height: 3.5rem;
  border-radius: 50px;
}
.query {
  width: 12rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  color: #fff;
}
.button {
  border: none;
  padding: 1rem 2rem;
  scale: 1.4;
  border-radius: 50px;
  color: #fff;
  cursor: pointer;
  transition: transform 0.3s ease; /* Ajout de la transition */
}
.cover {
  width: 7rem;
  height: 7rem;
}
.pos {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}
.song {
  margin:  0.5rem 1rem;
}
.response {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 70vw;
}
.player {
  width: auto;
  height: 22rem;
}
</style>