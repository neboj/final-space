<template>
  <input type="text" v-model="search" placeholder="search" />
  <div v-if="searchResults.length" class="episodes">
    <h3>Episodes</h3>
    <template v-for="episode in searchResults" :key="episode.id">
      <Card
        :author="episode.writer"
        :date="episode.air_date"
        :img="episode.img_url"
        :title="episode.name"
      />
    </template>
  </div>
  <div v-else>No search results</div>
</template>

<script>
import { ref } from '@vue/reactivity';
import axios from 'axios';

import Card from '../components/Card.vue';
import { computed } from '@vue/runtime-core';
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    Card,
  },
  setup() {
    const episodes = ref([]);

    axios
      .get(process.env.VUE_APP_API_URL_EPISODE)
      .then((res) => {
        episodes.value = res.data;
      })
      .catch((err) => {
        console.log('Error:', err);
      });

    const search = ref('');

    const searchResults = computed(() => {
      return episodes.value.filter((episode) =>
        episode.name.toLowerCase().startsWith(search.value.toLowerCase())
      );
    });

    return {
      episodes,
      search,
      searchResults,
    };
  },
};
</script>

<style lang="scss" scoped>
.episodes {
  max-width: 640px;
  margin: 0 auto;
}
</style>
