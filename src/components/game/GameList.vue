<template>
  <ul
    v-if="games"
    class="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-2 lg:grid-cols-3"
  >
    <li v-for="game in games.results" :key="game.id">
      <router-link :to="`/games/${game.slug}`">
        <GameCard :game="game" />
      </router-link>
    </li>
  </ul>
</template>

<script>
import GameCard from './GameCard.vue'

export default {
  name: 'GameList',
  components: {
    GameCard,
  },
  props: {
    games: {
      type: Object,
    },
  },
}
</script>
