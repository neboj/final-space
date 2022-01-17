<template>
  <!-- Home -->
  <div class="home">
    <!-- Description -->
    <p class="home__content">
      This is a Vue.js application for comedy space opera tv series Final Space
    </p>
    <p>You can view and search episodes, and learn more about each character</p>

    <!-- Technologies Title -->
    <h3 class="home__title page-title">Built with</h3>

    <!-- Technologies list -->
    <ul class="home__list">
      <li class="list__item">Vue.js (Composition API)</li>
      <li class="list__item">axios</li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
};
</script>

<style lang="scss" scoped>
.home {
  &__list {
    padding: 0;
    list-style: none;
  }
}
</style>
