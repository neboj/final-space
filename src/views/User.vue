<template>
  <div>
    <h3 class="page-title">User</h3>
    <div class="user">
      <img
        :src="user.img"
        :alt="`${user.name} avatar img`"
        class="user__avatar"
      />
      <p class="user__name">{{ user.name }}</p>
      <p class="user__email">{{ user.email }}</p>
    </div>

    <div v-if="episodes.length" class="episodes">
      <h3 class="episodes__title">Favorite episodes</h3>
      <ul class="episodes__list">
        <li
          class="episodes__item"
          v-for="episode in episodes"
          :key="episode.id"
        >
          {{ episode.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import useState from '@/composables/useState.js';
import { computed } from '@vue/reactivity';
export default {
  setup() {
    const { state } = useState();
    const user = computed(() => state.user);
    const episodes = computed(() => state.user.episodes);
    return {
      user,
      episodes,
    };
  },
};
</script>

<style lang="scss" scoped>
.user {
  margin-bottom: 20px;
}
.episodes {
  &__title {
    margin-bottom: 10px;
  }
}
</style>
