<template>
  <div class="card" :class="customClass">
    <img :alt="title + ' img'" class="card__img" :src="`${img}`" />
    <div class="card__content">
      <h3 class="card__title">{{ title }}</h3>
      <div class="card__details">
        <span class="card__date">{{ date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['img', 'title', 'author', 'date', 'customClass'],
  setup() {},
};
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid #eaeaea;
  margin-bottom: 20px;

  &.no-border {
    border: none;
  }

  &__content {
    padding: 25px;
  }
}
</style>
