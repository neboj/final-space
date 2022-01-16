<template>
  <header class="header">
    <nav class="nav">
      <router-link to="/" class="nav__link">Home</router-link>
      <router-link to="/episodes" class="nav__link">Episodes</router-link>
      <router-link to="/characters" class="nav__link">Characters</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  setup() {
    return {};
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

      &.router-link-active {
        color: white;
        background-color: #57ea4c;
      }
    }
  }
}
</style>
