<template>
  <div class="character">
    <h3>Character</h3>
    <p>{{ character.name }}</p>
    <img :src="character.img_url" />
    <div v-if="quotes.length">
      <h4>Quotes</h4>
      <div v-for="quote in quotes" :key="quote.id">
        <p>{{ quote.quote }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  setup() {
    // Character

    const character = ref({});
    const route = useRoute();

    axios
      .get(`${process.env.VUE_APP_API_URL_CHARACTER}/${route.params.id}`)
      .then((res) => {
        character.value = res.data;
      })
      .catch((err) => {
        console.log('Error:', err);
      });

    // Quotes
    const quotes = ref([]);
    axios
      .get(process.env.VUE_APP_API_URL_CHARACTER_QUOTES)
      .then((res) => {
        quotes.value = res.data.filter(
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
