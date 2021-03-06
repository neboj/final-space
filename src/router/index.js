import useState from '@/composables/useState.js';
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Episodes from '../views/Episodes.vue';
import Characters from '../views/Characters.vue';
import Character from '../views/Character.vue';
import PageNotFound from '../views/PageNotFound.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import User from '../views/User.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/episodes',
    name: 'Episodes',
    component: Episodes,
  },
  {
    path: '/characters',
    name: 'Characters',
    component: Characters,
  },
  {
    path: '/characters/:id',
    name: 'Character',
    component: Character,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    beforeEnter: (to, from, next) => {
      const { state } = useState();
      if (!state.user.isLoggedIn) next({ name: 'Login' });
      else next();
    },
  },
  //404
  { path: '/:pathMatch(.*)*', component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
