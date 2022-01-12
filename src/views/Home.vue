<template>
  <div class="home">
    <h3 class="home">Home</h3>
    <p>
      This is a Vue.js application for comedy space opera tv series Final Space
    </p>
    <p>You can view and search episodes, and learn more about each character</p>

    <h3>Built with</h3>
    <ul class="list">
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
.list {
  list-style: none;
}
</style>
