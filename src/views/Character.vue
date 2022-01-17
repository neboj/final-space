<template>
  <!-- Character -->
  <div class="character">
    <!-- Page Title -->
    <h3 class="page-title">Character</h3>

    <!-- Name -->
    <p class="character__title">{{ character.name }}</p>
    <!-- Image -->
    <img :src="character.img_url" class="character__img" />
    <!-- Quotes -->
    <div v-if="quotes.length" class="character__quotes">
      <h4 class="character__quotes-title">Quotes</h4>
      <div class="character__quotes-list">
        <!-- Quote -->
        <template v-for="quote in quotes" :key="quote.id">
          <blockquote class="character__quotes-list__quote">
            "{{ quote.quote }}"
          </blockquote>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import useToast from '@/composables/useToast.js';

export default {
  setup() {
    // Utils
    const { toast } = useToast();

    // Character
    const character = ref({});
    const route = useRoute();

    const characterPromise = axios.get(
      `${process.env.VUE_APP_API_URL_CHARACTER}/${route.params.id}`
    );

    // Quotes
    const quotes = ref([]);
    const quotePromise = axios.get(
      process.env.VUE_APP_API_URL_CHARACTER_QUOTES
    );

    Promise.all([characterPromise, quotePromise])
      .then((values) => {
        character.value = values[0].data;
        quotes.value = values[1].data.filter(
          (quote) => quote.by === character.value?.name
        );
      })
      .catch(() => {
        toast({ title: 'Error occurred', icon: 'error' });
      });

    return {
      character,
      quotes,
    };
  },
};
</script>

<style lang="scss" scoped>
.character {
  &__title {
    font-weight: bold;
  }
  &__img {
    margin: 10px;
    border-radius: 5px;
  }

  &__quotes {
    &-title {
      font-weight: bold;
    }
    &-list {
      &__quote {
        margin: 15px auto;
        font-style: italic;
      }
    }
  }
}
</style>
