<template>
  <header class="header">
    <div v-if="isLoggedIn" class="profile">
      <img :src="user.img" width="50" />
      <router-link to="/user" class="profile__link">{{
        user.name
      }}</router-link>
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
    <a
      class="nav-mobile__trigger"
      @click="isMobileMenuActive = !isMobileMenuActive"
    >
      <img
        src="../assets/img/bars.svg"
        class="nav-mobile__img"
        @click="toggleFavorite(episode)"
      />
    </a>
    <nav
      :class="['nav-mobile__menu', isMobileMenuActive ? 'active' : '']"
      @click="isMobileMenuActive = !isMobileMenuActive"
    >
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
import { computed, ref } from '@vue/reactivity';

export default {
  setup() {
    const { state, logoutUser } = useState();
    const isLoggedIn = computed(() => state.user.isLoggedIn);
    const user = computed(() => state.user);
    const isMobileMenuActive = ref(false);
    return {
      isLoggedIn,
      logoutUser,
      user,
      isMobileMenuActive,
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
  height: 60px;

  .profile {
    grid-area: profile;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    &__link {
      color: inherit;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
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
      transition: color 0.3s;
      &:hover {
        color: #6867ac;
      }

      &.router-link-active {
        color: white;
        background-color: #6867ac;
      }
    }
  }

  .nav-mobile {
    &__trigger,
    &__menu {
      display: none;
    }
  }
}

@media screen and (max-width: 480px) {
  .header {
    .nav {
      display: none;
    }
    grid-template-areas:
      'profile trigger'
      'menu menu';
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 60px auto;
    .nav-mobile {
      &__trigger {
        grid-area: trigger;
        display: block;
        cursor: pointer;
      }
      &__menu {
        grid-area: menu;
        background: white;
        z-index: 1;
        display: none;
        flex-direction: column;
        &.active {
          display: flex;
        }

        .nav__link {
          margin: 5px;
        }
      }
    }
  }
}
</style>
