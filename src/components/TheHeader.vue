<template>
  <header class="header">
    <div v-if="isLoggedIn" class="profile">
      <img :src="user.img" width="50" />
      <span>{{ user.name }}</span>
    </div>
    <nav class="nav">
      <!-- Home -->
      <router-link to="/" class="nav__link">Home</router-link>
      <!-- Episodes -->
      <router-link to="/episodes" class="nav__link">Episodes</router-link>
      <!-- Characters -->
      <router-link to="/characters" class="nav__link">Characters</router-link>
      <template v-if="!isLoggedIn">
        <!-- Register -->
        <router-link to="/register" class="nav__link">Register</router-link>
        <!-- Login -->
        <router-link to="/login" class="nav__link">Login</router-link>
      </template>
      <!-- Logout -->
      <button v-else type="button" class="btn nav__link" @click="logoutUser">
        Log out
      </button>
    </nav>
  </header>
</template>

<script>
import useState from '@/composables/useState.js';
import { computed } from '@vue/reactivity';

export default {
  setup() {
    const { state, logoutUser } = useState();
    const isLoggedIn = computed(() => state.user.isLoggedIn);
    const user = computed(() => state.user);
    return {
      isLoggedIn,
      logoutUser,
      user,
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: white;
  display: grid;
  grid-template-areas: 'profile nav .';
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  justify-content: center;
  height: 100px;

  .profile {
    grid-area: profile;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .nav {
    grid-area: nav;
    display: flex;
    gap: 20px;
    &__link {
      text-decoration: none;
      color: #27252c;
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;

      &.router-link-active {
        color: white;
        background-color: #57ea4c;
      }
    }
  }
}
</style>
