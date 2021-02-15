<template>
  <div class="flex flex-wrap justify-center">
    <div class="mt-5 mx-4 p-10 max-w-4xl">
      <h1 class="font-bold text-5xl flex-1 mb-4">
        Top Games {{ currentYear }}
      </h1>
      <SearchBox v-on:fetchGame="fetchGame" />
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
import useSWRFetch from '../composables/useSWRFetch'
import SearchBox from '../components/search/SearchBox.vue'
import GameList from '../components/game/GameList.vue'
import GameListSkeleton from '../components/game/GameListSkeleton.vue'

export default {
  name: 'Home',
  components: {
    SearchBox,
    GameList,
    GameListSkeleton,
  },
  setup() {
    const currentYear = new Date().getFullYear()

    const { data, error, mutate, isValidating } = useSWRFetch(
      `https://api.rawg.io/api/games?dates=${currentYear}-01-01,${currentYear}-12-31&ordering=-rating`,
      {
        revalidateOnFocus: false,
      },
    )

    function fetchGame(searchInput) {
      mutate(async () => {
        const response = await fetch(
          `https://api.rawg.io/api/games?search=${searchInput}`,
        )
        const results = await response.json()
        return results
      })
    }

    return {
      currentYear,
      games: data,
      error,
      fetchGame,
      isValidating,
    }
  },
}
</script>
