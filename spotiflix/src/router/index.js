import { createRouter, createWebHistory } from 'vue-router'
import store from '../store';
import { authGuard } from '@/_helper/auth-guard';

import PublicLayout from '@/views/public/Layout.vue'
import Home from '@/views/public/Home.vue'
import Login from '@/views/public/Login.vue'
import Register from '@/views/public/Register.vue'
import LoggedLayout from '@/views/logged/LoggedLayout'

import mainMenu from '@/views/logged/mainMenu.vue';

const routes = [

  {
    path: '/',
    name: 'Public',
    component: PublicLayout ,
    children: [
      { path: '/', name: 'Home', component: Home },
      { path: '/login', name: 'Login', component: Login },
      { path: '/register', name: 'Register', component: Register },
    ]
  },
  {
    path: '/logged',
    name: 'Logged',
    component: LoggedLayout,
    children: [
      { path: '/logged', name: 'MainMenu', component: mainMenu },

    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched[0].name == 'Logged'){
    authGuard()
  }
  next()
})

export default router
