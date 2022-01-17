<template>
  <!-- Card -->
  <div class="card" :class="customClass">
    <!-- Image -->
    <img :alt="title + ' img'" class="card__img" :src="`${img}`" />
    <div class="card__content">
      <!-- Title -->
      <h3 class="card__title">{{ title }}</h3>
      <div class="card__details">
        <!-- Date -->
        <span class="card__date">{{ date }}</span>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CardItem',
  props: {
    img: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    customClass: {
      type: String,
      default: '',
    },
  },
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

  &__img {
    width: 100%;
    border-radius: 2px;
  }

  &__content {
    padding: 25px;
  }

  &__title {
    font-weight: bold;
    margin-bottom: 6px;
  }
  &__date {
    font-size: 85%;
    font-style: italic;
  }
}
</style>
