<template>
  <div v-if="characters" class="characters">
    <h3>Characters</h3>
    <div
      v-for="character in characters"
      :key="character.id"
      class="characters__card-container"
    >
      <Card
        :title="character.name"
        :img="character.img_url"
        :date="character.species"
        :customClass="'no-border'"
      />
      <button @click="goToCharacter(character.id)" class="characters__btn">
        Show More
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Card from '../components/Card.vue';

export default {
  components: {
    Card,
  },
  setup() {
    const characters = ref([]);

    axios
      .get(process.env.VUE_APP_API_URL_CHARACTER)
      .then((res) => {
        characters.value = res.data;
      })
      .catch((err) => {
        console.log('Error:', err);
      });

    const router = useRouter(),
      goToCharacter = (id) => router.push(`/characters/${id}`);

    return {
      characters,
      goToCharacter,
    };
  },
};
</script>

<style lang="scss" scoped>
.characters {
  :deep(.card) {
    .card__content {
      padding-bottom: 0;
    }
  }
  &__btn {
    margin-bottom: 20px;
    padding: 10px 15px;
    border: none;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
