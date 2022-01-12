<template>
  <div class="character">
    <h3>Character</h3>
    <p>{{ character.name }}</p>
    <img :src="character.img_url" />
    <div v-if="quotes.length">
      <h4>Quotes</h4>
      <div v-for="quote in quotes" :key="quote.id">
        <blockquote>{{ quote.quote }}</blockquote>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
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
      .catch((err) => {
        console.log('Error:', err);
      });

    return {
      character,
      quotes,
    };
  },
};
</script>

<style lang="scss" scoped></style>
