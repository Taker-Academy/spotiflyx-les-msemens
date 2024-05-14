import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { ChakraUIVuePlugin } from '@chakra-ui/vue-next';
import * as chakraComponents from '@chakra-ui/vue-next';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Add all icons to the library
library.add(fas, far, fab);

const app = createApp(App);

app.use(store);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(ChakraUIVuePlugin, {
  components: chakraComponents,
});

app.mount('#app');