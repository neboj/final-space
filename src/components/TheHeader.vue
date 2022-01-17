<template>
  <header class="header">
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
      <button v-else type="button" class="btn nav__link" @click="logout">
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
    const { state, setLoggedIn } = useState();
    const isLoggedIn = computed(() => state.user.isLoggedIn);
    const logout = () => setLoggedIn(false);
    return {
      isLoggedIn,
      logout,
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;

  .nav {
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
