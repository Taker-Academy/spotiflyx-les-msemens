<template>
  <div>
    <div class="choose">
      <el-switch
      v-model="value1"
      class="ml-2"
      size='large'
      inline-prompt
      style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
      active-text="Spotify"
      inactive-text="Youtube"
      />
    </div>
    <searchYoutubeVue v-if="!value1"/>
    <searchSpotifyVue v-else/>

  </div>
</template>

<script>
import axios from 'axios';
import searchYoutubeVue from '../../components/searchYoutube.vue';
import { ref } from 'vue'
import searchSpotifyVue from '../../components/searchSpotify.vue';

export default {
  name: 'searchBar',
  components: {
    searchYoutubeVue,
    searchSpotifyVue
  },
  data() {
    return {
      user: {
        search: ''
      },
      spotify: true,
      responses: []
    };
  },
  methods: {
    searchQuery() {
      console.log('Searching for:', this.user.search);
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
  },
  setup() {
    const value1 = ref(true);

    return { value1 };
  }
};
</script>

<style scoped>
.choose {
  display: flex;
  justify-content: center;
  align-items: center;
}
.choose h3{
  margin: 1rem;
}
</style>