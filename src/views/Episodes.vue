<template>
  <h3 class="episodes__title page-title">Episodes</h3>
  <!-- Episodes -->
  <div class="episodes">
    <!-- Search episodes -->
    <div class="search-wrapper">
      <input type="text" v-model="search" placeholder="Search episodes title" />
    </div>

    <!-- List -->
    <div v-if="searchResults.length" class="episodes__list">
      <template v-for="episode in searchResults" :key="episode.id">
        <!-- Card -->
        <CardItem
          :author="episode.writer"
          :date="episode.air_date"
          :img="episode.img_url"
          :title="episode.name"
        >
          <template v-if="user.isLoggedIn">
            <img
              v-if="!localSelectedIdsMap[episode.id]"
              src="../assets/img/star-solid-gray.svg"
              class="episodes__favorite"
              @click="toggleFavorite(episode)"
            />
            <img
              v-else
              src="../assets/img/star-solid-gold.svg"
              class="episodes__favorite"
              @click="toggleFavorite(episode)"
            />
          </template>
        </CardItem>
      </template>
    </div>
    <div v-else>
      <img
        src="https://api.dicebear.com/7.x/bottts/png?seed=44"
        alt="No search result image"
      />
      <p>No search results</p>
    </div>
  </div>
  <!-- No results -->
</template>

<script>
// @ is an alias to /src
import { ref, computed } from 'vue';
import useState from '@/composables/useState.js';
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
    const { state, favorEpisode, unfavorEpisode } = useState();
    const user = computed(() => state.user);

    // Fetch
    axios
      .get(process.env.VUE_APP_API_URL_EPISODE)
      .then((res) => {
        episodes.value = res.data;
      })
      .catch(() => {
        toast({ title: 'Error occurred', icon: 'error' });
      });

    // Search
    const search = ref(''),
      searchResults = computed(() => {
        return episodes.value.filter((episode) =>
          episode.name.toLowerCase().startsWith(search.value.toLowerCase())
        );
      });

    // Favor
    const localSelectedIdsMap = computed(() => {
      if (!state.user.episodes) return {};
      const map = {};
      state.user.episodes.forEach((episode) => {
        map[episode.id] = episode;
      });
      return map;
    });

    const toggleFavorite = (episode) => {
      if (!localSelectedIdsMap.value[episode.id]) {
        favorEpisode(episode);
      } else {
        unfavorEpisode(episode);
      }
    };

    return {
      episodes,
      search,
      searchResults,
      user,
      toggleFavorite,
      localSelectedIdsMap,
      state,
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

  &__favorite {
    cursor: pointer;
  }

  :deep(.card) {
    background-color: white;
    border-radius: 5px;
    border: none;
    padding: 25px;
    display: grid;
    grid-template-columns: minmax(0, 100px) auto 24px;
    gap: 15px;

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
      padding: none;
    }

    .card__title {
      text-align: left;
      font-style: italic;
    }
  }
  .search-wrapper {
    margin-bottom: 30px;
    input {
      border: none;
      padding: 12px 18px;
      font-size: 14px;
    }
  }
}
</style>
