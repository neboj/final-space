<template>
  <!-- Search episodes -->
  <input type="text" v-model="search" placeholder="Search episodes title" />

  <!-- Episodes -->
  <div v-if="searchResults.length" class="episodes">
    <!-- Page title -->
    <h3 class="episodes__title page-title">Episodes</h3>

    <!-- List -->
    <div class="episodes__list">
      <template v-for="episode in searchResults" :key="episode.id">
        <!-- Card -->
        <CardItem
          :author="episode.writer"
          :date="episode.air_date"
          :img="episode.img_url"
          :title="episode.name"
        />
      </template>
    </div>
  </div>
  <!-- No results -->
  <div v-else>No search results</div>
</template>

<script>
// @ is an alias to /src
import { ref, computed } from 'vue';
import useToast from '@/composables/useToast.js';
import CardItem from '../components/CardItem.vue';

export default {
  name: 'Home',
  components: {
    CardItem,
  },
  setup() {
    const episodes = ref([]);
    const { toast } = useToast();

    axios
      .get(process.env.VUE_APP_API_URL_EPISODE)
      .then((res) => {
        episodes.value = res.data;
      })
      .catch(() => {
        toast({ title: 'Error occurred', icon: 'error' });
      });

    const search = ref(''),
      searchResults = computed(() => {
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
  // max-width: 640px;
  margin: 0 auto;

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 400px));
    grid-gap: 20px;
    justify-content: center;
  }

  :deep(.card) {
    background-color: white;
    border-radius: 5px;
    border: none;
    display: grid;
    grid-template-columns: minmax(0, 200px) auto;

    .card__img {
      display: grid;
      align-self: center;
      justify-self: center;
      max-width: 100px;
      transition: all 0.5s;
      &:hover {
        transform: scale(1.5);
      }
    }

    .card__content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }
}
</style>
