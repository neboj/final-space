<template>
  <!-- Characters -->
  <div v-if="characters" class="characters">
    <!-- Page title -->
    <h3 class="page-title">Characters</h3>

    <!-- List -->
    <div class="characters__list">
      <template v-for="character in characters" :key="character.id">
        <!-- Card -->
        <CardItem
          :title="character.name"
          :img="character.img_url"
          :date="character.species"
          :custom-class="'no-border'"
        >
          <!-- Show more -->
          <button
            @click="
              $router.push({ name: 'Character', params: { id: character.id } })
            "
            class="characters__btn"
          >
            Show More
          </button>
        </CardItem>
      </template>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import useToast from '@/composables/useToast.js';
import CardItem from '../components/CardItem.vue';

export default {
  components: {
    CardItem,
  },
  setup() {
    const { toast } = useToast();
    const characters = ref([]);

    axios
      .get(process.env.VUE_APP_API_URL_CHARACTER)
      .then((res) => {
        characters.value = res.data;
      })
      .catch(() => {
        toast({ title: 'Error occurred', icon: 'error' });
      });

    return {
      characters,
    };
  },
};
</script>

<style lang="scss" scoped>
.characters {
  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 300px));
    column-gap: 20px;
    justify-content: center;
  }

  :deep(.card) {
    .card__content {
      padding-bottom: 0;
    }
  }

  &__btn {
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 10px 15px;
    border: 1px solid transparent;
    border-radius: 5px;
    color: white;
    background: #6867ac;
    transition: background-color 300ms;
    &:hover {
      cursor: pointer;
      background: #8988be;
    }
  }
}
</style>
