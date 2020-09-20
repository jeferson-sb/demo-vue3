<template>
  <div class="flex flex-wrap justify-center">
    <div class="mt-5 mx-4 p-10 max-w-4xl">
      <h1 class="font-bold text-5xl flex-1 mb-4">Top Games 2020</h1>
      <div class="flex mb-4">
        <input
          type="search"
          v-model="searchInput"
          v-on:keyup.enter="fetchGame"
          class="flex-1 text-black px-4 py-2 bg-gray-800 text-gray-300 rounded-sm"
          placeholder="Enter your favorite game..."
        />
        <button
          @click="fetchGame"
          class="py-2 px-5 uppercase font-bold bg-green-400 rounded-sm ml-2"
        >
          Search
        </button>
      </div>
      <ul
        v-if="games.results"
        class="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <li v-for="game in games.results" :key="game.id">
          <router-link :to="`/games/${game.slug}`">
            <GameCard :game="game" />
          </router-link>
        </li>
      </ul>
      <p v-if="loading">Loading...</p>
      <p v-if="hasErrors">{{ hasErrors }}</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, provide } from 'vue';
import GameCard from '../components/GameCard.vue';
import useFetch from '../composables/useFetch';

export default {
  components: {
    GameCard,
  },
  setup() {
    const searchInput = ref('');
    const { results, hasErrors, loading, execute } = useFetch();

    onMounted(() => {
      execute(
        'https://api.rawg.io/api/games?dates=2020-01-01,2020-12-31&ordering=-added'
      );
    });

    function fetchGame() {
      execute(`https://api.rawg.io/api/games?search=${searchInput.value}`);
    }

    // anything that needs to be accessed in the template
    return {
      searchInput,
      games: results,
      loading,
      hasErrors,
      execute,
      fetchGame,
    };
  },
};
</script>
