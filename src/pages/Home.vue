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
      <template v-if="games">
        <GameList :games="games" />
      </template>
      <template v-else-if="!games && !error">
        <GameListSkeleton />
      </template>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

import useSWRFetch from '../composables/useSWRFetch'
import GameList from '../components/game/GameList.vue'
import GameListSkeleton from '../components/game/GameListSkeleton.vue'

export default {
  name: 'Home',
  components: {
    GameList,
    GameListSkeleton,
  },
  setup() {
    const searchInput = ref('')

    const { data, error, mutate, isValidating } = useSWRFetch(
      'https://api.rawg.io/api/games?dates=2020-01-01,2020-12-31&ordering=-added',
      {
        revalidateOnFocus: false,
      },
    )

    function fetchGame() {
      mutate(async () => {
        const response = await fetch(
          `https://api.rawg.io/api/games?search=${searchInput.value}`,
        )
        const results = await response.json()
        return results
      })
    }

    return {
      searchInput,
      games: data,
      error,
      fetchGame,
      isValidating,
    }
  },
}
</script>
