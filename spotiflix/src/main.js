import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

// Add all icons to the library
library.add(fas, far, fab);

const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');