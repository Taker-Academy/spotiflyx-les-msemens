<template>
    <form class="search" @submit.prevent="searchQuery">
      <div class="keep">
        <input class="query" type="text" v-model="user.search" placeholder="Search on Youtube...">
        <button class="button" type="submit">
          <font-awesome-icon icon="search" />
        </button>
      </div>
    </form>
    <div class="response" v-if="responses.length >= 0">
      <div class="" v-for="response in responses" :key="response.id.videoId">
        <div class="video_case">
          <iframe allow="fullscreen" width="320" height="180" :src="`https://www.youtube.com/embed/${response.id.videoId}`" frameborder="0"></iframe>
          <div class="snippet">
            <h4>Titre: {{ response.snippet.title }}</h4>
            <h4>Description: " {{ response.snippet.description }} "</h4>
            <a :href="`https://www.youtube.com/channel/${response.snippet.channelId}`" target="_blank">
              <h4 class="chaine" >Chaine: {{ response.snippet.channelTitle }}</h4>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="empty" v-else>
      <p>Aucune réponse trouvée</p>
    </div>
    <div v-if="responses.length == 0" class="nothing"></div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'searchYoutubeVue',
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
      axios.post('http://localhost:9000/youtube/search', this.user)
        .then(response => {
          console.log('Response received:', response.data.items);
          this.responses = response.data.items;
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
.nothing {
  height: 80vh;
}
.chaine:hover {
  transform: rotate(180deg);
}
.chaine {
  text-decoration: underline 2px;
  width: 5rem;
  transition: transform 0.3s ease; /* Ajout de la transition */
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
.response {
  margin: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.button:hover {
    transform: scale(1.3);
}
iframe {
  margin: 1rem;
}
.video_case {
  display: flex;
  align-items: center;
  height: 15rem;
  justify-content: left;
  background: #272727;
  margin-top: 1.5rem;
  width: 60vw;
  padding: 0rem 2rem;
  border-radius: 20px;
  transition: transform 0.3s ease; /* Ajout de la transition */
}

.snippet * {
  display: flex;
  flex-direction: column;
  color: #fff;
}

.empty {
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video_case:hover {
  transform: scale(1.1); /* Utilisation de transform au lieu de scale */
}
</style>