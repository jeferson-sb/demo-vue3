<template>
  <section
    class="container mx-auto md:max-w-5xl grid sm:px-8 sm:py-12 sm:gap-x-8 md:py-16"
  >
    <div class="mt-6 sm:mt-9 mx-2">
      <h1 class="font-bold text-5xl flex-1 mb-4">
        Top Games {{ currentYear }}
      </h1>
      <SearchBox v-on:fetchGame="fetchGame" />
      <template v-if="!isValidating && games">
        <GameList :games="games" />
      </template>
      <template v-else-if="isValidating || (!games && !error)">
        <GameListSkeleton />
      </template>
    </div>
  </section>
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
    const apiKey = import.meta.env.VITE_RAWG_API_KEY

    const { data, error, mutate, isValidating } = useSWRFetch(
      `https://api.rawg.io/api/games?key=${apiKey}&dates=${currentYear}-01-01,${currentYear}-12-31&ordering=-rating&page_size=24`,
      {
        revalidateOnFocus: false,
      },
    )

    function fetchGame(searchInput) {
      mutate(async () => {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${apiKey}&search=${searchInput}`,
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
