<template>
  <TheHeader />
  <main class="main">
    <router-view />
  </main>
</template>

<script>
import TheHeader from './components/TheHeader.vue';
export default {
  components: {
    TheHeader,
  },
};
</script>

<style lang="scss">
@import './assets/sass/styles.scss';

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}

.main {
  padding: 30px;
}
</style>
